
"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileInfo({
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size)
      })
      setUploadError(null)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setFileInfo({
        name: droppedFile.name,
        size: formatFileSize(droppedFile.size)
      })
      setUploadError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    
    setIsUploading(true)
    setUploadError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('http://206.1.35.40:3002/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }
      
      setUploadComplete(true)
      
      // Redirect to chat page with filename as query param
      setTimeout(() => {
        window.location.href = `/chat?fileName=${encodeURIComponent(file.name)}`
      }, 1500)
      
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Failed to upload file. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Upload Bioinformatics Data</h1>
      
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-center">Upload Dataset</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center"
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
                      accept=".fastq,.fq,.fasta,.fa,.sam,.bam,.vcf,.gff,.gtf"
                      ref={fileInputRef}
                    />
                    <span className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" /> Select File
                    </span>
                  </label>
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  or drag and drop your file here
                </p>
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 mr-3">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium truncate">{fileInfo?.name}</h3>
                    <p className="text-xs text-gray-500">{fileInfo?.size}</p>
                  </div>
                  
                  {!isUploading && !uploadComplete && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setFile(null)
                        setFileInfo(null)
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                {uploadError && (
                  <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded-md">
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
        </CardContent>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have a file? <a href="/chat" className="text-blue-500 hover:underline">Go to Chat Interface</a>
        </p>
      </div>
    </div>
  )
}
