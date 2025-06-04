'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date: string;
  created_at: string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
}

export default function SubscriptionsManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddingSubscription, setIsAddingSubscription] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    user_id: '',
    plan: '',
    status: 'active' as const,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch subscriptions
      const subscriptionsRef = collection(db, 'subscriptions');
      const q = query(subscriptionsRef, orderBy('created_at', 'desc'));
      const subscriptionsSnapshot = await getDocs(q);
      
      const subscriptionsData = subscriptionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscription[];

      // Fetch users
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];

      setSubscriptions(subscriptionsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      await addDoc(subscriptionsRef, {
        ...newSubscription,
        created_at: new Date().toISOString()
      });

      await fetchData();
      setIsAddingSubscription(false);
      setNewSubscription({
        user_id: '',
        plan: '',
        status: 'active',
        start_date: '',
        end_date: '',
      });
      toast.success('Subscription added successfully');
    } catch (error) {
      console.error('Error adding subscription:', error);
      toast.error('Failed to add subscription');
    }
  };

  const handleUpdateStatus = async (subscriptionId: string, newStatus: Subscription['status']) => {
    try {
      const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
      await updateDoc(subscriptionRef, { status: newStatus });

      setSubscriptions(subscriptions.map(sub =>
        sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
      ));
      toast.success('Subscription status updated successfully');
    } catch (error) {
      console.error('Error updating subscription status:', error);
      toast.error('Failed to update subscription status');
    }
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;

    try {
      const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
      await deleteDoc(subscriptionRef);

      setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
      toast.success('Subscription deleted successfully');
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast.error('Failed to delete subscription');
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const user = users.find(u => u.id === sub.user_id);
    const matchesSearch = user?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Subscriptions Management</h1>
          <p className="text-muted-foreground">Manage user subscriptions and plans</p>
        </div>
        <Button onClick={() => setIsAddingSubscription(true)}>
          Add New Subscription
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={selectedStatus}
          onValueChange={setSelectedStatus}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isAddingSubscription && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Subscription</h2>
          <form onSubmit={handleAddSubscription} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">User</label>
              <Select
                value={newSubscription.user_id}
                onValueChange={(value) => setNewSubscription({ ...newSubscription, user_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plan</label>
              <Select
                value={newSubscription.plan}
                onValueChange={(value) => setNewSubscription({ ...newSubscription, plan: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <Input
                type="date"
                value={newSubscription.start_date}
                onChange={(e) => setNewSubscription({ ...newSubscription, start_date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <Input
                type="date"
                value={newSubscription.end_date}
                onChange={(e) => setNewSubscription({ ...newSubscription, end_date: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Subscription</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingSubscription(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Plan</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Start Date</th>
                <th className="text-left p-4">End Date</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => {
                const user = users.find(u => u.id === subscription.user_id);
                return (
                  <tr key={subscription.id} className="border-b">
                    <td className="p-4">
                      {user ? `${user.full_name} (${user.email})` : 'Unknown User'}
                    </td>
                    <td className="p-4">{subscription.plan}</td>
                    <td className="p-4">
                      <Select
                        value={subscription.status}
                        onValueChange={(value) => handleUpdateStatus(subscription.id, value as Subscription['status'])}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">
                      {new Date(subscription.start_date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {new Date(subscription.end_date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteSubscription(subscription.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 