'use client';

import React, { useState } from 'react';
import { Seminar } from '../../types/faculty';
import { Sparkles, Calendar, Landmark, BookOpen, Filter, ChevronDown, ChevronUp, FileCheck, Monitor, MapPin, Globe2 } from 'lucide-react';

interface SeminarsProps {
  seminars: Seminar[];
}

export default function Seminars({ seminars = [] }: SeminarsProps) {
  const [showAllSeminars, setShowAllSeminars] = useState<boolean>(false);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('All');

  const filteredSeminars = seminars.filter((sem) => {
    if (selectedLevelFilter === 'All') return true;
    return sem.level === selectedLevelFilter;
  });

  const displayedSeminars = showAllSeminars
    ? filteredSeminars
    : filteredSeminars.slice(0, 2);

  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case 'International':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'National':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'State':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'Institutional':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-surface-muted text-foreground-muted border-border-subtle';
    }
  };

  const getModeBadgeStyle = (mode?: string) => {
    switch (mode) {
      case 'Online':
        return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20';
      case 'Hybrid':
        return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20';
      default:
        return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <section id="seminars" className="scroll-mt-24 space-y-6">
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header Bar with Filter Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37' }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <h2
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Seminars Attended
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Level Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-surface-muted/80 border border-border-subtle rounded-xl px-3 py-1.5 shadow-sm">
                <Filter className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                <span className="text-xs font-medium text-foreground-muted hidden md:inline">Level:</span>
                <select
                  aria-label="Filter seminars by level"
                  value={selectedLevelFilter}
                  onChange={(e) => {
                    setSelectedLevelFilter(e.target.value);
                    setShowAllSeminars(true);
                  }}
                  className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All" className="bg-surface text-foreground">All Levels</option>
                  <option value="International" className="bg-surface text-foreground">International</option>
                  <option value="National" className="bg-surface text-foreground">National</option>
                  <option value="State" className="bg-surface text-foreground">State</option>
                  <option value="Institutional" className="bg-surface text-foreground">Institutional</option>
                </select>
              </div>

              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37' }}
              >
                {filteredSeminars.length} {filteredSeminars.length === 1 ? 'Seminar' : 'Seminars'}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />
          </div>

          {filteredSeminars.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No seminars found for level &quot;{selectedLevelFilter}&quot;.
            </p>
          ) : (
            <div className="space-y-5">
              {displayedSeminars.map((sem) => (
                <div
                  key={sem.id}
                  className="p-5 md:p-6 border border-border-subtle/80 rounded-2xl hover:bg-surface-muted/40 transition-all duration-200 space-y-3 shadow-sm"
                >
                  {/* Badges & Date Range Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Level Badge */}
                      <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getLevelBadgeStyle(sem.level)}`}>
                        {sem.level} Level
                      </span>

                      {/* Mode Badge */}
                      {sem.mode && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 ${getModeBadgeStyle(sem.mode)}`}>
                          <Monitor className="h-3 w-3" />
                          {sem.mode}
                        </span>
                      )}
                    </div>

                    {/* Date Range */}
                    <span className="text-xs font-mono text-foreground-muted flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent-500" />
                      {sem.startDate}{sem.endDate && sem.endDate !== sem.startDate ? ` – ${sem.endDate}` : ''}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base md:text-lg font-bold text-foreground leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {sem.title}
                  </h3>

                  {/* Topic / Theme Pill */}
                  {sem.topic && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <BookOpen className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                      <span className="text-xs font-medium text-foreground-muted">
                        <strong className="text-foreground">Topic/Theme:</strong> {sem.topic}
                      </span>
                    </div>
                  )}

                  {/* Organized By */}
                  <div className="flex items-start gap-2 text-xs text-foreground-muted">
                    <Landmark className="h-3.5 w-3.5 text-accent-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">Organized By:</strong> {sem.organizedBy}
                    </span>
                  </div>

                  {/* Description & Conclusion */}
                  {sem.description && (
                    <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-border-subtle/60 text-xs text-foreground-muted space-y-1">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <span>Overview & Key Takeaways</span>
                      </div>
                      <p className="leading-relaxed">{sem.description}</p>
                    </div>
                  )}

                  {/* Document Proof / Certificate Badge */}
                  {sem.documentProofName && (
                    <div className="pt-1 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <FileCheck className="h-4 w-4 shrink-0" />
                      <span>Document Proof: {sem.documentProofName}</span>
                    </div>
                  )}
                </div>
              ))}

              {filteredSeminars.length > 2 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAllSeminars(!showAllSeminars)}
                  className="royal-show-more w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                >
                  {showAllSeminars ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredSeminars.length - 2} additional)</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
