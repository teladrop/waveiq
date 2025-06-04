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

    const tools = await prisma.tool.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
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
    const { name, description, apiKey } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        description,
        apiKey,
        enabled: true
      }
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error('Error creating tool:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 