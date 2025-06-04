'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface Role {
  id: string;
  name: string;
  permissions: {
    manage_users: boolean;
    manage_courses: boolean;
    manage_tools: boolean;
    manage_roles: boolean;
    view_analytics: boolean;
  };
  createdAt: string;
}

export default function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: {
      manage_users: false,
      manage_courses: false,
      manage_tools: false,
      manage_roles: false,
      view_analytics: false,
    },
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });

      if (!response.ok) throw new Error('Failed to add role');

      await fetchRoles();
      setIsAddingRole(false);
      setNewRole({
        name: '',
        permissions: {
          manage_users: false,
          manage_courses: false,
          manage_tools: false,
          manage_roles: false,
          view_analytics: false,
        },
      });
      toast.success('Role added successfully');
    } catch (error) {
      console.error('Error adding role:', error);
      toast.error('Failed to add role');
    }
  };

  const handleUpdatePermissions = async (roleId: string, permissions: Role['permissions']) => {
    try {
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissions }),
      });

      if (!response.ok) throw new Error('Failed to update role permissions');

      setRoles(roles.map(role =>
        role.id === roleId ? { ...role, permissions } : role
      ));
      toast.success('Role permissions updated successfully');
    } catch (error) {
      console.error('Error updating role permissions:', error);
      toast.error('Failed to update role permissions');
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete role');

      setRoles(roles.filter(role => role.id !== roleId));
      toast.success('Role deleted successfully');
    } catch (error) {
      console.error('Error deleting role:', error);
      toast.error('Failed to delete role');
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold mb-2">Roles Management</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Button onClick={() => setIsAddingRole(true)}>
          Add New Role
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isAddingRole && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Role</h2>
          <form onSubmit={handleAddRole} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="Role name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Permissions</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="manage_users"
                    checked={newRole.permissions.manage_users}
                    onCheckedChange={(checked) =>
                      setNewRole({
                        ...newRole,
                        permissions: {
                          ...newRole.permissions,
                          manage_users: checked as boolean,
                        },
                      })
                    }
                  />
                  <label htmlFor="manage_users">Manage Users</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="manage_courses"
                    checked={newRole.permissions.manage_courses}
                    onCheckedChange={(checked) =>
                      setNewRole({
                        ...newRole,
                        permissions: {
                          ...newRole.permissions,
                          manage_courses: checked as boolean,
                        },
                      })
                    }
                  />
                  <label htmlFor="manage_courses">Manage Courses</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="manage_tools"
                    checked={newRole.permissions.manage_tools}
                    onCheckedChange={(checked) =>
                      setNewRole({
                        ...newRole,
                        permissions: {
                          ...newRole.permissions,
                          manage_tools: checked as boolean,
                        },
                      })
                    }
                  />
                  <label htmlFor="manage_tools">Manage Tools</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="manage_roles"
                    checked={newRole.permissions.manage_roles}
                    onCheckedChange={(checked) =>
                      setNewRole({
                        ...newRole,
                        permissions: {
                          ...newRole.permissions,
                          manage_roles: checked as boolean,
                        },
                      })
                    }
                  />
                  <label htmlFor="manage_roles">Manage Roles</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="view_analytics"
                    checked={newRole.permissions.view_analytics}
                    onCheckedChange={(checked) =>
                      setNewRole({
                        ...newRole,
                        permissions: {
                          ...newRole.permissions,
                          view_analytics: checked as boolean,
                        },
                      })
                    }
                  />
                  <label htmlFor="view_analytics">View Analytics</label>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Role</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingRole(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(role.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteRole(role.id)}
              >
                Delete
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`manage_users_${role.id}`}
                  checked={role.permissions.manage_users}
                  onCheckedChange={(checked) =>
                    handleUpdatePermissions(role.id, {
                      ...role.permissions,
                      manage_users: checked as boolean,
                    })
                  }
                />
                <label htmlFor={`manage_users_${role.id}`}>Manage Users</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`manage_courses_${role.id}`}
                  checked={role.permissions.manage_courses}
                  onCheckedChange={(checked) =>
                    handleUpdatePermissions(role.id, {
                      ...role.permissions,
                      manage_courses: checked as boolean,
                    })
                  }
                />
                <label htmlFor={`manage_courses_${role.id}`}>Manage Courses</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`manage_tools_${role.id}`}
                  checked={role.permissions.manage_tools}
                  onCheckedChange={(checked) =>
                    handleUpdatePermissions(role.id, {
                      ...role.permissions,
                      manage_tools: checked as boolean,
                    })
                  }
                />
                <label htmlFor={`manage_tools_${role.id}`}>Manage Tools</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`manage_roles_${role.id}`}
                  checked={role.permissions.manage_roles}
                  onCheckedChange={(checked) =>
                    handleUpdatePermissions(role.id, {
                      ...role.permissions,
                      manage_roles: checked as boolean,
                    })
                  }
                />
                <label htmlFor={`manage_roles_${role.id}`}>Manage Roles</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`view_analytics_${role.id}`}
                  checked={role.permissions.view_analytics}
                  onCheckedChange={(checked) =>
                    handleUpdatePermissions(role.id, {
                      ...role.permissions,
                      view_analytics: checked as boolean,
                    })
                  }
                />
                <label htmlFor={`view_analytics_${role.id}`}>View Analytics</label>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 