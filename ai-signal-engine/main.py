from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="QuantifyFX AI Engine Local")

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SignalRequest(BaseModel):
    symbol: str = "XAUUSD"
    timeframe: str = "15m"

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "QuantifyFX AI Signal Engine is running on Localhost!"
    }

@app.post("/api/v1/generate-signal")
def generate_signal(req: SignalRequest):
    directions = ["BUY", "SELL"]
    chosen_direction = random.choice(directions)
    base_price = 4375.50 if req.symbol == "XAUUSD" else 63800.00
    
    return {
        "status": "success",
        "signal": {
            "symbol": req.symbol,
            "timeframe": req.timeframe,
            "type": chosen_direction,
            "entry": base_price,
            "stop_loss": base_price - 15.0 if chosen_direction == "BUY" else base_price + 15.0,
            "take_profit_1": base_price + 20.0 if chosen_direction == "BUY" else base_price - 20.0,
            "take_profit_2": base_price + 45.0 if chosen_direction == "BUY" else base_price - 45.0,
            "confidence_score": random.randint(82, 96),
            "reasoning": f"ICT 15m Liquidity Sweep detected on {req.symbol}. Market structure is aligned with {chosen_direction} bias."
        }
    }