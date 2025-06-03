"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  // Don't show navigation on auth pages
  if (pathname === "/login" || pathname === "/signup" || pathname === "/onboarding") {
    return null
  }

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Support", href: "#support" },
  ]

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            Wave<span className="text-primary">IQ</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden border border-gray-700 hover:border-primary">
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden sm:flex items-center space-x-4">
              <ThemeToggle />
              <Button
                asChild
                variant="ghost"
                className="text-white hover:text-primary hidden md:inline-flex border border-gray-700 hover:border-primary"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex sm:hidden items-center space-x-2">
              <ThemeToggle />
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
