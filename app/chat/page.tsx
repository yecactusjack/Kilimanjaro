"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "framer-motion"
import Header from "../components/header"
import Footer from "../components/footer"

export default function ChatPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [messages, setMessages] = useState<Array<{type: string, content: string}>>([
    {type: "system", content: "Welcome to Goldbach Labs. How can I help you with your bioinformatics query?"}
  ])
  const [inputQuery, setInputQuery] = useState("")
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
      // Using the default key name "file" that the server expects
      formData.append("file", file)

      // Use relative URL to avoid CORS issues
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        // Simplify the request configuration
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status} - ${response.statusText}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse JSON response:", text.substring(0, 100) + "...");
        throw new Error("Invalid JSON response from server");
      }

      setIsUploading(false)
      setUploadStatus("File uploaded successfully!")
      setShowChatInterface(true)
    } catch (error) {
      setIsUploading(false)
      setUploadStatus(`Error uploading file: ${error.message}`)
      console.error("Upload error:", error)
    }
  }

  const handleSendQuery = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputQuery.trim()) return

    // Add user message to the chat
    setMessages(prev => [...prev, {type: "user", content: inputQuery}])
    setInputQuery("")
    setMessages(prev => [...prev, {type: "system", content: "Processing your query..."}])

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: inputQuery })
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse JSON response:", text.substring(0, 100) + "...");
        throw new Error("Invalid JSON response from server");
      }

      // Remove the "Processing" message
      setMessages(prev => prev.filter(msg => msg.content !== "Processing your query..."))

      // Add the bot response
      setMessages(prev => [...prev, {
        type: "bot", 
        content: data.response || "I couldn't process that query."
      }])

      // Scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    } catch (error) {
      console.error("Query error:", error);
      // Add error message to chat
      const errorMessage = {
        type: "system",
        content: `Error processing query: ${error instanceof Error ? error.message : 'Failed to connect to server'}`
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setInputQuery("")

    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
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
            className="text-3xl font-bold text-center mb-10"
          >
            Bioinformatics Analysis Interface
          </motion.h1>

          {!showChatInterface ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Upload Your File</h2>
              <p className="text-gray-600 mb-6">
                Supported formats: FASTA, FASTQ, VCF, SAM, BAM, and other bioinformatics formats.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-gray-500">
                  {file ? (
                    <p className="text-black font-medium">{file.name}</p>
                  ) : (
                    <>
                      <p className="mb-2">Drag and drop your file here, or click to browse</p>
                      <p className="text-sm text-gray-400">Max file size: 50MB</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || !file}
                className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm ${
                  isUploading || !file 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isUploading ? "Processing..." : "Upload and Analyze"}
              </button>

              {uploadStatus && (
                <p className={`mt-4 text-center ${
                  uploadStatus.includes("successfully") 
                    ? "text-green-600" 
                    : uploadStatus.includes("Uploading") 
                      ? "text-blue-600" 
                      : "text-red-600"
                }`}>
                  {uploadStatus}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="border-b p-4">
                <h2 className="font-bold text-lg">Analysis Chat Interface</h2>
                <p className="text-sm text-gray-600">File: {file?.name}</p>
              </div>

              <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendQuery} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Type your query about the uploaded file..."
                    className="flex-grow p-2 border rounded-md"
                  />
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}