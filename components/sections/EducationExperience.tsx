import React from 'react';
import { Education, Experience, SkillGroup } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { GraduationCap, Briefcase, Code } from 'lucide-react';

interface EducationExperienceProps {
  education: Education[];
  experience: Experience[];
  skills: SkillGroup[];
}

export default function EducationExperience({ education, experience, skills }: EducationExperienceProps) {
  return (
    <section id="education-experience" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience Timeline */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Professional Experience</h2>
            </div>

            {experience.length === 0 ? (
              <p className="text-sm text-foreground-muted">No experience records available.</p>
            ) : (
              <div className="relative pl-6 border-l border-border-subtle/80 space-y-8 py-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-accent-500/30 bg-surface">
                      <span className="h-2 w-2 rounded-full bg-accent-600 dark:bg-accent-400" />
                    </span>

                    <div className="space-y-1.5">
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-mono bg-accent-500/10 text-accent-700 dark:text-accent-400 border border-accent-500/20">
                        {exp.startDate} – {exp.endDate}
                      </span>
                      <h3 className="text-base font-serif font-bold text-foreground pt-1">{exp.role}</h3>
                      <p className="text-sm font-medium text-foreground-muted">
                        {exp.organization} {exp.location && `• ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-xs md:text-sm text-foreground-muted leading-relaxed pt-1">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Education Timeline */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Education Background</h2>
            </div>

            {education.length === 0 ? (
              <p className="text-sm text-foreground-muted">No education records available.</p>
            ) : (
              <div className="relative pl-6 border-l border-border-subtle/80 space-y-8 py-2">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-surface">
                      <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    </span>

                    <div className="space-y-1.5">
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        Class of {edu.year}
                      </span>
                      <h3 className="text-base font-serif font-bold text-foreground pt-1">{edu.degree}</h3>
                      <p className="text-sm font-semibold text-foreground">{edu.field}</p>
                      <p className="text-sm text-foreground-muted">{edu.institution}</p>
                      {edu.grade && (
                        <p className="text-xs text-foreground-muted font-medium font-mono">Grade/GPA: {edu.grade}</p>
                      )}
                      {edu.thesisTitle && (
                        <p className="text-xs md:text-sm text-foreground-muted italic leading-relaxed pt-2 border-t border-border-subtle/70 mt-2">
                          Thesis: "{edu.thesisTitle}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Skills Group Card */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0">
              <Code className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Areas of Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((group, idx) => (
              <div key={idx} className="space-y-3 p-4 rounded-xl border border-border-subtle/60 bg-surface-muted/30">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-medium border border-accent-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
