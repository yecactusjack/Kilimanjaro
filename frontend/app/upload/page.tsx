
import Header from "@/app/components/header"
import Hero from "@/app/components/hero"
import MissionStatement from "@/app/components/mission-statement"
import Features from "@/app/components/features"
import ToolShowcase from "@/app/components/tool-showcase"
import Footer from "@/app/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MissionStatement />
        <Features />
        <ToolShowcase />
      </main>
      <Footer />
    </div>
  )
}
