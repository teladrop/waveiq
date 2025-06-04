'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getAdmin } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/admin/login');
        return;
      }

      const admin = await getAdmin(user.uid);
      if (!admin) {
        toast.error('Unauthorized access');
        router.push('/admin/login');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-card border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="space-y-1 px-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin')}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/users')}
            >
              Users
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/subscriptions')}
            >
              Subscriptions
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/courses')}
            >
              Courses
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/tools')}
            >
              Tools
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/roles')}
            >
              Roles
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 