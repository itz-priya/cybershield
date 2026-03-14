import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-super-secret-key-for-development'
)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  
  // Public paths
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/api/auth')) {
    if (token && request.nextUrl.pathname === '/login') {
      try {
        await jwtVerify(token, JWT_SECRET)
        // If logged in, redirect away from login page to dashboard
        return NextResponse.redirect(new URL('/', request.url))
      } catch (err) {
        // invalid token, allow to visit login
      }
    }
    return NextResponse.next()
  }

  // Protected paths (anything else)
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    
    // Add role header for backend checking
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-role', verified.payload.role as string || 'user')

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    // Invalid or expired token
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth-token')
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
