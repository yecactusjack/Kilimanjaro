"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send, User, Bot } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your bioinformatics assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you analyze that data. What format is your file in?",
        "That's a common issue with sequencing data. Have you tried running quality control?",
        "The best approach would be to use FastQC first, then proceed with alignment using Bowtie2.",
        "Your data appears to be RNA-seq. I recommend the following pipeline: FastQC → STAR → featureCounts → DESeq2.",
        "I've analyzed your query and it seems you're working with metagenomic data. Kraken2 would be ideal for taxonomic classification."
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "assistant",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">Ask Our Assistant</h1>

      <Card className="flex-1 overflow-hidden flex flex-col shadow-sm border-gray-100">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-5 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`flex max-w-[80%] ${
                  message.sender === "user" 
                    ? "bg-blue-600 text-white rounded-xl shadow-sm" 
                    : "bg-gray-100 text-gray-800 rounded-xl shadow-sm border border-gray-200"
                } p-3`}
              >
                <div className={`mr-2 ${message.sender === "user" ? "text-white" : "text-blue-500"}`}>
                  {message.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div>
                  <p className="leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-5">
              <div className="bg-gray-50 border border-gray-100 shadow-sm text-gray-800 rounded-xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-gray-50">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about bioinformatics workflows..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white shadow-sm"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Need to upload a file first? <a href="/upload" className="text-blue-500 hover:underline">Go to upload page</a>
      </div>
    </div>
  )
}