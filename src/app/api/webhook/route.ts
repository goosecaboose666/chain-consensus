import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body: any = {};

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      body = Object.fromEntries(params.entries());
    }

    console.log('Received Plisio webhook:', body);

    const status = body.status;
    const orderNumber = body.order_number; // This is our auditId

    if (status === 'completed' || status === 'mismatch') {
      console.log(`Payment confirmed for order ${orderNumber}. Unlocking report...`);
      // TODO: Update database state for this auditId to mark as unlocked
    } else {
      console.log(`Payment status for ${orderNumber} is ${status}`);
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
