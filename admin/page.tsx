// quantifyfx-frontend/src/app/admin/page.tsx
"use client";

import React, { useState } from "react";
import { 
  Users, 
  DollarSign, 
  Zap, 
  ShieldAlert, 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle,
  Search,
  Cpu
} from "lucide-react";

export default function AdminDashboardPage() {
  const [engineStatus, setEngineStatus] = useState<"RUNNING" | "PAUSED">("RUNNING");
  const [users, setUsers] = useState([
    { id: "U-101", name: "Sokreaksmey Nhim", email: "sokreaksmey@gmail.com", plan: "VIP", status: "ACTIVE", paidVia: "KHQR (ABA)" },
    { id: "U-102", name: "Chan Dara", email: "dara.chan@gmail.com", plan: "PRO", status: "ACTIVE", paidVia: "KHQR (ACLEDA)" },
    { id: "U-103", name: "Vannak Oknha", email: "oknha.vannak@gmail.com", plan: "FREE", status: "ACTIVE", paidVia: "-" },
  ]);

  const toggleEngine = () => {
    setEngineStatus((prev) => (prev === "RUNNING" ? "PAUSED" : "RUNNING"));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="text-cyber-neon" size={24} />
            QuantifyFX Admin Control Center
          </h1>
          <p className="text-xs text-gray-400 mt-1">Platform management, KHQR billing analytics, & AI Engine parameters.</p>
        </div>

        {/* AI Engine Remote Control Button */}
        <button
          onClick={toggleEngine}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
            engineStatus === "RUNNING"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
              : "bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30"
          }`}
        >
          {engineStatus === "RUNNING" ? <Pause size={16} /> : <Play size={16} />}
          <span>AI Engine: {engineStatus}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Total Registered Traders</span>
            <Users size={18} className="text-cyber-cyan" />
          </div>
          <div className="text-2xl font-bold text-white">6,804</div>
          <span className="text-[10px] text-cyber-neon">+124 this week</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Monthly Revenue (MRR)</span>
            <DollarSign size={18} className="text-cyber-neon" />
          </div>
          <div className="text-2xl font-bold text-cyber-neon">$14,250.00</div>
          <span className="text-[10px] text-gray-400">Via KHQR (ABA & ACLEDA)</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Signals Published Today</span>
            <Zap size={18} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">18</div>
          <span className="text-[10px] text-emerald-400">Win Rate: 68.4%</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>News Guard Status</span>
            <ShieldAlert size={18} className="text-rose-400" />
          </div>
          <div className="text-sm font-bold text-amber-400">CPI Report @ 13:30</div>
          <span className="text-[10px] text-gray-400">Signals Auto-Pause Active</span>
        </div>
      </div>

      {/* User & Subscription Management Table */}
      <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Trader Subscription Management</h2>
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search trader by email..."
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyber-neon"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase text-[10px]">
              <tr>
                <th className="p-3">User ID</th>
                <th className="p-3">Trader Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Current Plan</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-mono text-gray-400">{u.id}</td>
                  <td className="p-3 font-bold text-white">{u.name}</td>
                  <td className="p-3 text-gray-400">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.plan === "VIP" ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" :
                      u.plan === "PRO" ? "bg-cyber-neon/20 text-cyber-neon border border-cyber-neon/40" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-gray-300">{u.paidVia}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[10px]">
                      Edit Plan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}