import Header from "./components/header"
import Footer from "./components/footer"
import Hero from "./components/hero"
import ToolShowcase from "./components/tool-showcase"
import MissionStatement from "./components/mission-statement"
import Features from "./components/features"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-grow px-4 md:px-6 lg:px-8 py-6 mx-auto w-full max-w-7xl">
        <Hero />
        <MissionStatement />
        <Features />
        <ToolShowcase />
      </main>
      <Footer />
    </div>
  )
}

