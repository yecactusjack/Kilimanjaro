
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

    // Forward the request to the external API
    const externalResponse = await fetch("http://206.1.35.40:3002/ask", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Check if the external API request was successful
    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status} - ${errorText}` },
        { status: externalResponse.status }
      );
    }

    // Get the response from the external API
    const responseText = await externalResponse.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON response from external API', rawResponse: responseText },
        { status: 500 }
      );
    }

    // Return the external API response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ask error:', error);
    return NextResponse.json(
      { error: 'Error processing query', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
