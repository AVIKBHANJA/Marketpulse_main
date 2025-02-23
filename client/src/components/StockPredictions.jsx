import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const StockPredictions = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        // Example stocks to fetch - replace with your actual list
        const stockList = ["TESLA", "AAPL", "GOOGL", "MSFT", "AMZN"];
        const predictions = await Promise.all(
          stockList.map(async (stock) => {
            const response = await fetch(
              `http://localhost:3000/analyze?keyword=${stock}`
            );
            const data = await response.json();
            return {
              symbol: stock,
              ...data,
            };
          })
        );
        setStocks(predictions);
      } catch (err) {
        setError("Failed to fetch stock predictions");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    return numScore >= 0 ? "text-green-600" : "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading stock predictions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // Prepare data for comparison chart
  const comparisonData = stocks.map((stock) => ({
    name: stock.symbol,
    score: parseFloat(stock.final_score),
    articles: stock.num_articles,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-8">
        Stock Market Sentiment Analysis
      </h1>

      {/* Score Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Sentiment Comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[-1, 1]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="score"
                fill="#2563eb"
                name="Sentiment Score"
                label={{ position: "top" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((stock, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{stock.symbol}</span>
                {parseFloat(stock.final_score) >= 0 ? (
                  <ArrowUpCircle className="text-green-500" />
                ) : (
                  <ArrowDownCircle className="text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Sentiment Score</div>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      stock.final_score
                    )}`}
                  >
                    {stock.final_score}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Overall Sentiment</div>
                  <div className="text-xl">{stock.overall_sentiment}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Articles Analyzed</div>
                  <div className="text-xl">{stock.num_articles}</div>
                </div>

                {/* Recent Articles Timeline */}
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={(stock.analyzed_articles || [])
                        .slice(0, 10)
                        .map((article) => ({
                          date: new Date(
                            article.publishedAt
                          ).toLocaleDateString(),
                          score: parseFloat(article.score),
                        }))}
                    >
                      <YAxis domain={[-1, 1]} hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StockPredictions;
