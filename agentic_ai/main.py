from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Optional
from intents_2 import get_response, load_intents
from stock_analysis_crew import StockAnalysisCrew
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load intents
intents = load_intents()

class StockQuery(BaseModel):
    company: str
    date: Optional[str] = None
    user_query: Optional[str] = None

@app.get("/", response_class=HTMLResponse)
async def root():
    html_content = """
    <html>
        <head>
            <title>Stock Analysis API</title>
        </head>
        <body>
            <h1>Welcome to the Stock Analysis API</h1>
            <p>Use the following endpoints to interact with the API:</p>
            <ul>
                <li><strong>/advisor</strong>: Provides a comprehensive stock analysis using StockAnalysisCrew.</li>
                <li><strong>/basic</strong>: Provides basic stock information using intents.py.</li>
            </ul>
            <h2>Example Requests</h2>
            <p><strong>POST /advisor</strong></p>
            <pre>
{
    "company": "AAPL",
    "date": "2023-10-01"
}
            </pre>
            <p><strong>POST /basic</strong></p>
            <pre>
{
    "user_query": "What is the stock price of AAPL?"
}
            </pre>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)

@app.post("/advisor")
async def advisor_endpoint(query: StockQuery):
    try:
        crew = StockAnalysisCrew(query.company, query.date)
        result = crew.run()
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/basic")
async def basic_endpoint(query: StockQuery):
    try:
        if not query.user_query:
            raise HTTPException(status_code=400, detail="User query is required for basic endpoint.")
        response = get_response(query.user_query, intents)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
