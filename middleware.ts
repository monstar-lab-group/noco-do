import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_IPS = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'development' || 
      process.env.NODE_ENV === 'test' || 
      process.env.CI === 'true') {
    return NextResponse.next();
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '';

  if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(clientIp)) {
    return new NextResponse('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
