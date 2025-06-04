import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-server';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscription: {
          select: {
            status: true,
            plan: true
          }
        }
      }
    });

    if (!userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 