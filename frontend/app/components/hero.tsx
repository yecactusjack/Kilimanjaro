
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
          Goldbach Labs
        </h1>
        <p className="text-xl md:text-2xl text-blue-600 max-w-3xl mx-auto mb-10">
          Enhancing Bioinformatic Workflows With Intelligent Automation
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-none">
            <Link href="/upload">Get Started</Link>
          </Button>
        </div>
        <div className="mt-8">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">Beta 1.0 Kilimanjaro</span>
        </div>
      </div>
    </div>
  )
}
