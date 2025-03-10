
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, fileName } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    console.log("Processing query:", query, "for file:", fileName);
    
    // External API call
    try {
      const externalResponse = await fetch("http://206.1.35.40:3002/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, fileName })
      });
      
      if (!externalResponse.ok) {
        const errorText = await externalResponse.text();
        console.error("External API error:", externalResponse.status, errorText);
        return NextResponse.json(
          { error: `External API error: ${externalResponse.status}` },
          { status: externalResponse.status }
        );
      }
      
      const responseData = await externalResponse.json();
      return NextResponse.json(responseData);
    } catch (error) {
      console.error("External API call error:", error);
      
      // Fallback response for testing when external API is unavailable
      const mockResponse = `I've analyzed your query: "${query}" for file "${fileName || 'unknown'}". 
      
This is a simulated response for demonstration purposes. In a production environment, this would connect to your bioinformatics processing backend.`;
      
      return NextResponse.json({
        response: mockResponse,
        success: true
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Error processing chat query' },
      { status: 500 }
    );
  }
}
