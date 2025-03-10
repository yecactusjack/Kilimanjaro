"use client";

import { useState, useRef } from "react";
import axios from "axios";

export default function ChatPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setUploadStatus("");
      setResponse("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first!");
      return;
    }

    setLoading(true);
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus("File uploaded successfully!");
      setFilename(file.name);
      console.log("Uploaded file:", file.name);

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus(`Error uploading file: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuery = async () => {
    if (!query.trim()) {
      setResponse("Please enter a query.");
      return;
    }

    if (!filename) {
      setResponse("Please upload a file first.");
      return;
    }

    setLoading(true);
    setResponse("Processing query...");

    try {
      console.log("Sending query with file:", query, filename);

      const response = await axios.post("/api/ask", {
        query: query,
        filename: filename
      });

      setResponse(response.data.status || JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      console.error("Query error:", error);
      const errorMsg = error.response?.data?.error || error.message;
      console.error("Query API error:", error.response?.status, error.response?.data);
      setResponse(`Error processing query: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-8">Bioinformatics Tool</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Upload FASTQ File</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded w-full md:w-2/3"
              accept=".fastq,.fq"
              ref={fileInputRef}
            />
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`px-4 py-2 rounded font-semibold ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loading ? "Processing..." : "Upload"}
            </button>
          </div>
          {uploadStatus && (
            <p className={`mt-2 ${uploadStatus.includes("Error") ? "text-red-500" : "text-green-500"}`}>
              {uploadStatus}
            </p>
          )}
        </div>

        {filename && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Query</h2>
            <div className="flex flex-col gap-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query (e.g., 'run fastqc on this')"
                className="border p-2 rounded w-full h-24"
                disabled={loading}
              />
              <button
                onClick={handleSubmitQuery}
                disabled={loading || !query.trim()}
                className={`px-4 py-2 rounded font-semibold ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {loading ? "Processing..." : "Submit Query"}
              </button>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Result</h2>
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              <pre className="whitespace-pre-wrap">{response}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}