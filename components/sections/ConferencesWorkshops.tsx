'use client';

import React, { useState } from 'react';
import { Conference, Workshop } from '../../types/faculty';
import { Presentation, Landmark, Calendar, Settings, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface ConferencesWorkshopsProps {
  conferencesAttended: Conference[];
  workshopsAttended: Workshop[];
  workshopsConducted: Workshop[];
}

export default function ConferencesWorkshops({
  conferencesAttended,
  workshopsAttended,
  workshopsConducted,
} : ConferencesWorkshopsProps) {
  const [showAllConferences, setShowAllConferences] = useState<boolean>(false);
  const [showAllConducted, setShowAllConducted] = useState<boolean>(false);
  const [showAllAttended, setShowAllAttended] = useState<boolean>(false);

  const displayedConferences = showAllConferences
    ? conferencesAttended
    : conferencesAttended.slice(0, 2);

  const displayedConducted = showAllConducted
    ? workshopsConducted
    : workshopsConducted.slice(0, 2);

  const displayedAttended = showAllAttended
    ? workshopsAttended
    : workshopsAttended.slice(0, 2);

  return (
    <section id="conferences-workshops" className="scroll-mt-24 space-y-6">
      {/* Conferences Attended */}
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle/80 relative">
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
                Conferences Attended
              </h2>
            </div>
            <span 
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
            >
              {conferencesAttended.length} {conferencesAttended.length === 1 ? 'Conference' : 'Conferences'}
            </span>
            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#1d4ed8] to-transparent" />
          </div>

          {conferencesAttended.length === 0 ? (
            <p className="text-sm text-foreground-muted py-4 text-center">No conferences recorded.</p>
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
                            : conf.role === 'Presenter'
                            ? 'bg-accent-500/10 text-accent-700 dark:text-accent-400 border border-accent-500/20'
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
                        Paper: "{conf.paperTitle}"
                      </p>
                    )}
                    <p className="text-xs text-foreground-muted flex items-center gap-1.5 pt-1">
                      <Landmark className="h-3.5 w-3.5 text-accent-500" />
                      {conf.location}
                    </p>
                  </div>
                ))}
              </div>

              {conferencesAttended.length > 2 && (
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
                      <span>Show More ({conferencesAttended.length - 2} additional)</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Workshops Grid (Attended & Conducted) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workshops Conducted */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80 relative">
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
                Workshops Conducted
              </h2>
              <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#059669] to-transparent" />
            </div>

            {workshopsConducted.length === 0 ? (
              <p className="text-sm text-foreground-muted">No workshops conducted recorded.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {displayedConducted.map((workshop) => (
                    <div key={workshop.id} className="p-4 border border-border-subtle/80 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h3 
                          className="text-sm md:text-base font-bold text-foreground leading-tight"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {workshop.title}
                        </h3>
                        <span className="text-[11px] shrink-0 font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          Conducted
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">
                        <strong className="text-foreground">Org:</strong> {workshop.organizedBy}
                      </p>
                      <p className="text-xs font-mono text-foreground-muted">
                        {workshop.startDate} – {workshop.endDate} {workshop.location && `• ${workshop.location}`}
                      </p>
                    </div>
                  ))}
                </div>

                {workshopsConducted.length > 2 && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowAllConducted(!showAllConducted)}
                    className="royal-show-more w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-colors"
                  >
                    {showAllConducted ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Show More ({workshopsConducted.length - 2} additional)</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Workshops Attended */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80 relative">
              <div 
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
              >
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Workshops Attended
              </h2>
              <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#1d4ed8] to-transparent" />
            </div>

            {workshopsAttended.length === 0 ? (
              <p className="text-sm text-foreground-muted">No workshops attended recorded.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {displayedAttended.map((workshop) => (
                    <div key={workshop.id} className="p-4 border border-border-subtle/80 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h3 
                          className="text-sm md:text-base font-bold text-foreground leading-tight"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {workshop.title}
                        </h3>
                        <span className="text-[11px] shrink-0 font-semibold bg-accent-500/10 text-accent-700 dark:text-accent-400 px-2.5 py-0.5 rounded-full border border-accent-500/20">
                          Attended
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">
                        <strong className="text-foreground">Org:</strong> {workshop.organizedBy}
                      </p>
                      <p className="text-xs font-mono text-foreground-muted">
                        {workshop.startDate} – {workshop.endDate} {workshop.location && `• ${workshop.location}`}
                      </p>
                    </div>
                  ))}
                </div>

                {workshopsAttended.length > 2 && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowAllAttended(!showAllAttended)}
                    className="royal-show-more w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-colors"
                  >
                    {showAllAttended ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Show More ({workshopsAttended.length - 2} additional)</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
