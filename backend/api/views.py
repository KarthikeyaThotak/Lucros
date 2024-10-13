from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from webull import webull


# Signup View to create a new user

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"detail": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)

        # Return JWT token upon successful signup
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)

# Login View to obtain JWT token
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# View to retrieve user data
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)



import requests
import yfinance as yf
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from django.http import JsonResponse

# Your API Key from NewsAPI
API_KEY = 'dea33cf20981497abaf3e960c82c5b14'
BASE_URL = 'https://newsapi.org/v2/everything?q=finance'

# List of top stocks this week (you can update this list as needed)
top_stocks = ['NVDA', 'TSLA', 'UBER', 'GOOG', 'QQQ', 'AAPL']

# Initialize Sentiment Analyzer
analyzer = SentimentIntensityAnalyzer()

# Function to fetch news from NewsAPI for a given stock
def get_news(stock):
    params = {
        'q': stock,          # Stock symbol or name
        'apiKey': API_KEY,   # Your API key
        'sortBy': 'publishedAt', # Sort by the latest news
        'pageSize': 5        # Limit to 5 most recent articles
    }
    response = requests.get(BASE_URL, params=params)
    return response.json()

# Function to analyze sentiment of a news article
def analyze_sentiment(news_description):
    sentiment_score = analyzer.polarity_scores(news_description)['compound']  # Compound score for sentiment
    
    # Classify sentiment
    if sentiment_score >= 0.05:
        return 'Plus'  # Positive sentiment
    elif sentiment_score <= -0.05:
        return 'Minus'  # Negative sentiment
    else:
        return 'Neither'  # Neutral sentiment

# Function to get current stock price using Yahoo Finance
def get_current_price(stock_symbol):
    stock = yf.Ticker(stock_symbol)
    current_price = stock.history(period="1d")['Close'][0]  # Get the latest closing price
    return current_price

# View to fetch and analyze news for top stocks
def stock_news(request):
    result = []
    
    for stock in top_stocks:
        # Get news articles related to the stock
        news_data = get_news(stock)
        articles = news_data.get('articles', [])
        
        if not articles:
            continue  # Skip if no news articles found
        
        # Get the current stock price
        stock_symbol = stock  # Assume the stock name is the same as the symbol
        try:
            current_price = get_current_price(stock_symbol)
        except Exception as e:
            current_price = "N/A"  # In case the price retrieval fails
        
        # Analyze sentiment of each article
        stock_sentiment_data = []
        for article in articles:
            title = article['title']
            description = article['description']
            sentiment = analyze_sentiment(description)  # Analyze sentiment of the news description
            
            stock_sentiment_data.append({
                'headline': title,
                'sentiment': sentiment
            })
        
        # Append the result for the stock
        result.append({
            'STOCKNAME': stock,
            'CURRENT_PRICE': round(current_price, 2),
            'SENTIMENT': stock_sentiment_data
        })
    
    # Return the result as JSON response
    return JsonResponse(result, safe=False)



