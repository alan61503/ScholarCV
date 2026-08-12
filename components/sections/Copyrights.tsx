'use client';

import React, { useState } from 'react';
import { Copyright } from '../../types/faculty';
import { BookOpen, Calendar, Globe, ExternalLink, Filter, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface CopyrightsProps {
  copyrights: Copyright[];
}

export default function Copyrights({ copyrights = [] }: CopyrightsProps) {
  const [showAllCopyrights, setShowAllCopyrights] = useState<boolean>(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  const filteredCopyrights = copyrights.filter((cpy) => {
    if (selectedStatusFilter === 'All') return true;
    return cpy.status === selectedStatusFilter;
  });

  const displayedCopyrights = showAllCopyrights
    ? filteredCopyrights
    : filteredCopyrights.slice(0, 2);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Registered':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-surface-muted text-foreground-muted border-border-subtle';
    }
  };

  return (
    <section id="copyrights" className="scroll-mt-24 space-y-6">
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header Bar with Status Filter Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}
              >
                <BookOpen className="h-5 w-5" />
              </div>
              <h2
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Copyrights
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-surface-muted/80 border border-border-subtle rounded-xl px-3 py-1.5 shadow-sm">
                <Filter className="h-3.5 w-3.5 text-accent-500 shrink-0" />
                <span className="text-xs font-medium text-foreground-muted hidden md:inline">Status:</span>
                <select
                  aria-label="Filter copyrights by status"
                  value={selectedStatusFilter}
                  onChange={(e) => {
                    setSelectedStatusFilter(e.target.value);
                    setShowAllCopyrights(true);
                  }}
                  className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All" className="bg-surface text-foreground">All Copyrights</option>
                  <option value="Registered" className="bg-surface text-foreground">Registered</option>
                  <option value="Pending" className="bg-surface text-foreground">Pending</option>
                </select>
              </div>

              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}
              >
                {filteredCopyrights.length} {filteredCopyrights.length === 1 ? 'Copyright' : 'Copyrights'}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#059669] to-transparent" />
          </div>

          {filteredCopyrights.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No copyrights found for status &quot;{selectedStatusFilter}&quot;.
            </p>
          ) : (
            <div className="space-y-5">
              {displayedCopyrights.map((cpy) => (
                <div
                  key={cpy.id}
                  className="p-5 md:p-6 border border-border-subtle/80 rounded-2xl hover:bg-surface-muted/40 transition-all duration-200 space-y-3 shadow-sm"
                >
                  {/* Status Badge & Year */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(cpy.status)}`}>
                      Copyright {cpy.status}
                    </span>

                    <span className="text-xs font-mono text-foreground-muted flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent-500" />
                      Year: {cpy.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base md:text-lg font-bold text-foreground leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {cpy.title}
                  </h3>

                  {/* Owners & Registration Number */}
                  <div className="space-y-1 text-xs text-foreground-muted">
                    <p>
                      <strong className="text-foreground">Owners / Copyright Holders:</strong>{' '}
                      {Array.isArray(cpy.owners) ? cpy.owners.join(', ') : cpy.owners}
                    </p>
                    <p className="font-mono">
                      <strong className="text-foreground font-sans">Reg. No:</strong> {cpy.registrationNumber}
                    </p>
                  </div>

                  {/* Description */}
                  {cpy.description && (
                    <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-border-subtle/60 text-xs text-foreground-muted space-y-1">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-accent-500" />
                        <span>Copyright Overview & Scope</span>
                      </div>
                      <p className="leading-relaxed">{cpy.description}</p>
                    </div>
                  )}

                  {/* Document / Content Link */}
                  {cpy.url && (
                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={cpy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                      >
                        <Globe className="h-3.5 w-3.5 shrink-0" />
                        <span>View Registered Work / Document Content Link</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {filteredCopyrights.length > 2 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAllCopyrights(!showAllCopyrights)}
                  className="royal-show-more w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                >
                  {showAllCopyrights ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredCopyrights.length - 2} additional)</span>
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
