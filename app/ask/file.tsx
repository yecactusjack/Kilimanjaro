"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

export default function AskInterface() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const res = await axios.post("/api/ask", {
        query: query.trim(),
        // You may need to store and retrieve the file name if needed by the API
        // fileName: localStorage.getItem("uploadedFileName") 
      })

      setResponse(res.data.response || JSON.stringify(res.data))
    } catch (err) {
      console.error("Error sending query:", err)
      setError("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Ask About Your Bioinformatics File</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Textarea
              placeholder="What would you like to know about your file? (e.g., 'What species are identified in my sample?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="bg-primary" 
            disabled={isLoading || !query.trim()}
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
          </div>
        )}
      </Card>
    </div>
  )
}