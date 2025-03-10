import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setErrorMessage("")
      setUploadSuccess(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    setErrorMessage("")

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Success handling
      setUploadSuccess(true)
      setFile(null)
    } catch (error) {
      console.error('Upload error:', error)
      setErrorMessage("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="border-black rounded-none p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <Upload className="mr-2" /> Upload File
          </h2>
          <p className="text-gray-600">
            Upload your genomic data for analysis
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-none p-8 text-center hover:border-black transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <FileText size={48} className="mb-2 text-blue-600" />
                <p className="text-lg font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload size={48} className="mb-2 text-gray-400" />
                <p className="text-lg">Drag and drop your file here, or click to browse</p>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: FASTQ, FASTA, BAM, SAM, VCF
                </p>
              </div>
            )}
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept=".fastq,.fq,.fasta,.fa,.bam,.sam,.vcf"
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 text-center">{errorMessage}</div>
          )}

          {uploadSuccess && (
            <div className="bg-green-100 text-green-800 p-3 text-center rounded">
              File uploaded successfully!
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isUploading || !file} 
            className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-12"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </Card>
    </div>
  )
}