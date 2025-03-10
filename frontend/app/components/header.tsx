"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-black">
          HiveMind
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-black hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/upload" className="text-black hover:text-blue-600 transition-colors">
            Upload
          </Link>
          <Link href="/chat" className="text-black hover:text-blue-600 transition-colors">
            Chat
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t border-black">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-black hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/upload" 
              className="text-black hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upload
            </Link>
            <Link 
              href="/chat" 
              className="text-black hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}