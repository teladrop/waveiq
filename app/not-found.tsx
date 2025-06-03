"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const quickLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Keyword Finder", href: "/keyword-finder", icon: Search },
    { name: "AI Generator", href: "/ai-generator", icon: Search },
    { name: "Support", href: "#", icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white mb-8 block">
          Wave<span className="text-primary">IQ</span>
        </Link>

        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-black text-primary mb-4 animate-pulse">404</div>
          <div className="relative">
            <div className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">OOPS!</div>
            <div className="absolute inset-0 text-6xl md:text-7xl font-bold text-white opacity-20 animate-pulse">
              OOPS!
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            <br />
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="border-gray-700 text-white hover:bg-gray-800 hover:border-primary px-8 py-3"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <Card className="bg-card border-gray-800 hover-lift">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-white mb-6">Or try one of these popular pages:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center p-4 rounded-lg border border-gray-700 hover:border-primary/50 hover:bg-gray-800/50 transition-all duration-200 group"
                >
                  <link.icon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-white group-hover:text-primary transition-colors">{link.name}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 mb-4">Still can't find what you're looking for?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#" className="text-primary hover:underline inline-flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link href="#" className="text-primary hover:underline inline-flex items-center">
              <Search className="h-4 w-4 mr-1" />
              Search Help Center
            </Link>
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>Fun fact: 404 errors are named after room 404 at CERN where the first web server was located! 🌐</p>
        </div>
      </div>
    </div>
  )
}
