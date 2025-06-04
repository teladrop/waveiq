import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-server';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { role: true }
    });

    if (!adminUser?.role || adminUser.role.name !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const users = await prisma.user.findMany({
      include: {
        role: true,
        subscription: {
          select: {
            status: true,
            plan: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 