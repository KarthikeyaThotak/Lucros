import React, { useState, useEffect } from 'react';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_SERVER = import.meta.env.VITE_REACT_APP_API_URL;

  // Function to fetch news from Django API
  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_SERVER}/api/stock-news`); // Replace with your Django API endpoint
      const data = await response.json();
      setNews(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching news');
      setLoading(false);
    }
  };

  // Fetch the news once the component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Finance News and Stock Suggestions</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Stocks</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Sentiment</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Price</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-2 text-center">
                    Loading news...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3" className="p-2 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                news.map((stock, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-gray-800 dark:text-gray-100">{stock.STOCKNAME}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* Render sentiment for each article */}
                        {stock.SENTIMENT.map((article, idx) => (
                          <div key={idx} className="text-sm">
                            <strong>{article.headline}</strong> - <span>{article.sentiment}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{stock.CURRENT_PRICE.toFixed(2)}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default News;
