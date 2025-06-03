"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Link, BarChart3, Download, Play } from "lucide-react"
import { useState } from "react"

const mockShort = {
  title: "React Hooks in 60 Seconds",
  description: "Quick tutorial on React useState and useEffect hooks",
  hashtags: ["#ReactJS", "#WebDev", "#Coding", "#Tutorial", "#Shorts"],
  duration: "0:58",
  subtitles: [
    { time: "0:00", text: "React Hooks make state management easy" },
    { time: "0:15", text: "useState for component state" },
    { time: "0:30", text: "useEffect for side effects" },
    { time: "0:45", text: "Clean and functional components" },
  ],
}

export default function ShortsCreatorPage() {
  const [inputType, setInputType] = useState<"upload" | "url">("upload")
  const [videoUrl, setVideoUrl] = useState("")
  const [shortResult, setShortResult] = useState<typeof mockShort | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCreate = async () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setShortResult(mockShort)
      setIsProcessing(false)
    }, 4000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Shorts Creator</h1>
          <p className="text-gray-300 mt-2">Transform your content into viral YouTube Shorts with AI</p>
        </div>

        {/* Input Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Create YouTube Short</CardTitle>
            <CardDescription className="text-gray-400">
              Upload a video file or provide a YouTube URL to create an optimized Short
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Input Type Selection */}
              <div className="flex gap-4">
                <Button
                  variant={inputType === "upload" ? "default" : "outline"}
                  onClick={() => setInputType("upload")}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
                <Button
                  variant={inputType === "url" ? "default" : "outline"}
                  onClick={() => setInputType("url")}
                  className="flex-1"
                >
                  <Link className="h-4 w-4 mr-2" />
                  YouTube URL
                </Button>
              </div>

              {/* Upload Section */}
              {inputType === "upload" && (
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-white mb-2">Drop your video file here</p>
                  <p className="text-gray-400 mb-4">Supports MP4, MOV, AVI files up to 500MB</p>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    Choose File
                  </Button>
                </div>
              )}

              {/* URL Section */}
              {inputType === "url" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">YouTube Video URL</label>
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="bg-background border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              )}

              <Button
                onClick={handleCreate}
                disabled={isProcessing || (inputType === "url" && !videoUrl.trim())}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {isProcessing ? "Creating Short..." : "Create Short"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processing Status */}
        {isProcessing && (
          <Card className="bg-card border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2 text-white">Processing Your Video</h3>
                <p className="text-gray-400">AI is analyzing your content and creating an optimized Short...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {shortResult && (
          <div className="space-y-6">
            {/* Preview */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Short Preview
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg aspect-[9/16] max-w-xs mx-auto flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                    <p className="text-sm opacity-70">Short Preview</p>
                    <p className="text-xs opacity-50">{shortResult.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Content */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Generated Content</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-generated title, description, and hashtags for your Short
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Title</label>
                    <Input value={shortResult.title} readOnly className="bg-background border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Description</label>
                    <Textarea
                      value={shortResult.description}
                      readOnly
                      className="bg-background border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Hashtags</label>
                    <div className="flex flex-wrap gap-2">
                      {shortResult.hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-white border-primary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auto-Generated Subtitles */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Auto-Generated Subtitles</CardTitle>
                <CardDescription className="text-gray-400">
                  Subtitles automatically added to improve accessibility and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shortResult.subtitles.map((subtitle, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                      <Badge variant="outline" className="text-xs border-gray-700 text-white">
                        {subtitle.time}
                      </Badge>
                      <span className="flex-1 text-white">{subtitle.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips Section */}
        <Card className="bg-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Shorts Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Keep Shorts under 60 seconds for maximum reach</li>
              <li>• Use vertical 9:16 aspect ratio for mobile optimization</li>
              <li>• Add captions and subtitles for better accessibility</li>
              <li>• Include trending hashtags relevant to your content</li>
              <li>• Hook viewers in the first 3 seconds</li>
              <li>• End with a call-to-action to encourage engagement</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
