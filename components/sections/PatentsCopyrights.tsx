import React from 'react';
import { Patent, Copyright } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { FileText, Award, Calendar, Landmark, CheckCircle, HelpCircle } from 'lucide-react';

interface PatentsCopyrightsProps {
  patents: Patent[];
  copyrights: Copyright[];
}

export default function PatentsCopyrights({ patents, copyrights }: PatentsCopyrightsProps) {
  return (
    <section id="patents-copyrights" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patents */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Patents</h2>
            </div>

            {patents.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-100 dark:border-slate-800/40 rounded-2xl">
                <HelpCircle className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No patents filed or granted yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {patents.map((patent) => (
                  <div
                    key={patent.id}
                    className="p-4 border border-slate-50 dark:border-slate-800/50 rounded-xl space-y-3 hover:bg-slate-50/10 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${
                            patent.status === 'Granted'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                              : patent.status === 'Published'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                          }
                        `}
                      >
                        {patent.status}
                      </span>
                      
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        Filing Date: {patent.filingDate}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-snug font-serif">
                      {patent.title}
                    </h3>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <p>
                        <span className="font-semibold">Inventors:</span> {patent.inventors.join(', ')}
                      </p>
                      <p>
                        <span className="font-semibold">Application No:</span> {patent.applicationNumber}
                      </p>
                      {patent.patentNumber && (
                        <p>
                          <span className="font-semibold">Patent No:</span> {patent.patentNumber}
                        </p>
                      )}
                      <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                        <Landmark className="h-3 w-3" />
                        {patent.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Copyrights */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Registered Copyrights</h2>
            </div>

            {copyrights.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-100 dark:border-slate-800/40 rounded-2xl">
                <HelpCircle className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No copyright filings recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {copyrights.map((copyright) => (
                  <div
                    key={copyright.id}
                    className="p-4 border border-slate-50 dark:border-slate-800/50 rounded-xl space-y-2 hover:bg-slate-50/10 transition-colors"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                        {copyright.status}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                        Registered Year: {copyright.year}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-slate-950 dark:text-white leading-tight font-serif">
                      {copyright.title}
                    </h3>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <p>
                        <span className="font-semibold">Reg. Number:</span> {copyright.registrationNumber}
                      </p>
                      <p>
                        <span className="font-semibold">Owners:</span> {copyright.owners.join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
