'use client';

import React, { useState } from 'react';
import { Conference, Workshop } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
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
}: ConferencesWorkshopsProps) {
  const [showAllConferences, setShowAllConferences] = useState<boolean>(false);
  const [showAllConducted, setShowAllConducted] = useState<boolean>(false);
  const [showAllAttended, setShowAllAttended] = useState<boolean>(false);

  const displayedConferences = showAllConferences
    ? conferencesAttended
    : conferencesAttended.slice(0, 2);

  const displayedConducted = showAllConducted
    ? workshopsConducted
    : workshopsConducted.slice(0, 1);

  const displayedAttended = showAllAttended
    ? workshopsAttended
    : workshopsAttended.slice(0, 1);

  return (
    <section id="conferences-workshops" className="scroll-mt-24 space-y-6">
      {/* Conferences Attended */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
            <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400">
              <Presentation className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-foreground">Conferences Attended</h2>
          </div>

          {conferencesAttended.length === 0 ? (
            <p className="text-sm text-foreground-muted py-4">No conferences recorded.</p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-4">
                {displayedConferences.map((conf) => (
                  <div
                    key={conf.id}
                    className="p-5 border border-border-subtle rounded-md hover:bg-surface-muted/60 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${
                            conf.role === 'Keynote Speaker'
                              ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                              : conf.role === 'Session Chair'
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                              : conf.role === 'Presenter'
                              ? 'bg-accent-55/10 text-accent-650 dark:text-accent-400'
                              : 'bg-surface-muted text-foreground-muted'
                          }
                        `}
                      >
                        {conf.role}
                      </span>
                      <span className="text-xs text-foreground-muted flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {conf.date}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-foreground">{conf.title}</h3>
                    {conf.paperTitle && (
                      <p className="text-xs md:text-sm text-foreground-muted italic">
                        Paper: "{conf.paperTitle}"
                      </p>
                    )}
                    <p className="text-xs text-foreground-muted flex items-center gap-1 pt-1">
                      <Landmark className="h-3.5 w-3.5" />
                      {conf.location}
                    </p>
                  </div>
                ))}
              </div>

              {conferencesAttended.length > 2 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAllConferences(!showAllConferences)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-border-subtle hover:bg-surface-muted text-xs font-semibold text-foreground-muted transition-colors"
                >
                  {showAllConferences ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({conferencesAttended.length - 2} additional)</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workshops Grid (Attended & Conducted) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workshops Conducted */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Settings className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Workshops Conducted</h2>
            </div>

            {workshopsConducted.length === 0 ? (
              <p className="text-sm text-foreground-muted">No workshops conducted recorded.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  {displayedConducted.map((workshop) => (
                    <div key={workshop.id} className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground leading-tight">
                          {workshop.title}
                        </h3>
                        <span className="text-[10px] shrink-0 font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                          Conducted
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">Org: {workshop.organizedBy}</p>
                      <p className="text-[11px] text-foreground-muted">
                        {workshop.startDate} to {workshop.endDate} {workshop.location && `• ${workshop.location}`}
                      </p>
                    </div>
                  ))}
                </div>

                {workshopsConducted.length > 1 && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowAllConducted(!showAllConducted)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border-subtle hover:bg-surface-muted text-xs font-semibold text-foreground-muted transition-colors"
                  >
                    {showAllConducted ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        <span>Show More ({workshopsConducted.length - 1} additional)</span>
                        <ChevronDown className="h-3 w-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workshops Attended */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-surface-muted text-foreground-muted">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Workshops Attended</h2>
            </div>

            {workshopsAttended.length === 0 ? (
              <p className="text-sm text-foreground-muted">No workshops attended recorded.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  {displayedAttended.map((workshop) => (
                    <div key={workshop.id} className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground leading-tight">
                          {workshop.title}
                        </h3>
                        <span className="text-[10px] shrink-0 font-semibold bg-surface-muted text-foreground-muted px-2 py-0.5 rounded">
                          Attended
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">Org: {workshop.organizedBy}</p>
                      <p className="text-[11px] text-foreground-muted">
                        {workshop.startDate} to {workshop.endDate} {workshop.location && `• ${workshop.location}`}
                      </p>
                    </div>
                  ))}
                </div>

                {workshopsAttended.length > 1 && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowAllAttended(!showAllAttended)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border-subtle hover:bg-surface-muted text-xs font-semibold text-foreground-muted transition-colors"
                  >
                    {showAllAttended ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        <span>Show More ({workshopsAttended.length - 1} additional)</span>
                        <ChevronDown className="h-3 w-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
