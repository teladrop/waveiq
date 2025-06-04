import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/auth/user');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [session]);

  return {
    user,
    loading: loading || status === 'loading',
  };
}

export async function signIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // TODO: Implement proper password hashing and verification
    // For now, we'll just return the user
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    // TODO: Implement Google OAuth
    throw new Error('Google sign-in not implemented');
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function signOut() {
  // NextAuth handles sign out
  return;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function adminSignIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid admin credentials');
    }

    // TODO: Implement proper admin role check
    return user;
  } catch (error) {
    console.error('Error signing in as admin:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string, name?: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        // TODO: Implement proper password hashing
        // For now, we'll just store the password as is
        // In production, you should hash the password before storing
      }
    });

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
} 