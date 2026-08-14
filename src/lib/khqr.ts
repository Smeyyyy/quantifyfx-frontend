// quantifyfx-frontend/src/lib/khqr.ts

export interface KHQRGenerationParams {
  planId: "PRO" | "VIP";
  amountUsd: number;
  userId: string;
}

export interface KHQRData {
  transactionRef: string;
  merchantName: string;
  accountUsd: string;
  accountKhr: string;
  amountUsd: number;
  amountKhr: number;
  qrImageUrl: string;
  expiresAt: string;
}

const EXCHANGE_RATE = 4050; // 1 USD = 4,050 KHR

export function generateKHQRTransaction(params: KHQRGenerationParams): KHQRData {
  const transactionRef = `QF-TX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const amountKhr = params.amountUsd * EXCHANGE_RATE;
  
  const qrString = `00020101021230520016bakong@aba000212014471819520459995303840540${params.amountUsd}.005802KH5916SOKREAKSMEY NHIM6010Phnom Penh62200716${transactionRef}6304`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`;

  return {
    transactionRef,
    merchantName: "SOKREAKSMEY NHIM",
    accountUsd: "014 471 819",
    accountKhr: "018 259 755",
    amountUsd: params.amountUsd,
    amountKhr,
    qrImageUrl,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
  };
}