'use client';

import React, { useEffect, useState } from 'react';
import {
  Download,
  Copy,
  Check,
  RotateCcw,
  Save,
  User,
  BookOpen,
  GraduationCap,
  Briefcase,
  Trophy,
  Presentation,
  Users,
  Award,
  Sparkles,
  Lock,
  ChevronRight,
  Search,
} from 'lucide-react';
import { profile as defaultProfile } from '../../data/profile';
import { FacultyProfile, Publication } from '../../types/faculty';
import { sectionSchemas, arrayStringFields } from './schema';
import RepeatableSection from './RepeatableSection';
import PublicationsForm from './PublicationsForm';

const STORAGE_KEY = 'scholarcv:draft-profile';

// Converts the strongly-typed profile into a plain editable draft
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

// Converts a draft back into the shape expected by FacultyProfile
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
  { key: 'title', label: 'Title / Designation', type: 'text' },
  { key: 'department', label: 'Department', type: 'text' },
  { key: 'institution', label: 'University / Institution', type: 'text' },
  { key: 'email', label: 'Email Address', type: 'text' },
  { key: 'phone', label: 'Phone Number', type: 'text' },
  { key: 'officeAddress', label: 'Office Address', type: 'text' },
  { key: 'avatarUrl', label: 'Profile Picture Image URL', type: 'text' },
  { key: 'websiteUrl', label: 'Personal / Lab Website URL', type: 'text' },
  { key: 'googleScholarUrl', label: 'Google Scholar Profile URL', type: 'text' },
  { key: 'linkedInUrl', label: 'LinkedIn Profile URL', type: 'text' },
  { key: 'orcid', label: 'ORCID ID', type: 'text' },
  { key: 'researchInterests', label: 'Research Interests (comma-separated)', type: 'textarea' },
  { key: 'biography', label: 'Biography / Executive Summary', type: 'textarea' },
];

const categoryGroups = [
  {
    id: 'personal',
    label: 'Personal Profile',
    icon: User,
    keys: ['personalInfo'],
    description: 'Name, designation, contact, bio, and academic profile links',
  },
  {
    id: 'publications',
    label: 'Publications',
    icon: BookOpen,
    keys: ['publications'],
    description: 'Journal papers, conference proceedings, books, and chapters',
  },
  {
    id: 'education-experience',
    label: 'Education & Experience',
    icon: GraduationCap,
    keys: ['education', 'experience', 'skills'],
    description: 'Degrees, academic appointments, and technical/research skills',
  },
  {
    id: 'projects-grants',
    label: 'Projects & Grants',
    icon: Briefcase,
    keys: ['fundedProjects', 'grantsReceived'],
    description: 'Sponsored research projects and funding grants received',
  },
  {
    id: 'awards-honors',
    label: 'Awards & Honors',
    icon: Trophy,
    keys: ['awardsReceived', 'academicAchievements'],
    description: 'Faculty awards, honors, distinctions, and achievements',
  },
  {
    id: 'conferences-workshops',
    label: 'Conferences & Workshops',
    icon: Presentation,
    keys: ['conferencesAttended', 'workshopsAttended', 'workshopsConducted'],
    description: 'Conferences, workshops attended or conducted',
  },
  {
    id: 'scholars-roles',
    label: 'Scholars & Key Roles',
    icon: Users,
    keys: ['phdScholars', 'resourcePersonRoles', 'externalExaminerRoles'],
    description: 'PhD scholars guided, key resource roles, and examiner appointments',
  },
  {
    id: 'patents-copyrights',
    label: 'Patents & Copyrights',
    icon: Award,
    keys: ['patents', 'copyrights'],
    description: 'Filed/granted patents and registered copyrights',
  },
];

