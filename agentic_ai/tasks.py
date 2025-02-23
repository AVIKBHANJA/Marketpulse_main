# To know more about the Task class, visit: https://docs.crewai.com/concepts/tasks
from crewai import Task
from textwrap import dedent


class StockAnalysisTasks:
    def __tip_section(self):
        return "If you do your BEST WORK, I'll give you a $10,000 commission!"

    def Financial_analysis(self, agent, company, date):
        return Task(
            description=dedent(
                f"""
                **Task**: Conducting a thorough analysis of {company}'s stock financial health and market performance.
                **Description**: Conduct a thorough analysis of {company}'s stock financial health and market performance. 
                                This includes examining key financial metrics such as
                                P/E ratio, EPS growth, last 10 year revenue trends, and debt-to-equity ratio, Liquidity and Solvency at {date} date. 
                                Also, analyze the stock's performance in comparison 
                                to its industry peers and overall market trends.

                **Parameters**
                - Company: {company}
                - Date: {date}

                **Note**: {self.__tip_section()}    

                """
            ),
            expected_output="""The final report must expand on the summary provided but now 
    including a clear assessment of the stock's financial standing, its strengths and weaknesses, 
    and how it fares against its competitors in the current market scenario.
    Make sure to use the most recent data possible.""",
            agent=agent,
        )

    def Research(self, agent, company, date):
        return Task(
            description=dedent(
                f"""
                **Task**: Conducting a thorough research on the stock market.
                **Description**: Collect and summarize recent news articles, press
    releases, and market analyses related to the {company} stock and its industry.
    Pay special attention to any significant events, market sentiments, and analysts' opinions. 
    Also include upcoming events like earnings and others.

                **Parameters**
                - Company: {company}
                - Date: {date}

                **Note**: {self.__tip_section()}
        """
            ),
            expected_output="""A report that includes a comprehensive summary of the latest news, 
    any notable shifts in market sentiment, and potential impacts on the stock. Also make sure to return the stock ticker as {company_stock}.
    Make sure to use the most recent data as possible with today's date {date}.""",
            agent=agent,
        )
    
    def Fillings_analysis(self, agent, company, date):
        return Task(
            description=dedent(
                f"""
                **Task**: Analyzing the latest 10-Q and 10-K filings from EDGAR for {company}.
                **Description**: Analyze the latest 10-Q and 10-K filings from EDGAR for the stock {company} upto {date}. 
    Focus on key sections like Management's Discussion and analysis, financial statements, insider trading activity, 
    and any disclosed risks. Extract relevant data and insights that could influence
    the stock's future performance.

                **Parameters**
                - Company: {company}
                - Date: {date}

                **Note**: {self.__tip_section()}    
        """
            ),
            expected_output="""Final answer must be an expanded report that now also highlights significant findings
    from these filings including any red flags or positive indicators for your customer.""",
            agent=agent,
        )
    
    def Recommendation(self, agent, company):
        return Task(
            description=dedent(
                f"""
                **Task**: Providing a comprehensive investment recommendation.
                **Description**: Review and synthesize the analyses provided by the
    Financial Analyst and the Research Analyst on compnay {company}.
    Combine these insights to form a comprehensive
    investment recommendation. You MUST Consider all aspects including financial
    health, market sentiment, and qualitative data from
    EDGAR filings such as P/E ratio, EPS share, Major Competitors, Revenue Trends and a few Latest News on {company}. 

    
    Make sure to include a section that shows insider 
    trading activity, and upcoming events like earnings.

    As a final statement, provide an opinion on the review and suggest if 
    one should invest stocks in {company}. Format it as MARKDOWN. 

                **Parameters**
                - Company: {company}
                - [parameter 2]: [Description]
                ... [Add more parameter]

                **Note**: [Optional section for incentives and encouragement for high quality work]

        """
            ),
            expected_output="""Your final answer MUST be a recommendation for your customer on {company}. It should be a full super detailed report, providing a 
    clear investment stance and strategy with supporting evidence.
    Make it pretty and well formatted for your customer.""",
            agent=agent,
        )