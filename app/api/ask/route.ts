import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    // Send the request to the external API
    const response = await axios.post('http://206.1.35.40:3002/ask', body)

    // Return the response data
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error forwarding request to external API:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}