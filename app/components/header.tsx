"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600"
        >
          Goldbach Labs
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="#mission" className="text-gray-300 hover:text-amber-400 transition-colors">
                Mission
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-gray-300 hover:text-amber-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#tools" className="text-gray-300 hover:text-amber-400 transition-colors">
                Tools
              </Link>
            </li>
          </ul>
        </nav>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-6 w-6 text-amber-400" />
        </button>
      </div>
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4">
            <li>
              <Link href="#mission" className="block px-4 py-2 text-gray-300 hover:bg-amber-600 hover:text-white">
                Mission
              </Link>
            </li>
            <li>
              <Link href="#features" className="block px-4 py-2 text-gray-300 hover:bg-amber-600 hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="#tools" className="block px-4 py-2 text-gray-300 hover:bg-amber-600 hover:text-white">
                Tools
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}

