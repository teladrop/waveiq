"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Zap, Copy, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function AIGeneratorPage() {
  const [keyword, setKeyword] = useState("")
  const [tone, setTone] = useState("")
  const [results, setResults] = useState<{
    titles: string[]
    description: string
    tags: string[]
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!keyword.trim() || !tone) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setResults({
        titles: [
          `${keyword} - Complete Guide for Beginners`,
          `Master ${keyword} in 10 Minutes (${tone} Tutorial)`,
          `${keyword} Tips That Will Change Your Life`,
          `Why Everyone is Talking About ${keyword}`,
          `${keyword} Secrets the Pros Don't Want You to Know`,
        ],
        description: `In this comprehensive video, we'll dive deep into ${keyword} and show you everything you need to know. Whether you're a complete beginner or looking to improve your skills, this ${tone.toLowerCase()} guide will help you master ${keyword} step by step. We'll cover the fundamentals, advanced techniques, and common mistakes to avoid. By the end of this video, you'll have the confidence to apply ${keyword} in your own projects.

🔥 What you'll learn:
• The basics of ${keyword}
• Advanced ${keyword} techniques
• Real-world examples and use cases
• Common pitfalls and how to avoid them

Don't forget to like, subscribe, and hit the notification bell for more ${keyword} content!`,
        tags: [
          keyword.toLowerCase(),
          `${keyword} tutorial`,
          `${keyword} guide`,
          `${keyword} tips`,
          "beginner friendly",
          "step by step",
          "2024",
          tone.toLowerCase(),
        ],
      })
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Content Generator</h1>
          <p className="text-gray-300 mt-2">Generate compelling titles, descriptions, and tags using AI</p>
        </div>

        {/* Input Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Generate Content</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your target keyword and select a tone to generate optimized content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-white">Target Keyword</label>
                <Input
                  placeholder="Enter your main keyword (e.g., 'React Tutorial')"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="bg-background border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">Content Tone</label>
                <Select onValueChange={setTone}>
                  <SelectTrigger className="bg-background border-gray-700 text-white">
                    <SelectValue placeholder="Select content tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-gray-700">
                    <SelectItem value="Professional" className="text-white">
                      Professional
                    </SelectItem>
                    <SelectItem value="Casual" className="text-white">
                      Casual
                    </SelectItem>
                    <SelectItem value="Energetic" className="text-white">
                      Energetic
                    </SelectItem>
                    <SelectItem value="Educational" className="text-white">
                      Educational
                    </SelectItem>
                    <SelectItem value="Entertaining" className="text-white">
                      Entertaining
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !keyword.trim() || !tone}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Content"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Titles */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Generated Titles
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleGenerate}
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </CardTitle>
                <CardDescription className="text-gray-400">Click to copy any title to your clipboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.titles.map((title, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                      onClick={() => copyToClipboard(title)}
                    >
                      <span className="flex-1 text-white">{title}</span>
                      <Copy className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Generated Description
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(results.description)}
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={results.description}
                  readOnly
                  className="min-h-[200px] resize-none bg-background border-gray-700 text-white"
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Generated Tags
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(results.tags.join(", "))}
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 bg-primary/10 text-white border-primary/20"
                      onClick={() => copyToClipboard(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Use numbers and power words in titles for higher CTR</li>
              <li>• Keep titles under 60 characters for better visibility</li>
              <li>• Include your main keyword in the first 125 characters of description</li>
              <li>• Use 10-15 relevant tags, mixing broad and specific terms</li>
              <li>• Add timestamps and chapters in descriptions for better engagement</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
