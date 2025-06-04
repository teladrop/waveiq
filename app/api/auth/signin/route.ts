import { NextResponse } from 'next/server';
import { signIn, signInWithGoogle } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, provider } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let data;
    if (provider === 'google') {
      data = await signInWithGoogle();
    } else {
      data = await signIn(email, password);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 