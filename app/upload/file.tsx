
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first!");
      return;
    }

    setIsLoading(true);
    setUploadStatus("Uploading...");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Use relative API URL instead of hardcoded localhost
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus("File uploaded successfully!");
      console.log("Uploaded file:", file.name);
    } catch (error) {
      setUploadStatus("File upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Upload a File</h2>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/80"
            />
          </div>
          <Button 
            onClick={handleUpload}
            disabled={isLoading || !file}
            className="bg-green-500 hover:bg-green-600"
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </Button>
          
          {uploadStatus && (
            <div className={`mt-4 p-4 rounded ${uploadStatus.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {uploadStatus}
            </div>
          )}
          
          {uploadStatus.includes("success") && (
            <div className="mt-4">
              <p className="mb-2">You can now analyze this file:</p>
              <Link href="/ask" className="text-primary hover:underline">
                Go to Query Page
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;