export default function PortfolioForm() {
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<'idle' | 'saved' | 'copied'>('idle');
  const [activeGroupId, setActiveGroupId] = useState<string>('personal');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setDraft(stored ? JSON.parse(stored) : toDraft(defaultProfile));
    } catch {
      setDraft(toDraft(defaultProfile));
    }
  }, []);

  if (!draft) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-foreground-muted">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent-500 border-t-transparent mr-3" />
        Loading admin workspace...
      </div>
    );
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
    setTimeout(() => setStatus('idle'), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all draft changes to initial profile defaults?')) {
      const fresh = toDraft(defaultProfile);
      setDraft(fresh);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportJson = () => JSON.stringify(fromDraft(draft), null, 2);

  const handleDownload = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mockFaculty.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportJson());
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 2500);
  };

  const activeGroup = categoryGroups.find((g) => g.id === activeGroupId) || categoryGroups[0];

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar */}
      <div className="sticky top-0 z-30 rounded-xl border border-border-subtle bg-surface/95 backdrop-blur-md p-4 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent-500/10 text-accent-700 dark:text-accent-400">
            <Lock className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold font-serif text-foreground">Admin Workspace</h2>
            <p className="text-[11px] text-foreground-muted">Changes saved locally in browser</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent-700 dark:bg-accent-600 text-white text-xs font-semibold hover:bg-accent-800 transition-all shadow-sm active:scale-95"
          >
            <Save className="h-3.5 w-3.5" /> Save Draft
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-subtle bg-surface-muted text-xs font-medium text-foreground hover:bg-surface transition-all"
          >
            <Download className="h-3.5 w-3.5 text-accent-500" /> Export JSON
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-subtle bg-surface-muted text-xs font-medium text-foreground hover:bg-surface transition-all"
          >
            {status === 'copied' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-accent-500" />} Copy JSON
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-lg text-foreground-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {status === 'saved' && (
          <div className="w-full text-right text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
            Draft saved to browser storage ✓
          </div>
        )}
      </div>

      {/* Main Workspace Layout (Sidebar Navigation + Form Content) */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Category Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground-muted px-2 py-1">
            Section Categories
          </div>
          <nav className="space-y-1">
            {categoryGroups.map((group) => {
              const Icon = group.icon;
              const isActive = activeGroupId === group.id;

              // Calculate item count for group
              let totalCount = 0;
              group.keys.forEach((k) => {
                const val = draft[k];
                if (Array.isArray(val)) totalCount += val.length;
              });

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroupId(group.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-accent-700 text-white shadow-md font-semibold'
                      : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-accent-500'}`} />
                    <span className="truncate">{group.label}</span>
                  </div>
                  {totalCount > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-surface-muted text-foreground-muted border border-border-subtle'
                      }`}
                    >
                      {totalCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Form Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-4 rounded-xl border border-border-subtle bg-surface/50 backdrop-blur-sm">
            <h2 className="text-lg font-serif font-bold text-foreground">{activeGroup.label}</h2>
            <p className="text-xs text-foreground-muted mt-0.5">{activeGroup.description}</p>
          </div>

          {/* Section 1: Personal Info */}
          {activeGroupId === 'personal' && (
            <div className="rounded-xl border border-border-subtle bg-surface p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border-subtle">
                <User className="h-4 w-4 text-accent-500" />
                <h3 className="text-sm font-serif font-bold text-foreground">Personal Information & Contacts</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {personalInfoFields.map((field) => (
                  <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-medium text-foreground-muted mb-1">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={(personalInfo[field.key] as string) ?? ''}
                        onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
                        rows={field.key === 'biography' ? 4 : 2}
                        className="w-full rounded-lg border border-border-subtle bg-surface-muted px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                      />
                    ) : (
                      <input
                        type="text"
                        value={(personalInfo[field.key] as string) ?? ''}
                        onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
                        className="w-full rounded-lg border border-border-subtle bg-surface-muted px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Publications */}
          {activeGroupId === 'publications' && (
            <PublicationsForm
              items={(draft.publications as Publication[]) || []}
              onChange={(items) => updateSection('publications', items as unknown as Record<string, unknown>[])}
            />
          )}

          {/* Remaining Sections */}
          {activeGroupId !== 'personal' &&
            activeGroupId !== 'publications' &&
            sectionSchemas
              .filter((schema) => activeGroup.keys.includes(schema.key))
              .map((config) => (
                <RepeatableSection
                  key={config.key}
                  config={config}
                  items={(draft[config.key] as Record<string, unknown>[]) || []}
                  onChange={(items) => updateSection(config.key, items)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
