import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system:
      "You are an AI assistant for Goldbach Labs, a company that automates bioinformatics pipelines. Based on the user's dataset description and desired results, recommend the most suitable algorithm(s) from the following list: Bowtie, BWA, STAR, HISAT2, GATK, SHRiMP, and Canu. Explain why the recommended algorithm(s) are suitable for their specific task and data type. Provide a brief explanation of how the algorithm(s) work and their advantages.",
  })
  return result.toDataStreamResponse()
}

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

    // In a real implementation, you would process the query here
    // For now, we'll return a mock response
    
    const mockResponse = `I've analyzed your query: "${query}" for file "${fileName || 'unknown'}". 
    
This is a simulated response for demonstration purposes. In a production environment, this would connect to your bioinformatics processing backend.`;
    
    return NextResponse.json({
      response: mockResponse,
      success: true
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Error processing chat query' },
      { status: 500 }
    );
  }
}
