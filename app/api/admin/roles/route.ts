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

    // Parse permissions string to object
    const rolesWithParsedPermissions = roles.map(role => ({
      ...role,
      permissions: JSON.parse(role.permissions),
    }));

    return NextResponse.json(rolesWithParsedPermissions);
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
        permissions: JSON.stringify(permissions),
      },
    });

    // Parse permissions string to object
    return NextResponse.json({ ...role, permissions });
  } catch (error) {
    console.error('Error creating role:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 