import React from 'react';
import { ResourcePersonRole, ExternalExaminerRole } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { ShieldAlert, Presentation, ShieldCheck, Landmark, Calendar, Award } from 'lucide-react';

interface RolesRecognitionProps {
  resourcePersonRoles: ResourcePersonRole[];
  externalExaminerRoles: ExternalExaminerRole[];
}

export default function RolesRecognition({
  resourcePersonRoles,
  externalExaminerRoles,
}: RolesRecognitionProps) {
  return (
    <section id="roles-recognition" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Person Roles */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Presentation className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Resource Person Roles</h2>
            </div>

            {resourcePersonRoles.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No resource person roles recorded.</p>
            ) : (
              <div className="space-y-6">
                {resourcePersonRoles.map((role) => (
                  <div key={role.id} className="flex gap-4">
                    <div className="mt-1 shrink-0 p-2 h-9 w-9 rounded-lg bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-indigo-500">
                      <Award className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-slate-955 dark:text-white leading-tight">
                          {role.eventTitle}
                        </h3>
                        <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-655 dark:text-slate-400 px-2 py-0.5 rounded">
                          {role.date}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Topic: <span className="text-slate-700 dark:text-slate-350">"{role.topic}"</span>
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Organized by: {role.organizedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* External Examiner Roles */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">External Examiner Roles</h2>
            </div>

            {externalExaminerRoles.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No examiner roles recorded.</p>
            ) : (
              <div className="space-y-6">
                {externalExaminerRoles.map((role) => (
                  <div key={role.id} className="flex gap-4">
                    <div className="mt-1 shrink-0 p-2 h-9 w-9 rounded-lg bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-emerald-500">
                      <Landmark className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-slate-950 dark:text-white leading-tight">
                          {role.roleType} Examiner
                        </h3>
                        <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                          {role.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-655 dark:text-slate-350">
                        {role.department}
                      </p>
                      <p className="text-xs text-slate-405 dark:text-slate-500">
                        University: {role.university}
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
