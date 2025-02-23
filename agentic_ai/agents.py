from crewai import Agent
from textwrap import dedent
from langchain_community.llms import OpenAI, Ollama
from langchain_openai import ChatOpenAI

# import tools 
from tools.calculator_tools import CalculatorTools
from tools.browser_tools import BrowserTools
from tools.search_tools import SearchTools
from tools.sec_tools_2 import SECTools
#from crewai_tools import WebsiteSearchTool, ScrapeWebsiteTool, TXTSearchTool
from langchain_community.tools import YahooFinanceNewsTool


class StockAnalysisAgents:
    def __init__(self):
        self.OpenAIGPT35 = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)
        self.OpenAIGPT4 = ChatOpenAI(model_name="gpt-4", temperature=0.7)
        #self.Ollama = Ollama(model="llama3.1")

    def financial_analyst(self):
        return Agent(
            role="The Best Financial Analyst",
            backstory=dedent(f"""
                                Provide customers with accurate and detailed financial data and 
                                market trends analysis
                            """),
            goal=dedent(f"""    
                            The most seasoned financial analyst with decades of expertise 
                            in stock market analysis and investment
                            strategies that is working for a high priority and important customer.
                        """),
            tools=[
                #BrowserTools.scrape_and_summarize_website,
                SearchTools.search_internet,
                CalculatorTools.calculate,
                #SECTools.search_10q,
                #SECTools.search_10k
            ],
            allow_delegation=False,
            verbose=True,
            llm=self.OpenAIGPT35,
        )

    def research_analyst(self):
        return Agent(
            role="Staff Research Analyst",
            backstory=dedent(f"""Being the best at gathering, interpreting data and amazing
                                your customer with it"""),
            goal=dedent(f"""Known as the BEST research analyst, you're skilled in sifting through news, company announcements,
                            and market sentiments. Now you're working on a high priority and important customer."""),
            tools=[
                #BrowserTools.scrape_and_summarize_website,
                SearchTools.search_internet,
                SearchTools.search_news,
                #YahooFinanceNewsTool,
                # SECTools.search_10q, # ---------> Uses a lot of API calls and takes a lot of time
                # SECTools.search_10k
                ],
            allow_delegation=False,
            verbose=True,
            llm=self.OpenAIGPT35,
        )
    
    def investment_advicer(self):
        return Agent(
            role="Private Investment Advisor",
            backstory=dedent(f"""You're the most experienced investment advisor with a proven track record of
                                helping customers to make profitable investments"""),
            goal=dedent(f"""Impress your customers with full analyses over stocks
            and complete investment recommendations which help customers to gain 
            profit from investing in stocks. Now you're working on a high priority and important customer."""),
            tools=[
                #BrowserTools.scrape_and_summarize_website,
                #SearchTools.search_internet,
                SearchTools.search_news,
                CalculatorTools.calculate,
                #YahooFinanceNewsTool,
            ],
            allow_delegation=False,
            verbose=True,
            llm=self.OpenAIGPT35,
        )