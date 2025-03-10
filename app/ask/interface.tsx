
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, Download, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Message {
  isUser: boolean
  content: string
  timestamp: Date
}

export default function QueryInterface() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Try to get fileName from localStorage on component mount
  useEffect(() => {
    const storedFileName = localStorage.getItem("uploadedFileName")
    if (storedFileName) {
      setFileName(storedFileName)
      setMessages([
        {
          isUser: false,
          content: `I'm ready to analyze ${storedFileName}. What would you like to know?`,
          timestamp: new Date()
        }
      ])
    } else {
      setMessages([
        {
          isUser: false,
          content: "Please upload a file first before asking questions.",
          timestamp: new Date()
        }
      ])
    }
  }, [])

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    if (!fileName) {
      setError("Please upload a file first before asking questions.")
      return
    }

    const userMessage: Message = {
      isUser: true,
      content: query.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)
    setQuery("")

    try {
      // Send request to the external API
      const response = await fetch("http://206.1.35.40:3002/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: userMessage.content,
          fileName: fileName
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      const botMessage: Message = {
        isUser: false,
        content: data.message || JSON.stringify(data),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      console.error("Error sending query:", err)
      setError("Failed to get a response. Please try again.")
      
      const errorMessage: Message = {
        isUser: false,
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (content: string) => {
    // Create a blob with the response as HTML
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    // Create a link and trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = 'response.html'
    document.body.appendChild(a)
    a.click()
    
    // Clean up
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="flex flex-col h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">File Analysis</h2>
          {fileName ? (
            <div className="flex items-center text-sm text-green-600">
              <FileText className="h-4 w-4 mr-1" />
              Analyzing: {fileName}
            </div>
          ) : (
            <Link href="/upload" className="text-sm text-blue-600 hover:underline">
              Upload a file first
            </Link>
          )}
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                {!msg.isUser && msg.content.length > 50 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2" 
                    onClick={() => handleDownload(msg.content)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          {error && (
            <div className="mb-2 p-2 bg-red-50 text-red-500 rounded-md flex items-center text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
          <div className="flex gap-2">
            <Textarea
              placeholder={fileName ? "What would you like to know about your file? (e.g., 'Run fastqc on this.')" : "Please upload a file first"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="resize-none"
              rows={1}
              disabled={!fileName || isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={!fileName || isLoading || !query.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
