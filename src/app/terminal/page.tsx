// quantifyfx-frontend/src/app/terminal/page.tsx
"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { Crosshair, Clock, TrendingUp, Cpu, Copy } from "lucide-react";

// Self-contained TradingView Chart Component
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

export default function TerminalPage() {
  const [symbol, setSymbol] = useState("OANDA:XAUUSD");
  const [timeframe, setTimeframe] = useState("15");
  const [copied, setCopied] = useState(false);

  const copySignal = () => {
    navigator.clipboard.writeText("XAUUSD BUY @ 4375.50 | SL: 4360.50 | TP1: 4395.50 | Confidence: 92%");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full grid grid-cols-12 gap-4 p-4 bg-[#060A12] text-white font-mono overflow-hidden">
      {/* Left Workspace: TradingView Chart (Col 8) */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-3 h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C1322] border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Watchlist:</span>
            {["OANDA:XAUUSD", "BINANCE:BTCUSDT", "FX:EURUSD", "FX:GBPUSD"].map((s) => (
              <button
                key={s}
                onClick={() => setSymbol(s)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  symbol === s
                    ? "bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/40 font-bold"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {s.split(":")[1]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">TF:</span>
            {["5", "15", "60", "240"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded transition-all ${
                  timeframe === tf
                    ? "bg-[#00D4FF]/20 text-[#00D4FF] font-bold border border-[#00D4FF]/40"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tf === "60" ? "1H" : tf === "240" ? "4H" : `${tf}m`}
              </button>
            ))}
          </div>
        </div>

        {/* Live Chart */}
        <div className="flex-1 min-h-[400px]">
          <TradingViewWidget symbol={symbol} timeframe={timeframe} />
        </div>
      </div>

      {/* Right Workspace: AI Confluence Signal Panel (Col 4) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col border border-white/10 rounded-2xl bg-[#0C1322] overflow-hidden">
        {/* Signal Header */}
        <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/40 font-bold text-xs flex items-center gap-1">
              <TrendingUp size={14} />
              <span>BUY</span>
            </div>
            <div>
              <div className="font-bold text-white text-sm">XAUUSD</div>
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Clock size={10} /> London Kill Zone
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-400 block">Confidence</span>
            <span className="font-bold text-[#00F5A0] text-sm">92%</span>
          </div>
        </div>

        {/* Signal Levels */}
        <div className="p-4 flex-1 space-y-3 text-xs">
          <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex justify-between">
            <span className="text-gray-400 flex items-center gap-1"><Crosshair size={14} /> Entry Zone</span>
            <span className="font-bold text-white">4,375.50</span>
          </div>

          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex justify-between text-rose-400">
            <span>Stop Loss (SL)</span>
            <span className="font-bold">4,360.50</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#00F5A0]/10 border border-[#00F5A0]/30 flex justify-between text-[#00F5A0]">
            <span>Take Profit 1 (TP1)</span>
            <span className="font-bold">4,395.50</span>
          </div>

          <div className="p-3 rounded-lg bg-black/50 border border-white/5 space-y-1 text-[11px]">
            <span className="text-[#00D4FF] font-bold flex items-center gap-1"><Cpu size={12} /> ICT Confluence</span>
            <p className="text-gray-400 font-sans leading-relaxed">
              Asian Low Liquidity Raid @ $4,362.00 into 15m Bullish Order Block. High probability setup.
            </p>
          </div>
        </div>

        {/* Copy Action */}
        <div className="p-3 border-t border-white/10 bg-black/40">
          <button
            onClick={copySignal}
            className="w-full py-2.5 rounded-xl bg-[#00F5A0] text-black font-bold text-xs flex items-center justify-center gap-2"
          >
            <Copy size={14} />
            <span>{copied ? "Copied to Clipboard!" : "Copy Signal Setup"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}