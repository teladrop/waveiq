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
      select: { role: true }
    });

    if (adminUser?.role !== 'admin') {
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