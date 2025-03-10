
import { NextResponse } from 'next/server';

export const maxDuration = 300; // Increasing timeout for longer queries

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
      "fileName": body.fileName || "" // Make fileName optional
    };

    // Add debug logging to identify issues
    console.log("Sending query to external API:", JSON.stringify(requestBody));

    // Use HTTPS for external API in production
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? "https://206.1.35.40:3002/ask"  // Use HTTPS in production if supported
      : "http://206.1.35.40:3002/ask";  // Use HTTP in development

    try {
      // Forward the request to the external API
      const externalResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(240000) // 4 minute timeout
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
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: `Failed to connect to external API: ${fetchError.message}` },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
