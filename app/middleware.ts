// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req : Request) {
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers: response.headers });
  }

  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: '/api/:path*',
};
