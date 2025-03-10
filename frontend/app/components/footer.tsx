export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Goldbach Labs</h3>
            <p className="text-gray-400">Revolutionizing Bioinformatics Pipelines</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p>© 2025 Goldbach Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}