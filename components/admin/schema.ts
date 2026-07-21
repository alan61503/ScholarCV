// Schema describing every editable list section of the FacultyProfile.
// Adding a field here automatically adds it to the management form —
// extend this file when new inputs are needed later.

export type FieldType = 'text' | 'textarea' | 'number' | 'select';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // for 'select'
  placeholder?: string;
}

export interface SectionConfig {
  key: string; // matches a key on FacultyProfile
  title: string;
  description?: string;
  fields: FieldConfig[];
  emptyItem: Record<string, unknown>;
}

export const sectionSchemas: SectionConfig[] = [
  {
    key: 'education',
    title: 'Education',
    fields: [
      { key: 'degree', label: 'Degree', type: 'text', placeholder: 'Ph.D.' },
      { key: 'field', label: 'Field of Study', type: 'text' },
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'year', label: 'Year', type: 'text', placeholder: '2018' },
      { key: 'grade', label: 'Grade / GPA', type: 'text' },
      { key: 'thesisTitle', label: 'Thesis Title', type: 'textarea' },
    ],
    emptyItem: { degree: '', field: '', institution: '', year: '', grade: '', thesisTitle: '' },
  },
  {
    key: 'experience',
    title: 'Experience',
    fields: [
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'organization', label: 'Organization', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'startDate', label: 'Start Date', type: 'text', placeholder: '2020-06' },
      { key: 'endDate', label: 'End Date', type: 'text', placeholder: 'Present' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    emptyItem: { role: '', organization: '', location: '', startDate: '', endDate: '', description: '' },
  },
  {
    key: 'skills',
    title: 'Skill Groups',
    description: 'Enter skills as a comma-separated list.',
    fields: [
      { key: 'category', label: 'Category', type: 'text', placeholder: 'Programming Languages' },
      { key: 'skills', label: 'Skills (comma-separated)', type: 'textarea' },
    ],
    emptyItem: { category: '', skills: '' },
  },
  {
    key: 'publications',
    title: 'Publications',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'authors', label: 'Authors (comma-separated)', type: 'text' },
      { key: 'journalName', label: 'Journal / Venue', type: 'text' },
      { key: 'volume', label: 'Volume', type: 'text' },
      { key: 'issue', label: 'Issue', type: 'text' },
      { key: 'pages', label: 'Pages', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'doi', label: 'DOI', type: 'text' },
      { key: 'citationCount', label: 'Citation Count', type: 'number' },
      { key: 'type', label: 'Type', type: 'select', options: ['Journal', 'Conference', 'Book', 'Book Chapter'] },
    ],
    emptyItem: {
      title: '', authors: '', journalName: '', volume: '', issue: '', pages: '',
      year: '', doi: '', citationCount: '', type: 'Journal',
    },
  },
  {
    key: 'fundedProjects',
    title: 'Funded Projects',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'fundingAgency', label: 'Funding Agency', type: 'text' },
      { key: 'amount', label: 'Amount', type: 'text', placeholder: '$120,000' },
      { key: 'startDate', label: 'Start Date', type: 'text' },
      { key: 'endDate', label: 'End Date', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['Ongoing', 'Completed'] },
      { key: 'role', label: 'Role', type: 'select', options: ['Principal Investigator', 'Co-Principal Investigator'] },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    emptyItem: {
      title: '', fundingAgency: '', amount: '', startDate: '', endDate: '',
      status: 'Ongoing', role: 'Principal Investigator', description: '',
    },
  },
  {
    key: 'grantsReceived',
    title: 'Grants Received',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'agency', label: 'Agency', type: 'text' },
      { key: 'amount', label: 'Amount', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'purpose', label: 'Purpose', type: 'textarea' },
    ],
    emptyItem: { title: '', agency: '', amount: '', year: '', purpose: '' },
  },
  {
    key: 'awardsReceived',
    title: 'Awards Received',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'awardingBody', label: 'Awarding Body', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    emptyItem: { title: '', awardingBody: '', year: '', description: '' },
  },
  {
    key: 'conferencesAttended',
    title: 'Conferences Attended',
    fields: [
      { key: 'title', label: 'Conference Title', type: 'text' },
      { key: 'paperTitle', label: 'Paper Title', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'role', label: 'Role', type: 'select', options: ['Presenter', 'Keynote Speaker', 'Session Chair', 'Attendee'] },
    ],
    emptyItem: { title: '', paperTitle: '', location: '', date: '', role: 'Presenter' },
  },
  {
    key: 'phdScholars',
    title: 'Research Scholars',
    fields: [
      { key: 'scholarName', label: 'Scholar Name', type: 'text' },
      { key: 'thesisTitle', label: 'Thesis Title', type: 'textarea' },
      { key: 'role', label: 'Role', type: 'select', options: ['Guide', 'Co-Guide'] },
      { key: 'status', label: 'Status', type: 'select', options: ['Completed', 'Ongoing', 'Submitted'] },
      { key: 'joiningYear', label: 'Joining Year', type: 'text' },
      { key: 'completionYear', label: 'Completion Year', type: 'text' },
    ],
    emptyItem: { scholarName: '', thesisTitle: '', role: 'Guide', status: 'Ongoing', joiningYear: '', completionYear: '' },
  },
  {
    key: 'workshopsAttended',
    title: 'Workshops Attended',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'organizedBy', label: 'Organized By', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'startDate', label: 'Start Date', type: 'text' },
      { key: 'endDate', label: 'End Date', type: 'text' },
    ],
    emptyItem: { title: '', organizedBy: '', location: '', startDate: '', endDate: '' },
  },
  {
    key: 'workshopsConducted',
    title: 'Workshops Conducted',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'organizedBy', label: 'Organized By', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'startDate', label: 'Start Date', type: 'text' },
      { key: 'endDate', label: 'End Date', type: 'text' },
    ],
    emptyItem: { title: '', organizedBy: '', location: '', startDate: '', endDate: '' },
  },
  {
    key: 'resourcePersonRoles',
    title: 'Resource Person Roles',
    fields: [
      { key: 'eventTitle', label: 'Event Title', type: 'text' },
      { key: 'topic', label: 'Topic', type: 'text' },
      { key: 'organizedBy', label: 'Organized By', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
    ],
    emptyItem: { eventTitle: '', topic: '', organizedBy: '', date: '' },
  },
  {
    key: 'externalExaminerRoles',
    title: 'External Examiner Roles',
    fields: [
      { key: 'roleType', label: 'Role Type', type: 'select', options: ['PhD Thesis', 'M.Tech Thesis', 'B.Tech Project', 'Course Examiner'] },
      { key: 'university', label: 'University', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
    ],
    emptyItem: { roleType: 'PhD Thesis', university: '', department: '', year: '' },
  },
  {
    key: 'academicAchievements',
    title: 'Academic Achievements',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'date', label: 'Date', type: 'text' },
    ],
    emptyItem: { title: '', description: '', date: '' },
  },
  {
    key: 'patents',
    title: 'Patents',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'inventors', label: 'Inventors (comma-separated)', type: 'text' },
      { key: 'patentNumber', label: 'Patent Number', type: 'text' },
      { key: 'applicationNumber', label: 'Application Number', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['Filed', 'Published', 'Granted'] },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'filingDate', label: 'Filing Date', type: 'text' },
      { key: 'grantDate', label: 'Grant Date', type: 'text' },
    ],
    emptyItem: {
      title: '', inventors: '', patentNumber: '', applicationNumber: '',
      status: 'Filed', country: '', filingDate: '', grantDate: '',
    },
  },
  {
    key: 'copyrights',
    title: 'Copyrights',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'registrationNumber', label: 'Registration Number', type: 'text' },
      { key: 'owners', label: 'Owners (comma-separated)', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['Registered', 'Pending'] },
    ],
    emptyItem: { title: '', registrationNumber: '', owners: '', year: '', status: 'Registered' },
  },
];

// Fields that are arrays-as-comma-separated-strings while being edited in
// the form, and need to be split back into string[] on export.
export const arrayStringFields: Record<string, string[]> = {
  skills: ['skills'],
  publications: ['authors'],
  patents: ['inventors'],
  copyrights: ['owners'],
};
