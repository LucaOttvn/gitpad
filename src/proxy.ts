import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  // Read encrypted cookie, then return the custom JWT with the accessToken prop added by the NextAuth handler defined in app/api/auth/[...nextauth]/route.ts
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  // Redirect to the login page if the token isn't available.
  if (!token) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  const pathname = req.nextUrl.pathname

  const selectedRepo = req.cookies.get('selectedRepo')?.value

  if (!selectedRepo && !pathname.startsWith('/settings') && pathname !== '/settings') {
    const settingsUrl = new URL("/settings", req.url)
    return NextResponse.redirect(settingsUrl)
  }

  return NextResponse.next()
}

// Only run on certain routes (not the login page).
export const config = {
  matcher: ["/file-editor/:path*", "/file-explorer/:path*", "/settings/:path*"]
}

