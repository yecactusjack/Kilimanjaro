
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full py-4 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Goldbach Labs
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="#mission" className="text-sm font-medium hover:text-primary">
            Mission
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#tools" className="text-sm font-medium hover:text-primary">
            Tools
          </Link>
          <Link href="#feedback" className="text-sm font-medium hover:text-primary">
            Feedback
          </Link>
        </nav>
      </div>
    </header>
  )
}
