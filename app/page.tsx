import React from 'react';
import { profile } from '../data/profile';

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav name={profile.personalInfo.name} title={profile.personalInfo.title} items={navItems} />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-14 space-y-14 md:space-y-16">
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
      </main>

      <footer className="border-t border-border-subtle bg-surface py-8 text-center text-xs text-foreground-muted">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-1">
          <p className="font-serif text-foreground/70">{profile.personalInfo.institution}</p>
          <p>© {new Date().getFullYear()} {profile.personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
