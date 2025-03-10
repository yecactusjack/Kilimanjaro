import Header from "../components/header"
import Footer from "../components/footer"
import ChatInterface from "./interface"

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow py-12">
        <ChatInterface />
      </main>
      <Footer />
    </div>
  )
}