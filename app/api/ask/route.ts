
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    // Format the request exactly as shown in Postman
    const requestBody = {
      "query": body.query,
      "fileName": body.fileName || body.filename // Handle both parameter formats
    };

    console.log("Sending query to external API:", requestBody);
    
    // Forward the request to the external API
    const externalResponse = await fetch("http://206.1.35.40:3002/ask", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // Check if the external API request was successful
    if (!externalResponse.ok) {
      let errorText;
      try {
        errorText = await externalResponse.text();
        console.error("External API error:", externalResponse.status, errorText);
      } catch (e) {
        errorText = "Could not parse error response";
        console.error("External API error:", externalResponse.status, "Could not parse error response");
      }
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status} - ${errorText}` },
        { status: 500 }
      );
    }

    // Process the successful response
    const responseData = await externalResponse.json();
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
