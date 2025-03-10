import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-6 border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-500">&copy; 2023 Goldbach Labs. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Contact</Link>
            <a href="https://form.typeform.com/to/CUme4cwF" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">Feedback</a>
          </div>
        </div>
      </div>
    </footer>
  )
}