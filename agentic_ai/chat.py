import streamlit as st
import json
import os
from intents_2 import get_response, load_intents  # Import functions from intents.py
from stock_analysis_crew import StockAnalysisCrew  # Import StockAnalysisCrew from main.py
import openai  # Import the OpenAI library

# Set up your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY");

def chatbot_response(stock_symbol, date):
    crew = StockAnalysisCrew(stock_symbol, date)
    return crew.run()

def generate_markdown(raw_output):
    # Use GPT-3.5-turbo to generate a Markdown version of the raw output
    client = openai.OpenAI()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that converts text or json into Markdown format."},
            {"role": "user", "content": f"Convert the following text/json 'raw' part into Markdown format: {raw_output}"}
        ]
    )
    return response.choices[0].message.content

def main():
    st.title("📊 Financial Advisor Chatbot")
    st.sidebar.header("Choose an Option")

    mode = st.sidebar.radio("Select Mode", ["Predefined Questions", "Chat with Advisor"])
    intents_data = load_intents()

    if mode == "Predefined Questions":
        st.subheader("Enter Stock Symbol and Select a Question")
        stock_symbol = st.text_input("Enter Stock Symbol (e.g., AAPL):")
        # Replace the {stock_symbol} placeholder with the user input
        question = st.selectbox("Questions", [
            intent["examples"][0].replace("{stock_symbol}", stock_symbol)
            for intent in intents_data["intents"]
        ])

        if st.button("Get Answer") and stock_symbol:
            response = get_response(question, intents_data)
            st.write("**Answer:**")
            st.markdown(response)

    elif mode == "Chat with Advisor":
        st.subheader("In Which Stock are you interested to invest in?")
        stock_symbol = st.text_input("Enter Stock Symbol (e.g., AAPL):")
        date = st.date_input("Select Date")

        if st.button("Analyze Stock") and stock_symbol:
            with st.spinner("Running analysis..."):
                crew_output = chatbot_response(stock_symbol, date.strftime("%Y-%m-%d"))

            # Extract the "raw" output from the crew output
            # raw_output = None
            # if isinstance(crew_output, dict):
            #     raw_output = crew_output.get("raw", None)
            #     if not raw_output:
            #         raw_output = json.dumps(crew_output, indent=2)
            # elif isinstance(crew_output, str):
            #     raw_output = crew_output
            # else:
            #     raw_output = "No valid final report available."

            # # Generate Markdown version using GPT-3.5-turbo
            # markdown_output = generate_markdown(raw_output)

            st.markdown("## Final Advisor's Report:")
            st.markdown(crew_output)

if __name__ == "__main__":
    main()
