
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log("Uploading file:", file.name);
    
    // Create a new FormData to send to the external API
    const externalFormData = new FormData();
    externalFormData.append('file', file);
    
    // Forward the file to the external API
    const response = await fetch("http://206.1.35.40:3002/upload", {
      method: "POST",
      body: externalFormData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("External API error:", response.status, errorText);
      return NextResponse.json(
        { error: `Server responded with status: ${response.status}` },
        { status: response.status }
      );
    }
    
    try {
      // First try to get the response as text
      const responseText = await response.text();
      console.log("Raw upload response:", responseText);
      
      try {
        // Then try to parse it as JSON
        const jsonData = JSON.parse(responseText);
        return NextResponse.json(jsonData);
      } catch (jsonError) {
        // If it's not valid JSON, return success with the filename
        console.log("Response is not JSON, returning filename");
        return NextResponse.json(
          { filename: file.name, message: "File uploaded successfully" },
          { status: 200 }
        );
      }
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return NextResponse.json(
        { filename: file.name, message: "File uploaded successfully" },
        { status: 200 }
      );
    }
    
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
