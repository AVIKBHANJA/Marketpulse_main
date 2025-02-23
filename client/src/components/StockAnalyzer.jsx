import React, { useState } from "react";
import { analyzeStock, basicQuery } from "../api";
import StockAnalysisDisplay from "../components/StockAnalysisDisplay";
const StockAnalyzer = () => {
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdvisor = async (e) => {
    e.preventDefault();
    if (!company.trim()) {
      setError("Company symbol is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeStock(company, date);
      // Handle the complex response object
      const displayResult =
        response.result?.raw ||
        response.result?.tasks_output ||
        response.result ||
        "No analysis available";
      setResult(
        typeof displayResult === "object"
          ? JSON.stringify(displayResult, null, 2)
          : displayResult
      );
    } catch (err) {
      setError("Failed to analyze stock");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBasic = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Query is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await basicQuery(query);
      setResult(response.response || "No response available");
    } catch (err) {
      setError("Failed to process query");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Stock Analysis</h2>

      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
        <form onSubmit={handleAdvisor} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Company symbol (e.g., AAPL)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
          >
            {loading ? "Analyzing..." : "Get Analysis"}
          </button>
        </form>
      </div>

      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Quick Query</h3>
        <form onSubmit={handleBasic} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Ask about a stock..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
          >
            {loading ? "Processing..." : "Ask"}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {result && (
        <div className="result p-4 bg-white rounded-lg shadow">
          <h4 className="font-semibold mb-2">Result:</h4>
          <pre className="whitespace-pre-wrap break-words bg-gray-50 p-4 rounded">
            {/* {result && <StockAnalysisDisplay analysisText={result} />} */}
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default StockAnalyzer;
