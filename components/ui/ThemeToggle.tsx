'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'scholarcv-theme';

interface ThemeToggleProps {
  variant?: 'pill' | 'floating';
}

export default function ThemeToggle({ variant = 'pill' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  };

  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={toggle}
        suppressHydrationWarning
        aria-label={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl border border-slate-700 hover:scale-105 transition-all cursor-pointer no-print"
      >
        {mounted && isDark ? (
          <Sun className="h-5 w-5 text-amber-400" strokeWidth={2} />
        ) : (
          <Moon className="h-5 w-5 text-slate-200" strokeWidth={2} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-border-subtle bg-surface-muted transition-colors cursor-pointer"
    >
      <span
        className={`absolute left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface border border-border-subtle shadow-sm transition-transform duration-200 ease-out ${
          mounted && isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {mounted && isDark ? (
          <Moon className="h-3.5 w-3.5 text-accent-500" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-brass-600" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
