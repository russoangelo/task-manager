import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl

  const publicPages = ['/login', '/register']

  const isPublicPage = publicPages.some((page) => pathname.startsWith(page))

  if(!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if(accessToken && isPublicPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}