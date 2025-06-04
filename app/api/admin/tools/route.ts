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

    const tools = await prisma.tool.findMany({
      orderBy: { name: 'asc' }
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
      select: { role: true }
    });

    if (adminUser?.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { name, description, apiKey, enabled } = body;

    if (!name || !description) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        description,
        apiKey,
        enabled: enabled ?? true
      }
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error('Error creating tool:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 