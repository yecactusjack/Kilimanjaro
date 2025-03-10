
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center text-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6 max-w-3xl"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-center mb-4 text-black"
        >
          Bioinformatics Assistant
        </motion.h1>
        <motion.div className="flex justify-center mb-3">
          <span className="text-xs border border-black px-3 py-0.5">
            Beta 1.0 Kilimanjaro
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm text-gray-600 mb-6 text-center max-w-xl mx-auto"
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
            <Button className="h-9 items-center justify-center rounded-none bg-black text-white px-6 text-xs font-medium hover:bg-gray-800">
              Get Started
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
