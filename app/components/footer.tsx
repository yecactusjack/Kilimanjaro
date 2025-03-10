export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="font-bold text-lg">Goldbach Labs</h3>
          <p className="text-sm text-gray-400">Revolutionizing Bioinformatics Pipelines</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm">© {currentYear} Goldbach Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}