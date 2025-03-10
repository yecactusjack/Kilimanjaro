"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "framer-motion"
import Header from "../components/header"
import Footer from "../components/footer"

export default function ChatPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{type: string, content: string}>>([
    {type: "system", content: "Welcome to Goldbach Labs. How can I help you with your bioinformatics query?"}
  ])
  const [inputQuery, setInputQuery] = useState("")
  const [isQuerying, setIsQuerying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setUploadStatus("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first")
      return
    }

    setIsUploading(true)
    setUploadStatus("Uploading and processing file...")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Server responded with status: ${response.status} - ${errorData.error || 'Unknown error'}`)
      }

      const data = await response.json()
      console.log("Uploaded file:", file.name)

      setUploadStatus("File uploaded successfully!")
      setUploadedFileName(file.name)
      setShowChatInterface(true)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus(`Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmitQuery = async (e: FormEvent) => {
    e.preventDefault()

    if (!inputQuery.trim() || !uploadedFileName) return

    // Add user message to chat
    setMessages(prev => [...prev, {type: "user", content: inputQuery}])

    // Add processing message
    setMessages(prev => [...prev, {type: "system", content: "Processing your query..."}])

    setIsQuerying(true)

    try {
      console.log("Sending query with file:", inputQuery, uploadedFileName)

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: inputQuery,
          filename: uploadedFileName
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Query API error:", response.status, JSON.stringify(errorData))
        throw new Error(`Server responded with ${response.status}: ${errorData.error || 'Unknown error'}`)
      }

      const data = await response.json()

      // Remove the processing message
      setMessages(prev => prev.filter(msg => msg.content !== "Processing your query..."))

      // Add the response
      setMessages(prev => [...prev, {
        type: "system", 
        content: data.htmlContent || data.message || "Analysis complete."
      }])
    } catch (error) {
      console.error("Query error:", error)

      // Remove the processing message
      setMessages(prev => prev.filter(msg => msg.content !== "Processing your query..."))

      // Add error message
      setMessages(prev => [...prev, {
        type: "system", 
        content: `Error: ${error instanceof Error ? error.message : 'Failed to process query'}`
      }])
    } finally {
      setIsQuerying(false)
      setInputQuery("")

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const downloadReport = () => {
    const htmlContent = messages.find(msg => msg.content.includes('<html>') || msg.content.includes('FastQC Report'))?.content;
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fastqc_report.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-2"
          >
            Bioinformatics Assistant
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Beta 1.0
            </span>
          </motion.div>

          {!showChatInterface ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Upload Your File</h2>
              <p className="text-gray-600 mb-6">
                Supported formats: All bioinformatics file formats accepted.
              </p>

              <div className="flex flex-col space-y-4">
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="*"
                  />
                  <div className="text-gray-500">
                    {file ? file.name : "Click or drag to upload file"}
                  </div>
                </label>

                <button 
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className={`py-2 px-4 rounded-md font-medium ${
                    !file || isUploading 
                      ? "bg-gray-300 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } transition-colors`}
                >
                  {isUploading ? "Uploading..." : "Upload and Analyze"}
                </button>

                {uploadStatus && (
                  <div className={`text-sm p-2 rounded ${
                    uploadStatus.includes("Error") 
                      ? "bg-red-100 text-red-700" 
                      : uploadStatus.includes("success") 
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                  }`}>
                    {uploadStatus}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 bg-blue-600 text-white">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">
                      File Analysis: {uploadedFileName}
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                      Beta 1.0
                    </span>
                  </div>
                </div>

                <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 ${
                        message.type === "user" 
                          ? "text-right" 
                          : "text-left"
                      }`}
                    >
                      <div 
                        className={`inline-block p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {message.content.startsWith("<!DOCTYPE") ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: message.content }}
                            className="max-w-2xl overflow-x-auto"
                          />
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmitQuery} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      placeholder="Enter a command or query about your file..."
                      className="flex-1 py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isQuerying}
                    />
                    <button
                      type="submit"
                      disabled={!inputQuery.trim() || isQuerying}
                      className={`py-2 px-4 rounded-md font-medium ${
                        !inputQuery.trim() || isQuerying
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      } transition-colors`}
                    >
                      {isQuerying ? "Processing..." : "Send"}
                    </button>
                    {messages.some(msg => msg.content.includes('<html>') || msg.content.includes('FastQC Report')) && (
                      <button 
                        onClick={downloadReport}
                        className={`py-2 px-4 rounded-md font-medium bg-gray-300 hover:bg-gray-400 text-white transition-colors`}
                      >
                        Download Report
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}