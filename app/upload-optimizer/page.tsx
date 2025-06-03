"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, Users, Calendar } from "lucide-react"

const heatmapData = [
  { day: "Monday", hours: [2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7] },
  { day: "Tuesday", hours: [3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8] },
  { day: "Wednesday", hours: [2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7] },
  { day: "Thursday", hours: [4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9] },
  { day: "Friday", hours: [3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8] },
  { day: "Saturday", hours: [5, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7, 6, 5, 6, 7, 8, 9, 10, 11, 12, 11, 10] },
  { day: "Sunday", hours: [4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9] },
]

const recommendations = [
  {
    time: "Saturday 8:00 PM",
    score: 95,
    reason: "Peak audience activity",
    type: "optimal",
  },
  {
    time: "Thursday 6:00 PM",
    score: 92,
    reason: "High engagement window",
    type: "optimal",
  },
  {
    time: "Sunday 7:00 PM",
    score: 89,
    reason: "Weekend prime time",
    type: "good",
  },
  {
    time: "Tuesday 2:00 PM",
    score: 85,
    reason: "Lunch break traffic",
    type: "good",
  },
]

export default function UploadOptimizerPage() {
  const getHeatmapColor = (value: number) => {
    if (value >= 10) return "bg-red-500"
    if (value >= 8) return "bg-orange-500"
    if (value >= 6) return "bg-yellow-500"
    if (value >= 4) return "bg-green-500"
    return "bg-blue-500"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500/20 text-green-400 border-green-500/30"
    if (score >= 80) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    return "bg-red-500/20 text-red-400 border-red-500/30"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Upload Time Optimizer</h1>
          <p className="text-gray-300 mt-2">Find the perfect time to upload based on your audience activity</p>
        </div>

        {/* Current Recommendations */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Best Upload Times This Week
            </CardTitle>
            <CardDescription className="text-gray-400">
              Optimized recommendations based on your audience behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-white">{rec.time}</h3>
                    <Badge className={getScoreColor(rec.score)}>{rec.score}% Score</Badge>
                  </div>
                  <p className="text-gray-400 text-sm">{rec.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audience Activity Heatmap */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-primary" />
              Audience Activity Heatmap
            </CardTitle>
            <CardDescription className="text-gray-400">
              When your audience is most active throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Time labels */}
              <div className="flex">
                <div className="w-20"></div>
                <div className="flex-1 grid grid-cols-24 gap-1 text-xs text-gray-500">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="text-center">
                      {i === 0 ? "12AM" : i === 12 ? "12PM" : i > 12 ? `${i - 12}PM` : `${i}AM`}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap */}
              {heatmapData.map((dayData, dayIndex) => (
                <div key={dayIndex} className="flex items-center">
                  <div className="w-20 text-sm font-medium text-white">{dayData.day}</div>
                  <div className="flex-1 grid grid-cols-24 gap-1">
                    {dayData.hours.map((value, hourIndex) => (
                      <div
                        key={hourIndex}
                        className={`h-6 rounded ${getHeatmapColor(value)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                        title={`${dayData.day} ${hourIndex}:00 - Activity: ${value}/10`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400">
                <span>Low Activity</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                </div>
                <span>High Activity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audience Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Users className="h-5 w-5 text-primary" />
                Peak Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">Saturday</div>
              <p className="text-sm text-gray-400">Your audience is most active on weekends</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Clock className="h-5 w-5 text-primary" />
                Peak Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">8:00 PM</div>
              <p className="text-sm text-gray-400">Evening hours show highest engagement</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Calendar className="h-5 w-5 text-primary" />
                Optimal Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">3x/week</div>
              <p className="text-sm text-gray-400">Recommended upload frequency for your niche</p>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Upload Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Schedule uploads 1-2 hours before peak activity times</li>
              <li>• Consistency is key - stick to a regular upload schedule</li>
              <li>• Consider your global audience when choosing upload times</li>
              <li>• Test different times and monitor performance metrics</li>
              <li>• Weekend uploads often perform better for entertainment content</li>
              <li>• Weekday evenings work well for educational content</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
