export default function Footer() {
  return (
    <footer id="feedback" className="py-10 border-t">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Send Us Feedback</h2>
        <p className="text-gray-600 mb-5">We're constantly improving our platform based on user feedback.</p>
        <a href="mailto:feedback@goldbachlabs.com" className="text-blue-600 hover:text-blue-800 font-medium">feedback@goldbachlabs.com</a>
        <div className="mt-10 text-sm text-gray-500">
          &copy; 2024 Goldbach Labs. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
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
