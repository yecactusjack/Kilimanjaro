import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

const UploadInterface = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus("File uploaded successfully!");
      console.log("Uploaded file:", file.name);

      // Automatically redirect to query page after successful upload
      setTimeout(() => {
        router.push("/ask");
      }, 1000);
    } catch (error) {
      setUploadStatus("File upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center">
            <UploadCloud className="h-16 w-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-6 text-center">Upload your file</h2>

            <div className="w-full mb-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer w-full block">
                {file ? (
                  <p className="text-blue-500 font-medium">{file.name}</p>
                ) : (
                  <div>
                    <p className="text-gray-500 mb-2">Drag and drop or click to browse</p>
                    <p className="text-xs text-gray-400">Support for FASTQ, FASTA, and other bioinformatics files</p>
                  </div>
                )}
              </label>
            </div>

            <Button 
              onClick={handleUpload}
              disabled={isLoading || !file}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-6 text-lg"
            >
              {isLoading ? "Uploading..." : "Upload and Analyze"}
            </Button>

            {uploadStatus && (
              <div className={`mt-4 p-2 rounded-md w-full text-center ${
                uploadStatus.includes("failed") 
                  ? "bg-red-50 text-red-600" 
                  : uploadStatus.includes("success")
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
              }`}>
                {uploadStatus}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadInterface;