
import Header from "@/app/components/header"
import Hero from "@/app/components/hero"
import MissionStatement from "@/app/components/mission-statement"
import Features from "@/app/components/features"
import ToolsSection from "@/app/components/tools-section"
import Footer from "@/app/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MissionStatement />
        <Features />
        <ToolsSection />
        <div className="text-center py-8">
          <a href="#" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-all hover:bg-blue-700">
            Beta 1.0 Kilimanjaro
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
