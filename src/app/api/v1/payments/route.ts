// src/app/api/v1/payments/khqr/generate/route.ts
import { NextResponse } from "next/server";
import { generateKHQRTransaction } from "@/lib/khqr";
export async function POST(req: Request) {
  try {
    const { planId, amountUsd, userId } = await req.json();

    if (!planId || !amountUsd) {
      return NextResponse.json({ error: "Invalid payment parameters" }, { status: 400 });
    }

    const transaction = generateKHQRTransaction({
      planId,
      amountUsd,
      userId: userId || "USER-ANONYMOUS"
    });

    return NextResponse.json({
      status: "success",
      transaction
    });
  } catch (error) {
    console.error("KHQR Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate KHQR" }, { status: 500 });
  }
}