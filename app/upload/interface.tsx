"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadSuccess(true);
      console.log("Uploaded file:", fileName);
      router.push("/ask");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Genomic Data</h1>
      <div className="upload-container">
        <div className="mb-6 flex justify-center">
          <div className="beta-badge">Beta 1.0 Kilimanjaro</div>
        </div>
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Upload FASTQ File</CardTitle>
            <CardDescription>Drag and drop your file or click to browse</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div
              className="upload-dropzone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept=".fastq,.fq,.fastq.gz,.fq.gz"
                onChange={handleFileChange}
                className="hidden"
              />
              {fileName ? (
                <div>
                  <p className="text-primary font-medium">{fileName}</p>
                  <p className="text-sm text-muted-foreground mt-2">File selected</p>
                </div>
              ) : (
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-lg mb-2 font-medium">Drop your FASTQ file here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Button 
                onClick={handleUpload} 
                disabled={!file || uploading} 
                className="w-full py-6 text-base font-medium"
              >
                {uploading ? "Uploading..." : "Upload and Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}