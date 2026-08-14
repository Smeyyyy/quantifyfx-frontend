// quantifyfx-frontend/src/components/terminal/indicator-overlay-panel.tsx
"use client";

import React, { useState } from "react";
import { Sliders, Sun, Globe, Zap, AlertTriangle, Eye, EyeOff } from "lucide-react";

export const IndicatorOverlayPanel = () => {
  const [indicators, setIndicators] = useState({
    ema20: true,
    ema50: true,
    ema200: true,
    asianRange: true,
    londonKillZone: true,
    newYorkKillZone: true,
    orderBlockOverlay: true,
    fvgOverlay: true,
  });

  const toggle = (key: keyof typeof indicators) => {
    setIndicators((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-3 border border-white/10 rounded-xl glass-panel font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-cyber-neon font-bold">
          <Sliders size={14} />
          <span>Chart Overlays & ICT Indicators</span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">Live Overlays</span>
      </div>

      {/* 1. Technical Moving Averages */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Exponential Moving Averages</span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => toggle("ema20")}
            className={`p-1.5 rounded border text-center transition-all flex items-center justify-between ${
              indicators.ema20 ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-black/30 text-gray-500 border-white/5"
            }`}
          >
            <span>EMA 20</span>
            {indicators.ema20 ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button
            onClick={() => toggle("ema50")}
            className={`p-1.5 rounded border text-center transition-all flex items-center justify-between ${
              indicators.ema50 ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" : "bg-black/30 text-gray-500 border-white/5"
            }`}
          >
            <span>EMA 50</span>
            {indicators.ema50 ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button
            onClick={() => toggle("ema200")}
            className={`p-1.5 rounded border text-center transition-all flex items-center justify-between ${
              indicators.ema200 ? "bg-purple-500/20 text-purple-400 border-purple-500/40" : "bg-black/30 text-gray-500 border-white/5"
            }`}
          >
            <span>EMA 200</span>
            {indicators.ema200 ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
        </div>
      </div>

      {/* 2. Session Kill Zones */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">ICT Session Kill Zones</span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => toggle("asianRange")}
            className={`p-1.5 rounded border text-[10px] transition-all flex items-center justify-between ${
              indicators.asianRange ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : "bg-black/30 text-gray-500 border-white/5"
            }`}
          >
            <div className="flex items-center gap-1">
              <Sun size={10} /> <span>Asian Range</span>
            </div>
          </button>
          <button
            onClick={() => toggle("londonKillZone")}
            className={`p-1.5 rounded border text-[10px] transition-all flex items-center justify-between ${
              indicators.londonKillZone ? "bg-cyber-neon/20 text-cyber-neon border-cyber-neon/40" : "bg-black/30 text-gray-500 border-white/5"
            }`}
          >
            <div className="flex items-center gap-1">
              <Globe size={10} /> <span>London KZ</span>
            </div>
          </button>
          <button
            onClick={() => toggle("newYorkKillZone")}
            className={`p-1.5 rounded border text-[10px] transition-all flex items-center justify-between ${
              indicators.newYorkKillZone ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-black/30 text-gray-500 border-white/5"
            }`}
          >
            <div className="flex items-center gap-1">
              <Zap size={10} /> <span>New York KZ</span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. High Impact News Status Badge */}
      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={14} />
          <span>High-Impact News Guard</span>
        </div>
        <span className="text-[10px] font-bold uppercase bg-amber-500/20 px-1.5 py-0.5 rounded">ACTIVE</span>
      </div>
    </div>
  );
};