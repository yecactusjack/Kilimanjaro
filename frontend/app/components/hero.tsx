
"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center bg-white mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6"
      >
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-6xl font-bold tracking-tight text-center mb-4 text-black"
          >
            Goldbach Labs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-blue-600 mb-8 text-center"
          >
            Enhancing Bioinformatic Workflows With Intelligent Automation
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/chat">
              <Button className="inline-flex h-12 items-center justify-center rounded-full bg-black text-white px-8 text-sm font-medium shadow hover:bg-gray-800">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="mt-4 hidden md:block">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">Beta 1.0 Kilimanjaro</span>
        </div>
      </motion.div>
    </section>
  )
}
