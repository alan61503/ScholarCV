export interface PersonalInfo {
  name: string;
  title: string; // e.g., Professor, Associate Professor
  department: string;
  institution: string;
  email: string;
  phone?: string;
  officeAddress?: string;
  avatarUrl?: string; // profile picture URL
  websiteUrl?: string;
  googleScholarUrl?: string;
  linkedInUrl?: string;
  orcid?: string;
  biography: string; // Executive summary
  researchInterests: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
  grade?: string;
  thesisTitle?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string; // or 'Present'
  description?: string;
}

export interface SkillGroup {
  category: string; // e.g., Research Methodologies, Programming Languages
  skills: string[];
}

export interface PublicationAuthor {
  id: string;
  position: number;
  name: string;
  isCorresponding: boolean;
  isStudent: boolean;
  email?: string;
  country?: string;
  affiliation?: string;
  institutionType?: string;
}

export interface IndexingEntry {
  id: string;
  agency: string; // e.g. ABDC, FT-50, Indian Citation Index, Not Indexed, Scopus, Web of Science, Others
  quartileOrCategory?: string; // Quartile Ranking / ABDC Category / IF Category
  percentile?: string;
  publicationUrl?: string;
  scopusWosLink?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journalName: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: string;
  doi?: string;
  citationCount?: number;
  type: 'Journal' | 'Conference' | 'Book' | 'Book Chapter';

  // --- Extended fields for a fully detailed "Article in Research Journals" record ---
  articleKeywords?: string[];
  subjectAreas?: string[];
  abstract?: string;
  sdgCategory?: string;
  language?: string;
  medium?: 'Print Only' | 'Print and Online' | 'E Journal';
  pageFrom?: string;
  pageTo?: string;
  authorship?: 'Sole Authored' | 'Co-Authored';
  authorDetails?: PublicationAuthor[];
  dateOfSubmission?: string;
  dateOfRevision?: string;
  dateOfPublication?: string;
  issn?: string;
  publisherName?: string;
  publisherAddress?: string;
  indexingEntries?: IndexingEntry[];
  peerReviewStatus?: 'Peer-reviewed' | 'Not reviewed';
  scope?: 'International' | 'National';
  journalUrl?: string;
  documentProofName?: string;
}

export interface FundedProject {
  id: string;
  title: string;
  fundingAgency: string;
  amount: string; // e.g. "$120,000" or "INR 15 Lakhs"
  startDate: string;
  endDate: string;
  status: 'Ongoing' | 'Completed';
  role: 'Principal Investigator' | 'Co-Principal Investigator';
  description?: string;
}

export interface Grant {
  id: string;
  title: string;
  agency: string;
  amount: string;
  year: string;
  purpose: string;
}

export interface Award {
  id: string;
  title: string;
  awardingBody: string;
  year: string;
  description?: string;
}

export interface Conference {
  id: string;
  title: string;
  paperTitle?: string;
  location: string;
  date: string;
  role: 'Presenter' | 'Keynote Speaker' | 'Session Chair' | 'Attendee' | 'Conducted' | string;
}

export interface PhdScholar {
  id: string;
  scholarName: string;
  thesisTitle: string;
  role: 'Guide' | 'Co-Guide';
  status: 'Completed' | 'Ongoing' | 'Submitted';
  joiningYear: string;
  completionYear?: string;
}

export interface Workshop {
  id: string;
  title: string;
  organizedBy?: string;
  organizerName?: string;
  organizerAddress?: string;
  organizationType?: string;
  location?: string;
  startDate: string;
  endDate: string;
  topic?: string;
  mode?: 'Offline' | 'Online' | 'Hybrid';
  type?: 'Attended' | 'Conducted';
  description?: string;
  documentProofName?: string;
  documentProofUrl?: string;
}

export interface ResourcePersonRole {
  id: string;
  eventTitle: string;
  topic: string;
  organizedBy: string;
  date: string;
}

export interface ExternalExaminerRole {
  id: string;
  roleType: 'PhD Thesis' | 'M.Tech Thesis' | 'B.Tech Project' | 'Course Examiner';
  university: string;
  department: string;
  year: string;
}

export interface AcademicAchievement {
  id: string;
  title: string;
  description?: string;
  date: string;
}

export interface Patent {
  id: string;
  title: string;
  inventors: string[];
  patentNumber?: string;
  applicationNumber: string;
  status: 'Filed' | 'Published' | 'Granted';
  country: string;
  filingDate: string;
  grantDate?: string;
  description?: string;
  url?: string;
}

export interface Copyright {
  id: string;
  title: string;
  registrationNumber: string;
  owners: string[];
  year: string;
  status: 'Registered' | 'Pending';
  description?: string;
  url?: string;
}

export interface Seminar {
  id: string;
  title: string;
  organizedBy?: string;
  organizerName?: string;
  organizerAddress?: string;
  organizationType?: string;
  startDate: string;
  endDate?: string;
  topic?: string;
  level: 'International' | 'National' | 'State' | 'Institutional';
  mode: 'Offline' | 'Online' | 'Hybrid';
  description?: string;
  documentProofName?: string;
  documentProofUrl?: string;
}

export interface FacultyProfile {
  id: string;
  personalInfo: PersonalInfo;
  education: Education[];
  skills: SkillGroup[];
  experience: Experience[];
  publications: Publication[];
  fundedProjects: FundedProject[];
  grantsReceived: Grant[];
  awardsReceived: Award[];
  conferencesAttended: Conference[];
  seminars?: Seminar[];
  phdScholars: PhdScholar[];
  workshopsAttended: Workshop[];
  workshopsConducted: Workshop[];
  resourcePersonRoles: ResourcePersonRole[];
  externalExaminerRoles: ExternalExaminerRole[];
  academicAchievements: AcademicAchievement[];
  patents: Patent[];
  copyrights: Copyright[];
}
