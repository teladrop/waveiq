import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

interface RouteParams {
  params: {
    roleId: string;
  };
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { roleId } = params;
    const body = await request.json();
    const { permissions } = body;

    if (!permissions) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const role = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        permissions,
      },
    });

    return NextResponse.json(role);
  } catch (error) {
    console.error('Error updating role:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { roleId } = params;

    await prisma.role.delete({
      where: {
        id: roleId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting role:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 