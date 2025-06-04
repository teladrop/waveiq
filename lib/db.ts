import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// User-specific operations
export async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId }
  });
}

export async function updateUser(userId: string, data: any) {
  return prisma.user.update({
    where: { id: userId },
    data
  });
}

// Admin-specific operations
export async function getAdmin(adminId: string) {
  return prisma.user.findFirst({
    where: { 
      id: adminId,
      role: {
        name: 'ADMIN'
      }
    }
  });
}

// Content-specific operations
export async function getContent(userId: string) {
  return prisma.content.findMany({
    where: { userId }
  });
}

export async function createContent(data: any) {
  return prisma.content.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
}

// Keywords-specific operations
export async function getKeywords(userId: string) {
  return prisma.keyword.findMany({
    where: { userId }
  });
}

export async function createKeyword(data: any) {
  return prisma.keyword.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
}

// Competitors-specific operations
export async function getCompetitors(userId: string) {
  return prisma.competitor.findMany({
    where: { userId }
  });
}

export async function createCompetitor(data: any) {
  return prisma.competitor.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
}

// Shorts-specific operations
export async function getShorts(userId: string) {
  return prisma.short.findMany({
    where: { userId }
  });
}

export async function createShort(data: any) {
  return prisma.short.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
} 