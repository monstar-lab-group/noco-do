import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  const isProtectedPath = 
    request.nextUrl.pathname.startsWith('/api') || 
    request.nextUrl.pathname.startsWith('/uploads') ||
    request.nextUrl.pathname.includes('.mp4') ||
    request.nextUrl.pathname.includes('.webm');

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  if (!authHeader.startsWith('Basic ')) {
    return new NextResponse('Invalid authentication method', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    const expectedUsername = process.env.BASIC_AUTH_USERNAME || 'admin';
    const expectedPassword = process.env.BASIC_AUTH_PASSWORD || 'password';

    if (username === expectedUsername && password === expectedPassword) {
      return NextResponse.next();
    } else {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  } catch (error) {
    return new NextResponse('Authentication error', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/uploads/:path*',
    '/(.*).mp4',
    '/(.*).webm',
  ],
};
