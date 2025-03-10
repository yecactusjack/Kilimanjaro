import ChatInterface from './interface'
import Footer from '../components/footer'
import Header from '../components/header'

export const metadata = {
  title: 'Chat with our AI',
  description: 'Ask questions about your bioinformatics data',
}

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-4 sm:p-8 pt-8">
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Interactive Bioinformatics Chat</h1>
          <ChatInterface />
        </div>
      </div>
      <div className="text-center py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto max-w-md">
        <a href="#" className="inline-block w-full sm:w-auto px-5 sm:px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
          Beta 1.0 Kilimanjaro
        </a>
        <a href="https://form.typeform.com/to/CUme4cwF" target="_blank" className="inline-block w-full sm:w-auto px-5 sm:px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
          Provide Feedback
        </a>
      </div>
      <Footer />
    </div>
  )
}