
import ChatInterface from './interface'
import ToolsSection from '../components/tools-section'
import Footer from '../components/footer'

export const metadata = {
  title: 'Chat with our AI',
  description: 'Ask questions about your bioinformatics data',
}

export default function ChatPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-10 px-4 border-b border-gray-200">
        <ChatInterface />
      </div>
      <ToolsSection />
      <Footer />
    </div>
  )
}
