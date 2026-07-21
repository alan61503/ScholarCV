import React from 'react';
import { ResourcePersonRole, ExternalExaminerRole } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Presentation, ShieldCheck, Landmark, Award } from 'lucide-react';

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
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                <Presentation className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Resource Person Roles</h2>
            </div>

            {resourcePersonRoles.length === 0 ? (
              <p className="text-sm text-foreground-muted">No resource person roles recorded.</p>
            ) : (
              <div className="space-y-5">
                {resourcePersonRoles.map((role) => (
                  <div key={role.id} className="flex gap-4 p-3 rounded-xl hover:bg-surface-muted/40 transition-colors">
                    <div className="mt-1 shrink-0 p-2.5 h-10 w-10 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-serif font-bold text-foreground leading-tight">
                          {role.eventTitle}
                        </h3>
                        <span className="text-xs font-semibold font-mono bg-accent-500/10 text-accent-700 dark:text-accent-400 px-2.5 py-0.5 rounded-full border border-accent-500/20">
                          {role.date}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground-muted">
                        Topic: <span className="text-foreground">"{role.topic}"</span>
                      </p>
                      <p className="text-xs text-foreground-muted">
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
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">External Examiner Roles</h2>
            </div>

            {externalExaminerRoles.length === 0 ? (
              <p className="text-sm text-foreground-muted">No examiner roles recorded.</p>
            ) : (
              <div className="space-y-5">
                {externalExaminerRoles.map((role) => (
                  <div key={role.id} className="flex gap-4 p-3 rounded-xl hover:bg-surface-muted/40 transition-colors">
                    <div className="mt-1 shrink-0 p-2.5 h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Landmark className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-serif font-bold text-foreground leading-tight">
                          {role.roleType} Examiner
                        </h3>
                        <span className="text-xs font-semibold font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          {role.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground-muted">
                        {role.department}
                      </p>
                      <p className="text-xs text-foreground-muted">
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
