
export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-bold mb-3">Goldbach Labs</h1>
      <p className="text-xl text-blue-600 mb-8 font-medium">Enhancing Bioinformatic Workflows With Intelligent Automation</p>
      <div className="flex justify-center">
        <a href="/upload" className="inline-flex items-center px-8 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors font-medium">
          Get Started <span className="ml-2">→</span>
        </a>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="px-5 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">Beta 1.0 Kilimanjaro</div>
      </div>
    </section>
  )
}
