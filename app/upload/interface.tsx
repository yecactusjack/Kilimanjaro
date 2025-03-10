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
          <Card className="p-6 border-black">
            <div className="flex flex-col items-center">
              <div 
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-none flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-4"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload size={40} className="text-gray-400 mb-2" />
                <p className="text-lg text-gray-500">Drag and drop your file here or click to browse</p>
                <p className="text-sm text-gray-400 mt-2">Supported formats: FASTQ, FASTA, BAM, SAM, VCF</p>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".fastq,.fasta,.bam,.sam,.vcf,.fastq.gz,.fasta.gz"
                />
              </div>

              {file && (
                <div className="w-full bg-gray-50 p-4 flex justify-between items-center mb-4">
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
                <div className="w-full flex items-center p-4 bg-green-50 text-green-700 mb-4">
                  <CheckCircle className="mr-2" size={20} />
                  <p>File uploaded successfully! You can now analyze it.</p>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="w-full flex items-center p-4 bg-red-50 text-red-700 mb-4">
                  <AlertCircle className="mr-2" size={20} />
                  <p>{errorMessage || "An error occurred during upload."}</p>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="w-full mt-4">
                  <h3 className="text-xl font-bold mb-4">Analysis Options</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="p-6 h-auto text-left flex items-start border-black rounded-none"
                    >
                      <div>
                        <p className="font-bold">Quality Control</p>
                        <p className="text-sm text-gray-600 mt-1">Run FastQC to check sequence quality</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="p-6 h-auto text-left flex items-start border-black rounded-none"
                    >
                      <div>
                        <p className="font-bold">Trimming</p>
                        <p className="text-sm text-gray-600 mt-1">Trim adapters and low-quality bases</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="p-6 h-auto text-left flex items-start border-black rounded-none"
                    >
                      <div>
                        <p className="font-bold">Alignment</p>
                        <p className="text-sm text-gray-600 mt-1">Align sequences to a reference genome</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="p-6 h-auto text-left flex items-start border-black rounded-none"
                    >
                      <div>
                        <p className="font-bold">Variant Calling</p>
                        <p className="text-sm text-gray-600 mt-1">Identify variants in your sequence</p>
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="p-6 border-black">
            <h3 className="text-xl font-bold mb-4">Previous Uploads</h3>
            {/* Sample upload history */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 flex justify-between items-center">
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
              <div className="p-4 bg-gray-50 flex justify-between items-center">
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
              <div className="p-4 bg-gray-50 flex justify-between items-center">
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