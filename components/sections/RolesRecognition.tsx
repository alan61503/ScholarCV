import React from 'react';
import { ResourcePersonRole, ExternalExaminerRole } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import {  Presentation, ShieldCheck, Landmark, Award } from 'lucide-react';

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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400">
                <Presentation className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Resource Person Roles</h2>
            </div>

            {resourcePersonRoles.length === 0 ? (
              <p className="text-sm text-foreground-muted">No resource person roles recorded.</p>
            ) : (
              <div className="space-y-6">
                {resourcePersonRoles.map((role) => (
                  <div key={role.id} className="flex gap-4">
                    <div className="mt-1 shrink-0 p-2 h-9 w-9 rounded-lg bg-surface-muted flex items-center justify-center text-accent-500">
                      <Award className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground leading-tight">
                          {role.eventTitle}
                        </h3>
                        <span className="text-[10px] font-semibold bg-surface-muted text-foreground-muted px-2 py-0.5 rounded">
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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">External Examiner Roles</h2>
            </div>

            {externalExaminerRoles.length === 0 ? (
              <p className="text-sm text-foreground-muted">No examiner roles recorded.</p>
            ) : (
              <div className="space-y-6">
                {externalExaminerRoles.map((role) => (
                  <div key={role.id} className="flex gap-4">
                    <div className="mt-1 shrink-0 p-2 h-9 w-9 rounded-lg bg-surface-muted flex items-center justify-center text-emerald-500">
                      <Landmark className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground leading-tight">
                          {role.roleType} Examiner
                        </h3>
                        <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
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
