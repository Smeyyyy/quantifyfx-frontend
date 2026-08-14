// quantifyfx-frontend/src/components/payment/khqr-modal.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { KHQRData } from "@/lib/khqr";
import { X, CheckCircle2, Clock, ShieldCheck, Loader2, CreditCard } from "lucide-react";

interface KHQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amountUsd: number;
  onSuccess: () => void;
}

export const KHQRModal: React.FC<KHQRModalProps> = ({
  isOpen,
  onClose,
  planName,
  amountUsd,
  onSuccess
}) => {
  const [selectedBank, setSelectedBank] = useState<"ABA" | "ACLEDA">("ABA");
  const [qrData, setQrData] = useState<KHQRData | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isOpen) return;

    const generateQR = async () => {
      setLoading(true);
      setIsPaid(false);
      setTimeLeft(300);

      try {
        const res = await fetch("/api/v1/payments/khqr/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId: planName.toUpperCase(), amountUsd })
        });
        const data = await res.json();
        setQrData(data.transaction);
      } catch (err) {
        console.error("Failed to generate KHQR:", err);
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, [isOpen, planName, amountUsd]);

  const handlePaymentSuccess = useCallback(() => {
    setIsPaid(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  }, [onSuccess]);

  // Poll status
  useEffect(() => {
    if (!isOpen || !qrData || isPaid) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/payments/verify?ref=${qrData.transactionRef}`);
        const data = await res.json();
        if (data.status === "SUCCESS") {
          clearInterval(interval);
          handlePaymentSuccess();
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, qrData, isPaid, handlePaymentSuccess]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0 || isPaid) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isOpen, timeLeft, isPaid]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const simulateTestPayment = async () => {
    if (!qrData) return;
    await fetch("/api/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tran_id: qrData.transactionRef, status: "SUCCESS" })
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-sans">
      <div className="relative w-full max-w-md bg-[#0C1322] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header Bar */}
        <div className="p-4 bg-gradient-to-r from-[#E61937] to-[#990000] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-extrabold text-sm tracking-wider">KHQR PAYMENT</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">ABA & ACLEDA</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Bank Selection Tabs */}
        <div className="grid grid-cols-2 p-2 bg-black/40 border-b border-white/10 font-mono text-xs gap-2">
          <button
            onClick={() => setSelectedBank("ABA")}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedBank === "ABA"
                ? "bg-[#003366] text-white border border-cyan-400/40 shadow-lg"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <CreditCard size={14} />
            <span>ABA Bank</span>
          </button>
          <button
            onClick={() => setSelectedBank("ACLEDA")}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedBank === "ACLEDA"
                ? "bg-[#EAA11A] text-black border border-amber-300 shadow-lg"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <CreditCard size={14} />
            <span>ACLEDA Bank</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          {isPaid ? (
            <div className="py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-white font-mono">Payment Successful!</h3>
              <p className="text-xs text-gray-400">
                Upgraded to <span className="text-emerald-400 font-bold">{planName}</span>!
              </p>
            </div>
          ) : loading ? (
            <div className="py-12 flex flex-col items-center space-y-3">
              <Loader2 size={32} className="text-emerald-400 animate-spin" />
              <span className="text-xs font-mono text-gray-400">Generating KHQR Code...</span>
            </div>
          ) : (
            <>
              <div>
                <span className="text-[11px] text-gray-400 font-mono block">Merchant Account Name</span>
                <span className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  {selectedBank === "ABA" ? "SOKREAKSMEY NHIM" : "NHIM SOKREAKSMEY"}
                </span>
              </div>

              {/* Amount Display */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 w-full flex items-center justify-between font-mono">
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 block">Plan: {planName} ({selectedBank})</span>
                  <span className="text-lg font-bold text-emerald-400">${amountUsd}.00 USD</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">KHR Approx</span>
                  <span className="text-xs font-bold text-white">
                    ៛{(amountUsd * 4050).toLocaleString()} KHR
                  </span>
                </div>
              </div>

              {/* KHQR Card Box */}
              <div className="relative p-3 bg-white rounded-xl border-2 border-red-600 shadow-xl w-full max-w-[220px]">
                <div className="bg-[#E61937] text-white font-bold text-[10px] py-0.5 px-3 rounded-t-sm mb-2 tracking-widest font-mono flex items-center justify-between">
                  <span>KHQR</span>
                  <span>{selectedBank}</span>
                </div>
                {qrData?.qrImageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={qrData.qrImageUrl}
                    alt={`${selectedBank} KHQR`}
                    className="w-44 h-48 object-contain mx-auto"
                  />
                )}
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Clock size={14} className="text-cyan-400" />
                <span>Expires in: <strong className="text-white">{formatTime(timeLeft)}</strong></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-2" />
                <span className="text-[10px] text-emerald-400">Auto Checking...</span>
              </div>

              <button
                onClick={simulateTestPayment}
                className="text-[10px] text-cyan-400 underline hover:text-cyan-300 font-mono"
              >
                [Dev Test: Click to Simulate Scan for {selectedBank}]
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-mono">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>Encrypted Gateway via Bakong Network (ABA & ACLEDA)</span>
        </div>
      </div>
    </div>
  );
};