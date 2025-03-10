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
        <hr className="border-t border-black my-8 mx-auto w-[90%]" />
        <MissionStatement />
        <hr className="border-t border-black my-8 mx-auto w-[90%]" />
        <Features />
        <hr className="border-t border-black my-8 mx-auto w-[90%]" />
        <ToolShowcase />
      </main>
      <Footer />
    </div>
  )
}

