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
      <main className="flex-grow">
        <Hero />
        <div className="aesthetic-divider mx-auto w-[40%]"></div>
        <MissionStatement />
        <div className="aesthetic-divider mx-auto w-[40%]"></div>
        <Features />
        <div className="aesthetic-divider mx-auto w-[40%]"></div>
        <ToolShowcase />
      </main>
      <Footer />
    </div>
  )
}