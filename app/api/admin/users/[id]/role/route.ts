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
    const { role } = body;

    if (!role || !['USER', 'ADMIN'].includes(role)) {
      return new NextResponse('Invalid role', { status: 400 });
    }

    const roleRecord = await prisma.role.findUnique({
      where: { name: role }
    });

    if (!roleRecord) {
      return new NextResponse('Role not found', { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { roleId: roleRecord.id }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 