
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
          <Card className="border-black rounded-none p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Upload Your File</h3>
              <p className="text-gray-500">
                Supported formats: PDF, TXT, CSV, XLSX, DOCX
              </p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-gray-100 rounded-lg mb-2">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.txt,.csv,.xlsx,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg mb-2">
                      <Upload className="h-6 w-6 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 50MB
                    </p>
                  </label>
                </div>
              )}
            </div>
            
            {uploadStatus === "success" && (
              <div className="flex items-center p-3 mb-6 bg-green-50 text-green-700 rounded-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>File uploaded successfully!</span>
              </div>
            )}
            
            {uploadStatus === "error" && (
              <div className="flex items-center p-3 mb-6 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="w-full rounded-none bg-black text-white hover:bg-gray-800"
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card className="p-6 border-black">
            <h3 className="text-xl font-bold mb-4">Previous Uploads</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium">document.pdf</p>
                  <p className="text-sm text-gray-500">Uploaded on March 10, 2025</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-black rounded-none"
                >
                  View File
                </Button>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium">spreadsheet.xlsx</p>
                  <p className="text-sm text-gray-500">Uploaded on March 8, 2025</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-black rounded-none"
                >
                  View File
                </Button>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium">report.docx</p>
                  <p className="text-sm text-gray-500">Uploaded on March 5, 2025</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-black rounded-none"
                >
                  View File
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
