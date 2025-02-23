import React, { useState } from 'react';
import axios from 'axios';

const News = () => {
  const [ticker, setTicker] = useState('');
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/news/${ticker.trim().toUpperCase()}`);
      setNews(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching news');
      setNews(null);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-600';
      case 'Negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter stock ticker (e.g., AAPL, TSLA)"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {news && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            News Sentiment Analysis for {news.ticker}
          </h2>
          
          <div className="space-y-6">
            {news.articles.map((article, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {article.title}
                  </a>
                </h3>
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${getSentimentColor(article.sentiment)}`}>
                    {article.sentiment} (Score: {article.score})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;