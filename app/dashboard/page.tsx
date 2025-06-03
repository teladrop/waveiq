"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Zap, Target, BarChart3, TrendingUp, Clock, Eye } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trendData = [
  { name: "Jan", keywords: 12 },
  { name: "Feb", keywords: 19 },
  { name: "Mar", keywords: 25 },
  { name: "Apr", keywords: 31 },
  { name: "May", keywords: 28 },
  { name: "Jun", keywords: 35 },
]

const recentActivities = [
  {
    action: "Generated AI title",
    description: "React Hooks Tutorial - Complete Guide",
    time: "2 hours ago",
    type: "ai-generation",
  },
  {
    action: "Found keywords",
    description: "javascript tutorial, react hooks, web development",
    time: "4 hours ago",
    type: "keyword-search",
  },
  {
    action: "Created Short",
    description: "CSS Grid in 60 Seconds",
    time: "1 day ago",
    type: "shorts-creation",
  },
  {
    action: "Analyzed competitor",
    description: "TechGuru Pro channel analysis",
    time: "2 days ago",
    type: "competitor-analysis",
  },
  {
    action: "Optimized upload time",
    description: "Best time: Saturday 8:00 PM",
    time: "3 days ago",
    type: "upload-optimization",
  },
]

const trendingTopics = [
  {
    topic: "AI Development",
    growth: "+245%",
    searches: "1.2M",
    difficulty: "Medium",
  },
  {
    topic: "React 18 Features",
    growth: "+189%",
    searches: "890K",
    difficulty: "Low",
  },
  {
    topic: "Web3 Tutorial",
    growth: "+156%",
    searches: "650K",
    difficulty: "High",
  },
  {
    topic: "CSS Grid Layout",
    growth: "+134%",
    searches: "420K",
    difficulty: "Low",
  },
  {
    topic: "Node.js Best Practices",
    growth: "+98%",
    searches: "380K",
    difficulty: "Medium",
  },
]

export default function DashboardPage() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || '{"fullName": "Creator"}')
      : { fullName: "Creator" }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ai-generation":
        return <Zap className="h-4 w-4 text-primary" />
      case "keyword-search":
        return <Search className="h-4 w-4 text-primary" />
      case "shorts-creation":
        return <BarChart3 className="h-4 w-4 text-primary" />
      case "competitor-analysis":
        return <Target className="h-4 w-4 text-primary" />
      case "upload-optimization":
        return <Clock className="h-4 w-4 text-primary" />
      default:
        return <Eye className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user.fullName.split(" ")[0]}! 👋</h1>
          <p className="text-gray-300 mt-2">Ready to optimize your YouTube content today?</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/keyword-finder" className="group">
            <Card className="bg-card border-gray-800 hover:border-primary/40 transition-all duration-200 hover:shadow-md cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Find Keywords</h3>
                    <p className="text-xs text-gray-400">Discover opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/ai-generator" className="group">
            <Card className="bg-card border-gray-800 hover:border-primary/40 transition-all duration-200 hover:shadow-md cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">AI Generator</h3>
                    <p className="text-xs text-gray-400">Create content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shorts-creator" className="group">
            <Card className="bg-card border-gray-800 hover:border-primary/40 transition-all duration-200 hover:shadow-md cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Create Shorts</h3>
                    <p className="text-xs text-gray-400">Make viral content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/competitor-tracker" className="group">
            <Card className="bg-card border-gray-800 hover:border-primary/40 transition-all duration-200 hover:shadow-md cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Analyze Competitors</h3>
                    <p className="text-xs text-gray-400">Study strategies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Keywords</CardTitle>
              <Search className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,247</div>
              <p className="text-xs text-green-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Titles Saved</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89</div>
              <p className="text-xs text-green-400">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Shorts Created</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">34</div>
              <p className="text-xs text-green-400">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Keyword Trend Chart */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Keyword Research Trend</CardTitle>
            <CardDescription className="text-gray-400">
              Your keyword research activity over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-700" />
                <XAxis dataKey="name" className="text-gray-400" />
                <YAxis className="text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
                <Line type="monotone" dataKey="keywords" stroke="#007BFF" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity and Trending Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Activity */}
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{activity.action}</p>
                      <p className="text-xs text-gray-400 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Topics
              </CardTitle>
              <CardDescription className="text-gray-400">Hot topics in your niche</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">{topic.topic}</h4>
                      <span className="text-xs text-green-400 font-semibold">{topic.growth}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{topic.searches} searches</span>
                      <Badge className={getDifficultyColor(topic.difficulty)} variant="outline">
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
