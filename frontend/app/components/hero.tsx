
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          AI-Powered Bioinformatics Pipeline
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          Natural language interface for sophisticated bioinformatics workflows.
          No coding required.
        </p>
        <Link href="/chat" passHref>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  )
}
