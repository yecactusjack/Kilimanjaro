
import ChatInterface from './interface'

export const metadata = {
  title: 'Chat with our AI',
  description: 'Ask questions about your bioinformatics data',
}

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <ChatInterface />
    </div>
  )
}
