"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsLoading(true);

    // Simulate file upload for now
    setTimeout(() => {
      setUploadStatus("File uploaded successfully!");
      setIsLoading(false);
    }, 1500);

    // Actual implementation would post to an API endpoint
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Upload Your File</h1>
        <p className="text-lg text-center mb-8">
          Upload your bioinformatics files to analyze with our AI assistant
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-black">
          <div className="mb-6">
            <label 
              htmlFor="file-upload" 
              className="block font-medium mb-2 text-lg"
            >
              Select File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handleUpload}
              disabled={!file || isLoading}
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full text-lg transition-all"
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              <Link href="/">
                Cancel
              </Link>
            </Button>
          </div>

          {uploadStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-green-100 text-green-800 rounded"
            >
              {uploadStatus}
              <div className="mt-2">
                <Button
                  asChild
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full text-lg transition-all"
                >
                  <Link href="/ask">
                    Continue to Chat <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}