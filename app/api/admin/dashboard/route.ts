import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    });

    if (user?.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get total courses
    const totalCourses = await prisma.course.count();

    // Get total subscriptions
    const totalSubscriptions = await prisma.subscription.count({
      where: { status: 'active' }
    });

    // Get total tools
    const totalTools = await prisma.tool.count();

    return NextResponse.json({
      totalUsers,
      totalCourses,
      totalSubscriptions,
      totalTools
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 