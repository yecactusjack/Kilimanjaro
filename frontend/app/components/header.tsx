"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full py-4 px-4 bg-white text-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-black">
            Goldbach Labs
          </Link>
        </div>
        <nav className="flex space-x-8">
          <Link
            href="#mission"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Mission
          </Link>
          <Link
            href="#features"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Tools
          </Link>
          <a 
            href="https://form.typeform.com/to/CUme4cwF" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Feedback
          </a>
        </nav>
      </div>
    </header>
  )
}