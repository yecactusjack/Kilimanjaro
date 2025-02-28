export default function Footer() {
  return (
    <footer className="bg-secondary text-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">Goldbach Labs</h3>
          <p className="text-sm text-gray-600">Revolutionizing Bioinformatics Pipelines</p>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Goldbach Labs. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

