'use client';

import React from 'react';
import { FacultyProfile } from '../../types/faculty';
import PrintableCV, { SelectedChapters } from './PrintableCV';
import {
  X,
  Printer,
  CheckSquare,
  Square,
  FileText,
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Trophy,
  Presentation,
  Settings,
  Sparkles,
  Users,
  ShieldCheck,
  Award,
  SlidersHorizontal,
} from 'lucide-react';

interface PrintCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FacultyProfile;
  selectedChapters: SelectedChapters;
  onChangeSelectedChapters: (chapters: SelectedChapters) => void;
}

export default function PrintCustomizationModal({
  isOpen,
  onClose,
  profile,
  selectedChapters,
  onChangeSelectedChapters,
}: PrintCustomizationModalProps) {
  if (!isOpen) return null;

  const chapterConfigs: {
    key: keyof SelectedChapters;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    {
      key: 'summary',
      label: 'Executive Summary',
      description: 'Biography and research interests',
      icon: User,
    },
    {
      key: 'education',
      label: 'Education & Appointments',
      description: 'Academic degrees and work experience',
      icon: GraduationCap,
      count: (profile.education?.length || 0) + (profile.experience?.length || 0),
    },
    {
      key: 'publications',
      label: 'Publications',
      description: 'Peer-reviewed journal and conference articles',
      icon: BookOpen,
      count: profile.publications?.length || 0,
    },
    {
      key: 'projects',
      label: 'Projects & Grants',
      description: 'Funded research projects and grants received',
      icon: Briefcase,
      count: (profile.fundedProjects?.length || 0) + (profile.grantsReceived?.length || 0),
    },
    {
      key: 'awards',
      label: 'Honors & Awards',
      description: 'Academic honors, awards, and recognitions',
      icon: Trophy,
      count: profile.awardsReceived?.length || 0,
    },
    {
      key: 'conferences',
      label: 'Conferences',
      description: 'Conferences attended, presenter, or session chair roles',
      icon: Presentation,
      count: profile.conferencesAttended?.length || 0,
    },
    {
      key: 'workshops',
      label: 'Workshops',
      description: 'Workshops attended and conducted',
      icon: Settings,
      count: (profile.workshopsAttended?.length || 0) + (profile.workshopsConducted?.length || 0),
    },
    {
      key: 'seminars',
      label: 'Seminars Attended',
      description: 'Seminars attended with level and topic details',
      icon: Sparkles,
      count: profile.seminars?.length || 0,
    },
    {
      key: 'scholars',
      label: 'Research Scholars',
      description: 'Doctoral PhD supervision and thesis guidance',
      icon: Users,
      count: profile.phdScholars?.length || 0,
    },
    {
      key: 'roles',
      label: 'Roles & Recognitions',
      description: 'Resource person roles and external examiner roles',
      icon: ShieldCheck,
      count: (profile.resourcePersonRoles?.length || 0) + (profile.externalExaminerRoles?.length || 0),
    },
    {
      key: 'patents',
      label: 'Patents',
      description: 'Filed, published, and granted patents',
      icon: Award,
      count: profile.patents?.length || 0,
    },
    {
      key: 'copyrights',
      label: 'Copyrights',
      description: 'Registered and pending software copyrights',
      icon: BookOpen,
      count: profile.copyrights?.length || 0,
    },
  ];

  const handleToggle = (key: keyof SelectedChapters) => {
    onChangeSelectedChapters({
      ...selectedChapters,
      [key]: !selectedChapters[key],
    });
  };

  const handleSelectAll = () => {
    const updated = { ...selectedChapters };
    (Object.keys(updated) as (keyof SelectedChapters)[]).forEach((k) => {
      updated[k] = true;
    });
    onChangeSelectedChapters(updated);
  };

  const handleDeselectAll = () => {
    const updated = { ...selectedChapters };
    (Object.keys(updated) as (keyof SelectedChapters)[]).forEach((k) => {
      updated[k] = false;
    });
    onChangeSelectedChapters(updated);
  };

  const selectedCount = Object.values(selectedChapters).filter(Boolean).length;

  const handlePrintAction = () => {
    // Trigger native browser print
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-fade-in print:hidden">
      <div className="bg-surface border border-border-subtle rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-subtle bg-surface-muted/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e40af)' }}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2
                className="text-lg font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Customize Academic CV
              </h2>
              <p className="text-xs text-foreground-muted">
                Select chapters to include in your CV. Live preview updates in real-time.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Split 2-Column Layout */}
        <div className="flex-1 overflow-hidden grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
          {/* Left Column: Chapter Selection Checkboxes (5 cols) */}
          <div className="lg:col-span-5 p-5 overflow-y-auto space-y-4 max-h-[50vh] lg:max-h-[72vh] bg-surface-muted/20">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-border-subtle">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                Included Chapters ({selectedCount}/{chapterConfigs.length})
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[11px] font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                >
                  Select All
                </button>
                <span className="text-foreground-subtle text-xs">•</span>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  className="text-[11px] font-semibold text-foreground-muted hover:underline"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {chapterConfigs.map((ch) => {
                const Icon = ch.icon;
                const isChecked = selectedChapters[ch.key];

                return (
                  <div
                    key={ch.key}
                    onClick={() => handleToggle(ch.key)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'border-accent-500/40 bg-accent-500/5 shadow-xs'
                        : 'border-border-subtle/70 bg-surface/50 opacity-70 hover:opacity-100 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          isChecked
                            ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
                            : 'bg-surface-muted text-foreground-muted'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground truncate">{ch.label}</span>
                          {ch.count !== undefined && (
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-surface-muted text-foreground-muted border border-border-subtle">
                              {ch.count}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-foreground-muted truncate">{ch.description}</p>
                      </div>
                    </div>

                    <button type="button" className="shrink-0 text-accent-600 dark:text-accent-400">
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-accent-600 dark:text-accent-400" />
                      ) : (
                        <Square className="h-4 w-4 text-foreground-subtle" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Document Preview (7 cols) */}
          <div className="lg:col-span-7 p-4 md:p-6 overflow-y-auto max-h-[50vh] lg:max-h-[72vh] bg-surface-muted/50 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground-muted">
                <FileText className="h-4 w-4 text-accent-500" />
                <span>Live Document Preview</span>
              </div>
              <span className="text-[11px] text-foreground-muted font-mono">
                A4 Academic CV Format
              </span>
            </div>

            {/* Paper Sheet Preview Container */}
            <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transform transition-all duration-200">
              <PrintableCV profile={profile} selectedChapters={selectedChapters} isPreview={true} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-subtle bg-surface-muted/40 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-foreground-muted hidden sm:inline">
            {selectedCount} of {chapterConfigs.length} chapters selected for PDF generation.
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePrintAction}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md hover:shadow-lg transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e40af)' }}
            >
              <Printer className="h-4 w-4" />
              <span>Print / Download CV (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
