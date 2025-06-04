import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // TODO: Implement webhook handling
    console.log('Webhook received but not implemented');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
} 