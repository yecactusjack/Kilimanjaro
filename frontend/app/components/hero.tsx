
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
            Goldbach Labs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary max-w-3xl mx-auto">
            Enhancing Bioinformatic Workflows With Intelligent Automation
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/upload">
                Give it a try <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/">
                HiveMind <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
              <Link href="/ask">
                HiveMind <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => {
                const typeformUrl = "https://form.typeform.com/to/CUme4cwF"
                window.open(typeformUrl, "_blank", "noopener,noreferrer")
              }}
            >
              HiveMind <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
