"use client"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Interface() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setUploadStatus("idle")
    setErrorMessage("")
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadStatus("idle")

    try {
      // Simulate upload - replace with actual API call
      console.log("Uploaded file:", file.name)

      // Simulate successful upload after 1.5 seconds
      setTimeout(() => {
        setIsUploading(false)
        setUploadStatus("success")
      }, 1500)
    } catch (error) {
      console.error("Upload error:", error)
      setIsUploading(false)
      setUploadStatus("error")
      setErrorMessage("Failed to upload file. Please try again.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-none border border-black">
          <TabsTrigger value="upload" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white">
            Upload File
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white">
            Upload History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card className="p-6 border-black rounded-none">
            <div className="flex flex-col items-center">
              <div 
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-none flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-4"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload size={40} className="text-gray-400 mb-2" />
                <p className="text-lg text-gray-500">Drag and drop your file here or click to browse</p>
                <p className="text-sm text-gray-400 mt-2">
                  Supported formats: FASTQ, FASTA, BAM, SAM, VCF, BED, GTF, GFF, BCF, PAF, MAF, TXT, CSV
                </p>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".fastq,.fasta,.bam,.sam,.vcf,.bed,.gtf,.gff,.bcf,.paf,.maf,.txt,.csv,.fastq.gz,.fasta.gz"
                />
              </div>

              {file && (
                <div className="w-full mb-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-none">
                    <span className="font-medium truncate max-w-[250px]">{file.name}</span>
                    <Button 
                      onClick={() => setFile(null)} 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleUpload} 
                disabled={!file || isUploading}
                className="w-full rounded-none bg-black text-white hover:bg-gray-800"
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </Button>

              {uploadStatus === "success" && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-none w-full">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    <span>File uploaded successfully!</span>
                  </div>
                  <div className="mt-2">
                    <p>You can now analyze this file:</p>
                    <Button asChild className="mt-2 rounded-none bg-black text-white hover:bg-gray-800">
                      <Link href="/chat">
                        Go to Analysis Tools
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-none w-full flex items-center">
                  <AlertCircle className="text-red-500 mr-2" size={18} />
                  <span>{errorMessage || "An error occurred during upload."}</span>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="p-6 border-black rounded-none">
            <div className="text-center py-8">
              <p className="text-gray-500">No upload history available.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}