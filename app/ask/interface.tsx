
"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, Download } from "lucide-react"
import axios from "axios"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function AskInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! Ask questions about your uploaded bioinformatics file.",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [htmlContent, setHtmlContent] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Try to get the filename from localStorage on mount
  useEffect(() => {
    const storedFileName = localStorage.getItem("uploadedFileName")
    if (storedFileName) {
      setFileName(storedFileName)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return
    if (!fileName) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Please enter a file name before sending a query.",
        sender: "assistant",
        timestamp: new Date()
      }])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setHtmlContent(null)

    try {
      const response = await axios.post("http://206.1.35.40:3002/ask", {
        query: input.trim(),
        fileName: fileName
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text'
      })

      const botMessage: Message = {
        id: Date.now().toString(),
        content: "Analysis completed! You can download the results below.",
        sender: "assistant",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setHtmlContent(response.data)
    } catch (error) {
      console.error("Error querying the API:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your request. Please try again.",
        sender: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!htmlContent) return
    
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analysis-result-${new Date().getTime()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border rounded-lg shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4">
            <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">
              File Name
            </label>
            <div className="flex">
              <input
                id="fileName"
                type="text"
                value={fileName}
                onChange={(e) => {
                  setFileName(e.target.value)
                  localStorage.setItem("uploadedFileName", e.target.value)
                }}
                placeholder="Enter the name of your uploaded file"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col h-96 mb-4">
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.sender === "assistant"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {htmlContent && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Analysis completed!</span>
                <Button 
                  onClick={handleDownload} 
                  className="flex items-center space-x-1 bg-green-500 hover:bg-green-600"
                >
                  <Download size={16} />
                  <span>Download Result</span>
                </Button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your file..."
              className="flex-1 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="self-end bg-blue-500 hover:bg-blue-600"
            >
              <Send size={16} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
