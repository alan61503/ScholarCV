import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import PortfolioForm from '../../components/admin/PortfolioForm';
import PasscodeGate from '../../components/admin/PasscodeGate';

// This route is intentionally not linked from anywhere on the public site,
// and is additionally protected by a server-side passcode (see ADMIN_PASSCODE
// in your environment variables) since the source code of this repo is
// public and the URL alone would otherwise be discoverable.
export const metadata: Metadata = {
  title: 'Manage Portfolio',
  robots: { index: false, follow: false, nocache: true },
};

const COOKIE_NAME = 'portfolio_admin_auth';

export default async function ManagePortfolioPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_PASSCODE;
  const isAuthed = Boolean(expected) && authCookie === expected;

  if (!isAuthed) {
    return <PasscodeGate />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 md:py-14">
        <div className="mb-8 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Private</span>
          <h1 className="text-2xl font-bold font-serif">Manage Portfolio Content</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            This is a private form for editing every section of the portfolio. Since the site is
            statically rendered, changes made here save to your browser only. Use{' '}
            <strong>Export JSON</strong> or <strong>Copy JSON</strong> to grab the updated data,
            then paste it into{' '}
            <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs">data/mockFaculty.ts</code>{' '}
            and redeploy to update the live site.
          </p>
        </div>
        <PortfolioForm />
      </div>
    </div>
  );
}
