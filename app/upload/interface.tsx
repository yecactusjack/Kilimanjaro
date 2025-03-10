
"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, X } from "lucide-react"
import axios from "axios"
import Link from "next/link"

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setFileSize(formatFileSize(selectedFile.size))
      setUploadError(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      setFileName(droppedFile.name)
      setFileSize(formatFileSize(droppedFile.size))
      setUploadError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    // Create form data with the required "file" key
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Use our API route instead of directly calling the external API
      // This helps avoid CORS issues in the browser
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setUploadComplete(true)

      // Redirect to ask page after short delay
      setTimeout(() => {
        window.location.href = "/ask"
      }, 2000)
    } catch (error) {
      console.error("Error uploading file:", error);
      let errorMessage = "Failed to upload file. Please try again.";

      if (error.response) {
        errorMessage = `Server error: ${error.response.status} - ${error.response.data?.message || error.message}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      setUploadError(errorMessage);
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 border-dashed">
        <div 
          className="flex flex-col items-center justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!file ? (
            <>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                <Upload size={28} />
              </div>
              <h2 className="text-xl font-medium mb-2">Upload a bioinformatics file</h2>
              <p className="text-gray-500 mb-6 text-center">
                Supported formats: FASTQ, FASTA, SAM, BAM, VCF, GFF
              </p>
              <Button asChild className="relative">
                <label>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept=".fastq,.fq,.fasta,.fa,.sam,.bam,.vcf,.gff,.gtf"
                  />
                  <span className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" /> Select File
                  </span>
                </label>
              </Button>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 mr-3">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{fileName}</div>
                  <div className="text-sm text-gray-500">{fileSize}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setFile(null)
                    setFileName("")
                    setFileSize("")
                  }}
                >
                  <X size={18} />
                </Button>
              </div>

              {uploadError && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
                  {uploadError}
                </div>
              )}

              {!uploadComplete ? (
                <Button 
                  className="w-full" 
                  onClick={handleUpload} 
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload File"}
                </Button>
              ) : (
                <div className="text-center text-green-600 font-medium">
                  Upload complete! Redirecting to analysis...
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
