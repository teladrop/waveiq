"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, ExternalLink, TrendingUp, Calendar, Eye } from "lucide-react"
import { useState } from "react"

const mockAnalysis = {
  channelName: "TechGuru Pro",
  subscribers: "2.4M",
  totalViews: "145M",
  avgViews: "85K",
  uploadFrequency: "3 videos/week",
  topVideos: [
    {
      title: "React 18 New Features You Need to Know",
      views: "245K",
      uploadDate: "2 days ago",
      tags: ["react", "javascript", "web development", "tutorial"],
      duration: "12:34",
    },
    {
      title: "Building a Full Stack App in 2024",
      views: "189K",
      uploadDate: "5 days ago",
      tags: ["fullstack", "nodejs", "react", "mongodb"],
      duration: "18:45",
    },
    {
      title: "CSS Grid vs Flexbox - Complete Guide",
      views: "156K",
      uploadDate: "1 week ago",
      tags: ["css", "web design", "frontend", "layout"],
      duration: "15:22",
    },
  ],
  commonTags: [
    "javascript",
    "react",
    "web development",
    "tutorial",
    "coding",
    "programming",
    "frontend",
    "backend",
    "fullstack",
    "nodejs",
  ],
  postingPattern: {
    bestDays: ["Tuesday", "Thursday", "Saturday"],
    bestTimes: ["2:00 PM", "6:00 PM", "8:00 PM"],
  },
}

export default function CompetitorTrackerPage() {
  const [channelUrl, setChannelUrl] = useState("")
  const [analysis, setAnalysis] = useState<typeof mockAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!channelUrl.trim()) return

    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Competitor Tracker</h1>
          <p className="text-gray-300 mt-2">Analyze competitor channels to discover winning strategies</p>
        </div>

        {/* Input Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Analyze Competitor Channel</CardTitle>
            <CardDescription className="text-gray-400">
              Enter a YouTube channel URL to analyze their content strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://youtube.com/@channelname or channel URL"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="flex-1 bg-background border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !channelUrl.trim()}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Target className="h-4 w-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Channel Overview */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Channel Overview: {analysis.channelName}
                  <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Channel
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{analysis.subscribers}</div>
                    <div className="text-sm text-gray-400">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{analysis.totalViews}</div>
                    <div className="text-sm text-gray-400">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{analysis.avgViews}</div>
                    <div className="text-sm text-gray-400">Avg Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{analysis.uploadFrequency}</div>
                    <div className="text-sm text-gray-400">Upload Frequency</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Videos */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Videos</CardTitle>
                <CardDescription className="text-gray-400">Recent videos with highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.topVideos.map((video, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 text-white">{video.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span className="text-white">{video.views}</span> views
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {video.uploadDate}
                            </div>
                            <span>
                              Duration: <span className="text-white">{video.duration}</span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {video.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs bg-primary/10 text-white border-primary/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Tags */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Most Used Tags</CardTitle>
                <CardDescription className="text-gray-400">Tags frequently used by this channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.commonTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-800 border-gray-700 text-white"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posting Pattern */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Posting Pattern Analysis</CardTitle>
                <CardDescription className="text-gray-400">When this channel typically uploads content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Best Upload Days</h4>
                    <div className="space-y-2">
                      {analysis.postingPattern.bestDays.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                          <span className="text-white">{day}</span>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Best Upload Times</h4>
                    <div className="space-y-2">
                      {analysis.postingPattern.bestTimes.map((time, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                          <span className="text-white">{time}</span>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Analysis Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Look for patterns in their most successful videos</li>
              <li>• Analyze their thumbnail styles and title formats</li>
              <li>• Study their posting schedule to find optimal timing</li>
              <li>• Identify content gaps you can fill in their niche</li>
              <li>• Monitor their engagement rates and audience response</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
