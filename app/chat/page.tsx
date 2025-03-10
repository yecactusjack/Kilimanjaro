
import ChatInterface from './interface'
import ToolsSection from '../components/tools-section'
import Footer from '../components/footer'
import Header from '../components/header'
import ToolShowcase from '../components/tool-showcase'

export const metadata = {
  title: 'Chat with our AI',
  description: 'Ask questions about your bioinformatics data',
}

export default function ChatPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-10 px-4 border-b border-gray-200">
        <ChatInterface />
      </div>
      <ToolShowcase />
      <div className="text-center py-5">
        <a href="#" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
          Beta 1.0 Kilimanjaro
        </a>
      </div>
      <Footer />
    </div>
  )
}
