'use client';

import React, { useEffect, useState } from 'react';
import { profile as initialProfile } from '../data/profile';
import { FacultyProfile } from '../types/faculty';
import { subscribeToCloudProfile } from '../lib/profileService';

import HighlightsTicker from '../components/layout/HighlightsTicker';
import Nav from '../components/layout/Nav';
import SidebarNav from '../components/layout/SidebarNav';
import ProfileSummary from '../components/sections/ProfileSummary';
import EducationExperience from '../components/sections/EducationExperience';
import Publications from '../components/sections/Publications';
import ProjectsGrants from '../components/sections/ProjectsGrants';
import AwardsAchievements from '../components/sections/AwardsAchievements';
import ConferencesWorkshops from '../components/sections/ConferencesWorkshops';
import ScholarsScholarly from '../components/sections/ScholarsScholarly';
import RolesRecognition from '../components/sections/RolesRecognition';
import PatentsCopyrights from '../components/sections/PatentsCopyrights';
import PrintableCV from '../components/cv/PrintableCV';
import ThemeToggle from '../components/ui/ThemeToggle';
import { FadeIn } from '../components/ui/FadeIn';

const navItems = [
  { id: 'summary', label: 'Summary', icon: 'user' },
  { id: 'education-experience', label: 'Education & Skills', icon: 'education' },
  { id: 'publications', label: 'Publications', icon: 'publications' },
  { id: 'projects-grants', label: 'Projects & Grants', icon: 'projects' },
  { id: 'awards-achievements', label: 'Awards & Honors', icon: 'awards' },
  { id: 'conferences-workshops', label: 'Conferences', icon: 'conferences' },
  { id: 'scholars', label: 'Research Scholars', icon: 'scholars' },
  { id: 'roles-recognition', label: 'Roles & Recognitions', icon: 'roles' },
  { id: 'patents-copyrights', label: 'Patents & Copyrights', icon: 'patents' },
];

export default function Home() {
  const [profileData, setProfileData] = useState<FacultyProfile>(initialProfile);

  useEffect(() => {
    const unsubscribe = subscribeToCloudProfile((liveData) => {
      if (liveData && liveData.personalInfo) {
        setProfileData(liveData);
      }
    });
    return () => unsubscribe();
  }, []);

  const p = profileData;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <HighlightsTicker profile={p} />
      <Nav name={p.personalInfo.name} title={p.personalInfo.title} institution={p.personalInfo.institution} department={p.personalInfo.department} items={navItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarNav
            items={navItems}
            name={p.personalInfo.name}
            title={p.personalInfo.title}
            avatarUrl={p.personalInfo.avatarUrl}
          />

          <div className="flex-1 min-w-0 space-y-10">
            <FadeIn>
              <ProfileSummary profile={p} />
            </FadeIn>
            <FadeIn>
              <EducationExperience
                education={p.education || []}
                experience={p.experience || []}
                skills={p.skills || []}
              />
            </FadeIn>
            <FadeIn>
              <Publications publications={p.publications || []} />
            </FadeIn>
            <FadeIn>
              <ProjectsGrants
                fundedProjects={p.fundedProjects || []}
                grantsReceived={p.grantsReceived || []}
              />
            </FadeIn>
            <FadeIn>
              <AwardsAchievements
                awardsReceived={p.awardsReceived || []}
                academicAchievements={p.academicAchievements || []}
              />
            </FadeIn>
            <FadeIn>
              <ConferencesWorkshops
                conferencesAttended={p.conferencesAttended || []}
                workshopsAttended={p.workshopsAttended || []}
                workshopsConducted={p.workshopsConducted || []}
              />
            </FadeIn>
            <FadeIn>
              <ScholarsScholarly phdScholars={p.phdScholars || []} />
            </FadeIn>
            <FadeIn>
              <RolesRecognition
                resourcePersonRoles={p.resourcePersonRoles || []}
                externalExaminerRoles={p.externalExaminerRoles || []}
              />
            </FadeIn>
            <FadeIn>
              <PatentsCopyrights patents={p.patents || []} copyrights={p.copyrights || []} />
            </FadeIn>
          </div>
        </div>
      </main>

      <footer className="border-t bg-surface py-8 text-center text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--foreground-muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)', opacity: 0.7 }}>{p.personalInfo.institution}</p>
          <p>© {new Date().getFullYear()} {p.personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Printable Academic CV view (rendered only when printing) */}
      <PrintableCV profile={p} />

      {/* Floating Theme Toggle (Bottom-Right) */}
      <ThemeToggle variant="floating" />
    </div>
  );
}
