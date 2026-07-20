import React from 'react';
import { getFacultyById, mockFacultyProfiles } from '../../../data/mockFaculty';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Component imports
import SidebarNav from '../../../components/layout/SidebarNav';
import ProfileSummary from '../../../components/sections/ProfileSummary';
import EducationExperience from '../../../components/sections/EducationExperience';
import Publications from '../../../components/sections/Publications';
import ProjectsGrants from '../../../components/sections/ProjectsGrants';
import AwardsAchievements from '../../../components/sections/AwardsAchievements';
import ConferencesWorkshops from '../../../components/sections/ConferencesWorkshops';
import ScholarsScholarly from '../../../components/sections/ScholarsScholarly';
import RolesRecognition from '../../../components/sections/RolesRecognition';
import PatentsCopyrights from '../../../components/sections/PatentsCopyrights';
import { FadeIn } from '../../../components/ui/FadeIn';

// Icon imports
import {
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Trophy,
  Presentation,
  Users,
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface FacultyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockFacultyProfiles.map((profile) => ({
    id: profile.id,
  }));
}

export default async function FacultyPage({ params }: FacultyPageProps) {
  const { id } = await params;
  const profile = getFacultyById(id);

  if (!profile) {
    notFound();
  }

  // Sidebar navigation items
  const navItems = [
    { id: 'summary', label: 'Summary', icon: 'user' },
    { id: 'education-experience', label: 'Education & Skills', icon: 'education' },
    { id: 'publications', label: 'Publications', icon: 'publications' },
    { id: 'projects-grants', label: 'Projects & Grants', icon: 'projects' },
    { id: 'awards-achievements', label: 'Awards & Honors', icon: 'awards' },
    { id: 'conferences-workshops', label: 'Conferences & Workshops', icon: 'conferences' },
    { id: 'scholars', label: 'Research Scholars', icon: 'scholars' },
    { id: 'roles-recognition', label: 'Roles & Recognitions', icon: 'roles' },
    { id: 'patents-copyrights', label: 'Patents & Copyrights', icon: 'patents' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/10 selection:text-indigo-650">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-650 dark:text-indigo-400">
              Academic Portfolio Portal
            </span>
            <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {profile.personalInfo.name}
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky sidebar */}
          <SidebarNav items={navItems} />

          {/* Core Content */}
          <div className="flex-1 space-y-12">
            <FadeIn>
              <ProfileSummary profile={profile} />
            </FadeIn>
            <FadeIn>
              <EducationExperience
                education={profile.education}
                experience={profile.experience}
                skills={profile.skills}
              />
            </FadeIn>
            <FadeIn>
              <Publications publications={profile.publications} />
            </FadeIn>
            <FadeIn>
              <ProjectsGrants
                fundedProjects={profile.fundedProjects}
                grantsReceived={profile.grantsReceived}
              />
            </FadeIn>
            <FadeIn>
              <AwardsAchievements
                awardsReceived={profile.awardsReceived}
                academicAchievements={profile.academicAchievements}
              />
            </FadeIn>
            <FadeIn>
              <ConferencesWorkshops
                conferencesAttended={profile.conferencesAttended}
                workshopsAttended={profile.workshopsAttended}
                workshopsConducted={profile.workshopsConducted}
              />
            </FadeIn>
            <FadeIn>
              <ScholarsScholarly phdScholars={profile.phdScholars} />
            </FadeIn>
            <FadeIn>
              <RolesRecognition
                resourcePersonRoles={profile.resourcePersonRoles}
                externalExaminerRoles={profile.externalExaminerRoles}
              />
            </FadeIn>
            <FadeIn>
              <PatentsCopyrights patents={profile.patents} copyrights={profile.copyrights} />
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Elegant Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 text-center text-xs text-slate-400 dark:text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {profile.personalInfo.institution}. All rights reserved.</p>
          <p className="mt-1 text-slate-350 dark:text-slate-700">Powered by the Academic Portfolio Template.</p>
        </div>
      </footer>
    </div>
  );
}
