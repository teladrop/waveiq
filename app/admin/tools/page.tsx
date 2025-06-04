'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Tool {
  id: string;
  name: string;
  description: string;
  api_key: string;
  is_active: boolean;
  created_at: string;
}

export default function ToolsManagement() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [newTool, setNewTool] = useState({
    name: '',
    description: '',
    api_key: '',
    is_active: true,
  });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const toolsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tool[];

      setTools(toolsData);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const toolsRef = collection(db, 'tools');
      await addDoc(toolsRef, {
        ...newTool,
        created_at: new Date().toISOString()
      });

      await fetchTools();
      setIsAddingTool(false);
      setNewTool({
        name: '',
        description: '',
        api_key: '',
        is_active: true,
      });
      toast.success('Tool added successfully');
    } catch (error) {
      console.error('Error adding tool:', error);
      toast.error('Failed to add tool');
    }
  };

  const handleToggleTool = async (toolId: string, isActive: boolean) => {
    try {
      const toolRef = doc(db, 'tools', toolId);
      await updateDoc(toolRef, { is_active: !isActive });

      setTools(tools.map(tool =>
        tool.id === toolId ? { ...tool, is_active: !isActive } : tool
      ));
      toast.success('Tool status updated successfully');
    } catch (error) {
      console.error('Error updating tool status:', error);
      toast.error('Failed to update tool status');
    }
  };

  const handleDeleteTool = async (toolId: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const toolRef = doc(db, 'tools', toolId);
      await deleteDoc(toolRef);

      setTools(tools.filter(tool => tool.id !== toolId));
      toast.success('Tool deleted successfully');
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast.error('Failed to delete tool');
    }
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold mb-2">Tools Management</h1>
          <p className="text-muted-foreground">Manage your integrated tools and APIs</p>
        </div>
        <Button onClick={() => setIsAddingTool(true)}>
          Add New Tool
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isAddingTool && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Tool</h2>
          <form onSubmit={handleAddTool} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={newTool.name}
                onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                placeholder="Tool name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={newTool.description}
                onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                placeholder="Tool description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <Input
                value={newTool.api_key}
                onChange={(e) => setNewTool({ ...newTool, api_key: e.target.value })}
                placeholder="API key"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={newTool.is_active}
                onCheckedChange={(checked) => setNewTool({ ...newTool, is_active: checked })}
              />
              <label className="text-sm font-medium">Active</label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Tool</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingTool(false)}
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
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">API Key</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Created</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool) => (
                <tr key={tool.id} className="border-b">
                  <td className="p-4">{tool.name}</td>
                  <td className="p-4">{tool.description}</td>
                  <td className="p-4">
                    <code className="bg-muted px-2 py-1 rounded">
                      {tool.api_key.slice(0, 8)}...
                    </code>
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={tool.is_active}
                      onCheckedChange={() => handleToggleTool(tool.id, tool.is_active)}
                    />
                  </td>
                  <td className="p-4">
                    {new Date(tool.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTool(tool.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 