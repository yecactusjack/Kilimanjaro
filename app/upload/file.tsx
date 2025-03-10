
"use client";

import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus("File uploaded successfully!");
      console.log("Upload response:", response.data);
    } catch (error) {
      setUploadStatus("File upload failed.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Upload File</h2>
      <input type="file" onChange={handleFileChange} className="mt-3 border p-2" />
      <button onClick={handleUpload} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
    </div>
  );
};

export default UploadPage;
