
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"
import axios from "axios"
import Link from "next/link"

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setUploadStatus("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first!")
      return
    }

    setIsLoading(true)
    setUploadStatus("Uploading...")

    const formData = new FormData()
    // Make sure the key is "file" as expected by the API
    formData.append("file", file)

    try {
      // Send to the API endpoint
      const response = await fetch("http://206.1.35.40:3002/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }

      const data = await response.json()
      setUploadStatus("File uploaded successfully!")
      setUploadedFileName(file.name)
      
      // Store the file name in localStorage for use in the ask page
      localStorage.setItem("uploadedFileName", file.name)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadStatus("File upload failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 shadow-lg">
        <div className="text-center mb-6">
          <Upload className="h-12 w-12 text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Upload File</h2>
          <p className="text-muted-foreground">
            Upload your bioinformatics file for analysis
          </p>
        </div>

        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-muted-foreground mb-1">
                {file ? file.name : "Click to select a file"}
              </p>
              <p className="text-xs text-gray-400">
                {file ? `Size: ${(file.size / 1024).toFixed(2)} KB` : ""}
              </p>
            </label>
          </div>
        </div>

        <Button
          onClick={handleUpload}
          className="w-full"
          disabled={!file || isLoading}
        >
          {isLoading ? "Uploading..." : "Upload File"}
        </Button>

        {uploadStatus && (
          <div
            className={`mt-4 p-3 rounded-md ${
              uploadStatus.includes("successfully")
                ? "bg-green-50 text-green-500"
                : uploadStatus.includes("Uploading")
                ? "bg-blue-50 text-blue-500"
                : "bg-red-50 text-red-500"
            }`}
          >
            {uploadStatus}
          </div>
        )}

        {uploadedFileName && (
          <div className="mt-4 text-center">
            <p>Ready to analyze your file?</p>
            <Link 
              href="/ask" 
              className="text-primary hover:underline mt-2 inline-block"
            >
              Go to Analysis Page
            </Link>
          </div>
        )}
      </Card>
    </div>
  )
}
