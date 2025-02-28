"use client"

import { motion } from "framer-motion"
import { MessageSquare, Zap, Users, Cpu } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Natural Language Interface",
    description: "Users interact using a ChatGPT-like interface. Describe data in natural language.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Automated Pipeline Selection",
    description:
      "The AI agent selects the best data processing pipeline. It uses dataset type and research objectives.",
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: "Eliminate Manual Steps",
    description:
      "The system automatically executes required tools and workflows. Efficiency is significantly improved.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Accessibility",
    description:
      "Our solution bridges the accessibility gap, allowing non-coders to use advanced bioinformatics tools.",
  },
]

export default function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 bg-white border-b border-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">Bioinformatics, Simplified by Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 border border-black transition-all"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <motion.div
                className="mb-4"
                animate={{
                  scale: hoveredFeature === index ? 1.1 : 1,
                  rotate: hoveredFeature === index ? 360 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

