
"use client"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Upload response:", data)
      
      setIsUploading(false)
      setUploadStatus("success")
    } catch (error) {
      console.error("Upload error:", error)
      setIsUploading(false)
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload file")
    }
  }

  const acceptedFormats = [
    ".fasta", ".fa", ".fastq", ".fq", ".fastq.gz", ".fq.gz",
    ".bam", ".sam", ".vcf", ".gtf", ".gff",
    ".txt", ".csv", ".tsv", ".xls", ".xlsx"
  ]

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
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-2">Upload Bioinformatics Data</h3>
              <p className="text-gray-600">
                Upload your FASTA, FASTQ, BAM, VCF or other bioinformatics files for analysis
              </p>
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-black bg-gray-50 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-10 w-10 mb-2" />
                  <p className="mb-2 text-sm text-gray-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">Supported formats: FASTA, FASTQ, BAM, VCF, etc.</p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept={acceptedFormats.join(",")}
                  onChange={handleFileChange}
                />
              </label>
              
              {file && (
                <div className="w-full bg-gray-50 p-4 flex justify-between items-center mb-4 mt-4 border border-black">
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-black text-white hover:bg-gray-800 rounded-none"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="w-full flex items-center p-4 bg-green-50 text-green-700 mb-4 border border-green-200">
                  <CheckCircle className="mr-2" size={20} />
                  <p>File uploaded successfully! You can now analyze it.</p>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="w-full flex items-center p-4 bg-red-50 text-red-700 mb-4 border border-red-200">
                  <AlertCircle className="mr-2" size={20} />
                  <p>{errorMessage || "An error occurred during upload."}</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 border border-black">
              <h4 className="font-bold mb-2">Supported File Formats</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="bg-white p-2 border border-gray-200">FASTA (.fa, .fasta)</div>
                <div className="bg-white p-2 border border-gray-200">FASTQ (.fq, .fastq)</div>
                <div className="bg-white p-2 border border-gray-200">BAM/SAM</div>
                <div className="bg-white p-2 border border-gray-200">VCF</div>
                <div className="bg-white p-2 border border-gray-200">GFF/GTF</div>
                <div className="bg-white p-2 border border-gray-200">CSV/TSV</div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card className="p-6 border-black rounded-none">
            <h3 className="text-xl font-bold mb-4">Previous Uploads</h3>
            {/* Sample upload history */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 flex justify-between items-center border border-black">
                <div>
                  <p className="font-medium">sample_1.fastq.gz</p>
                  <p className="text-sm text-gray-500">Uploaded on March 10, 2025</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-black rounded-none"
                >
                  View Analysis
                </Button>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between items-center border border-black">
                <div>
                  <p className="font-medium">genome_assembly.fasta</p>
                  <p className="text-sm text-gray-500">Uploaded on March 8, 2025</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-black rounded-none"
                >
                  View Analysis
                </Button>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between items-center border border-black">
                <div>
                  <p className="font-medium">variants.vcf</p>
                  <p className="text-sm text-gray-500">Uploaded on March 5, 2025</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-black rounded-none"
                >
                  View Analysis
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
