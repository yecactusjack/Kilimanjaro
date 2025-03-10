import UploadInterface from './interface'
import ToolShowcase from '../components/tool-showcase'
import Footer from '../components/footer'
import Header from '../components/header'

export const metadata = {
  title: 'Upload your data',
  description: 'Upload your bioinformatics data for analysis',
}

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="text-center py-5">
          <a href="#" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
            Beta 1.0 Kilimanjaro
          </a>
        </div>
        <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4">
          <UploadInterface />
        </div>
      </main>
      <ToolShowcase />
      <Footer />
    </div>
  )
}