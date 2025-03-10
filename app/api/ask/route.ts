import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Add debug logging to identify issues
    console.log("Sending query to external API:", JSON.stringify(body));

    // Forward the request to the external API
    const externalResponse = await axios.post('http://206.1.35.40:3002/ask', body, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' // Handle potential HTML responses
    })

    // Check if the external API request was successful
    if (!externalResponse.status.toString().startsWith('2')) {
      let errorText;
      try {
        errorText = externalResponse.data;
        console.error("External API error:", externalResponse.status, errorText);
      } catch (e) {
        errorText = "Could not parse error response";
        console.error("External API error:", externalResponse.status, "Could not parse error response");
      }
      return NextResponse.json(
        { error: `External API error: ${externalResponse.status} - ${errorText}` },
        { status: externalResponse.status }
      );
    }


    // Process the successful response
    return NextResponse.json(JSON.parse(externalResponse.data), { status: 200 });

  } catch (error: any) {
    console.error('Error processing ask request:', error)
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    )
  }
}