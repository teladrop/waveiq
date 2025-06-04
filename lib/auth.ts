'use client';

import { prisma } from '@/lib/db';
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
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return await response.json();
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
  try {
    await fetch('/api/auth/signout', { method: 'POST' });
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string, name?: string) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    return await response.json();
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
} 