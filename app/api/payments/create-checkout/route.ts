import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ success: false, message: 'Payment processing not implemented.' }, { status: 501 });
} 