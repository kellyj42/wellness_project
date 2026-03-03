import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware for Sanity Studio
 * Authentication is now handled by Sanity's built-in user management system
 * Users must log in with their Sanity account to access the studio
 */

export function middleware(request: NextRequest) {
  // Sanity Studio authentication is handled automatically by next-sanity
  // No custom token verification needed
  return NextResponse.next()
}

export const config = {
  matcher: ['/sanity/:path*']
}
