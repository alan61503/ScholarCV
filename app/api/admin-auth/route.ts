import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'portfolio_admin_auth';

export async function POST(req: NextRequest) {
  const { passcode } = await req.json().catch(() => ({ passcode: '' }));
  const expected = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode !== expected) {
    return NextResponse.json({ error: 'Incorrect passcode.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
