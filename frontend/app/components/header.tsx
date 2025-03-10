import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-black">
            Goldbach Labs
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="#mission" className="text-black hover:text-gray-600">
              Mission
            </Link>
            <Link href="#features" className="text-black hover:text-gray-600">
              Features
            </Link>
            <Link href="#tools" className="text-black hover:text-gray-600">
              Tools
            </Link>
            <Link href="#feedback" className="text-black hover:text-gray-600">
              Feedback
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}