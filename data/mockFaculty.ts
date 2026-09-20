import { FacultyProfile } from '../types/faculty';

export const mockFacultyProfiles: FacultyProfile[] = [
  {
    id: 'sarah-jenkins',
    personalInfo: {
      name: 'Dr. Sarah Jenkins',
      title: 'Professor & Chair of Computer Science',
      department: 'Department of Computer Science & Engineering',
      institution: 'Stanford University',
      email: 'sjenkins@stanford.edu',
      phone: '+1 (650) 723-2300',
      officeAddress: 'Gates Computer Science Building, Room 352, Stanford, CA 94305',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      websiteUrl: 'https://cs.stanford.edu/~sjenkins',
      googleScholarUrl: 'https://scholar.google.com/citations?user=sarah_jenkins_demo',
      linkedInUrl: 'https://linkedin.com/in/sarah-jenkins-demo',
      orcid: '0000-0002-1825-0097',
      biography: 'Dr. Sarah Jenkins is the Chair Professor of Computer Science at Stanford University. Her research lies at the intersection of deep learning, computer vision, and autonomous systems. She has over 15 years of academic and industrial research experience, having previously worked as a Principal Scientist at Google Brain. She is a Fellow of the IEEE and ACM, and has graduated 12 PhD students who now occupy positions in top-tier research universities and corporate research labs.',
      researchInterests: [
        'Computer Vision & Image Understanding',
        'Deep Reinforcement Learning',
        'Robust & Explainable AI',
        'Autonomous Vehicles & Robotics'
      ]
    },
    education: [
      {
        id: 'edu-1',
        degree: 'Ph.D. in Computer Science',
        field: 'Artificial Intelligence & Computer Vision',
        institution: 'Massachusetts Institute of Technology (MIT)',
        year: '2010',
        thesisTitle: 'Hierarchical Deep Architectures for Real-Time Semantic Scene Understanding'
      },
      {
        id: 'edu-2',
        degree: 'M.S. in Computer Science',
        field: 'Machine Learning',
        institution: 'Stanford University',
        year: '2006'
      },
      {
        id: 'edu-3',
        degree: 'B.S. in Computer Science & Engineering',
        field: 'Computer Science',
        institution: 'University of California, Berkeley',
        year: '2004',
        grade: 'Summa Cum Laude'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Professor & Department Chair',
        organization: 'Stanford University',
        location: 'Stanford, CA',
        startDate: '2020-09',
        endDate: 'Present',
        description: 'Leading the Department of Computer Science & Engineering. Teaching graduate-level courses in Deep Learning and Computer Vision. Directing the Stanford Autonomous Vision Lab.'
      },
      {
        id: 'exp-2',
        role: 'Associate Professor',
        organization: 'Stanford University',
        location: 'Stanford, CA',
        startDate: '2015-09',
        endDate: '2020-08',
        description: 'Conducted research on robust deep neural networks. Developed new algorithms for explainable AI. Secured over $3M in research funding.'
      },
      {
        id: 'exp-3',
        role: 'Principal Research Scientist',
        organization: 'Google Brain',
        location: 'Mountain View, CA',
        startDate: '2012-06',
        endDate: '2015-08',
        description: 'Led a team of 6 researchers working on vision-language models (early precursors to modern VLMs). Published 12+ papers at CVPR, ICCV, and NeurIPS.'
      },
      {
        id: 'exp-4',
        role: 'Assistant Professor',
        organization: 'University of Washington',
        location: 'Seattle, WA',
        startDate: '2010-09',
        endDate: '2012-05',
        description: 'Established the UW Robot Vision Group. Taught introductory programming and advanced computer vision courses.'
      }
    ],
    skills: [
      {
        category: 'Core AI & ML',
        skills: ['Deep Learning', 'Computer Vision', 'Reinforcement Learning', 'Natural Language Processing', 'Generative AI']
      },
      {
        category: 'Programming & Frameworks',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'C++', 'CUDA', 'Docker']
      },
      {
        category: 'Academic & Professional',
        skills: ['Grant Writing', 'Curriculum Design', 'PhD Mentorship', 'Peer Review', 'Technical Speaking']
      }
    ],
    publications: [
      {
        id: 'pub-1',
        title: 'Attention-Based Hierarchical Networks for Dense Semantic Segmentation',
        authors: ['S. Jenkins', 'M. Alvarez', 'T. Cho'],
        journalName: 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)',
        volume: '44',
        issue: '6',
        pages: '3120-3135',
        year: '2023',
        doi: '10.1109/TPAMI.2022.1234567',
        citationCount: 342,
        type: 'Journal',
        articleKeywords: ['semantic segmentation', 'attention mechanisms', 'dense prediction', 'computer vision'],
        subjectAreas: ['Computer Vision', 'Machine Learning'],
        abstract:
          'We introduce a hierarchical attention architecture for dense semantic segmentation that jointly reasons over multi-scale feature maps. The proposed method improves boundary precision and reduces label noise in cluttered urban scenes, outperforming prior state-of-the-art baselines by a significant margin on three public benchmarks.',
        sdgCategory: 'SDG 9 – Industry, Innovation and Infrastructure',
        language: 'English',
        medium: 'Print and Online',
        pageFrom: '3120',
        pageTo: '3135',
        authorship: 'Co-Authored',
        authorDetails: [
          {
            id: 'a1',
            position: 1,
            name: 'S. Jenkins',
            isCorresponding: true,
            isStudent: false,
            email: 'sjenkins@stanford.edu',
            country: 'United States',
            affiliation: 'Stanford University',
            institutionType: 'Home Institution',
          },
          {
            id: 'a2',
            position: 2,
            name: 'M. Alvarez',
            isCorresponding: false,
            isStudent: true,
            email: 'malvarez@stanford.edu',
            country: 'United States',
            affiliation: 'Stanford University',
            institutionType: 'Home Institution',
          },
          {
            id: 'a3',
            position: 3,
            name: 'T. Cho',
            isCorresponding: false,
            isStudent: false,
            email: 'tcho@mit.edu',
            country: 'United States',
            affiliation: 'Massachusetts Institute of Technology',
            institutionType: 'Other Institution',
          },
        ],
        dateOfSubmission: '2022-11-02',
        dateOfRevision: '2023-01-14',
        dateOfPublication: '2023-03-01',
        issn: '0162-8828',
        publisherName: 'IEEE Computer Society',
        publisherAddress: 'Los Alamitos, California, USA',
        indexingEntries: [
          { id: 'idx1', agency: 'Scopus', quartileOrCategory: 'Q1', percentile: '98th', publicationUrl: '', scopusWosLink: '' },
          { id: 'idx2', agency: 'Web of Science', quartileOrCategory: 'Q1 (IF: 20.8)', percentile: '', publicationUrl: '', scopusWosLink: '' },
        ],
        peerReviewStatus: 'Peer-reviewed',
        scope: 'International',
        journalUrl: 'https://www.computer.org/csdl/journal/tp',
      },
      {
        id: 'pub-2',
        title: 'Towards Robust Explainability in Deep Reinforcement Learning for Autonomous Navigation',
        authors: ['A. Patel', 'S. Jenkins'],
        journalName: 'International Conference on Computer Vision (ICCV)',
        pages: '4502-4511',
        year: '2022',
        doi: '10.1109/ICCV.2022.9876543',
        citationCount: 89,
        type: 'Conference'
      },
      {
        id: 'pub-3',
        title: 'Introduction to Modern Deep Learning Systems',
        authors: ['S. Jenkins', 'R. Salakhutdinov'],
        journalName: 'MIT Press',
        year: '2021',
        type: 'Book'
      },
      {
        id: 'pub-4',
        title: 'Self-Supervised Monocular Depth Estimation in Dynamic Urban Environments',
        authors: ['L. Zhang', 'Y. Kim', 'S. Jenkins'],
        journalName: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)',
        pages: '11220-11230',
        year: '2020',
        doi: '10.1109/CVPR.2020.00987',
        citationCount: 512,
        type: 'Conference'
      }
    ],
    fundedProjects: [
      {
        id: 'proj-1',
        title: 'Biodegradable Hydrogel gauze from Nano Sericin & Gelatin, IDEAKR005232',
        fundingAgency: 'Ministry of Micro, Small and Medium Enterprises (MSME), Government of India',
        amount: '₹21,00,000',
        startDate: '2022-08',
        endDate: '',
        status: 'Ongoing',
        role: 'Principal Investigator',
        description: ''
      },
      {
        id: 'proj-2',
        title: 'AI- Powered Drone Monitoring Systems at Christ University Bangalore Kengeri Campus',
        fundingAgency: 'CHRIST (Deemed to be University)',
        amount: '₹4,46,000',
        startDate: '2025-01-31',
        endDate: '2027-01-31',
        status: 'Ongoing',
        role: 'Co-Principal Investigator',
        description: ''
      },
      {
        id: 'proj-3',
        title: 'Investigation on incorporation of the Blockchain technology for authentication and assurance of digital media for mitigating deepfakes and fake documents in the social media',
        fundingAgency: 'CHRIST (Deemed to be University)',
        amount: '₹1,30,000',
        startDate: '2025-01-31',
        endDate: '2026-01-31',
        status: 'Ongoing',
        role: 'Principal Investigator',
        description: ''
      },
      {
        id: 'proj-4',
        title: 'Women Empowerment Program (UiPath RPA)',
        fundingAgency: 'Honeywell (Implementing Agency: ICT Academy)',
        amount: '₹2,50,000',
        startDate: '2021-08',
        endDate: '',
        status: 'Ongoing',
        role: 'Co-Principal Investigator',
        description: ''
      },
      {
        id: 'proj-5',
        title: 'Support in projects via Upskilling Training for the fresh Employees of Capgemini',
        fundingAgency: 'SRUSHTI / Capgemini',
        amount: '₹80,000',
        startDate: '2022-04-07',
        endDate: '2022-04-28',
        status: 'Completed',
        role: 'Principal Investigator',
        description: ''
      },
      {
        id: 'proj-6',
        title: 'Proof of Concept support (Student Empowerment) session 1',
        fundingAgency: 'ICT Academy (Honeywell CSR Activities)',
        amount: '₹7,00,000',
        startDate: '2022-01-05',
        endDate: '2022-04-23',
        status: 'Completed',
        role: 'Co-Principal Investigator',
        description: ''
      }
    ],
    grantsReceived: [
      {
        id: 'grant-1',
        title: '8th National Level Young Entrepreneurs Summit (YESummit-2025)',
        agency: 'Youth-Aid Foundation',
        amount: '₹12,50,000',
        year: '2025',
        purpose: ''
      },
      {
        id: 'grant-2',
        title: 'State Level Young Entrepreneurs Summit (YESummit-2025)-Karnataka',
        agency: 'Youth-Aid Foundation',
        amount: '₹30,000',
        year: '2025',
        purpose: ''
      }
    ],
    awardsReceived: [],
    conferencesAttended: [],
    seminars: [],
    phdScholars: [],
    workshopsAttended: [],
    workshopsConducted: [],
    resourcePersonRoles: [],
    externalExaminerRoles: [],
    academicAchievements: [],
    patents: [],
    copyrights: []
  }
];

export function getFacultyById(id: string): FacultyProfile | undefined {
  return mockFacultyProfiles.find((profile) => profile.id === id);
}
