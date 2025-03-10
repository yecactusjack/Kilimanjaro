"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function MissionStatement() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="aesthetic-divider"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Our Mission</h2>
          <motion.p
            className="text-lg md:text-xl text-black mb-8"
          >
            Modern bioinformatics workflows are complex and manual. Goldbach Labs is developing an AI agent to automate
            these processes. This will streamline workflows and reduce human effort. It enhances accessibility for
            researchers. Our solution makes bioinformatics pipelines more efficient.
          </motion.p>
          <p className="text-xl md:text-2xl font-semibold text-primary mt-8">
            We make bioinformatics as easy as a ChatGPT search, no expertise needed.
          </p>
        </motion.div>
      </div>
    </section>
  )
}