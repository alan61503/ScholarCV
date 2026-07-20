'use client';

import React, { useState } from 'react';
import { Conference, Workshop } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Presentation, Landmark, Calendar, UserCheck, Settings, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

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
          <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Presentation className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Conferences Attended</h2>
          </div>

          {conferencesAttended.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-4">No conferences recorded.</p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-4">
                {displayedConferences.map((conf) => (
                  <div
                    key={conf.id}
                    className="p-5 border border-slate-50 dark:border-slate-800/50 rounded-xl hover:bg-slate-50/20 dark:hover:bg-slate-900/10 transition-colors space-y-2"
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
                              ? 'bg-indigo-55/10 text-indigo-650 dark:text-indigo-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }
                        `}
                      >
                        {conf.role}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {conf.date}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">{conf.title}</h3>
                    {conf.paperTitle && (
                      <p className="text-xs md:text-sm text-slate-655 dark:text-slate-300 italic">
                        Paper: "{conf.paperTitle}"
                      </p>
                    )}
                    <p className="text-xs text-slate-400 dark:text-slate-550 flex items-center gap-1 pt-1">
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
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-350 transition-colors"
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
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Settings className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Workshops Conducted</h2>
            </div>

            {workshopsConducted.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No workshops conducted recorded.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  {displayedConducted.map((workshop) => (
                    <div key={workshop.id} className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm md:text-base font-bold text-slate-955 dark:text-white leading-tight">
                          {workshop.title}
                        </h3>
                        <span className="text-[10px] shrink-0 font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                          Conducted
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Org: {workshop.organizedBy}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        {workshop.startDate} to {workshop.endDate} {workshop.location && `• ${workshop.location}`}
                      </p>
                    </div>
                  ))}
                </div>

                {workshopsConducted.length > 1 && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowAllConducted(!showAllConducted)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-semibold text-slate-550 dark:text-slate-400 transition-colors"
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
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Workshops Attended</h2>
            </div>

            {workshopsAttended.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No workshops attended recorded.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  {displayedAttended.map((workshop) => (
                    <div key={workshop.id} className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm md:text-base font-bold text-slate-950 dark:text-white leading-tight">
                          {workshop.title}
                        </h3>
                        <span className="text-[10px] shrink-0 font-semibold bg-slate-100 dark:bg-slate-800 text-slate-655 dark:text-slate-450 px-2 py-0.5 rounded">
                          Attended
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Org: {workshop.organizedBy}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        {workshop.startDate} to {workshop.endDate} {workshop.location && `• ${workshop.location}`}
                      </p>
                    </div>
                  ))}
                </div>

                {workshopsAttended.length > 1 && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowAllAttended(!showAllAttended)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-semibold text-slate-550 dark:text-slate-400 transition-colors"
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
