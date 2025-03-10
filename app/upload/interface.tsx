
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    
    if (selectedFile) {
      // Convert bytes to human-readable format
      const size = selectedFile.size < 1024 * 1024
        ? `${(selectedFile.size / 1024).toFixed(2)} KB`
        : `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
      
      setFileInfo({
        name: selectedFile.name,
        size: size
      })
    } else {
      setFileInfo(null)
    }
  }
  
  const handleUpload = async () => {
    if (!file) return
    
    setIsUploading(true)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsUploading(false)
    setUploadComplete(true)
    
    // Reset after a few seconds
    setTimeout(() => {
      setFile(null)
      setFileInfo(null)
      setUploadComplete(false)
    }, 3000)
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Your File</h1>
      
      <Card className="p-8 border-dashed">
        <div className="flex flex-col items-center justify-center">
          {!fileInfo ? (
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
                  <h3 className="text-sm font-medium truncate">{fileInfo.name}</h3>
                  <p className="text-xs text-gray-500">{fileInfo.size}</p>
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
          Need help with your file? <a href="/chat" className="text-blue-500 hover:underline">Chat with our assistant</a>
        </p>
      </div>
    </div>
  )
}
