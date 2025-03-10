"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type MessageType = 'user' | 'bot'

interface Message {
  id: string
  type: MessageType
  text: string
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])

  const [inputQuery, setInputQuery] = useState('')
  const [isQuerying, setIsQuerying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputQuery.trim() || isQuerying) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputQuery,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputQuery('')
    setIsQuerying(true)

    // Simulate response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: getBotResponse(inputQuery),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      setIsQuerying(false)
    }, 1000)
  }

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return 'Hello! How can I assist you today?'
    } else if (lowerQuery.includes('help')) {
      return 'I can help you analyze your documents, answer questions about your data, or explain concepts. What would you like to know?'
    } else if (lowerQuery.includes('file') || lowerQuery.includes('upload')) {
      return 'You can upload files from the Upload page. I can then help you analyze and understand the content of those files.'
    } else if (lowerQuery.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?'
    } else {
      return 'I\'m processing your query. In a real implementation, this would connect to an AI model to provide relevant answers to your specific questions.'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-black rounded-none p-4 min-h-[500px] flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-black'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmitQuery} className="mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black"
              disabled={isQuerying}
            />
            <Button 
              type="submit"
              className="rounded-none bg-black text-white hover:bg-gray-800"
              size="icon"
              disabled={!inputQuery.trim() || isQuerying}
            >
              <Send size={18} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}