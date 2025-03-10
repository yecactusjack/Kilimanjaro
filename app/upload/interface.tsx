"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"
import axios from "axios"

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    formData.append("file", file)

    try {
      // Send directly to the external API
      const response = await axios.post("http://206.1.35.40:3002/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setUploadStatus("File uploaded successfully!")
      console.log("Uploaded file:", file.name)

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
    <div className="max-w-3xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Your Bioinformatics File</h2>
        <p className="mb-6 text-gray-600">
          Upload your file to analyze with our AI-powered tools.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-gray-700 font-medium mb-1">Click to upload</span>
            <span className="text-sm text-gray-500">or drag and drop</span>
            <span className="text-xs text-gray-500 mt-2">
              Supports FASTA, FASTQ, and other bioinformatics formats
            </span>
          </label>
        </div>

        {file && (
          <div className="flex items-center p-3 bg-gray-50 rounded-md mb-4">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700 mr-2 flex-grow truncate">
              {file.name}
            </span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
        )}

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
      </Card>
    </div>
  )
}