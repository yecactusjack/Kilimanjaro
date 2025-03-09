
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "../components/header";

export default function UploadInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<Array<{type: string, content: string}>>([
    {type: "system", content: "Welcome to Goldbach Labs' File Analysis Tool. Upload a bioinformatics file to begin."}
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setMessages([
        ...messages,
        {type: "system", content: `File "${selectedFile.name}" selected. What would you like to analyze?`}
      ]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessages([
        ...messages,
        {type: "system", content: "Please select a file first."}
      ]);
      return;
    }

    setLoading(true);
    setMessages([
      ...messages,
      {type: "user", content: `Analyze file: ${fileName}`}
    ]);
    
    // Simulating upload and processing delay
    setTimeout(() => {
      setLoading(false);
      setMessages(prev => [
        ...prev,
        {type: "system", content: "File uploaded successfully. You can now ask specific questions about the data."},
        {type: "system", content: "Suggested queries: \n- Identify gene expression patterns\n- Find DNA sequence variations\n- Analyze protein structures\n- Compare against reference genome"}
      ]);
      setUploadStatus("File uploaded successfully!");
    }, 2000);
  };

  const handleSubmitQuery = () => {
    if (!query.trim()) return;
    
    setMessages([
      ...messages,
      {type: "user", content: query}
    ]);
    setLoading(true);
    
    // Simulating processing delay
    setTimeout(() => {
      setLoading(false);
      setMessages(prev => [
        ...prev,
        {type: "system", content: "Analysis complete. Based on your query, I recommend using the GATK algorithm which is well-suited for identifying and analyzing genetic variants in your dataset. Would you like more specific information about any particular aspect of the results?"}
      ]);
      setQuery("");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-black hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4">Bioinformatics File Analysis</h1>
          <p className="text-gray-600">Upload your data files for intelligent analysis</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload File</label>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <Button 
                onClick={handleUpload} 
                className="mt-3 bg-black hover:bg-gray-800 text-white w-full"
                disabled={!file || loading}
              >
                {loading ? "Processing..." : "Upload & Analyze"}
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Suggested Analysis</h3>
              <div className="space-y-2">
                {["Gene expression analysis", "Variant calling", "Genome assembly", "Protein structure prediction"].map((suggestion, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start text-left border-gray-300 hover:bg-gray-100"
                    onClick={() => {
                      setQuery(suggestion);
                      setMessages([...messages, {type: "user", content: suggestion}]);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex-grow bg-white border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto h-[500px]">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${message.type === "user" ? "text-right" : "text-left"}`}
                >
                  <div 
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.type === "user" 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {message.content}
                    </pre>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-left mb-4">
                  <div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: "0ms"}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: "100ms"}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: "200ms"}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about your data..."
                className="flex-grow p-3 border border-gray-300 rounded-lg"
                onKeyDown={(e) => e.key === "Enter" && handleSubmitQuery()}
              />
              <Button 
                onClick={handleSubmitQuery} 
                className="bg-black hover:bg-gray-800 text-white px-6"
                disabled={!query.trim() || loading}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
