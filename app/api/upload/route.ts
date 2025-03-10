
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
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // In a real implementation, you would process the file here
    // For now, we'll just return success to make the UI work
    
    return NextResponse.json({
      success: true,
      message: "File processed successfully",
      filename: file.name,
      suggestions: [
        "Analyze for quality metrics",
        "Check for sequence patterns",
        "Run FastQC analysis",
        "Identify common variants"
      ]
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error processing file upload' },
      { status: 500 }
    );
  }
}
