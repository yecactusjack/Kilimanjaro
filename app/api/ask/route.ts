
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get data from the client-side
    const body = await request.json();
    const { query, fileName } = body;
    
    if (!query || !fileName) {
      return NextResponse.json(
        { error: 'Query and fileName are required' },
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
    
    try {
      // Try to parse as JSON first
      const responseData = await externalResponse.json();
      // Return the JSON content directly without wrapping
      return NextResponse.json(responseData);
    } catch (jsonError) {
      // If JSON parsing fails, get as text
      const responseText = await externalResponse.text();
      // Return as JSON with text content
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
