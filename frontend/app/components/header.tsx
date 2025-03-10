"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <header className="w-full py-4 px-4 border-b border-black bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-black">
            Goldbach Labs
          </Link>
        </div>

        {isMobile ? (
          <div className="flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black p-2"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-14 w-full bg-white border-b border-black py-2 z-50">
                <nav className="flex flex-col items-center space-y-4 py-2">
                  <Link
                    href="#mission"
                    className="text-black hover:text-gray-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mission
                  </Link>
                  <Link
                    href="#features"
                    className="text-black hover:text-gray-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/tools"
                    className="text-black hover:text-gray-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Tools
                  </Link>
                  <Link href="/chat" className="text-black hover:text-gray-700 transition-colors" onClick={() => setMenuOpen(false)}>Chat</Link>
                  <Link href="/upload" className="text-black hover:text-gray-700 transition-colors" onClick={() => setMenuOpen(false)}>Upload</Link>
                  <a
                    href="https://form.typeform.com/to/CUme4cwF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Feedback
                  </a>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center">
            <div className="flex space-x-6">
              <Link
                href="#mission"
                className="text-black hover:text-gray-700 transition-colors"
              >
                Mission
              </Link>
              <Link
                href="#features"
                className="text-black hover:text-gray-700 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/tools"
                className="text-black hover:text-gray-700 transition-colors"
              >
                Tools
              </Link>
              <Link href="/chat" className="text-black hover:text-gray-700 transition-colors">Chat</Link>
              <Link href="/upload" className="text-black hover:text-gray-700 transition-colors">Upload</Link>
              <a
                href="https://form.typeform.com/to/CUme4cwF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition-colors"
              >
                Feedback
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}