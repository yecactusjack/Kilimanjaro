
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
          Bioinformatics Made Simple
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          Upload, analyze, and interpret biological data with powerful tools and AI assistance
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-none">
            <Link href="/upload">Upload File</Link>
          </Button>
          <Button asChild variant="outline" className="border-black text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-none">
            <Link href="/chat">Chat</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
