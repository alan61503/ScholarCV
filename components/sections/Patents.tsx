'use client';

import React, { useState } from 'react';
import { Patent } from '../../types/faculty';
import { Award, Calendar, Globe, ExternalLink, Filter, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface PatentsProps {
  patents: Patent[];
}

export default function Patents({ patents = [] }: PatentsProps) {
  const [showAllPatents, setShowAllPatents] = useState<boolean>(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  const filteredPatents = patents.filter((pat) => {
    if (selectedStatusFilter === 'All') return true;
    return pat.status === selectedStatusFilter;
  });

  const displayedPatents = showAllPatents
    ? filteredPatents
    : filteredPatents.slice(0, 2);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Granted':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'Published':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'Filed':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-surface-muted text-foreground-muted border-border-subtle';
    }
  };

  return (
    <section id="patents" className="scroll-mt-24 space-y-6">
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header Bar with Status Filter Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(139,26,26,0.1)', color: '#8b1a1a' }}
              >
                <Award className="h-5 w-5" />
              </div>
              <h2
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Patents
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-surface-muted/80 border border-border-subtle rounded-xl px-3 py-1.5 shadow-sm">
                <Filter className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                <span className="text-xs font-medium text-foreground-muted hidden md:inline">Status:</span>
                <select
                  aria-label="Filter patents by status"
                  value={selectedStatusFilter}
                  onChange={(e) => {
                    setSelectedStatusFilter(e.target.value);
                    setShowAllPatents(true);
                  }}
                  className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All" className="bg-surface text-foreground">All Patents</option>
                  <option value="Filed" className="bg-surface text-foreground">Filed</option>
                  <option value="Published" className="bg-surface text-foreground">Published</option>
                  <option value="Granted" className="bg-surface text-foreground">Granted</option>
                </select>
              </div>

              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(139,26,26,0.1)', color: '#8b1a1a' }}
              >
                {filteredPatents.length} {filteredPatents.length === 1 ? 'Patent' : 'Patents'}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#8b1a1a] to-transparent" />
          </div>

          {filteredPatents.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No patents found for status &quot;{selectedStatusFilter}&quot;.
            </p>
          ) : (
            <div className="space-y-5">
              {displayedPatents.map((pat) => (
                <div
                  key={pat.id}
                  className="p-5 md:p-6 border border-border-subtle/80 rounded-2xl hover:bg-surface-muted/40 transition-all duration-200 space-y-3 shadow-sm"
                >
                  {/* Status Badge & Filing Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(pat.status)}`}>
                      {pat.status}
                    </span>

                    <span className="text-xs font-mono text-foreground-muted flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent-500" />
                      Filing Date: {pat.filingDate}{pat.grantDate ? ` • Granted: ${pat.grantDate}` : ''}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base md:text-lg font-bold text-foreground leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {pat.title}
                  </h3>

                  {/* Inventors & Numbers */}
                  <div className="space-y-1 text-xs text-foreground-muted">
                    <p>
                      <strong className="text-foreground">Inventors:</strong>{' '}
                      {Array.isArray(pat.inventors) ? pat.inventors.join(', ') : pat.inventors}
                    </p>
                    <p className="font-mono">
                      <strong className="text-foreground font-sans">App No:</strong> {pat.applicationNumber}
                      {pat.patentNumber && (
                        <>
                          <span className="mx-2">•</span>
                          <strong className="text-foreground font-sans">Patent No:</strong> {pat.patentNumber}
                        </>
                      )}
                      {pat.country && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-sans">{pat.country}</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Description */}
                  {pat.description && (
                    <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-border-subtle/60 text-xs text-foreground-muted space-y-1">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-accent-500" />
                        <span>Patent Abstract / Overview</span>
                      </div>
                      <p className="leading-relaxed">{pat.description}</p>
                    </div>
                  )}

                  {/* Document / Patent Link */}
                  {pat.url && (
                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={pat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                      >
                        <Globe className="h-3.5 w-3.5 shrink-0" />
                        <span>View Patent Document / Official Gazette Link</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {filteredPatents.length > 2 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAllPatents(!showAllPatents)}
                  className="royal-show-more w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                >
                  {showAllPatents ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredPatents.length - 2} additional)</span>
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
