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

      // Improved fetch with more robust error handling and CORS settings
      const response = await fetch("http://206.1.35.40:3002/upload", {
        method: "POST",
        body: formData,
        // Let browser handle Content-Type for multipart/form-data with proper boundary
        credentials: 'include',
        // Add mode: 'cors' to explicitly request CORS support
        mode: 'cors',
        // Add cache: 'no-cache' to prevent caching issues
        cache: 'no-cache',
      })

      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        throw new Error(`Server responded with status: ${response.status} - ${errorText}`);
      }

      // Parse the JSON response safely
      const data = await response.json();

      setIsUploading(false)
      setUploadStatus("File uploaded successfully!")
      setShowChatInterface(true)
    } catch (error) {
      setIsUploading(false)
      // Provide better error information for debugging
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error - possibly a CORS or network issue';
      setUploadStatus(`Error uploading file: ${errorMessage}`);
      console.error("Upload error:", error)
      
      // Show more detailed error instructions to the user
      if (errorMessage.includes('Failed to fetch')) {
        setUploadStatus("Network error: The server may be unreachable or blocking requests from this origin. Please check your connection and that the API server is running.");
      }
    }
  }

  const handleSendQuery = async (e: FormEvent) => {
    e.preventDefault()

    if (!inputQuery.trim()) return

    setMessages([...messages, {type: "user", content: inputQuery}])

    // Show loading state
    setMessages(prev => [...prev, {type: "system", content: "Processing your query..."}])

    try {
      const response = await fetch("http://206.1.35.40:3002/ask", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: inputQuery,
          filename: file?.name || "uploaded_file"
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Query failed with status: ${response.status}`)
      }

      // Check if the response is a file
      const contentType = response.headers.get("content-type") || ""
      const contentDisposition = response.headers.get("content-disposition") || ""
      const filenameMatch = contentDisposition.match(/filename="?([^"]*)"?/)
      const filename = filenameMatch ? filenameMatch[1] : "result_file"

      if (contentType.includes("application/json")) {
        // Handle JSON response
        const data = await response.json()
        setMessages(prev => prev.slice(0, -1).concat({
          type: "system", 
          content: data.message || "Query processed successfully."
        }))
      } else {
        // Handle file response
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        setMessages(prev => prev.slice(0, -1).concat({
          type: "system", 
          content: `<div>
            <p>Your query has been processed. Here is your result file:</p>
            <a href="${url}" download="${filename}" class="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2">Download Result</a>
          </div>`
        }))
      }
    } catch (error) {
      setMessages(prev => prev.slice(0, -1).concat({
        type: "system", 
        content: `Error processing query: ${error instanceof Error ? error.message : 'Unknown error'}`
      }))
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