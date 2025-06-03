"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  ImageIcon,
  Wand2,
  Download,
  Save,
  Upload,
  Palette,
  Type,
  Layers,
  Sparkles,
  Copy,
  Trash2,
  Eye,
  RefreshCw,
} from "lucide-react"

const thumbnailTemplates = [
  {
    id: 1,
    name: "Tech Review",
    category: "Technology",
    style: "Modern",
    thumbnail: "/placeholder.svg?height=180&width=320",
    description: "Perfect for tech reviews and tutorials",
  },
  {
    id: 2,
    name: "Gaming Highlight",
    category: "Gaming",
    style: "Dynamic",
    thumbnail: "/placeholder.svg?height=180&width=320",
    description: "High-energy gaming content thumbnails",
  },
  {
    id: 3,
    name: "Educational",
    category: "Education",
    style: "Clean",
    thumbnail: "/placeholder.svg?height=180&width=320",
    description: "Professional educational content",
  },
  {
    id: 4,
    name: "Lifestyle Vlog",
    category: "Lifestyle",
    style: "Bright",
    thumbnail: "/placeholder.svg?height=180&width=320",
    description: "Vibrant lifestyle and vlog thumbnails",
  },
  {
    id: 5,
    name: "Business",
    category: "Business",
    style: "Professional",
    thumbnail: "/placeholder.svg?height=180&width=320",
    description: "Corporate and business content",
  },
  {
    id: 6,
    name: "Entertainment",
    category: "Entertainment",
    style: "Bold",
    thumbnail: "/placeholder.svg?height=180&width=320",
    description: "Eye-catching entertainment thumbnails",
  },
]

const generatedThumbnails = [
  {
    id: 1,
    prompt: "React tutorial with code examples",
    style: "Modern Tech",
    thumbnail: "/placeholder.svg?height=180&width=320",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    prompt: "Gaming setup review 2024",
    style: "Gaming Dynamic",
    thumbnail: "/placeholder.svg?height=180&width=320",
    createdAt: "1 day ago",
  },
  {
    id: 3,
    prompt: "Productivity tips for developers",
    style: "Clean Professional",
    thumbnail: "/placeholder.svg?height=180&width=320",
    createdAt: "3 days ago",
  },
]

const aiStyles = [
  "Photorealistic",
  "Cartoon/Animated",
  "Minimalist",
  "Retro/Vintage",
  "Futuristic",
  "Hand-drawn",
  "3D Rendered",
  "Watercolor",
  "Pop Art",
  "Cyberpunk",
]

