import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch total users
    const totalUsers = await prisma.user.count();

    // Fetch total courses
    const totalCourses = await prisma.course.count();

    // TODO: Implement subscription and tools stats
    const activeSubscriptions = 0;
    const totalTools = 0;

    return NextResponse.json({
      totalUsers,
      activeSubscriptions,
      totalCourses,
      totalTools,
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 