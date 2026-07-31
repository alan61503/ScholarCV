'use client';

import React, { useEffect, useState } from 'react';
import { profile as initialProfile } from '../data/profile';
import { FacultyProfile } from '../types/faculty';
import { subscribeToCloudProfile } from '../lib/profileService';

import Nav from '../components/layout/Nav';
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
import { FadeIn } from '../components/ui/FadeIn';

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

export default function Home() {
  const [profileData, setProfileData] = useState<FacultyProfile>(initialProfile);

  useEffect(() => {
    // Subscribe to live real-time updates from Firebase Cloud Firestore
    const unsubscribe = subscribeToCloudProfile((liveData) => {
      if (liveData && liveData.personalInfo) {
        setProfileData(liveData);
      }
    });

    return () => unsubscribe();
  }, []);

  const p = profileData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav name={p.personalInfo.name} title={p.personalInfo.title} items={navItems} />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-14 space-y-14 md:space-y-16">
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
      </main>

      <footer className="border-t border-border-subtle bg-surface py-8 text-center text-xs text-foreground-muted">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-1">
          <p className="font-serif text-foreground/70">{p.personalInfo.institution}</p>
          <p>© {new Date().getFullYear()} {p.personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Printable Academic CV view (rendered only when printing) */}
      <PrintableCV profile={p} />
    </div>
  );
}
