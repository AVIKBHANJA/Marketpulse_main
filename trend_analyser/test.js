import yahooFinance from "yahoo-finance2";

// Fetch historical stock data
async function getStockData(ticker, startDate) {
    try {
        const period1 = Math.floor(new Date(startDate).getTime() / 1000);
        const period2 = Math.floor(new Date().getTime() / 1000);

        const queryOptions = {
            period1: period1,
            period2: period2,
            interval: "1d"
        };

        return await yahooFinance.historical(ticker, queryOptions);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return [];
    }
}

// Calculate EMA
function calculateEMA(data, periods) {
    const k = 2 / (periods + 1);
    let ema = [data[0]];
    for (let i = 1; i < data.length; i++) {
        ema.push(data[i] * k + ema[i - 1] * (1 - k));
    }
    return ema;
}

// MACD Indicator
function calculateMACD(data) {
    const closePrices = data.map(d => d.close);
    if (closePrices.length < 26) return { decision: "❌ Not enough data" };

    const shortEMA = calculateEMA(closePrices, 12);
    const longEMA = calculateEMA(closePrices, 26);
    const macd = shortEMA.map((short, i) => short - longEMA[i]);
    const signal = calculateEMA(macd, 9);

    const decision = macd[macd.length - 1] > signal[signal.length - 1] ? "✅ Buy" : "❌ Sell";

    return { macd, signal, decision };
}

// Williams Alligator Indicator
function calculateAlligator(data) {
    const closePrices = data.map(d => d.close);
    if (closePrices.length < 13) return { decision: "❌ Not enough data" };

    const jaw = calculateEMA(closePrices, 13);
    const teeth = calculateEMA(closePrices, 8);
    const lips = calculateEMA(closePrices, 5);

    const decision = lips[lips.length - 1] > teeth[teeth.length - 1] &&
                     teeth[teeth.length - 1] > jaw[jaw.length - 1] ? "✅ Buy" : "❌ Sell";

    return { jaw, teeth, lips, decision };
}

// Pivot Points
function calculatePivotPoints(data) {
    if (data.length < 2) return { decision: "❌ Not enough data" };

    const latest = data[data.length - 1];
    const previous = data[data.length - 2];

    const pivot = (previous.high + previous.low + previous.close) / 3;
    const r1 = (2 * pivot) - previous.low;
    const s1 = (2 * pivot) - previous.high;
    const r2 = pivot + (previous.high - previous.low);
    const s2 = pivot - (previous.high - previous.low);

    const decision = latest.close > pivot ? "✅ Buy" : "❌ Sell";

    return { pivot, r1, s1, r2, s2, decision };
}

// VWAP (Volume Weighted Average Price)
function calculateVWAP(data) {
    if (data.length === 0) return { decision: "❌ Not enough data" };

    let cumulativeVolume = 0;
    let cumulativeVWAP = 0;

    data.forEach(d => {
        cumulativeVWAP += (d.high + d.low + d.close) / 3 * d.volume;
        cumulativeVolume += d.volume;
    });

    const vwap = cumulativeVWAP / cumulativeVolume;
    const decision = data[data.length - 1].close > vwap ? "✅ Buy" : "❌ Sell";

    return { vwap, decision };
}

// SuperTrend Indicator
function calculateSuperTrend(data) {
    if (data.length < 14) return { decision: "❌ Not enough data" };

    const atr = data.map((d, i) => i > 0 ? Math.max(d.high - d.low, Math.abs(d.high - data[i - 1].close), Math.abs(d.low - data[i - 1].close)) : 0);
    const atrAvg = atr.reduce((sum, val) => sum + val, 0) / atr.length;

    const basicUpperBand = data.map(d => (d.high + d.low) / 2 + (3 * atrAvg));
    const basicLowerBand = data.map(d => (d.high + d.low) / 2 - (3 * atrAvg));

    const finalUpperBand = basicUpperBand[basicUpperBand.length - 1];
    const finalLowerBand = basicLowerBand[basicLowerBand.length - 1];

    const decision = data[data.length - 1].close > finalUpperBand ? "✅ Buy" : "❌ Sell";

    return { superTrend: finalUpperBand, decision };
}

// PCR (Put-Call Ratio) - Mocked for demonstration
async function calculatePCR(ticker) {
    // PCR data would ideally be fetched from an options API (like NSE or Yahoo options)
    const mockPCR = Math.random() * (1.5 - 0.5) + 0.5; // Random value between 0.5 and 1.5

    const decision = mockPCR < 0.9 ? "✅ Buy (Bullish)" : "❌ Sell (Bearish)";

    return { pcr: mockPCR.toFixed(2), decision };
}

// Main analysis function
async function runAnalysis(ticker, startDate, strategy) {
    if (!ticker || !startDate) {
        console.log('⚠️ Please enter both ticker and start date');
        return;
    }

    try {
        const data = await getStockData(ticker, startDate);
        if (data.length === 0) {
            console.log('⚠️ No data found for the specified ticker and date range');
            return;
        }

        let indicator;
        switch (strategy.toUpperCase()) {
            case 'MACD':
                indicator = calculateMACD(data);
                break;
            case 'ALLIGATOR':
                indicator = calculateAlligator(data);
                break;
            case 'PIVOT':
                indicator = calculatePivotPoints(data);
                break;
            case 'VWAP':
                indicator = calculateVWAP(data);
                break;
            case 'SUPERTREND':
                indicator = calculateSuperTrend(data);
                break;
            case 'PCR':
                indicator = await calculatePCR(ticker);
                break;
            default:
                console.log('⚠️ Invalid strategy selected');
                return;
        }

        console.log(`📊 Investment Decision for ${ticker}: ${indicator.decision}`);
        console.log(indicator);

    } catch (error) {
        console.error('⚠️ Analysis error:', error);
    }
}

// Example Usage
runAnalysis('AAPL', '2024-01-01', 'MACD');
runAnalysis('AAPL', '2024-01-01', 'ALLIGATOR');
runAnalysis('AAPL', '2024-01-01', 'PIVOT');
runAnalysis('AAPL', '2024-01-01', 'VWAP');
runAnalysis('AAPL', '2024-01-01', 'SUPERTREND');
runAnalysis('AAPL', '2024-01-01', 'PCR');
