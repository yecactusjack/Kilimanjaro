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
      <div className="flex-1 p-3 sm:p-6">
        <ChatInterface />
      </div>
      <div className="text-center py-3 sm:py-5">
        <a href="#" className="inline-block px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
          Beta 1.0 Kilimanjaro
        </a>
      </div>
      <Footer />
    </div>
  )
}