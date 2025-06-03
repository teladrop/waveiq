"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, CreditCard, Shield, Trash2 } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || '{"fullName": "John Doe", "email": "john@example.com"}')
    }
    return { fullName: "John Doe", email: "john@example.com" }
  })

  const handleSaveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user))
    // Show success message
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-300 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-gray-300">
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  className="bg-background border-border text-foreground focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="bg-background border-border text-foreground focus-visible:ring-primary"
                />
              </div>
            </div>
            <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CreditCard className="h-5 w-5" />
              Subscription Plan
            </CardTitle>
            <CardDescription className="text-gray-300">
              Manage your subscription and billing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Pro Plan</h3>
                <p className="text-gray-300">$29/month • Next billing: Jan 15, 2024</p>
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/20">Active</Badge>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 bg-background">
                  <h4 className="font-semibold mb-2 text-white">Current Plan Features</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Unlimited keyword searches</li>
                    <li>• Advanced AI content generation</li>
                    <li>• Competitor analysis</li>
                    <li>• Shorts creator tool</li>
                    <li>• Priority support</li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4 bg-background">
                  <h4 className="font-semibold mb-2 text-white">Usage This Month</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Keywords searched:</span>
                      <span className="text-foreground">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI generations:</span>
                      <span className="text-foreground">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Shorts created:</span>
                      <span className="text-foreground">34</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                  Change Plan
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                  Download Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription className="text-gray-300">Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="bg-background border-border text-foreground focus-visible:ring-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-background border-border text-foreground focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-background border-border text-foreground focus-visible:ring-primary"
                />
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-error/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-gray-300">
              Irreversible actions that will affect your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-error/20 rounded-lg p-4 bg-error/5">
                <h4 className="font-semibold text-red-400 mb-2">Delete Account</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="bg-error hover:bg-error/90 text-error-foreground">
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-foreground">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-border text-foreground hover:bg-muted">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="bg-error hover:bg-error/90 text-error-foreground">
                        Yes, delete account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
