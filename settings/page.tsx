// quantifyfx-frontend/src/app/settings/page.tsx
"use client";

import React, { useState } from "react";
import { Shield, Zap, Crown } from "lucide-react";
import { KHQRModal } from "@/src/components/khqr-modal";

export default function SettingsPage() {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6 font-mono text-white">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">QuantifyFX Subscriptions & KHQR Upgrade</h1>
        <p className="text-xs text-gray-400">Unlock institutional AI signals & automated KHQR upgrades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free */}
        <div className="border border-white/10 rounded-2xl p-6 bg-[#0C1322] space-y-4">
          <Shield className="text-gray-400" size={24} />
          <h3 className="text-base font-bold">Starter Free</h3>
          <div className="text-2xl font-bold">$0 <span className="text-xs font-normal text-gray-400">/mo</span></div>
          <button disabled className="w-full py-2 rounded-xl bg-white/5 text-gray-500 text-xs">Current Plan</button>
        </div>

        {/* Pro */}
        <div className="border-2 border-[#00F5A0] rounded-2xl p-6 bg-[#0C1322] space-y-4 relative shadow-neon-glow">
          <Zap className="text-[#00F5A0]" size={24} />
          <h3 className="text-base font-bold">Pro Trader</h3>
          <div className="text-3xl font-bold text-[#00F5A0]">$49 <span className="text-xs font-normal text-gray-400">/mo</span></div>
          <button
            onClick={() => setSelectedPlan({ name: "Pro Trader", price: 49 })}
            className="w-full py-2.5 rounded-xl bg-[#00F5A0] text-black font-bold text-xs"
          >
            Upgrade via KHQR ($49)
          </button>
        </div>

        {/* VIP */}
        <div className="border border-[#00D4FF]/40 rounded-2xl p-6 bg-[#0C1322] space-y-4">
          <Crown className="text-[#00D4FF]" size={24} />
          <h3 className="text-base font-bold">VIP Institutional</h3>
          <div className="text-3xl font-bold text-[#00D4FF]">$149 <span className="text-xs font-normal text-gray-400">/mo</span></div>
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
          onSuccess={() => {
            setSelectedPlan(null);
            alert("Account upgraded successfully!");
          }}
        />
      )}
    </div>
  );
}