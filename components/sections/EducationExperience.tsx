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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Professional Experience</h2>
            </div>

            {experience.length === 0 ? (
              <p className="text-sm text-foreground-muted">No experience records available.</p>
            ) : (
              <div className="relative pl-6 border-l border-border-subtle/80 space-y-8 py-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-accent-200 dark:border-accent-800 bg-surface">
                      <span className="h-2 w-2 rounded-full bg-accent-600 dark:bg-accent-400" />
                    </span>
                    
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400">
                        {exp.startDate} – {exp.endDate}
                      </span>
                      <h3 className="text-base font-bold text-foreground pt-1">{exp.role}</h3>
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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Education Background</h2>
            </div>

            {education.length === 0 ? (
              <p className="text-sm text-foreground-muted">No education records available.</p>
            ) : (
              <div className="relative pl-6 border-l border-border-subtle/80 space-y-8 py-2">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 bg-surface">
                      <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    </span>
                    
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                        Class of {edu.year}
                      </span>
                      <h3 className="text-base font-bold text-foreground pt-1">{edu.degree}</h3>
                      <p className="text-sm font-semibold text-foreground">{edu.field}</p>
                      <p className="text-sm text-foreground-muted">{edu.institution}</p>
                      {edu.grade && (
                        <p className="text-xs text-foreground-muted font-medium">Grade/GPA: {edu.grade}</p>
                      )}
                      {edu.thesisTitle && (
                        <p className="text-xs md:text-sm text-foreground-muted italic leading-relaxed pt-1.5 border-t border-border-subtle mt-2">
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
          <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Code className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-foreground">Areas of Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((group, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-surface-muted/80 text-foreground-muted text-xs font-medium border border-border-subtle/50 hover:bg-accent-50/50 dark:hover:bg-accent-950/20 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-100 dark:hover:border-accent-950 transition-colors cursor-default"
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
