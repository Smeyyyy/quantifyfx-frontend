// quantifyfx-frontend/src/app/page.tsx
import React from "react";
import Link from "next/link";
// import { QuantifyFXLogo } from "@/components/ui/logo";
import { LineChart, Zap, Bot, ArrowRight, ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060A12] text-white font-sans flex flex-col justify-between selection:bg-[#00F5A0] selection:text-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0C1322]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold font-mono text-[#00F5A0]">QuantifyFX</div>
          
          <div className="flex items-center gap-4 font-mono text-xs">
            <Link
              href="/terminal"
              className="px-4 py-2 rounded-xl bg-[#00F5A0] text-black font-bold hover:bg-[#00F5A0]/90 transition-all shadow-lg flex items-center gap-2"
            >
              <span>Open AI Terminal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col items-center text-center justify-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[#00F5A0] font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse" />
          <span>QRA1.0 AI ENGINE ONLINE — XAUUSD, FOREX, CRYPTO</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl font-mono leading-tight">
          Trade Markets with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] to-[#00D4FF]">AI-Powered Precision</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed font-sans">
          Institutional ICT & SMC Confluence Engine, Real-time TradingView Charts, and Automated KHQR Subscriptions — All in One Intelligence Platform.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl pt-6">
          <Link href="/terminal" className="p-6 rounded-2xl bg-[#0C1322] border border-white/10 hover:border-[#00F5A0]/40 transition-all text-left space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[#00F5A0] flex items-center justify-center">
              <LineChart size={20} />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>Live AI Terminal</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#00F5A0]" />
            </h3>
            <p className="text-xs text-gray-400">TradingView real live charts overlaid with Order Blocks & Fair Value Gaps.</p>
          </Link>

          <Link href="/signals" className="p-6 rounded-2xl bg-[#0C1322] border border-white/10 hover:border-[#00D4FF]/40 transition-all text-left space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>ICT Confluence Signals</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#00D4FF]" />
            </h3>
            <p className="text-xs text-gray-400">High win-rate BUY/SELL signals with exact Entry, SL, TP1-3, & Risk/Reward.</p>
          </Link>

          <Link href="/ai-chat" className="p-6 rounded-2xl bg-[#0C1322] border border-white/10 hover:border-purple-500/40 transition-all text-left space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>QRA1.0 AI Assistant</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-purple-400" />
            </h3>
            <p className="text-xs text-gray-400">Context-aware AI mentor for instant market analysis and position size calculations.</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 QuantifyFX Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}