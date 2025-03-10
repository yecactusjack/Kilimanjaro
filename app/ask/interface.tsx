
"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, User, Bot, Download } from "lucide-react"
import axios from "axios"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isHtml?: boolean
}

export default function AskInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your bioinformatics assistant. How can I help you analyze your uploaded file?",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Try to get filename from localStorage if it exists
  useEffect(() => {
    const storedFileName = localStorage.getItem("uploadedFileName")
    if (storedFileName) {
      setFileName(storedFileName)
    }
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return
    if (!fileName) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Please upload a file first before asking questions.",
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

    try {
      // Send the query to the API endpoint with the fileName
      const response = await axios.post("http://206.1.35.40:3002/ask", {
        query: input.trim(),
        fileName: fileName
      })

      // Add the response as a message from the assistant
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: response.data.response || JSON.stringify(response.data),
        sender: "assistant",
        timestamp: new Date(),
        isHtml: true
      }])
    } catch (error) {
      console.error("Error sending query:", error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your request. Please try again.",
        sender: "assistant",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const downloadHtmlContent = (content: string) => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `response-${Date.now()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-[80vh]">
      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardContent className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  } rounded-lg p-3`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background">
                    {message.sender === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      {message.isHtml ? (
                        <div>
                          <div dangerouslySetInnerHTML={{ __html: message.content }} />
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center space-x-1"
                              onClick={() => downloadHtmlContent(message.content)}
                            >
                              <Download className="h-4 w-4" />
                              <span>Download HTML</span>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your file..."
              className="flex-1 min-h-10 bg-background resize-none rounded-md border border-input px-3 py-2"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button 
              type="submit" 
              className="shrink-0" 
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
          {!fileName && (
            <p className="text-sm text-yellow-600 mt-2">
              Please upload a file before asking questions. Go to the Upload page to do so.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
