
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    // Mock response for now
    // In a real implementation, you would process the query
    return NextResponse.json({
      response: `Response to query: ${query}`,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing query' },
      { status: 500 }
    );
  }
}
