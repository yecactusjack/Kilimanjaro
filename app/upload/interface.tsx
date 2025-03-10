
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
    
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      // Send file to API
      await axios.post("http://206.1.35.40:3002/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      
      setUploadComplete(true)
      
      // Redirect to chat after short delay
      setTimeout(() => {
        window.location.href = "/chat"
      }, 2000)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadError("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleRemoveFile = () => {
    setFile(null)
    setFileName("")
    setFileSize("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Your Bioinformatics File</h1>
      
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
                  <h3 className="text-sm font-medium truncate">{fileName}</h3>
                  <p className="text-xs text-gray-500">{fileSize}</p>
                </div>
                {!isUploading && !uploadComplete && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRemoveFile}
                  >
                    <X size={16} />
                  </Button>
                )}
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
      
      <div className="mt-6 text-center">
        <p className="text-gray-500">
          Need help with your file? <Link href="/chat" className="text-blue-500 hover:underline">Chat with our assistant</Link>
        </p>
      </div>
    </div>
  )
}
