import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function StockPredictions() {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (symbol) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/api/stock/${symbol}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to fetch stock data');
      
      setStockData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) fetchStockData(ticker.trim());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Stock Analysis Dashboard</h1>
        
        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="flex-1 p-2 border rounded"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Analyze'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
      </div>

      {stockData && (
        <div className="space-y-8">
          {/* Quote Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">Price</h3>
              <div className="text-2xl">${stockData.quote.regularMarketPrice.toFixed(2)}</div>
              <div className={`flex items-center gap-1 ${stockData.quote.regularMarketChangePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stockData.quote.regularMarketChangePercent > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                {stockData.quote.regularMarketChangePercent.toFixed(2)}%
              </div>
            </div>
            
            <div className="p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">Volume</h3>
              <div className="text-2xl">{stockData.quote.regularMarketVolume.toLocaleString()}</div>
            </div>

            <div className="p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">MACD Signal</h3>
              <div className={`text-2xl ${stockData.technicalAnalysis.macd.decision.includes('Buy') ? 'text-green-600' : 'text-red-600'}`}>
                {stockData.technicalAnalysis.macd.decision}
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <div className="p-4 border rounded">
            <h3 className="text-lg font-semibold mb-4">Price History</h3>
            <LineChart width={800} height={400} data={stockData.historical}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="close" stroke="#2563eb" />
            </LineChart>
          </div>

          {/* News Feed */}
          <div className="p-4 border rounded">
            <h3 className="text-lg font-semibold mb-4">Latest News</h3>
            <div className="space-y-4">
              {stockData.news.map((article, index) => (
                <div key={index} className="p-4 border rounded">
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {article.title}
                  </a>
                  <div className={`mt-2 text-sm ${
                    article.sentiment.score > 0 ? 'text-green-600' : 
                    article.sentiment.score < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    Sentiment Score: {article.sentiment.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}