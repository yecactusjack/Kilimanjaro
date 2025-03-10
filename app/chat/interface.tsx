
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send } from "lucide-react"

export default function ChatInterface() {
  const [query, setQuery] = useState("")
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const userMessage = { role: 'user' as const, content: query }
    setConversation(prev => [...prev, userMessage])
    setQuery("")
    setIsLoading(true)

    try {
      // Simulate API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...conversation, userMessage] })
      })

      if (!response.ok) throw new Error('Failed to get response')
      
      const data = await response.json()
      setConversation(prev => [...prev, { role: 'assistant', content: data.response || "I'm sorry, I couldn't process that request." }])
    } catch (error) {
      console.error('Error:', error)
      setConversation(prev => [...prev, { role: 'assistant', content: "Sorry, there was an error processing your request." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="border-black rounded-none p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <MessageCircle className="mr-2" /> Ask Our AI
          </h2>
          <p className="text-gray-600">
            Ask questions about bioinformatics tools, workflows, or how to analyze your data
          </p>
        </div>

        <div className="min-h-[300px] mb-4 border border-gray-200 p-4 rounded overflow-y-auto">
          {conversation.length === 0 ? (
            <div className="text-gray-400 text-center h-full flex items-center justify-center">
              <p>Your conversation will appear here</p>
            </div>
          ) : (
            <>
              {conversation.map((message, index) => (
                <div key={index} className={`mb-4 p-3 rounded-md ${message.role === 'user' ? 'bg-gray-100 ml-auto max-w-[80%]' : 'bg-black text-white mr-auto max-w-[80%]'}`}>
                  <p>{message.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 p-3 rounded-md bg-black text-white mr-auto max-w-[80%]">
                  <p>Thinking...</p>
                </div>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question here..."
            className="flex-grow border-black rounded-none"
          />
          <Button type="submit" disabled={isLoading || !query.trim()} className="bg-black text-white hover:bg-gray-800 rounded-none">
            <Send size={18} />
          </Button>
        </form>
      </Card>
    </div>
  )
}
