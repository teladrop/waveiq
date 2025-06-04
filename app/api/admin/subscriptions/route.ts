import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-server';

interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: string;
  startDate: Date;
  endDate: Date;
  user: {
    email: string;
  };
}

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

    const subscriptions = await prisma.subscription.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    const formattedSubscriptions = subscriptions.map((sub: Subscription) => ({
      id: sub.id,
      userId: sub.userId,
      userEmail: sub.user.email,
      plan: sub.plan,
      status: sub.status,
      startDate: sub.startDate,
      endDate: sub.endDate
    }));

    return NextResponse.json(formattedSubscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();
    const { userId, plan, status, startDate, endDate } = body;

    if (!userId || !plan || !status || !startDate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : new Date(startDate + 30 * 24 * 60 * 60 * 1000) // Default to 30 days if not provided
      }
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 