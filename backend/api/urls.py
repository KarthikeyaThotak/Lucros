from django.urls import path
from .views import LoginView, UserProfileView, SignupView, stock_news

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('stock-news/', stock_news, name='stock-news'),

    
]
