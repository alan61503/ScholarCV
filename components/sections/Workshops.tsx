'use client';

import React, { useState } from 'react';
import { Workshop } from '../../types/faculty';
import { Settings, Calendar, Landmark, BookOpen, Filter, ChevronDown, ChevronUp, FileCheck, Monitor, MapPin } from 'lucide-react';

interface WorkshopsProps {
  workshopsAttended: Workshop[];
  workshopsConducted: Workshop[];
}

export default function Workshops({
  workshopsAttended = [],
  workshopsConducted = [],
}: WorkshopsProps) {
  const [showAllWorkshops, setShowAllWorkshops] = useState<boolean>(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');

  // Tag items with explicit type if missing
  const attendedList = workshopsAttended.map((item) => ({
    ...item,
    type: item.type || 'Attended',
  }));
  const conductedList = workshopsConducted.map((item) => ({
    ...item,
    type: item.type || 'Conducted',
  }));

  const allWorkshops = [...attendedList, ...conductedList];

  const filteredWorkshops = allWorkshops.filter((ws) => {
    if (selectedTypeFilter === 'All') return true;
    if (selectedTypeFilter === 'Attended') return ws.type === 'Attended';
    if (selectedTypeFilter === 'Conducted') return ws.type === 'Conducted';
    return true;
  });

  const displayedWorkshops = showAllWorkshops
    ? filteredWorkshops
    : filteredWorkshops.slice(0, 2);

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
    <section id="workshops" className="scroll-mt-24 space-y-6">
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header Bar with Filter Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}
              >
                <Settings className="h-5 w-5" />
              </div>
              <h2
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Workshops
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Type Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-surface-muted/80 border border-border-subtle rounded-xl px-3 py-1.5 shadow-sm">
                <Filter className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                <span className="text-xs font-medium text-foreground-muted hidden md:inline">Filter:</span>
                <select
                  aria-label="Filter workshops by category"
                  value={selectedTypeFilter}
                  onChange={(e) => {
                    setSelectedTypeFilter(e.target.value);
                    setShowAllWorkshops(true);
                  }}
                  className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All" className="bg-surface text-foreground">All Workshops</option>
                  <option value="Attended" className="bg-surface text-foreground">Workshops Attended</option>
                  <option value="Conducted" className="bg-surface text-foreground">Workshops Conducted</option>
                </select>
              </div>

              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}
              >
                {filteredWorkshops.length} {filteredWorkshops.length === 1 ? 'Workshop' : 'Workshops'}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#059669] to-transparent" />
          </div>

          {filteredWorkshops.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No workshops recorded for filter &quot;{selectedTypeFilter}&quot;.
            </p>
          ) : (
            <div className="space-y-5">
              {displayedWorkshops.map((ws) => (
                <div
                  key={ws.id}
                  className="p-5 md:p-6 border border-border-subtle/80 rounded-2xl hover:bg-surface-muted/40 transition-all duration-200 space-y-3 shadow-sm"
                >
                  {/* Type Badge, Mode Badge & Date Range Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Type Badge */}
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${
                          ws.type === 'Conducted'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-accent-500/10 text-accent-700 dark:text-accent-400 border-accent-500/20'
                        }`}
                      >
                        Workshop {ws.type || 'Attended'}
                      </span>

                      {/* Mode Badge */}
                      {ws.mode && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 ${getModeBadgeStyle(ws.mode)}`}>
                          <Monitor className="h-3 w-3" />
                          {ws.mode}
                        </span>
                      )}
                    </div>

                    {/* Date Range */}
                    <span className="text-xs font-mono text-foreground-muted flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent-500" />
                      {ws.startDate}{ws.endDate && ws.endDate !== ws.startDate ? ` – ${ws.endDate}` : ''}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base md:text-lg font-bold text-foreground leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {ws.title}
                  </h3>

                  {/* Topic / Theme */}
                  {ws.topic && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <BookOpen className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                      <span className="text-xs font-medium text-foreground-muted">
                        <strong className="text-foreground">Topic/Theme:</strong> {ws.topic}
                      </span>
                    </div>
                  )}

                  {/* Organized By Parameters */}
                  <div className="flex flex-col gap-1 text-xs text-foreground-muted">
                    <div className="flex items-start gap-2">
                      <Landmark className="h-3.5 w-3.5 text-accent-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">Organized By:</strong>{' '}
                        {ws.organizerName || ws.organizedBy}
                        {ws.organizationType && (
                          <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-muted border border-border-subtle text-foreground-muted">
                            {ws.organizationType}
                          </span>
                        )}
                      </span>
                    </div>
                    {(ws.organizerAddress || ws.location) && (
                      <div className="flex items-center gap-1.5 pl-5.5 text-[11px] text-foreground-muted/80">
                        <MapPin className="h-3 w-3 text-accent-500 shrink-0" />
                        <span>{ws.organizerAddress || ws.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description & Conclusion */}
                  {ws.description && (
                    <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-border-subtle/60 text-xs text-foreground-muted space-y-1">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <span>Overview & Key Learnings</span>
                      </div>
                      <p className="leading-relaxed">{ws.description}</p>
                    </div>
                  )}

                  {/* Document Proof / Certificate Badge */}
                  {ws.documentProofName && (
                    <div className="pt-1 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <FileCheck className="h-4 w-4 shrink-0" />
                      <span>Document Proof: {ws.documentProofName}</span>
                    </div>
                  )}
                </div>
              ))}

              {filteredWorkshops.length > 2 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAllWorkshops(!showAllWorkshops)}
                  className="royal-show-more w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                >
                  {showAllWorkshops ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredWorkshops.length - 2} additional)</span>
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
