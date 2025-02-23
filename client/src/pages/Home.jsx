import React, { useState, useEffect } from 'react';
import TopBar from '../components/Topbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, X, BarChart, Clock, Diamond } from 'lucide-react';
import { FiSmile, FiMeh, FiFrown, FiActivity } from 'react-icons/fi';
const VISIBLE_ITEMS = 5;
const SLIDE_INTERVAL = 3000;

const getRandomData = (min, max, points = 24) => {
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    value: Math.random() * (max - min) + min
  }));
};


const StockDetails = ({ stock, onClose }) => {
  if (!stock) return null;
  const isPositive = parseFloat(stock.changePercent) >= 0;
  const chartData = getRandomData(40, 60, 24);

  return (
    <div className="fixed inset-0 bg-black/80 dark:bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl w-full relative border border-gray-200 dark:border-gray-800 shadow-xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold dark:text-white">{stock.name}</h2>
              <span className="text-gray-600 dark:text-gray-400 text-sm">{stock.symbol}</span>
            </div>
            <div className="text-4xl font-bold mt-3 dark:text-white">
              ₹{Number(stock.price).toLocaleString()}
            </div>
            <div className={`flex items-center gap-2 mt-2 ${isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span className="text-lg">{isPositive ? '+' : ''}{stock.changePercent}%</span>
            </div>
          </div>
        </div>

        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? '#059669' : '#dc2626'} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Day High', value: `₹${stock.dayHigh}` },
            { label: 'Day Low', value: `₹${stock.dayLow}` },
            { label: 'Volume', value: (stock.volume || 0).toLocaleString() },
            { label: 'Market Cap', value: `₹${(Math.random() * 1000000).toFixed(2)}Cr` }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm">{item.label}</div>
              <div className="text-xl mt-1 dark:text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold dark:text-white mb-4">Key Statistics</h3>
            <div className="space-y-4">
              {[
                { label: '52 Week High', value: `₹${stock.fiftyTwoWeekHigh}` },
                { label: '52 Week Low', value: `₹${stock.fiftyTwoWeekLow}` },
                { label: 'P/E Ratio', value: (Math.random() * 30 + 10).toFixed(2) }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold dark:text-white mb-4">Technical Indicators</h3>
            <div className="space-y-4">
              {[
                { label: 'RSI (14)', value: (Math.random() * 40 + 30).toFixed(2) },
                { label: 'MACD', value: 'Bullish', className: 'text-green-600 dark:text-green-500' },
                { label: '20-Day MA', value: `₹${(parseFloat(stock.price) * (1 + Math.random() * 0.1)).toFixed(2)}` }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className={item.className || 'dark:text-white'}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexCard = ({ data }) => {
  const isPositive = parseFloat(data.changePercent) >= 0;
  const chartData = getRandomData(40, 60, 12);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 dark:hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-teal-500/10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 dark:bg-teal-500/10 rounded-lg">
              <FiActivity className="w-5 h-5 text-blue-600 dark:text-teal-500" />
            </div>
            <h3 className="text-lg font-bold dark:text-white">{data.name}</h3>
          </div>
          <div className="text-3xl font-bold mt-4 dark:text-white">
            ₹{Number(data.price).toLocaleString()}
            <span className={`ml-3 text-sm ${isPositive ? 'text-blue-600 dark:text-teal-500' : 'text-red-600 dark:text-red-400'}`}>
              ({isPositive ? '+' : ''}{data.changePercent}%)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">VOL:</span>
          <span className="dark:text-white">{(data.volume / 1e6).toFixed(1)}M</span>
        </div>
      </div>
      
      <div className="h-32 mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 dark:from-teal-500/5 to-transparent rounded-xl" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#2563eb' : '#dc2626'} 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">High</div>
          <div className="font-medium mt-1 dark:text-white">₹{data.dayHigh}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Low</div>
          <div className="font-medium mt-1 dark:text-white">₹{data.dayLow}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">RSI</div>
          <div className="font-medium mt-1 dark:text-white">{(Math.random() * 30 + 40).toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

const MarketMood = () => {
  const moods = [
    { day: 'MON', sentiment: 'positive', value: 72 },
    { day: 'TUE', sentiment: 'positive', value: 68 },
    { day: 'WED', sentiment: 'neutral', value: 54 },
    { day: 'THU', sentiment: 'neutral', value: 49 },
    { day: 'FRI', sentiment: 'negative', value: 38 }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-4">
        <Diamond className="w-6 h-6 text-blue-600 dark:text-teal-500" />
        <h3 className="text-lg font-bold dark:text-white">Market Sentiment Analysis</h3>
      </div>
      <div className="flex items-center gap-8">
        {moods.map(({ day, sentiment, value }) => (
          <div key={day} className="flex flex-col items-center group relative">
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-900 px-3 py-2 rounded-lg text-sm shadow-lg border border-gray-200 dark:border-gray-800">
              {value} Bullish
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              sentiment === 'positive' 
                ? 'bg-blue-500/20 text-blue-600 dark:bg-teal-500/20 dark:text-teal-500 hover:bg-blue-500/30 dark:hover:bg-teal-500/30' :
              sentiment === 'negative' 
                ? 'bg-red-500/20 text-red-600 dark:bg-red-500/20 dark:text-red-500 hover:bg-red-500/30' :
                'bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-500 hover:bg-yellow-500/30'
            }`}>
              {sentiment === 'positive' && <FiSmile className="w-6 h-6" />}
              {sentiment === 'neutral' && <FiMeh className="w-6 h-6" />}
              {sentiment === 'negative' && <FiFrown className="w-6 h-6" />}
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-sm mt-3 font-medium">
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};



const MiniChart = ({ data, isNegative }) => (
  <svg className="w-24 h-12 md:w-32 md:h-16" viewBox="0 0 100 50">
    <path
      d={`M ${data.map((value, index) => 
        `${(index * 20)} ${50 - value}`
      ).join(' L ')}`}
      fill="none"
      stroke={isNegative ? '#ff4d4d' : '#4CAF50'}
      strokeWidth="2"
    />
  </svg>
);





const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [selectedStock, setSelectedStock] = useState(null);
  const [marketData, setMarketData] = useState({
    indices: [],
    tickers: []
  });
  const [loading, setLoading] = useState(true);

  const symbols = {
    indices: [
      { symbol: '^NSEI', name: 'NIFTY 50' },
      { symbol: '^BSESN', name: 'SENSEX' },
      { symbol: 'GC=F', name: 'Gold' }
    ],
    tickers: [
      { symbol: 'NIFTYBANK.NS', name: 'NIFTY BANK' },
      { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance' },
      { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
      { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
      { symbol: 'INFY.NS', name: 'Infosys' },
      { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
      { symbol: 'TCS.NS', name: 'TCS' },
      { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const indicesSymbols = symbols.indices.map(s => s.symbol).join(',');
        const indicesRes = await fetch(`http://localhost:3000/api/finance?symbols=${indicesSymbols}`);
        const indicesQuotes = await indicesRes.json();

        const tickersSymbols = symbols.tickers.map(s => s.symbol).join(',');
        const tickersRes = await fetch(`http://localhost:3000/api/finance?symbols=${tickersSymbols}`);
        const tickersQuotes = await tickersRes.json();

        const mappedIndices = symbols.indices.map((symbolObj, index) => {
          const quote = indicesQuotes[index];
          return {
            ...symbolObj,
            price: quote?.regularMarketPrice?.toFixed(2) || 'N/A',
            changePercent: quote?.regularMarketChangePercent?.toFixed(2) || '0.00',
            change: quote?.regularMarketChange?.toFixed(2) || '0.00',
            volume: quote?.regularMarketVolume || 0,
            dayHigh: quote?.regularMarketDayHigh?.toFixed(2) || '0.00',
            dayLow: quote?.regularMarketDayLow?.toFixed(2) || '0.00',
            chartData: getRandomData(40, 60)
          };
        });

        const mappedTickers = symbols.tickers.map((symbolObj, index) => {
          const quote = tickersQuotes[index];
          return {
            ...symbolObj,
            price: quote?.regularMarketPrice?.toFixed(2) || 'N/A',
            changePercent: quote?.regularMarketChangePercent?.toFixed(2) || '0.00',
            change: quote?.regularMarketChange?.toFixed(2) || '0.00',
            volume: quote?.regularMarketVolume || 0,
            dayHigh: quote?.regularMarketDayHigh?.toFixed(2) || '0.00',
            dayLow: quote?.regularMarketDayLow?.toFixed(2) || '0.00',
            fiftyTwoWeekHigh: quote?.fiftyTwoWeekHigh?.toFixed(2) || 'N/A',
            fiftyTwoWeekLow: quote?.fiftyTwoWeekLow?.toFixed(2) || 'N/A',
            chartData: getRandomData(40, 60)
          };
        });

        setMarketData({
          indices: mappedIndices,
          tickers: mappedTickers
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevTicker = () => {
    setTickerIndex(prev => 
      prev === 0 ? marketData.tickers.length - VISIBLE_ITEMS : prev - 1
    );
  };

  const handleNextTicker = () => {
    setTickerIndex(prev => 
      prev >= marketData.tickers.length - VISIBLE_ITEMS ? 0 : prev + 1
    );
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleCloseDetails = () => {
    setSelectedStock(null);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <TopBar 
        data={marketData.tickers}
        currentIndex={tickerIndex}
        onPrev={handlePrevTicker}
        onNext={handleNextTicker}
        onSelectStock={handleStockSelect}
        visibleItems={VISIBLE_ITEMS}
        slideInterval={SLIDE_INTERVAL}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Market Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500/10 dark:bg-teal-500/10 p-3 rounded-xl">
                <BarChart className="w-6 h-6 text-blue-600 dark:text-teal-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Market Overview</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Real-time data</span>
                  <div className="flex items-center gap-1 ml-2">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-teal-500 rounded-full animate-pulse" />
                    <span className="text-blue-600 dark:text-teal-500">Live</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {marketData.indices.slice(0, 4).map(index => (
                <div key={index.name} className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-xl">
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">{index.name}</div>
                  <div className="text-xl font-bold mb-1 dark:text-white">₹{index.price}</div>
                  <div className={`flex items-center gap-2 text-sm ${
                    parseFloat(index.changePercent) >= 0 
                      ? 'text-blue-600 dark:text-teal-500' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {parseFloat(index.changePercent) >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}
                    {Math.abs(index.changePercent)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <MarketMood />
        </div>

        {/* Indices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {marketData.indices.map((index) => (
            <IndexCard key={index.symbol} data={index} />
          ))}
        </div>

        {/* Featured Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-500/10 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-500" />
            </div>
            <h3 className="text-xl font-bold dark:text-white">Featured Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Tech Sector Outlook", ticker: "NASDAQ: TECH", change: +2.4 },
              { title: "Energy Sector Update", ticker: "NYSE: ENERGY", change: -1.8 },
              { title: "Emerging Markets", ticker: "MSCI: EM", change: +0.9 }
            ].map((insight, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-xl group hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">{insight.ticker}</div>
                  <div className={`text-sm ${
                    insight.change >= 0 
                      ? 'text-blue-600 dark:text-teal-500' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {insight.change >= 0 ? '+' : ''}{insight.change}%
                  </div>
                </div>
                <h4 className="text-lg font-medium mb-2 dark:text-white">{insight.title}</h4>
                <div className="h-24 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedStock && (
        <StockDetails 
          stock={selectedStock} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
};

export default Home;