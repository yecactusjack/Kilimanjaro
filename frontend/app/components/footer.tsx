
export default function Footer() {
  return (
    <footer className="bg-white border-t border-black py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-black">HiveMind</h2>
            <p className="text-gray-600">Advanced Bioinformatics Platform</p>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-black hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#" className="text-black hover:text-blue-600 transition-colors">
              Documentation
            </a>
            <a href="#" className="text-black hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} HiveMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
