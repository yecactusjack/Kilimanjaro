
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center bg-white mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-bold tracking-tight text-center mb-6 text-black"
        >
          Bioinformatics Assistant
        </motion.h1>
        <motion.div className="flex justify-center mb-4">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Beta 1.0
          </span>
        </motion.div>
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
            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-black text-white px-8 text-sm font-medium shadow hover:bg-gray-800">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
