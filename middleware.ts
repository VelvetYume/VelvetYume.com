import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT = 120; // dakikada 120 istek
const WINDOW = 60_000;

const ipMap = new Map<string, { count: number; last: number }>();

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ??
    'unknown';

  const now = Date.now();
  const record = ipMap.get(ip) ?? { count: 0, last: now };

  if (now - record.last > WINDOW) {
    record.count = 0;
    record.last = now;
  }

  record.count++;
  ipMap.set(ip, record);

  if (record.count > RATE_LIMIT) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  const ua = req.headers.get('user-agent') ?? '';
  if (/curl|wget|python|scrapy|httpclient/i.test(ua)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};
