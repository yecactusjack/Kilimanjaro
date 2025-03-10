import Header from "@/app/components/header"
import Hero from "@/app/components/hero"
import MissionStatement from "@/app/components/mission-statement"
import Features from "@/app/components/features"
import ToolsSection from "@/app/components/tools-section"
import Footer from "@/app/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8"> {/* Increased padding */}
          <Hero />
          <div className="section-divider"></div>
          <MissionStatement />
          <div className="section-divider"></div>
          <Features />
          <div className="section-divider"></div>
          <ToolsSection />
        </div>
        <div className="text-center py-10 mt-8"> {/* Increased vertical padding */}
          <Link href="#" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-all hover:bg-blue-700">
            Beta 1.0 Kilimanjaro
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}