
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
      query: body.query,
      filename: body.filename || ""
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
      const errorText = await externalResponse.text();
      console.error("External API error:", externalResponse.status, errorText);
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status} - ${errorText}` },
        { status: externalResponse.status }
      );
    }

    // Get the response from the external API
    const responseData = await externalResponse.text();
    
    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(responseData);
      return NextResponse.json(jsonData);
    } catch (e) {
      // If it's not JSON, return as text
      return NextResponse.json({ 
        message: responseData 
      });
    }
  } catch (error) {
    console.error('Ask error:', error);
    return NextResponse.json(
      { error: 'Error processing query', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
