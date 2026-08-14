# quantifyfx/ai-signal-engine/telegram_bot.py
# Required: pip install requests
try:
    import requests # type: ignore
except ImportError:
    raise ImportError("requests module is required. Install with: pip install requests")

# Your QuantifyFX Telegram Bot Token
TELEGRAM_BOT_TOKEN = "8880084672:AAGLjs8kBt1ddsrtsBAwHK8CB43OiGxJg_4"

def send_telegram_signal(chat_id: str, signal_data: dict):
    """
    Broadcasts ICT/SMC Signal directly to Telegram Chat, Group or Channel
    """
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    
    direction_emoji = "🟢 BUY" if signal_data.get("type") == "BUY" else "🔴 SELL"
    
    message = (
        f"🚀 *QUANTIFYFX AI SIGNAL ALERT*\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n"
        f"📊 *Symbol:* `{signal_data.get('symbol')}` ({signal_data.get('timeframe')})\n"
        f"🎯 *Direction:* {direction_emoji}\n"
        f"🔥 *Confidence Score:* *{signal_data.get('confidence_score')}%*\n\n"
        f"📍 *Entry Zone:* `${signal_data.get('entry')}`\n"
        f"🛑 *Stop Loss:* `${signal_data.get('stop_loss')}`\n"
        f"🎯 *Target 1 (TP1):* `${signal_data.get('take_profit_1')}`\n"
        f"🎯 *Target 2 (TP2):* `${signal_data.get('take_profit_2')}`\n\n"
        f"🧠 *ICT Confluence Reasoning:*\n_{signal_data.get('reasoning')}_\n\n"
        f"⚡ *Open Terminal:* [QuantifyFX Web App](https://quantifyfx-frontend-pdh3.vercel.app/terminal)"
    )
    
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "Markdown",
        "disable_web_page_preview": True
    }
    
    try:
        response = requests.post(url, json=payload)
        return response.json()
    except Exception as e:
        print(f"Telegram Notification Error: {e}")
        return None