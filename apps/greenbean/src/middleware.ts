import { NextRequest, NextResponse } from 'next/server'

const STUDIO_AUTH_TOKEN = process.env.STUDIO_AUTH_TOKEN

export function middleware(request: NextRequest) {
  // Only protect /sanity routes
  if (request.nextUrl.pathname.startsWith('/sanity')) {
    // Check if token is provided
    const token = request.headers.get('x-studio-token') || 
                  request.nextUrl.searchParams.get('token')
    
    // Allow if no token is set (development mode)
    if (!STUDIO_AUTH_TOKEN) {
      console.warn('⚠️ STUDIO_AUTH_TOKEN not set. Sanity Studio is publicly accessible.')
      return NextResponse.next()
    }
    
    // Check if token matches
    if (token !== STUDIO_AUTH_TOKEN) {
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/sanity/:path*']
}
