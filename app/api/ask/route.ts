
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

    // Format the request exactly as shown in Postman
    const requestBody = {
      "query": body.query,
      "filename": body.filename
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

    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || `External API error: ${response.status}`;
      } catch (e) {
        const errorText = await response.text();
        errorMessage = `External API error: ${response.status} - ${errorText}`;
      }
      
      console.error("Query API error:", response.status, errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Process the successful response
    const responseData = await response.json();
    console.log("Got successful response:", responseData);
    return NextResponse.json(responseData);
    
  } catch (error: any) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
