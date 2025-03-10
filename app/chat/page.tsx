
"use client";

import { useState, useRef } from "react";

export default function ChatPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilename("");
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploaded file:", file.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      
      if (data.filename) {
        setFilename(data.filename);
        setQuery("run fastqc on this");
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(`Error uploading file: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuery = async () => {
    if (!filename || !query.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      console.log("Sending query with file:", query, filename);
      
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          filename: filename,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (data.content) {
        setResponse(data.content);
      } else if (data.status === "success" && data.message) {
        setResponse(data.message);
      } else if (data.html) {
        setResponse(data.html);
      } else if (typeof data === 'string') {
        setResponse(data);
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      console.error("Query error:", err);
      setError(`Error processing query: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Bioinformatics Analysis</h1>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Upload FASTQ File</h2>
          <div className="flex flex-col gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="border p-2 rounded"
              accept=".fastq,.fq"
              disabled={loading}
            />
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`px-4 py-2 rounded font-semibold ${
                loading || !file ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {filename && <p className="text-green-600 mt-2">File uploaded: {filename}</p>}
        </div>

        {filename && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
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
                  loading || !query.trim() ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {loading ? "Processing..." : "Submit Query"}
              </button>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
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
