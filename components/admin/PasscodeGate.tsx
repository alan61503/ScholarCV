'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PasscodeGate() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Incorrect passcode.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 space-y-5"
      >
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 mx-auto">
          <Lock className="h-5 w-5" />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Private Area</h1>
          <p className="text-xs text-slate-400">Enter the passcode to manage portfolio content.</p>
        </div>
        <input
          type="password"
          autoFocus
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 text-center focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400"
        />
        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </div>
  );
}
