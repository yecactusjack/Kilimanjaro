
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

    // Forward the request to the external API
    const externalResponse = await fetch("http://206.1.35.40:3002/upload", {
      method: "POST",
      body: formData,
    });

    // Check if the external API request was successful
    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      console.error("External API upload error:", externalResponse.status, errorText);
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status} - ${errorText}` },
        { status: externalResponse.status }
      );
    }

    // Try to get JSON response from the external API
    try {
      const data = await externalResponse.json();
      return NextResponse.json(data);
    } catch (e) {
      // If response is not JSON, try to get text
      const text = await externalResponse.text();
      return NextResponse.json(
        { message: 'File uploaded successfully', rawResponse: text },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error processing upload', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
