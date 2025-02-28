"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black border-b border-black">
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Goldbach Labs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary max-w-3xl mx-auto">
            Enhancing Bioinformatic Workflows With Intelligent Automation
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => {
                const typeformUrl = "https://form.typeform.com/to/CUme4cwF"
                window.open(typeformUrl, "_blank", "noopener,noreferrer")
              }}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

