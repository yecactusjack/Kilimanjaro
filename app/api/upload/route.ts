
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

    console.log("Uploading file:", file.name, "Size:", file.size);
    
    // Create a new FormData to send to the external API
    const externalFormData = new FormData();
    // Make sure the key is 'file' as required by the external API
    externalFormData.append('file', file);
    
    // Forward the file to the external API
    const externalResponse = await fetch("http://206.1.35.40:3002/upload", {
      method: "POST",
      body: externalFormData
    });
    
    // Handle the response from the external API
    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      console.error("External API error:", externalResponse.status, errorText);
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status}` },
        { status: externalResponse.status }
      );
    }
    
    const responseData = await externalResponse.json();
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
