"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, BookOpen, Award, Clock, Users, Star, Download, Video, FileText, Headphones } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "YouTube SEO Mastery",
    description: "Learn how to optimize your videos for maximum discoverability",
    category: "SEO",
    level: "Beginner",
    duration: "2h 30m",
    lessons: 12,
    students: 1247,
    rating: 4.8,
    instructor: "Sarah Johnson",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 0,
    type: "video",
  },
  {
    id: 2,
    title: "Advanced Keyword Research",
    description: "Master the art of finding high-converting keywords",
    category: "Research",
    level: "Advanced",
    duration: "3h 15m",
    lessons: 18,
    students: 892,
    rating: 4.9,
    instructor: "Mike Chen",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 45,
    type: "video",
  },
  {
    id: 3,
    title: "Content Strategy Blueprint",
    description: "Build a winning content strategy that drives growth",
    category: "Strategy",
    level: "Intermediate",
    duration: "1h 45m",
    lessons: 8,
    students: 2156,
    rating: 4.7,
    instructor: "Emma Rodriguez",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 100,
    type: "article",
  },
  {
    id: 4,
    title: "YouTube Analytics Deep Dive",
    description: "Understand your analytics and make data-driven decisions",
    category: "Analytics",
    level: "Intermediate",
    duration: "2h 10m",
    lessons: 14,
    students: 756,
    rating: 4.6,
    instructor: "David Kim",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 0,
    type: "video",
  },
  {
    id: 5,
    title: "Thumbnail Design Secrets",
    description: "Create click-worthy thumbnails that boost your CTR",
    category: "Design",
    level: "Beginner",
    duration: "1h 20m",
    lessons: 6,
    students: 1834,
    rating: 4.8,
    instructor: "Lisa Park",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 25,
    type: "workshop",
  },
  {
    id: 6,
    title: "Monetization Strategies",
    description: "Turn your channel into a profitable business",
    category: "Business",
    level: "Advanced",
    duration: "4h 30m",
    lessons: 22,
    students: 634,
    rating: 4.9,
    instructor: "Alex Thompson",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 0,
    type: "video",
  },
]

const categories = ["All", "SEO", "Research", "Strategy", "Analytics", "Design", "Business"]
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export default function AcademyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [activeTab, setActiveTab] = useState("courses")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      case "workshop":
        return <Headphones className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-primary/20 text-primary border-primary/30"
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">WaveIQ Academy</h1>
          <p className="text-gray-300 mt-2">Master YouTube growth with expert-led courses and tutorials</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Courses Available</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">50+</div>
              <p className="text-xs text-gray-400">Expert-led courses</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12,000+</div>
              <p className="text-xs text-gray-400">Active learners</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Certificates</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-gray-400">Earned certificates</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Hours Watched</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24.5</div>
              <p className="text-xs text-gray-400">Total learning time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* All Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-card border-gray-800">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-background border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 bg-background border border-gray-700 rounded-md text-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="px-3 py-2 bg-background border border-gray-700 rounded-md text-white"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-card border-gray-800 hover-lift group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getLevelColor(course.level)} text-xs`}>{course.level}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/70 text-white border-none text-xs">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(course.type)}
                          {course.type}
                        </div>
                      </Badge>
                    </div>
                    {course.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-white mt-1">{course.progress}% complete</p>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {course.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {course.lessons} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-primary fill-current" />
                        <span className="text-white">{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        <p>by {course.instructor}</p>
                        <p>{course.students.toLocaleString()} students</p>
                      </div>

                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        {course.progress > 0 ? "Continue" : "Start Course"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Learning Progress</CardTitle>
                <CardDescription className="text-gray-400">
                  Track your progress across all enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses
                    .filter((course) => course.progress > 0)
                    .map((course) => (
                      <div key={course.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-white">{course.title}</h3>
                          <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                        </div>

                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                          <div
                            className="bg-primary h-3 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            {course.progress === 100 ? "Completed" : `${course.progress}% complete`}
                          </span>
                          <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                            {course.progress === 100 ? "Review" : "Continue"}
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Certificates</CardTitle>
                <CardDescription className="text-gray-400">
                  Download and share your course completion certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses
                    .filter((course) => course.progress === 100)
                    .map((course) => (
                      <Card key={course.id} className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-center mb-4">
                            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                              <Award className="h-8 w-8 text-primary" />
                            </div>
                          </div>

                          <h3 className="font-semibold text-center mb-2 text-white">{course.title}</h3>
                          <p className="text-xs text-gray-400 text-center mb-4">Completed on Dec 15, 2023</p>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-gray-800"
                            >
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {courses.filter((course) => course.progress === 100).length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No certificates earned yet</p>
                      <p className="text-sm text-gray-500">Complete courses to earn certificates</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
