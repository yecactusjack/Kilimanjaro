
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
    
    // Get the response content as JSON
    const responseData = await externalResponse.json();
    
    // Return the JSON content
    return NextResponse.json({ response: responseData });
    
  } catch (error) {
    console.error("Ask API error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
