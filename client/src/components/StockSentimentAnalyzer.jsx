import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle, Loader2 } from 'lucide-react';

const StockSentimentAnalyzer = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeSentiment = async () => {
    if (!keyword.trim()) {
      setError('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/analyze?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || 'Failed to analyze sentiment');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment.toLowerCase()) {
      case 'positive':
        return <ArrowUpCircle className="text-green-500" />;
      case 'negative':
        return <ArrowDownCircle className="text-red-500" />;
      default:
        return <MinusCircle className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Stock Sentiment Analysis</h2>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={analyzeSentiment}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing</>
            ) : (
              'Analyze'
            )}
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">{error}</div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="text-4xl">
                {getSentimentIcon(results.overall_sentiment)}
              </div>
              <div>
                <div className="text-xl font-semibold">
                  Overall Sentiment: {results.overall_sentiment}
                </div>
                <div className="text-sm text-gray-600">
                  Score: {results.final_score} | Articles Analyzed: {results.num_articles}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Analyzed Articles</h3>
              {results.analyzed_articles.map((article, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getSentimentIcon(article.sentiment)}
                    </div>
                    <div className="flex-1">
                      <a 
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {article.title}
                      </a>
                      <div className="text-sm text-gray-600 mt-1">
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="text-sm mt-2">{article.description}</div>
                      <div className="text-sm text-gray-600 mt-2">
                        Sentiment: {article.sentiment} (Score: {article.score})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockSentimentAnalyzer;