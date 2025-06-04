import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const roles = await prisma.role.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, permissions } = body;

    if (!name || !permissions) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const role = await prisma.role.create({
      data: {
        name,
        permissions,
      },
    });

    return NextResponse.json(role);
  } catch (error) {
    console.error('Error creating role:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 