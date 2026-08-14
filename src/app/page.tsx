// quantifyfx-frontend/src/app/page.tsx
"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { QuantifyFXLogo } from "@/components/ui/logo";
import { KHQRModal } from "@/components/payment/khqr-modal";
import { 
  LineChart, 
  Zap, 
  Bot, 
  Settings, 
  TrendingUp, 
  Send, 
  Home
} from "lucide-react";

// 1. TradingView Widget Component
const TradingViewWidget = memo(({ symbol = "OANDA:XAUUSD", timeframe = "15" }: { symbol: string; timeframe: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: timeframe,
      timezone: "Asia/Phnom_Penh",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "#060A12",
      gridColor: "rgba(255, 255, 255, 0.03)",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: true,
      calendar: false,
      hide_volume: false
    });

    containerRef.current.appendChild(script);
  }, [symbol, timeframe]);

  return (
    <div className="w-full h-full border border-white/10 rounded-2xl overflow-hidden bg-[#0C1322]">
      <div id="tradingview_container" ref={containerRef} className="w-full h-full" />
    </div>
  );
});

TradingViewWidget.displayName = "TradingViewWidget";

export default function QuantifyFXUnifiedApp() {
  const [activeTab, setActiveTab] = useState<"home" | "terminal" | "signals" | "chat" | "settings">("home");
  const [symbol, setSymbol] = useState("OANDA:XAUUSD");
  const [timeframe, setTimeframe] = useState("15");
  const [copied, setCopied] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hello Trader! I am **QRA1.0**, your QuantifyFX AI Mentor. Ask me about ICT setups, lot size, or market trend."
    }
  ]);
  const [input, setInput] = useState("");

  const handleSendChat = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `### 📊 QRA1.0 AI Analysis\nCurrent 15m structure indicates high-probability ICT Liquidity Sweep on XAUUSD. Risk-Reward 1:3.5.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-white font-mono flex flex-col justify-between selection:bg-[#00F5A0] selection:text-black">
      {/* Top Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0C1322]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div onClick={() => setActiveTab("home")} className="cursor-pointer">
            <QuantifyFXLogo variant="full" size={32} />
          </div>

          {/* Navigation Controls Menu */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "home" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <Home size={14} /> <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "terminal" ? "bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/40 font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <LineChart size={14} /> <span>Terminal</span>
            </button>
            <button
              onClick={() => setActiveTab("signals")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "signals" ? "bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40 font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <Zap size={14} /> <span>Signals</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "chat" ? "bg-purple-500/20 text-purple-400 border border-purple-500/40 font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <Bot size={14} /> <span>AI Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "settings" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <Settings size={14} /> <span className="hidden sm:inline">Upgrade</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Workspace Body Based on Active Tab */}
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="py-12 flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[#00F5A0] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse" />
              <span>QRA1.0 AI ENGINE ONLINE — XAUUSD, FOREX, CRYPTO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
              Trade Markets with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] to-[#00D4FF]">AI-Powered Precision</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl font-sans">
              Institutional ICT & SMC Confluence Engine, Real-time TradingView Charts, and Automated KHQR Subscriptions.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setActiveTab("terminal")}
                className="px-6 py-3 rounded-xl bg-[#00F5A0] text-black font-bold text-xs hover:bg-[#00F5A0]/90 transition-all shadow-lg"
              >
                Launch AI Terminal Now 🚀
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all border border-white/10"
              >
                Upgrade KHQR Plan
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TERMINAL */}
        {activeTab === "terminal" && (
          <div className="h-[calc(100vh-110px)] grid grid-cols-12 gap-4 overflow-hidden">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C1322] border border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Watchlist:</span>
                  {["OANDA:XAUUSD", "BINANCE:BTCUSDT", "FX:EURUSD", "FX:GBPUSD"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSymbol(s)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        symbol === s ? "bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/40 font-bold" : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {s.split(":")[1]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-h-[400px]">
                <TradingViewWidget symbol={symbol} timeframe={timeframe} />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col border border-white/10 rounded-2xl bg-[#0C1322] overflow-hidden p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="px-3 py-1 rounded-lg bg-[#00F5A0]/20 text-[#00F5A0] font-bold text-xs flex items-center gap-1">
                  <TrendingUp size={14} /> BUY XAUUSD
                </span>
                <span className="text-xs text-[#00F5A0] font-bold">92% Confidence</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-black/40 rounded-lg flex justify-between">
                  <span className="text-gray-400">Entry Zone</span>
                  <span className="font-bold">4,375.50</span>
                </div>
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg flex justify-between text-rose-400">
                  <span>Stop Loss (SL)</span>
                  <span className="font-bold">4,360.50</span>
                </div>
                <div className="p-2.5 bg-[#00F5A0]/10 border border-[#00F5A0]/30 rounded-lg flex justify-between text-[#00F5A0]">
                  <span>Take Profit 1 (TP1)</span>
                  <span className="font-bold">4,395.50</span>
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("XAUUSD BUY @ 4375.50 | SL: 4360.50 | TP1: 4395.50");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl bg-[#00F5A0] text-black font-bold text-xs"
              >
                {copied ? "Copied!" : "Copy Signal Setup"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SIGNALS */}
        {activeTab === "signals" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#00D4FF] flex items-center gap-2">
              <Zap size={20} /> Live AI Signals Feed
            </h2>
            <div className="p-6 rounded-2xl bg-[#0C1322] border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">XAUUSD — 15m (INTRADAY)</span>
                <span className="px-2 py-0.5 bg-[#00F5A0]/20 text-[#00F5A0] font-bold rounded">BUY</span>
              </div>
              <p className="text-xs text-gray-400">Asian Low Liquidity Raid @ $4,362.00 into 15m Bullish Order Block.</p>
            </div>
          </div>
        )}

        {/* TAB 4: CHAT */}
        {activeTab === "chat" && (
          <div className="h-[calc(100vh-130px)] flex flex-col border border-white/10 rounded-2xl bg-[#0C1322] overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-black/40 font-bold text-sm flex items-center gap-2">
              <Bot className="text-[#00D4FF]" size={20} /> QRA1.0 AI Assistant
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {messages.map((m) => (
                <div key={m.id} className={`p-3 rounded-xl max-w-[80%] ${m.role === "user" ? "ml-auto bg-[#00F5A0]/10 text-white" : "bg-black/40 text-gray-200"}`}>
                  {m.content}
                </div>
              ))}
            </div>
            <div className="p-3 bg-black/30 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask QRA1.0 anything..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
              <button onClick={handleSendChat} className="px-4 py-2 bg-[#00F5A0] text-black font-bold text-xs rounded-xl">
                Send
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-center">QuantifyFX KHQR Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl bg-[#0C1322] border-2 border-[#00F5A0] space-y-4 text-center">
                <h3 className="font-bold text-base">Pro Trader Plan</h3>
                <div className="text-3xl font-bold text-[#00F5A0]">$49 <span className="text-xs text-gray-400">/mo</span></div>
                <button
                  onClick={() => setSelectedPlan({ name: "Pro Trader", price: 49 })}
                  className="w-full py-2.5 rounded-xl bg-[#00F5A0] text-black font-bold text-xs"
                >
                  Upgrade via KHQR ($49)
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#0C1322] border border-[#00D4FF]/40 space-y-4 text-center">
                <h3 className="font-bold text-base">VIP Institutional</h3>
                <div className="text-3xl font-bold text-[#00D4FF]">$149 <span className="text-xs text-gray-400">/mo</span></div>
                <button
                  onClick={() => setSelectedPlan({ name: "VIP Institutional", price: 149 })}
                  className="w-full py-2.5 rounded-xl bg-[#00D4FF] text-black font-bold text-xs"
                >
                  Upgrade via KHQR ($149)
                </button>
              </div>
            </div>

            {selectedPlan && (
              <KHQRModal
                isOpen={!!selectedPlan}
                onClose={() => setSelectedPlan(null)}
                planName={selectedPlan.name}
                amountUsd={selectedPlan.price}
                onSuccess={() => { setSelectedPlan(null); alert("Account upgraded!"); }}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
