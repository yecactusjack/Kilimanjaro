
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

export default function AskInterface() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  // Try to get fileName from localStorage on component mount
  useEffect(() => {
    const storedFileName = localStorage.getItem("uploadedFileName")
    if (storedFileName) {
      setFileName(storedFileName)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    if (!fileName) {
      setError("Please upload a file first before asking questions.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Send directly to the external API
      const res = await axios.post("http://206.1.35.40:3002/ask", {
        query: query.trim(),
        fileName: fileName
      })

      setResponse(res.data.message || JSON.stringify(res.data))
    } catch (err) {
      console.error("Error sending query:", err)
      setError("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!response) return

    // Create a blob with the response as HTML
    const blob = new Blob([response], { type: 'text/html' })
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
    <div className="max-w-3xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Ask About Your Bioinformatics File</h2>
        
        {fileName ? (
          <div className="mb-4 p-3 bg-blue-50 text-blue-500 rounded-md">
            Currently analyzing: {fileName}
          </div>
        ) : (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-500 rounded-md">
            Please upload a file first from the Upload page.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Textarea
              placeholder="What would you like to know about your file? (e.g., 'Run fastqc on this.')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="bg-primary" 
            disabled={isLoading || !query.trim() || !fileName}
          >
            {isLoading ? "Processing..." : "Submit Query"}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Response:</h3>
            <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
              {response}
            </div>
            <Button 
              onClick={handleDownload}
              className="mt-4"
              variant="outline"
            >
              Download Response
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
