import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import PortfolioForm from '@/components/admin/PortfolioForm';
import PasscodeGate from '@/components/admin/PasscodeGate';

export const metadata: Metadata = {
  title: 'Manage Portfolio',
  robots: { index: false, follow: false, nocache: true },
};

const COOKIE_NAME = 'portfolio_admin_auth';

export default async function ManagePortfolioPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_PASSCODE || 'admin123';
  const isAuthed = Boolean(authCookie) && authCookie === expected;

  if (!isAuthed) {
    return <PasscodeGate />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="pb-6 border-b border-border-subtle flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-semibold uppercase tracking-wider">
              Private Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mt-2">
              Portfolio Management Portal
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted mt-1 max-w-2xl">
              Add new publications, projects, achievements, and update profile data. Changes saved here generate JSON ready to update the site.
            </p>
          </div>
          <a
            href="/"
            className="px-4 py-2 rounded-lg border border-border-subtle bg-surface text-xs font-medium text-foreground hover:bg-surface-muted transition-colors"
          >
            ← View Public Site
          </a>
        </header>

        <PortfolioForm />
      </div>
    </div>
  );
}
