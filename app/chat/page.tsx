
import ChatInterface from './interface'
import Footer from '../components/footer'
import Header from '../components/header'

export const metadata = {
  title: 'Chat with our AI',
  description: 'Ask questions about your bioinformatics data',
}

export default function ChatPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-16 px-4 flex-1">
        <ChatInterface />
      </div>
      <Footer />
    </div>
  )
}
