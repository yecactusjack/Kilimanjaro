export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 border-t border-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Goldbach Labs</h3>
            <p className="text-sm text-gray-300">Revolutionizing Bioinformatics Pipelines</p>
          </div>
          <div></div>
          <div className="text-right">
            <p className="text-sm text-gray-300">© {new Date().getFullYear()} Goldbach Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}