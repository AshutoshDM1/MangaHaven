import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Allow requests from any origin
  response.headers.set('Access-Control-Allow-Origin', '*')

  // Allow specific HTTP methods
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Allow specific headers
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Allow credentials (if needed)
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 })
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
