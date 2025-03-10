"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center">
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
          className="text-5xl font-bold tracking-tight text-center mb-6"
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
            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-black text-white px-8 text-sm font-medium shadow hover:bg-gray-800">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}