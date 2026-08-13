'use client';

import React, { useEffect, useState } from 'react';
import {
  Save,
  RotateCcw,
  Check,
  Copy,
  Download,
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Trophy,
  Presentation,
  Users,
  Award,
  Cloud,
  Settings,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { exportProfileToExcelWorkbook, exportSingleSectionToExcel } from '../../lib/excelHelper';
import { profile as defaultProfile } from '../../data/profile';
import { FacultyProfile, Publication } from '../../types/faculty';
import { sectionSchemas, arrayStringFields } from './schema';
import RepeatableSection from './RepeatableSection';
import PublicationsForm from './PublicationsForm';
import { getCloudProfile, saveCloudProfile } from '../../lib/profileService';

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
    id: 'conferences',
    label: 'Conferences',
    icon: Presentation,
    keys: ['conferencesAttended'],
    description: 'Conferences attended, presented, or chaired',
  },
  {
    id: 'workshops',
    label: 'Workshops',
    icon: Settings,
    keys: ['workshopsAttended'],
    description: 'Add and edit workshops with Type (Attended / Conducted), date range, topic, and proof',
  },
  {
    id: 'seminars',
    label: 'Seminars Attended',
    icon: Sparkles,
    keys: ['seminars'],
    description: 'Seminars attended with level, mode, date range, topic, and certificate proof',
  },
  {
    id: 'scholars-roles',
    label: 'Scholars & Key Roles',
    icon: Users,
    keys: ['phdScholars', 'resourcePersonRoles', 'externalExaminerRoles'],
    description: 'PhD scholars guided, key resource roles, and examiner appointments',
  },
  {
    id: 'patents',
    label: 'Patents',
    icon: Award,
    keys: ['patents'],
    description: 'Filed, published, and granted patents with status filter, description, and link',
  },
  {
    id: 'copyrights',
    label: 'Copyrights',
    icon: BookOpen,
    keys: ['copyrights'],
    description: 'Registered and pending copyrights with status filter, description, and link',
  },
];

export default function PortfolioForm() {
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved-cloud' | 'saved-local' | 'copied'>('idle');
  const [activeGroupId, setActiveGroupId] = useState<string>('personal');

  useEffect(() => {
    async function loadInitialProfile() {
      try {
        // Load live profile from Firebase Firestore
        const liveProfile = await getCloudProfile();
        setDraft(toDraft(liveProfile));
      } catch {
        // Fallback to local draft or default
        const stored = window.localStorage.getItem(STORAGE_KEY);
        setDraft(stored ? JSON.parse(stored) : toDraft(defaultProfile));
      }
    }
    loadInitialProfile();
  }, []);

  if (!draft) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-foreground-muted">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent-500 border-t-transparent mr-3" />
        Connecting to Firebase Cloud Database...
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

  const handleSave = async () => {
    setStatus('saving');
    try {
      // 1. Save to local storage cache
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      
      // 2. Publish live to Cloud Firestore (with 2.5s timeout safety)
      const structuredProfile = fromDraft(draft);
      const isCloudSaved = await saveCloudProfile(structuredProfile);

      // 3. Automatically export & download Excel spreadsheet (.xlsx) with 12 section sheets
      exportProfileToExcelWorkbook(structuredProfile);
      
      if (isCloudSaved) {
        setStatus('saved-cloud');
      } else {
        setStatus('saved-local');
      }
      setTimeout(() => setStatus('idle'), 4500);
    } catch (err) {
      console.error('Cloud save failed:', err);
      setStatus('saved-local');
      setTimeout(() => setStatus('idle'), 4500);
    }
  };

  const handleExportMasterExcel = () => {
    if (draft) {
      const structuredProfile = fromDraft(draft);
      exportProfileToExcelWorkbook(structuredProfile);
    }
  };

  const handleExportSingleExcel = (sectionKey: string, sectionTitle: string) => {
    if (draft) {
      const structuredProfile = fromDraft(draft);
      exportSingleSectionToExcel(structuredProfile, sectionKey, sectionTitle);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all draft changes to initial profile defaults?')) {
      const fresh = toDraft(defaultProfile);
      setDraft(fresh);
      window.localStorage.removeItem(STORAGE_KEY);
      await saveCloudProfile(defaultProfile);
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
          <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Cloud className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold font-serif text-foreground">Cloud Live Management & Excel Hub</h2>
            <p className="text-[11px] text-foreground-muted">Publish to Firebase Cloud & Export Excel Sheets (.xlsx)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Main Save & Publish Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={status === 'saving'}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {status === 'saving' ? (
              <>
                <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                <span>Publishing & Exporting...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" /> Save & Publish Live (Auto Excel Export)
              </>
            )}
          </button>

          {/* Master Excel Download Button */}
          <button
            type="button"
            onClick={handleExportMasterExcel}
            title="Download Master Excel Workbook containing all 12 section sheets"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Export Master Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border-subtle bg-surface-muted text-xs font-medium text-foreground hover:bg-surface transition-all"
          >
            <Download className="h-3.5 w-3.5 text-accent-500" /> JSON
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border-subtle bg-surface-muted text-xs font-medium text-foreground hover:bg-surface transition-all"
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

        {status === 'saved-cloud' && (
          <div className="w-full text-right text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
            ✓ Published live to Firebase Cloud & Master Excel file (.xlsx) downloaded!
          </div>
        )}
        {status === 'saved-local' && (
          <div className="w-full text-right text-xs font-medium text-amber-600 dark:text-amber-400">
            ✓ Saved locally & Master Excel file (.xlsx) downloaded!
          </div>
        )}
      </div>

      {/* Individual Section Excel Export Bar */}
      <div className="rounded-xl border border-border-subtle bg-surface-muted/40 p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs font-bold text-foreground">Section Excel Export Hub:</span>
          <span className="text-[11px] text-foreground-muted hidden md:inline">Download a separate standalone Excel sheet (.xlsx) for any individual section</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            aria-label="Download standalone section Excel file"
            onChange={(e) => {
              if (e.target.value) {
                const [secKey, secTitle] = e.target.value.split('|');
                handleExportSingleExcel(secKey, secTitle);
                e.target.value = '';
              }
            }}
            defaultValue=""
            className="rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 cursor-pointer"
          >
            <option value="" disabled>-- Download Standalone Section Excel Sheet --</option>
            <option value="summary|Summary">01. Summary</option>
            <option value="education|Education_and_Experience">02. Education & Experience</option>
            <option value="publications|Publications">03. Publications</option>
            <option value="projects|Projects_and_Grants">04. Projects & Grants</option>
            <option value="awards|Academic_Achievements_and_Awards">05. Academic Achievements & Awards</option>
            <option value="conferences|Conferences">06. Conferences</option>
            <option value="workshops|Workshops">07. Workshops</option>
            <option value="seminars|Seminars">08. Seminars</option>
            <option value="research|Research">09. Research (Scholars & Roles)</option>
            <option value="patents|Patents">10. Patents</option>
            <option value="copyrights|Copyrights">11. Copyrights</option>
          </select>
        </div>
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
