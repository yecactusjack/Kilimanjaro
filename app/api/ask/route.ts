
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get data from the client-side
    const body = await request.json();
    const { query, fileName } = body;
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'No file has been uploaded. Please upload a file first.' },
        { status: 400 }
      );
    }

    // Forward the request to the external API
    const externalResponse = await fetch("http://206.1.35.40:3002/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        fileName
      })
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
    
    // First check the content type of the response
    const contentType = externalResponse.headers.get('Content-Type');
    
    try {
      // Try to parse as JSON first regardless of content type
      const responseData = await externalResponse.json();
      return NextResponse.json(responseData);
    } catch (e) {
      // If JSON parsing fails, get as text and wrap in a JSON response
      const responseText = await externalResponse.text();
      return NextResponse.json({ response: responseText });
    }
    
  } catch (error) {
    console.error("Ask API error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
