import AskInterface from './interface'
import Footer from '../components/footer'
import Header from '../components/header'

export const metadata = {
  title: 'Ask questions about your data',
  description: 'Get answers about your bioinformatics data',
}

export default function AskPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-4 border-b border-gray-200">
        <AskInterface />
      </div>
      <div className="text-center py-5 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#" className="inline-block px-5 sm:px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
          Beta 1.0 Kilimanjaro
        </a>
        <a href="https://form.typeform.com/to/CUme4cwF" target="_blank" className="inline-block px-5 sm:px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
          Provide Feedback
        </a>
      </div>
      <Footer />
    </div>
  )
}