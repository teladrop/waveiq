import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { role: true }
    });

    if (adminUser?.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { plan, status, endDate } = body;

    if (!plan || !status || !['active', 'cancelled', 'expired'].includes(status)) {
      return new NextResponse('Invalid subscription data', { status: 400 });
    }

    const subscription = await prisma.subscription.update({
      where: { id: params.id },
      data: {
        plan,
        status,
        ...(endDate && { endDate: new Date(endDate) })
      }
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { role: true }
    });

    if (adminUser?.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.subscription.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 