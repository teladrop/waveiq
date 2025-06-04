import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-server';

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
      include: { role: true }
    });

    if (!adminUser?.role || adminUser.role.name !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { name, description, apiKey, enabled } = body;

    const tool = await prisma.tool.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(apiKey !== undefined && { apiKey }),
        ...(enabled !== undefined && { enabled })
      }
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error('Error updating tool:', error);
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
      include: { role: true }
    });

    if (!adminUser?.role || adminUser.role.name !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.tool.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting tool:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 