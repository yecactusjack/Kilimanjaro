"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black border-b border-black">
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            HiveMind Bioinformatics
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
            Empower your research with our advanced bioinformatics platform. Analyze, visualize, and collaborate on complex biological data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/upload" className="flex items-center">
                Give it a try <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="https://hivemind-bio.com" className="flex items-center">
                HiveMind <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}