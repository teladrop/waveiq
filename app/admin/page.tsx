'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalCourses: number;
  totalTools: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalCourses: 0,
    totalTools: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch total users
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const totalUsers = usersSnapshot.size;

      // Fetch active subscriptions (users with non-free plans)
      const activeSubscriptionsSnapshot = await getDocs(
        query(usersRef, where('plan', '!=', 'free'))
      );
      const activeSubscriptions = activeSubscriptionsSnapshot.size;

      // Fetch total courses
      const coursesRef = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesRef);
      const totalCourses = coursesSnapshot.size;

      // Fetch total tools
      const toolsRef = collection(db, 'tools');
      const toolsSnapshot = await getDocs(toolsRef);
      const totalTools = toolsSnapshot.size;

      setStats({
        totalUsers,
        activeSubscriptions,
        totalCourses,
        totalTools,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch dashboard stats');
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Subscriptions</h3>
          <p className="text-3xl font-bold mt-2">{stats.activeSubscriptions}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Courses</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalCourses}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Tools</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalTools}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Add New User
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Create Course
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage Tools
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Reports
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {/* Add your recent activity list here */}
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </Card>
      </div>
    </div>
  );
} 