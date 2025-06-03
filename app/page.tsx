import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Star,
  TrendingUp,
  Search,
  Zap,
  Target,
  Clock,
  BarChart3,
  Download,
  Chrome,
  MousePointer,
  Eye,
  BarChart,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 lg:pt-20 pb-12 lg:pb-20">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium animate-pulse-glow"
          >
            🚀 Trusted by 10,000+ YouTubers
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Wave<span className="text-primary glow-text">IQ</span> – Grow Smarter on{" "}
            <span className="text-red-500 animate-pulse">YouTube</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover viral keywords, optimize content, and outsmart your competition with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold glow-button transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-700 text-white hover:bg-gray-800 hover:border-primary px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Everything you need to dominate YouTube</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From keyword research to content optimization, WaveIQ provides all the tools you need to grow your channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up">
            <CardHeader className="pb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">Keyword Finder</CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Discover high-volume, low-competition keywords that your audience is searching for.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-100">
            <CardHeader className="pb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">AI Generator</CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Generate compelling titles, descriptions, and tags using advanced AI technology.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-200">
            <CardHeader className="pb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">Competitor Tracker</CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Analyze your competitors' strategies and discover what's working in your niche.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-300">
            <CardHeader className="pb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">Shorts Creator</CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Transform your content into viral YouTube Shorts with automated editing.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-400">
            <CardHeader className="pb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">Upload Time Optimizer</CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Find the perfect time to upload based on your audience's activity patterns.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-500">
            <CardHeader className="pb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">Trend Analysis</CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Stay ahead of trends and capitalize on viral content opportunities.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Browser Extension Section */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="animate-slide-in-left">
            <Badge
              variant="secondary"
              className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium"
            >
              🔥 New Extension
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Supercharge Your YouTube Workflow — <span className="text-primary glow-text">for Free!</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Install the free WaveIQ browser extension to access keyword insights, competitor stats, and optimization
              tools directly on YouTube.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold glow-button transform hover:scale-105 transition-all duration-300">
              <Download className="h-5 w-5 mr-3" />
              Download Extension
            </Button>
          </div>

          {/* Visual Content */}
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>

              {/* Browser mockup */}
              <div className="relative z-10">
                <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 bg-gray-700 rounded px-3 py-1 text-xs text-gray-300">youtube.com</div>
                  </div>
                  <div className="bg-black rounded p-4">
                    <div className="text-white text-sm mb-2">WaveIQ Extension Active</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-primary/20 rounded p-2 text-center">
                        <Search className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-white">Keywords</div>
                      </div>
                      <div className="bg-primary/20 rounded p-2 text-center">
                        <BarChart className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-white">Analytics</div>
                      </div>
                      <div className="bg-primary/20 rounded p-2 text-center">
                        <Eye className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-white">Insights</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <MousePointer className="h-6 w-6 text-primary mb-2" />
                    <div className="text-white text-sm font-semibold mb-1">One-Click Analysis</div>
                    <div className="text-gray-400 text-xs">Instant insights on any video</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <Chrome className="h-6 w-6 text-primary mb-2" />
                    <div className="text-white text-sm font-semibold mb-1">Chrome & Firefox</div>
                    <div className="text-gray-400 text-xs">Works on all browsers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-800">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Trusted by Content Creators & Brands Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join a growing network of creators and businesses optimizing their YouTube strategy with WaveIQ.
          </p>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center animate-fade-in">
            {/* Logo 1 - YouTube */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-20 w-36 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Youtube className="h-12 w-12 text-red-600" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Used by 10K+ creators</p>
              </TooltipContent>
            </Tooltip>

            {/* Logo 2 - Adobe */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-20 w-36 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-12 w-12 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Ai</span>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Powering teams at major content agencies</p>
              </TooltipContent>
            </Tooltip>

            {/* Logo 3 - Vimeo */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-20 w-36 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trusted by video professionals</p>
              </TooltipContent>
            </Tooltip>

            {/* Logo 4 - Generic Brand A */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-20 w-36 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-12 w-24 bg-gradient-to-r from-primary to-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">BRAND</span>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Growing channels by 300%</p>
              </TooltipContent>
            </Tooltip>

            {/* Logo 5 - Generic Brand B */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-20 w-36 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-12 w-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">MEDIA</span>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Scaling content teams globally</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-b from-gray-900/50 to-black py-20 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Loved by creators worldwide</h2>
            <p className="text-xl text-gray-300">See what our community has to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up">
              <CardContent className="pt-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "WaveIQ helped me grow from 1K to 100K subscribers in just 6 months. The keyword insights are
                  incredible!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-white text-lg">Sarah Johnson</p>
                    <p className="text-gray-400">Tech Reviewer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-100">
              <CardContent className="pt-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "The AI-generated titles consistently outperform my manual ones. My CTR improved by 40%!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-white text-lg">Mike Chen</p>
                    <p className="text-gray-400">Gaming Creator</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/50 transition-all duration-500 animate-fade-in-up delay-200">
              <CardContent className="pt-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "Finally, a tool that understands YouTube's algorithm. My videos are getting more views than ever!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    E
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-white text-lg">Emma Rodriguez</p>
                    <p className="text-gray-400">Lifestyle Vlogger</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-300">Choose the plan that's right for your channel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <Card className="border border-gray-800 bg-card hover-lift group hover:border-primary/30 transition-all duration-500 animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white mb-4">Free</CardTitle>
              <div className="text-5xl font-black text-white mb-2">$0</div>
              <CardDescription className="text-gray-400 text-lg">Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">5 keyword searches per day</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Basic AI title generation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Community support</span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-semibold glow-button transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary relative bg-card hover-lift group hover:border-primary/80 transition-all duration-500 animate-fade-in-up delay-100 glow-card">
            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 text-sm font-bold">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white mb-4">Pro</CardTitle>
              <div className="text-5xl font-black text-white mb-2">$29</div>
              <CardDescription className="text-gray-400 text-lg">per month</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Unlimited keyword searches</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Advanced AI content generation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Competitor analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Shorts creator tool</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Upload time optimization</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-white text-lg">Priority support</span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-semibold glow-button transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/signup">Start Pro Trial</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="bg-gradient-to-t from-gray-900 to-card border-t border-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h3 className="text-3xl font-black mb-6 text-white">
              Wave<span className="text-primary glow-text">IQ</span>
            </h3>
            <p className="text-gray-400 mb-10 text-lg">Empowering creators to grow smarter on YouTube</p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-8 mb-10">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-125"
              >
                <Facebook className="h-8 w-8" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-125"
              >
                <Twitter className="h-8 w-8" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-125"
              >
                <Instagram className="h-8 w-8" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-125"
              >
                <Youtube className="h-8 w-8" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-125"
              >
                <Linkedin className="h-8 w-8" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-125"
              >
                <Github className="h-8 w-8" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>

            <div className="flex justify-center space-x-8 text-lg">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
