
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.query || !body.filename) {
      return NextResponse.json(
        { error: 'Both query and filename are required' },
        { status: 400 }
      );
    }

    // Format the request exactly as shown in Postman - MUST match the format
    const requestBody = {
      "query": `"${body.query}"`,
      "filename": `"${body.filename}"`
    };

    console.log("Sending query to external API:", requestBody);
    
    // Forward the request to the external API - exactly match the Postman format
    const response = await fetch("http://206.1.35.40:3002/ask", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // Save the response text - don't try to parse JSON immediately
    const responseText = await response.text();
    console.log("Raw API response:", responseText);
    
    if (!response.ok) {
      console.error("Query API error:", response.status, responseText);
      return NextResponse.json(
        { error: `External API error: ${response.status} - ${responseText}` },
        { status: response.status }
      );
    }

    try {
      // Try to parse the response as JSON
      const responseData = JSON.parse(responseText);
      console.log("Got successful response:", responseData);
      return NextResponse.json(responseData);
    } catch (parseError) {
      // If it's not valid JSON, return the raw text
      console.log("Response is not JSON, returning as text content");
      return NextResponse.json({ 
        status: "success",
        content: responseText 
      });
    }
    
  } catch (error: any) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
