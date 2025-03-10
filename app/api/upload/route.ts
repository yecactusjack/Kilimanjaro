
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Here you would typically process the file
    // For now, we'll just return success
    
    return NextResponse.json({
      success: true,
      filename: file.name,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing upload' },
      { status: 500 }
    );
  }
}
