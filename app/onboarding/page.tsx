"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    contentType: "",
    hasChannel: false,
    channelUrl: "",
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store onboarding data
    localStorage.setItem("onboarding", JSON.stringify(formData))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-lg bg-card border border-gray-800 hover-lift">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Let's set up your profile</CardTitle>
          <CardDescription className="text-gray-400">Help us personalize your WaveIQ experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contentType" className="text-white">
                What type of content do you create?
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, contentType: value })}>
                <SelectTrigger className="bg-muted border-gray-700 text-white focus:border-primary">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-gray-800">
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="tech">Tech Reviews</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="cooking">Cooking</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hasChannel" className="text-white">
                  Do you already have a YouTube channel?
                </Label>
                <p className="text-sm text-gray-400">This helps us provide better recommendations</p>
              </div>
              <Switch
                id="hasChannel"
                checked={formData.hasChannel}
                onCheckedChange={(checked) => setFormData({ ...formData, hasChannel: checked })}
              />
            </div>

            {formData.hasChannel && (
              <div className="space-y-2">
                <Label htmlFor="channelUrl" className="text-white">
                  Link your YouTube channel
                </Label>
                <Input
                  id="channelUrl"
                  type="url"
                  placeholder="https://youtube.com/@yourchannel"
                  value={formData.channelUrl}
                  onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                  className="bg-muted border-gray-700 text-white focus:border-primary"
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
