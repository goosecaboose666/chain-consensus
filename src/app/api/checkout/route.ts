import { NextResponse } from 'next/server';
import { createPlisioInvoice } from '@/lib/plisio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { auditId, amount = "199", currency = "ETH" } = body;

    if (!auditId) {
      return NextResponse.json({ error: "Missing auditId" }, { status: 400 });
    }

    const host = request.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const invoiceParams = {
      order_name: `Comprehensive Audit Report - ${auditId}`,
      order_number: auditId,
      source_amount: amount,
      source_currency: 'USD',
      currency: currency,
      cancel_url: `${baseUrl}/results/${auditId}`,
      callback_url: `${baseUrl}/api/webhook`,
      success_url: `${baseUrl}/results/${auditId}?payment=success`,
    };

    const invoiceData = await createPlisioInvoice(invoiceParams);

    return NextResponse.json({ success: true, invoice: invoiceData });
  } catch (error: any) {
    console.error('Plisio checkout error:', error);
    return NextResponse.json({ error: error.message || "Failed to create invoice" }, { status: 500 });
  }
}
