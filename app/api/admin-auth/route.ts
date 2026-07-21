import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'portfolio_admin_auth';

export async function POST(req: NextRequest) {
  const { passcode } = await req.json().catch(() => ({ passcode: '' }));
  const expected = process.env.ADMIN_PASSCODE;

  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSCODE is not configured on the server.' },
      { status: 500 }
    );
  }

  if (passcode !== expected) {
    return NextResponse.json({ error: 'Incorrect passcode.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
