
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

    if (!body.fileName) {
      return NextResponse.json(
        { error: 'No fileName provided' },
        { status: 400 }
      );
    }

    // Format the request exactly as shown in Postman
    const requestBody = {
      "query": body.query,
      "fileName": body.fileName
    };

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
      } catch (e) {
        errorText = "Could not parse error response";
      }
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status} - ${errorText}` },
        { status: 500 }
      );
    }

    // Return the response from the external API
    const responseData = await externalResponse.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
