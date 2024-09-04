import { NextResponse } from 'next/server';

export async function GET() {
  // Your GET handler logic here
  return NextResponse.json({ message: 'Hello from the manga API' });
}

