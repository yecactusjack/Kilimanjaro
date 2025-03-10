
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Upload, FileText, RotateCw } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isFile?: boolean
  fileName?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your bioinformatics assistant. You can upload a file or ask me to analyze previously uploaded data.",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if there's a fileName parameter in the URL
    const fileName = searchParams.get("fileName")
    if (fileName) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `File uploaded: ${fileName}`,
        sender: "user",
        timestamp: new Date(),
        isFile: true,
        fileName: fileName
      }
      setMessages(prev => [...prev, fileMessage])
    }
  }, [searchParams])
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() && !file) return
    
    if (file) {
      await handleFileUpload()
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
    setIsProcessing(true)
    
    // Get the most recent file name from messages
    const lastFileMessage = [...messages].reverse().find(m => m.isFile && m.fileName)
    const fileName = lastFileMessage?.fileName || ""
    
    try {
      const response = await fetch("http://206.1.35.40:3002/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input.trim(),
          fileName: fileName
        }),
      })
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.response || "I processed your request. Please check the results.",
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error processing request:", error)
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your request. Please try again.",
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileInfo({
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size)
      })
    }
  }
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }
  
  const handleFileUpload = async () => {
    if (!file) return
    
    // Add file message to chat
    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Uploading ${file.name}...`,
      sender: "user",
      timestamp: new Date(),
      isFile: true
    }
    
    setMessages(prev => [...prev, fileMessage])
    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('http://206.1.35.40:3002/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }
      
      // Update the file message to show completion
      setMessages(prev => 
        prev.map(msg => 
          msg.id === fileMessage.id 
            ? {...msg, content: `File uploaded: ${file.name}`, fileName: file.name} 
            : msg
        )
      )
      
      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: `I've received your file ${file.name}. What would you like to do with it?`,
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
    } catch (error) {
      console.error('Upload error:', error)
      
      // Update the message to show error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === fileMessage.id 
            ? {...msg, content: `Upload failed: ${file.name}`} 
            : msg
        )
      )
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, there was an error uploading your file. Please try again.",
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
      setFile(null)
      setFileInfo(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">Bioinformatics Pipeline Chat</CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "user" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.isFile ? (
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>{msg.content}</span>
                    </div>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center">
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2 items-center">
            {file && (
              <div className="flex-shrink-0 flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md mr-2">
                <FileText className="h-4 w-4 mr-1" />
                <span className="text-xs truncate max-w-[120px]">{fileInfo?.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() => {
                    setFile(null)
                    setFileInfo(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                >
                  &times;
                </Button>
              </div>
            )}
            
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your query or command..."
              className="flex-grow"
              disabled={isProcessing}
            />
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".fastq,.fq,.fasta,.fa,.sam,.bam,.vcf,.gff,.gtf"
            />
            
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              <Upload className="h-4 w-4" />
            </Button>
            
            <Button 
              type="submit" 
              size="icon"
              disabled={isProcessing || (!input.trim() && !file)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
