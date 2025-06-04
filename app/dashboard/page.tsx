"use client"

import { useEffect, useState } from 'react';
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Zap, Target, BarChart3, TrendingUp, Clock, Eye, Video, Users, Upload } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, TrendingTopic, UserStats, getRecentActivities, getTrendingTopics, getUserStats, formatNumber, formatTimeAgo } from '@/lib/data-service';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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
  const { user, loading: authLoading } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          router.push('/login');
          return;
        }

        const [activitiesData, topicsData, statsData] = await Promise.all([
          getRecentActivities(user.id),
          getTrendingTopics(),
          getUserStats(user.id)
        ]);

        setActivities(activitiesData);
        setTrendingTopics(topicsData);
        setUserStats(statsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'ai-generation':
        return <Video className="h-4 w-4" />;
      case 'keyword-search':
        return <Search className="h-4 w-4" />;
      case 'shorts-creation':
        return <Video className="h-4 w-4" />;
      case 'competitor-analysis':
        return <Users className="h-4 w-4" />;
      case 'upload-optimization':
        return <Upload className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: TrendingTopic['difficulty']) => {
    switch (difficulty) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {userStats?.fullName ? userStats.fullName.split(" ")[0] : 'Creator'}! 👋
          </h1>
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
              <div className="text-2xl font-bold text-white">{formatNumber(userStats?.totalKeywords || 0)}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(userStats?.totalVideos || 0)}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(userStats?.totalViews || 0)}</div>
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
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="p-2 bg-muted rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
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
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{topic.topic}</p>
                      <p className="text-sm text-muted-foreground">{topic.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-500">+{topic.growth}%</p>
                      <p className={`text-sm ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </p>
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
