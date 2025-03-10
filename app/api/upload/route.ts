
import { NextResponse } from 'next/server';

export const maxDuration = 300; // Increasing timeout for file uploads

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
    
    // Use HTTPS for external API in production
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? "https://206.1.35.40:3002/upload"  // Use HTTPS in production if supported
      : "http://206.1.35.40:3002/upload";  // Use HTTP in development
    
    try {
      // Forward the file to the external API
      const externalResponse = await fetch(apiUrl, {
        method: "POST",
        body: externalFormData,
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(240000) // 4 minute timeout
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
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: `Failed to connect to external API: ${fetchError.message}` },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
