import React from 'react';
import { FacultyProfile } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Mail, Phone, MapPin, Globe, Award, BookOpen, Briefcase, FileCheck } from 'lucide-react';

interface ProfileSummaryProps {
  profile: FacultyProfile;
}

export default function ProfileSummary({ profile }: ProfileSummaryProps) {
  const { personalInfo, experience, publications, fundedProjects } = profile;

  // Calculate quick stats
  const yearsOfExp = experience.reduce((acc, exp) => {
    const startYear = parseInt(exp.startDate.split('-')[0]);
    const endYear = exp.endDate === 'Present' ? new Date().getFullYear() : parseInt(exp.endDate.split('-')[0]);
    return acc + (endYear - startYear);
  }, 0);

  const stats = [
    { label: 'Publications', value: publications.length, icon: BookOpen },
    { label: 'Funded Projects', value: fundedProjects.length, icon: FileCheck },
    { label: 'Years Experience', value: Math.max(yearsOfExp, 1), icon: Briefcase },
    { label: 'Awards Received', value: profile.awardsReceived.length, icon: Award },
  ];

  return (
    <section id="summary" className="scroll-mt-24 space-y-6">
      {/* Hero Card */}
      <Card className="relative overflow-hidden border-none bg-gradient-to-br from-slate-950 via-slate-900 to-primary-accent/40 text-white p-6 lg:p-8 animate-gradient-slow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-accent/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-accent/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row gap-6 md:items-center">
          {personalInfo.avatarUrl && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-3 flex-1">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight">{personalInfo.name}</h1>
              <p className="text-indigo-200 font-medium text-sm md:text-base mt-1">{personalInfo.title}</p>
              <p className="text-slate-300 text-xs md:text-sm">{personalInfo.department}</p>
              <p className="text-slate-400 text-xs md:text-sm">{personalInfo.institution}</p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-300 pt-2 border-t border-white/10">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-indigo-300" />
                <span>{personalInfo.email}</span>
              </a>
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-indigo-300" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.officeAddress && (
                <div className="flex items-center gap-1.5 max-w-xs md:max-w-sm">
                  <MapPin className="h-4 w-4 text-indigo-300 shrink-0" />
                  <span className="truncate" title={personalInfo.officeAddress}>{personalInfo.officeAddress}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-base md:text-lg italic text-slate-200 leading-relaxed font-serif">
            "{personalInfo.biography.split('.')[0]}."
          </p>
        </div>

        {/* Action Links */}
        <div className="relative flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
          {personalInfo.websiteUrl && (
            <a
              href={personalInfo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-medium"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Personal Website</span>
            </a>
          )}
          {personalInfo.googleScholarUrl && (
            <a
              href={personalInfo.googleScholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-medium"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Google Scholar</span>
            </a>
          )}
          {personalInfo.linkedInUrl && (
            <a
              href={personalInfo.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-medium"
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.orcid && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/40 text-slate-300 font-mono">
              <span>ORCID: {personalInfo.orcid}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-serif">{stat.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Biography & Research Interests */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Biography</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              {personalInfo.biography}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Primary Research Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {personalInfo.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs md:text-sm font-medium border border-slate-100 dark:border-slate-800/40"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
