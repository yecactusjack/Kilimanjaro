
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Interface() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [suggestedQueries, setSuggestedQueries] = useState([
    "Analyze for potential genomic markers",
    "Identify sequence variations",
    "Find regulatory elements",
    "Compare with reference genome"
  ])
  const [messages, setMessages] = useState<Array<{type: string, content: string}>>([
    {type: "system", content: "Welcome to HiveMind. How can I help you with your bioinformatics query?"}
  ])
  const [inputQuery, setInputQuery] = useState("")

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
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      setUploadStatus("File uploaded successfully!")
      setShowChatInterface(true)
    }, 2000)
    
    // Actual implementation would use:
    // const formData = new FormData()
    // formData.append("file", file)
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   })
    //   const data = await response.json()
    //   // Handle response
    // } catch (error) {
    //   setUploadStatus("Error uploading file")
    // }
  }

  const handleSendQuery = () => {
    if (!inputQuery.trim()) return

    // Add user message
    setMessages([...messages, {type: "user", content: inputQuery}])
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "system", 
        content: "Based on your uploaded data, I've analyzed your query about '" + inputQuery + "'. The file shows several interesting patterns that could be relevant to your research. Would you like me to elaborate on any specific aspect?"
      }])
    }, 1000)

    setInputQuery("")
  }

  const handleSuggestedQuery = (query: string) => {
    setInputQuery(query)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!showChatInterface ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your bioinformatics file
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    FASTA, FASTQ, VCF, BAM, or other bioinformatics files
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".fasta,.fastq,.vcf,.bam,.csv,.txt"
                />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>

          <Button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm"
          >
            {isUploading ? "Processing..." : "Upload and Analyze"}
          </Button>

          {uploadStatus && (
            <p className={`mt-4 text-center ${uploadStatus.includes("successfully") ? "text-green-600" : uploadStatus.includes("Uploading") ? "text-blue-600" : "text-red-600"}`}>
              {uploadStatus}
            </p>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="border-b p-4">
            <h2 className="font-bold text-lg">Analysis Chat Interface</h2>
            <p className="text-sm text-gray-600">File: {file?.name}</p>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.type === "user" ? "text-right" : ""}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-md ${
                    message.type === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white">
            <div className="flex flex-wrap gap-2 mb-4">
              <p className="text-sm text-gray-500 w-full mb-1">Suggested queries:</p>
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuery(query)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded-full text-gray-700"
                >
                  {query}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Type your query about the uploaded file..."
                className="flex-grow p-2 border rounded-md"
                onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
              />
              <Button onClick={handleSendQuery} className="bg-black text-white">
                Send
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
