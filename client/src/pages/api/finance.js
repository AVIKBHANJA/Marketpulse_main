import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
  const { symbols } = req.query;

  try {
    const symbolsArray = symbols.split(',');
    const quotes = await Promise.all(
      symbolsArray.map(symbol => yahooFinance.quote(symbol))
    );
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}