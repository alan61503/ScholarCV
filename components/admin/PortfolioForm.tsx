'use client';

import React, { useEffect, useState } from 'react';
import { Download, Copy, Check, RotateCcw, Save } from 'lucide-react';
import { profile as defaultProfile } from '../../data/profile';
import { FacultyProfile } from '../../types/faculty';
import { sectionSchemas, arrayStringFields } from './schema';
import RepeatableSection from './RepeatableSection';

const STORAGE_KEY = 'scholarcv:draft-profile';

// Converts the strongly-typed profile into a plain editable draft where
// list fields (authors, skills, etc.) become comma-separated strings.
function toDraft(p: FacultyProfile): Record<string, unknown> {
  const draft: Record<string, unknown> = JSON.parse(JSON.stringify(p));
  for (const [sectionKey, fields] of Object.entries(arrayStringFields)) {
    const list = draft[sectionKey] as Record<string, unknown>[] | undefined;
    if (!Array.isArray(list)) continue;
    draft[sectionKey] = list.map((item) => {
      const next = { ...item };
      for (const f of fields) {
        if (Array.isArray(next[f])) next[f] = (next[f] as string[]).join(', ');
      }
      return next;
    });
  }
  const personalInfo = draft.personalInfo as Record<string, unknown>;
  if (personalInfo && Array.isArray(personalInfo.researchInterests)) {
    personalInfo.researchInterests = (personalInfo.researchInterests as string[]).join(', ');
  }
  return draft;
}

// Converts a draft back into the shape expected by FacultyProfile.
function fromDraft(draft: Record<string, unknown>): FacultyProfile {
  const result: Record<string, unknown> = JSON.parse(JSON.stringify(draft));
  for (const [sectionKey, fields] of Object.entries(arrayStringFields)) {
    const list = result[sectionKey] as Record<string, unknown>[] | undefined;
    if (!Array.isArray(list)) continue;
    result[sectionKey] = list.map((item) => {
      const next = { ...item };
      for (const f of fields) {
        if (typeof next[f] === 'string') {
          next[f] = (next[f] as string)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      return next;
    });
  }
  const personalInfo = result.personalInfo as Record<string, unknown>;
  if (personalInfo && typeof personalInfo.researchInterests === 'string') {
    personalInfo.researchInterests = (personalInfo.researchInterests as string)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return result as unknown as FacultyProfile;
}

const personalInfoFields: { key: string; label: string; type: 'text' | 'textarea' }[] = [
  { key: 'name', label: 'Full Name', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'department', label: 'Department', type: 'text' },
  { key: 'institution', label: 'Institution', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'officeAddress', label: 'Office Address', type: 'text' },
  { key: 'avatarUrl', label: 'Avatar Image URL', type: 'text' },
  { key: 'websiteUrl', label: 'Personal Website URL', type: 'text' },
  { key: 'googleScholarUrl', label: 'Google Scholar URL', type: 'text' },
  { key: 'linkedInUrl', label: 'LinkedIn URL', type: 'text' },
  { key: 'orcid', label: 'ORCID', type: 'text' },
  { key: 'researchInterests', label: 'Research Interests (comma-separated)', type: 'textarea' },
  { key: 'biography', label: 'Biography', type: 'textarea' },
];

export default function PortfolioForm() {
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<'idle' | 'saved' | 'copied'>('idle');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setDraft(stored ? JSON.parse(stored) : toDraft(defaultProfile));
    } catch {
      setDraft(toDraft(defaultProfile));
    }
  }, []);

  if (!draft) {
    return <p className="text-sm text-slate-400">Loading form…</p>;
  }

  const personalInfo = (draft.personalInfo as Record<string, unknown>) || {};

  const updatePersonalInfo = (key: string, value: string) => {
    setDraft({ ...draft, personalInfo: { ...personalInfo, [key]: value } });
  };

  const updateSection = (key: string, items: Record<string, unknown>[]) => {
    setDraft({ ...draft, [key]: items });
  };

  const handleSave = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  const handleReset = () => {
    const fresh = toDraft(defaultProfile);
    setDraft(fresh);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const exportJson = () => JSON.stringify(fromDraft(draft), null, 2);

  const handleDownload = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportJson());
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4" /> Save Draft
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          <Download className="h-4 w-4" /> Export JSON
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          {status === 'copied' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy JSON
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-red-500 transition-colors ml-auto"
        >
          <RotateCcw className="h-4 w-4" /> Reset to defaults
        </button>
        {status === 'saved' && <span className="text-xs text-emerald-600 dark:text-emerald-400">Saved locally ✓</span>}
      </div>

      {/* Personal Info */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {personalInfoFields.map((field) => (
            <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={(personalInfo[field.key] as string) ?? ''}
                  onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
                  rows={field.key === 'biography' ? 4 : 2}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400"
                />
              ) : (
                <input
                  type="text"
                  value={(personalInfo[field.key] as string) ?? ''}
                  onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Repeatable sections */}
      {sectionSchemas.map((config) => (
        <RepeatableSection
          key={config.key}
          config={config}
          items={(draft[config.key] as Record<string, unknown>[]) || []}
          onChange={(items) => updateSection(config.key, items)}
        />
      ))}
    </div>
  );
}
