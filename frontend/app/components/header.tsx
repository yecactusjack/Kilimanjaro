
"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white py-4 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Goldbach Labs
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link href="/upload" className="hover:text-blue-400">
              Upload
            </Link>
            <Link href="/chat" className="hover:text-blue-400">
              Chat
            </Link>
            <Link href="/chat" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <Link href="/" className="block py-2 hover:text-blue-400">
              Home
            </Link>
            <Link href="/upload" className="block py-2 hover:text-blue-400">
              Upload
            </Link>
            <Link href="/chat" className="block py-2 hover:text-blue-400">
              Chat
            </Link>
            <Link href="/chat" passHref>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
