"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import { Download } from "lucide-react"

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
  const [formattedTime, setFormattedTime] = useState('');

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get the filename from localStorage on mount
  useEffect(() => {
    const storedFileName = localStorage.getItem("uploadedFileName")
    if (storedFileName) {
      setFileName(storedFileName)
    }
  }, [])

  useEffect(() => {
    // Set time only on client side to avoid hydration mismatch
    setFormattedTime(new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }));

    // Optional: update time every second
    const timer = setInterval(() => {
      setFormattedTime(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return
    if (!fileName) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Please upload a file first before sending a query.",
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
      // Direct API call to the external service
      const response = await axios.post("http://206.1.35.40:3002/ask", {
        query: input.trim(),
        fileName: fileName
      }, {
        responseType: 'text',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Set the HTML content for download
      setHtmlContent(response.data)

      const botMessage: Message = {
        id: Date.now().toString(),
        content: "I've processed your query. You can download the results below.",
        sender: "assistant",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error("Error querying the API:", error)

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your query. Please try again.",
        sender: "assistant",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const downloadHtml = () => {
    if (!htmlContent) return

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `result-${new Date().getTime()}.html`
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File: {fileName ? <span className="font-semibold">{fileName}</span> : <span className="text-red-500">No file selected. Please upload a file first.</span>}
            </label>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.sender === "user" 
                    ? "bg-blue-100 ml-auto max-w-[80%]" 
                    : "bg-gray-100 mr-auto max-w-[80%]"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formattedTime}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {htmlContent && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm mb-2">Result is ready!</p>
              <Button 
                onClick={downloadHtml}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                size="sm"
              >
                <Download size={16} />
                Download Result
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !fileName}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Need to upload a file first? <a href="/upload" className="text-blue-500 hover:underline">Go to upload page</a>
      </div>
    </div>
  )
}