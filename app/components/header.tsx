"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Goldbach Labs
          </Link>
        </div>
        <nav className="flex items-center space-x-8">
          <Link href="#mission" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Mission
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#tools" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Tools
          </Link>
          <Link href="#feedback" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Feedback
          </Link>
        </nav>
      </div>
    </header>
  )
}