'use client';

import React, { useState } from 'react';
import { Conference, Workshop } from '../../types/faculty';
import { Presentation, Landmark, Calendar, Settings, BookOpen, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface ConferencesWorkshopsProps {
  conferencesAttended: Conference[];
  workshopsAttended?: Workshop[];
  workshopsConducted?: Workshop[];
}

export default function ConferencesWorkshops({
  conferencesAttended = [],
} : ConferencesWorkshopsProps) {
  const [showAllConferences, setShowAllConferences] = useState<boolean>(false);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');

  const filteredConferences = conferencesAttended.filter((conf) => {
    if (selectedRoleFilter === 'All') return true;
    const roleLower = (conf.role || '').toLowerCase();
    if (selectedRoleFilter === 'Attended') {
      return (
        conf.role === 'Attendee' ||
        conf.role === 'Presenter' ||
        roleLower.includes('attend') ||
        roleLower.includes('present')
      );
    }
    if (selectedRoleFilter === 'Conducted') {
      return (
        conf.role === 'Conducted' ||
        roleLower.includes('conduct') ||
        roleLower.includes('organiz')
      );
    }
    if (selectedRoleFilter === 'Session Chair') {
      return conf.role === 'Session Chair' || roleLower.includes('chair');
    }
    if (selectedRoleFilter === 'Keynote Speaker') {
      return (
        conf.role === 'Keynote Speaker' ||
        roleLower.includes('keynote') ||
        roleLower.includes('speaker')
      );
    }
    return conf.role === selectedRoleFilter;
  });

  const displayedConferences = showAllConferences
    ? filteredConferences
    : filteredConferences.slice(0, 2);

  return (
    <section id="conferences-workshops" className="scroll-mt-24 space-y-6">
      {/* Conferences Section */}
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
              >
                <Presentation className="h-5 w-5" />
              </div>
              <h2 
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Conferences
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Role Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-surface-muted/80 border border-border-subtle rounded-xl px-3 py-1.5 shadow-sm">
                <Filter className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                <span className="text-xs font-medium text-foreground-muted hidden md:inline">Filter:</span>
                <select
                  aria-label="Filter conferences by role"
                  value={selectedRoleFilter}
                  onChange={(e) => {
                    setSelectedRoleFilter(e.target.value);
                    setShowAllConferences(true);
                  }}
                  className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All" className="bg-surface text-foreground">All Conferences</option>
                  <option value="Attended" className="bg-surface text-foreground">Attended / Presenter</option>
                  <option value="Conducted" className="bg-surface text-foreground">Conducted</option>
                  <option value="Session Chair" className="bg-surface text-foreground">Session Chair</option>
                  <option value="Keynote Speaker" className="bg-surface text-foreground">Keynote Speaker</option>
                </select>
              </div>

              <span 
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
              >
                {filteredConferences.length} {filteredConferences.length === 1 ? 'Conference' : 'Conferences'}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#1d4ed8] to-transparent" />
          </div>

          {filteredConferences.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No conferences found for role &quot;{selectedRoleFilter}&quot;.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-4">
                {displayedConferences.map((conf) => (
                  <div
                    key={conf.id}
                    className="p-5 border border-border-subtle/80 rounded-xl hover:bg-surface-muted/40 transition-colors space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                          conf.role === 'Keynote Speaker'
                            ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                            : conf.role === 'Session Chair'
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                            : conf.role === 'Presenter' || conf.role === 'Attendee'
                            ? 'bg-accent-500/10 text-accent-700 dark:text-accent-400 border border-accent-500/20'
                            : conf.role === 'Conducted'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-surface-muted text-foreground-muted border border-border-subtle'
                        }`}
                      >
                        {conf.role}
                      </span>
                      <span className="text-xs font-mono text-foreground-muted flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-accent-500" />
                        {conf.date}
                      </span>
                    </div>

                    <h3 
                      className="text-base font-bold text-foreground"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {conf.title}
                    </h3>
                    {conf.paperTitle && (
                      <p className="text-xs md:text-sm text-foreground-muted italic leading-relaxed">
                        Paper: &quot;{conf.paperTitle}&quot;
                      </p>
                    )}
                    <p className="text-xs text-foreground-muted flex items-center gap-1.5 pt-1">
                      <Landmark className="h-3.5 w-3.5 text-accent-500" />
                      {conf.location}
                    </p>
                  </div>
                ))}
              </div>

              {filteredConferences.length > 2 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAllConferences(!showAllConferences)}
                  className="royal-show-more w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                >
                  {showAllConferences ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredConferences.length - 2} additional)</span>
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
