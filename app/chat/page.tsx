
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ChatInterface from "./interface"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-black">AI Assistant</h1>
          <p className="text-gray-600 mt-2">
            Chat with our AI to analyze your files and get instant answers
          </p>
        </div>

        <ChatInterface />
      </div>
    </div>
  )
}
