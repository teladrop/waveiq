"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useState } from "react"

const mockKeywords = [
  {
    keyword: "react tutorial 2024",
    volume: 45000,
    competition: "Medium",
    trend: "up",
    nicheScore: 85,
  },
  {
    keyword: "javascript for beginners",
    volume: 67000,
    competition: "High",
    trend: "up",
    nicheScore: 72,
  },
  {
    keyword: "web development tips",
    volume: 23000,
    competition: "Low",
    trend: "stable",
    nicheScore: 91,
  },
  {
    keyword: "css grid layout",
    volume: 18000,
    competition: "Medium",
    trend: "down",
    nicheScore: 78,
  },
  {
    keyword: "node.js best practices",
    volume: 12000,
    competition: "Low",
    trend: "up",
    nicheScore: 88,
  },
]

export default function KeywordFinderPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<typeof mockKeywords>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setResults(mockKeywords)
      setIsSearching(false)
    }, 1500)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
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

  const getNicheScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Keyword Finder</h1>
          <p className="text-gray-300 mt-2">Discover high-volume, low-competition keywords for your YouTube content</p>
        </div>

        {/* Search Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Search Keywords</CardTitle>
            <CardDescription className="text-gray-400">
              Enter a topic or seed keyword to find related opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter keyword or topic (e.g., 'react tutorial')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-background border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Keyword Results</CardTitle>
              <CardDescription className="text-gray-400">Found {results.length} keyword opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((keyword, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white">{keyword.keyword}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-300">
                            Volume: <span className="text-white">{keyword.volume.toLocaleString()}/month</span>
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-300">Trend:</span>
                            {getTrendIcon(keyword.trend)}
                          </div>
                          <span className="text-gray-300">
                            Niche Score:{" "}
                            <span className={`font-semibold ${getNicheScoreColor(keyword.nicheScore)}`}>
                              {keyword.nicheScore}/100
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getCompetitionColor(keyword.competition)}>
                          {keyword.competition} Competition
                        </Badge>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Look for keywords with high niche scores and low competition</li>
              <li>• Focus on long-tail keywords (3+ words) for better targeting</li>
              <li>• Check trending keywords to capitalize on current interests</li>
              <li>• Use seasonal keywords to plan content in advance</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
