"use client";

import { useState } from "react";
import axios from "axios";

const AskPage = () => {
  const [fileName, setFileName] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsk = async () => {
    if (!fileName || !query) {
      setMessage("Please enter both filename and query.");
      return;
    }

    setLoading(true); // Start loading
    setMessage("Processing your request...");

    try {
      // Use relative API URL instead of hardcoded localhost
      const response = await axios.post("/api/ask", {
        query: query,
        fileName: fileName,
      });

      setResult(response.data.htmlContent);
      setMessage(response.data.message || "Request processed successfully");
      console.log("Ask response:", response.data);
    } catch (error) {
      console.error("Ask error:", error);
      setMessage(error.response?.data?.error || "Error processing request. Please try again.");
      setResult(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Ask a Query on Uploaded File</h2>
      <input
        type="text"
        placeholder="Enter File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="mt-3 border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Enter Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-3 border p-2 w-full"
      />
      <button
        onClick={handleAsk}
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit Query"}
      </button>

      {loading && <p className="mt-3 text-yellow-500">Processing your request, please wait...</p>}

      {message && <p className="mt-5 font-bold">{message}</p>}

      {result && (
        <div className="mt-5 p-3 border">
          <h3 className="font-bold">Result:</h3>
          <iframe
            srcDoc={result}
            className="w-full h-[500px] border rounded-lg"
            title="Generated Report"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default AskPage;