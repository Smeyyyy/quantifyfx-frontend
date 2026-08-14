// quantifyfx-frontend/src/app/signals/page.tsx
import React from "react";
import { Zap, ShieldCheck } from "lucide-react";

export default function SignalsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-mono text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 text-[#00F5A0]">
            <Zap size={22} /> AI Live Signals Feed
          </h1>
          <p className="text-xs text-gray-400">Institutional ICT & SMC automated trade setups</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0C1322] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">XAUUSD — 15m (INTRADAY)</span>
          <span className="px-2.5 py-1 rounded bg-[#00F5A0]/20 text-[#00F5A0] text-xs font-bold">BUY SIGNAL</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div><span className="text-gray-400 block">Entry Zone:</span> <strong className="text-white">$4,375.50</strong></div>
          <div><span className="text-gray-400 block">Stop Loss:</span> <strong className="text-rose-400">$4,360.50</strong></div>
          <div><span className="text-gray-400 block">Target 1:</span> <strong className="text-[#00F5A0]">$4,395.50</strong></div>
          <div><span className="text-gray-400 block">Confidence:</span> <strong className="text-[#00F5A0]">92%</strong></div>
        </div>
      </div>
    </div>
  );
}