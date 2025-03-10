
export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-bold mb-2">Goldbach Labs</h1>
      <p className="text-xl text-primary mb-8 font-medium">Enhancing Bioinformatic Workflows With Intelligent Automation</p>
      <div className="flex justify-center">
        <a href="/upload" className="inline-flex items-center px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
          Get Started <span className="ml-2">→</span>
        </a>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm">Beta 1.0 Kilimanjaro</div>
      </div>
    </section>
  )
}
