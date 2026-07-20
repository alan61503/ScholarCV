import React from 'react';
import { FundedProject, Grant } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Briefcase, CreditCard, Calendar, Landmark, CheckCircle, Clock } from 'lucide-react';

interface ProjectsGrantsProps {
  fundedProjects: FundedProject[];
  grantsReceived: Grant[];
}

export default function ProjectsGrants({ fundedProjects, grantsReceived }: ProjectsGrantsProps) {
  return (
    <section id="projects-grants" className="scroll-mt-24 space-y-6">
      {/* Funded Projects */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Funded Projects</h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-55/10 text-indigo-600 dark:text-indigo-400 rounded-full">
              {fundedProjects.length} Projects
            </span>
          </div>

          {fundedProjects.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
              No funded projects recorded.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fundedProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col justify-between p-5 border border-slate-50 dark:border-slate-800/50 rounded-2xl hover:border-slate-150 dark:hover:border-slate-800/80 transition-all hover:shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold
                          ${
                            project.status === 'Ongoing'
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          }
                        `}
                      >
                        {project.status === 'Ongoing' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        <span>{project.status}</span>
                      </span>
                      
                      <span className="text-xs font-mono font-bold text-slate-955 dark:text-slate-200">
                        {project.amount}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-indigo-650 dark:text-indigo-400 font-bold">
                      {project.role}
                    </p>

                    {project.description && (
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-450 dark:text-slate-500 mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/40">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Landmark className="h-3.5 w-3.5" />
                      {project.fundingAgency}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.startDate} to {project.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grants Received */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Grants Received</h2>
            </div>
          </div>

          {grantsReceived.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
              No grants recorded.
            </p>
          ) : (
            <div className="space-y-4">
              {grantsReceived.map((grant) => (
                <div
                  key={grant.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 border border-slate-50 dark:border-slate-800/50 rounded-xl hover:bg-slate-50/20 dark:hover:bg-slate-900/10 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{grant.title}</h3>
                      <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-655 dark:text-slate-400">
                        {grant.year}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Purpose: {grant.purpose}
                    </p>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Agency: {grant.agency}
                    </p>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-bold font-mono">
                      {grant.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
