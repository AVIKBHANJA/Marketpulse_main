import yfinance as yf
import json
import re
from rapidfuzz import fuzz, process

def load_intents(file_path="intents.json"):
    with open(file_path, "r") as file:
        return json.load(file)

def extract_stock_symbol(user_input):
    match = re.search(r'\b[A-Z]{1,5}\b', user_input)  # Matches stock symbols (1-5 uppercase letters)
    if match:
        return match.group(0)
    else:
        print("No valid stock symbol found in the input.")
        return None

def find_best_match(user_input, intents, threshold=88, fallback_threshold=65):
    all_examples = []
    intent_map = {}

    # Normalize user input
    user_input = user_input.strip().lower()

    for intent in intents["intents"]:
        for example in intent["examples"]:
            example_lower = example.lower()  # Normalize case
            all_examples.append(example_lower)
            intent_map[example_lower] = intent  # Map example to its intent

    # Use WRatio for best match
    match = process.extractOne(user_input, all_examples, scorer=fuzz.WRatio)

    if match:
        best_match, score = match[:2]  # Extract best match and score

        if score >= threshold:
            return intent_map[best_match]  # Strong match

        elif score >= fallback_threshold:
            return intent_map[best_match]  # Return fallback match

    # Use token_sort_ratio as a backup
    best_alternative = process.extractOne(user_input, all_examples, scorer=fuzz.token_sort_ratio)
    if best_alternative:
        best_match, score = best_alternative[:2]
        print(f"Best alternative match ({score}%) for: {best_match}")
        return intent_map[best_match]

    return None  # No match found

def get_stock_trend(symbol):
    stock = yf.Ticker(symbol)
    hist = stock.history(period="10d")
    sma = hist['Close'].mean()
    return f"The 10-day average closing price for {symbol} is ${sma:.2f}."

def get_earnings_report(symbol):
    stock = yf.Ticker(symbol)
    earnings = stock.earnings
    if not earnings.empty:
        latest_eps = earnings.iloc[0]
        return f"{symbol}'s last reported EPS: {latest_eps}"
    return "Earnings report not found."

def get_stock_price(symbol):
    stock = yf.Ticker(symbol)
    todays_data = stock.history(period='1d')
    if not todays_data.empty:
        price = todays_data['Close'][0]
        return f"The current price of {symbol} is ${price:.2f}"
    return f"Stock price not found for {symbol}"

def get_stock_news(symbol):
    stock = yf.Ticker(symbol)
    news = stock.news
    if news:
        latest_headline = news[0]['title']
        return f"Latest headline: {latest_headline}"
    return "No recent news found."

def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    info = stock.info
    stock_data = {
        "Symbol": symbol,
        "Price": get_stock_price(symbol),
        "P/E Ratio": info.get("trailingPE", "N/A"),
        "Market Cap": info.get("marketCap", "N/A"),
        "Volume": info.get("volume", "N/A"),
        "Dividend Yield": info.get("dividendYield", "N/A"),
        "52 Week High": info.get("fiftyTwoWeekHigh", "N/A"),
        "52 Week Low": info.get("fiftyTwoWeekLow", "N/A"),
        "EPS": info.get("trailingEps", "N/A"),
        "Sector": info.get("sector", "N/A"),
        "Industry": info.get("industry", "N/A")
    }

    formatted_data = "\n".join([f"{key}: {value}" for key, value in stock_data.items()])
    return formatted_data

def get_response(user_input, intents):
    best_intent = find_best_match(user_input, intents)

    if best_intent:
        stock_symbol = extract_stock_symbol(user_input)  # Extract stock symbol

        if best_intent["intent"] == "check_stock_price" and stock_symbol:
            return get_stock_price(stock_symbol)

        elif best_intent["intent"] == "get_stock_news" and stock_symbol:
            return get_stock_news(stock_symbol)

        elif best_intent["intent"] == "analyze_stock_trend" and stock_symbol:
            return get_stock_trend(stock_symbol)

        elif best_intent["intent"] == "get_earnings_report" and stock_symbol:
            return get_earnings_report(stock_symbol)

        elif best_intent["intent"] == "get_stock_data" and stock_symbol:
            return get_stock_data(stock_symbol)

    return "I'm not sure how to answer that."