export default function ThumbnailGeneratorPage() {
  const [activeTab, setActiveTab] = useState("generate")
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [textOverlay, setTextOverlay] = useState("")
  const [fontSize, setFontSize] = useState([48])
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [backgroundColor, setBackgroundColor] = useState("#000000")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would add the new thumbnail to the generated list
    }, 3000)
  }

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId)
    const template = thumbnailTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedStyle(template.style)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Thumbnail Generator</h1>
          <p className="text-gray-300 mt-2">Create eye-catching YouTube thumbnails with AI in seconds</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Generated</CardTitle>
              <ImageIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">127</div>
              <p className="text-xs text-gray-400">Total thumbnails</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Downloads</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89</div>
              <p className="text-xs text-gray-400">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Templates Used</CardTitle>
              <Layers className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-400">Different styles</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg CTR Boost</CardTitle>
              <Sparkles className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+34%</div>
              <p className="text-xs text-gray-400">Click-through rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="generate" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="generate">AI Generator</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="library">My Library</TabsTrigger>
          </TabsList>

          {/* AI Generator Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <Card className="bg-card border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Wand2 className="h-5 w-5 text-primary" />
                    AI Thumbnail Generator
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Describe your video content and let AI create the perfect thumbnail
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-white">Video Description</Label>
                    <Textarea
                      placeholder="Describe your video content (e.g., 'React tutorial showing hooks with code examples, modern tech style')"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px] bg-background border-gray-700 text-white resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">AI Style</Label>
                    <Select onValueChange={setSelectedStyle}>
                      <SelectTrigger className="bg-background border-gray-700 text-white">
                        <SelectValue placeholder="Choose AI generation style" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-gray-700">
                        {aiStyles.map((style) => (
                          <SelectItem key={style} value={style} className="text-white">
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Text Overlay (Optional)</Label>
                    <Input
                      placeholder="Add text to your thumbnail"
                      value={textOverlay}
                      onChange={(e) => setTextOverlay(e.target.value)}
                      className="bg-background border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate Thumbnail
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <Card className="bg-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Preview</CardTitle>
                  <CardDescription className="text-gray-400">Your generated thumbnail will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                        <p className="text-white">Generating your thumbnail...</p>
                        <p className="text-gray-400 text-sm">This may take a few seconds</p>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Generated thumbnail will appear here</p>
                        <p className="text-gray-500 text-sm">Enter a description and click generate</p>
                      </div>
                    </div>
                  )}

                  {!isGenerating && prompt && (
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Generations */}
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Generations</CardTitle>
                <CardDescription className="text-gray-400">Your recently generated thumbnails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generatedThumbnails.map((thumbnail) => (
                    <div key={thumbnail.id} className="group relative">
                      <img
                        src={thumbnail.thumbnail || "/placeholder.svg"}
                        alt={thumbnail.prompt}
                        className="w-full aspect-video object-cover rounded-lg border border-gray-700"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-white truncate">{thumbnail.prompt}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {thumbnail.style}
                          </Badge>
                          <span className="text-xs text-gray-400">{thumbnail.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Thumbnail Templates</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose from professionally designed templates for different content types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {thumbnailTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                        selectedTemplate === template.id ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="relative">
                        <img
                          src={template.thumbnail || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full aspect-video object-cover rounded-t-lg"
                        />
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-white">Selected</Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {template.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                              {template.style}
                            </Badge>
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customize Tab */}
          <TabsContent value="customize" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Customization Panel */}
              <Card className="bg-card border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Palette className="h-5 w-5 text-primary" />
                    Customize Thumbnail
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Fine-tune your thumbnail with custom text, colors, and effects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-white">Upload Background Image</Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                      <p className="text-gray-500 text-xs">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4 text-primary" />
                      <Label className="text-white">Text Customization</Label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Main Text</Label>
                      <Input
                        placeholder="Enter your main text"
                        value={textOverlay}
                        onChange={(e) => setTextOverlay(e.target.value)}
                        className="bg-background border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Font Size: {fontSize[0]}px</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={100}
                        min={20}
                        step={2}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">Text Color</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-8 h-8 rounded border border-gray-700"
                          />
                          <Input
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="bg-background border-gray-700 text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">Background</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-8 h-8 rounded border border-gray-700"
                          />
                          <Input
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="bg-background border-gray-700 text-white text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Apply Customizations
                  </Button>
                </CardContent>
              </Card>

              {/* Live Preview */}
              <Card className="bg-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Live Preview</CardTitle>
                  <CardDescription className="text-gray-400">See your changes in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor }}
                  >
                    {textOverlay ? (
                      <div
                        className="text-center font-bold"
                        style={{
                          color: textColor,
                          fontSize: `${fontSize[0]}px`,
                          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {textOverlay}
                      </div>
                    ) : (
                      <div className="text-center">
                        <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Add text to see preview</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">My Thumbnail Library</CardTitle>
                <CardDescription className="text-gray-400">
                  All your saved and downloaded thumbnails in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {generatedThumbnails.map((thumbnail) => (
                    <div key={thumbnail.id} className="group relative">
                      <img
                        src={thumbnail.thumbnail || "/placeholder.svg"}
                        alt={thumbnail.prompt}
                        className="w-full aspect-video object-cover rounded-lg border border-gray-700"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-white truncate">{thumbnail.prompt}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {thumbnail.style}
                          </Badge>
                          <span className="text-xs text-gray-400">{thumbnail.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {generatedThumbnails.length === 0 && (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">No thumbnails in your library yet</p>
                    <p className="text-gray-500">Generate your first thumbnail to get started</p>
                    <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={() => setActiveTab("generate")}>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Thumbnail
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
