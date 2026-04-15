import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/learning')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/learning/:path*'],
};