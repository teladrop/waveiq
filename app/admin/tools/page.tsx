'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Tool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  apiKey?: string;
}

export default function AdminToolsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/admin/tools');
        if (!response.ok) throw new Error('Failed to fetch tools');
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
        toast.error('Failed to load tools');
      } finally {
        setLoadingTools(false);
      }
    };

    if (user) {
      fetchTools();
    }
  }, [user]);

  const handleToggleTool = async (toolId: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/admin/tools/${toolId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });

      if (!response.ok) throw new Error('Failed to update tool');

      setTools(tools.map(tool => 
        tool.id === toolId ? { ...tool, enabled } : tool
      ));

      toast.success('Tool updated successfully');
    } catch (error) {
      console.error('Error updating tool:', error);
      toast.error('Failed to update tool');
    }
  };

  const handleUpdateApiKey = async (toolId: string, apiKey: string) => {
    try {
      const response = await fetch(`/api/admin/tools/${toolId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) throw new Error('Failed to update API key');

      setTools(tools.map(tool => 
        tool.id === toolId ? { ...tool, apiKey } : tool
      ));

      toast.success('API key updated successfully');
    } catch (error) {
      console.error('Error updating API key:', error);
      toast.error('Failed to update API key');
    }
  };

  if (loading || loadingTools) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Tools</h1>
      <div className="grid gap-6">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{tool.name}</span>
                <Switch
                  checked={tool.enabled}
                  onCheckedChange={(checked) => handleToggleTool(tool.id, checked)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              {tool.apiKey !== undefined && (
                <div className="space-y-2">
                  <Label htmlFor={`api-key-${tool.id}`}>API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`api-key-${tool.id}`}
                      type="password"
                      value={tool.apiKey}
                      onChange={(e) => handleUpdateApiKey(tool.id, e.target.value)}
                      placeholder="Enter API key"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateApiKey(tool.id, '')}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 