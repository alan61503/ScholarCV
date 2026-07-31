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
        title: 'Robust Perception in Adverse Weather for Next-Generation Autonomous Ground Vehicles',
        fundingAgency: 'National Science Foundation (NSF)',
        amount: '$1,200,000',
        startDate: '2023-01',
        endDate: '2026-12',
        status: 'Ongoing',
        role: 'Principal Investigator',
        description: 'Developing self-supervised models that utilize multimodal radar, LiDAR, and thermal cameras to navigate safely in dense fog, rain, and snow.'
      },
      {
        id: 'proj-2',
        title: 'Safety-Critical Deep Learning in Robotics',
        fundingAgency: 'DARPA',
        amount: '$850,000',
        startDate: '2020-06',
        endDate: '2023-05',
        status: 'Completed',
        role: 'Principal Investigator',
        description: 'Formulated mathematical guarantees and verification strategies for neural network controllers used in dynamic robotic arms.'
      }
    ],
    grantsReceived: [
      {
        id: 'grant-1',
        title: 'NSF CAREER Award: Provably Safe Neural Control Systems',
        agency: 'National Science Foundation',
        amount: '$550,000',
        year: '2017',
        purpose: 'To support early-career faculty who effectively integrate research and education.'
      },
      {
        id: 'grant-2',
        title: 'Google Research Scholar Award',
        agency: 'Google LLC',
        amount: '$80,000',
        year: '2019',
        purpose: 'Research on vision-language grounding models.'
      }
    ],
    awardsReceived: [
      {
        id: 'awd-1',
        title: 'IEEE Computer Society Technical Achievement Award',
        awardingBody: 'IEEE Computer Society',
        year: '2024',
        description: 'For pioneering contributions to self-supervised learning algorithms in computer vision.'
      },
      {
        id: 'awd-2',
        title: 'Best Paper Award Honorable Mention',
        awardingBody: 'CVPR',
        year: '2020',
        description: 'For the paper "Self-Supervised Monocular Depth Estimation..."'
      },
      {
        id: 'awd-3',
        title: 'Stanford Excellence in Teaching Award',
        awardingBody: 'Stanford University School of Engineering',
        year: '2018'
      }
    ],
    conferencesAttended: [
      {
        id: 'conf-1',
        title: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2024)',
        paperTitle: 'Diffusion Models for Zero-Shot Semantic Segmentation',
        location: 'Seattle, WA',
        date: '2024-06',
        role: 'Presenter'
      },
      {
        id: 'conf-2',
        title: 'International Conference on Machine Learning (ICML 2023)',
        location: 'Honolulu, HI',
        date: '2023-07',
        role: 'Session Chair'
      },
      {
        id: 'conf-3',
        title: 'World Economic Forum - Academic Summit on AI Ethics',
        location: 'Geneva, Switzerland',
        date: '2022-10',
        role: 'Keynote Speaker'
      }
    ],
    phdScholars: [
      {
        id: 'phd-1',
        scholarName: 'Dr. Aaron Patel',
        thesisTitle: 'Provably Safe Reinforcement Learning for Legged Robotics',
        role: 'Guide',
        status: 'Completed',
        joiningYear: '2017',
        completionYear: '2022'
      },
      {
        id: 'phd-2',
        scholarName: 'Dr. Linda Zhang',
        thesisTitle: 'Self-Supervised Multi-Task Visual Learning',
        role: 'Guide',
        status: 'Completed',
        joiningYear: '2016',
        completionYear: '2021'
      },
      {
        id: 'phd-3',
        scholarName: 'Marcus Alvarez',
        thesisTitle: 'Cooperative Perception in Heterogeneous Robot Fleets',
        role: 'Guide',
        status: 'Submitted',
        joiningYear: '2020'
      },
      {
        id: 'phd-4',
        scholarName: 'Divya Rangan',
        thesisTitle: 'Neuro-Symbolic Reasoning in Neural Radiance Fields',
        role: 'Co-Guide',
        status: 'Ongoing',
        joiningYear: '2022'
      }
    ],
    workshopsAttended: [
      {
        id: 'wsa-1',
        title: 'Workshop on Safe and Reliable AI in Robotics',
        organizedBy: 'IEEE Robotics and Automation Society',
        location: 'London, UK',
        startDate: '2023-05-12',
        endDate: '2023-05-13'
      }
    ],
    workshopsConducted: [
      {
        id: 'wsc-1',
        title: 'Deep Learning Bootcamp: Theory to Deployment',
        organizedBy: 'Stanford AI Lab',
        location: 'Stanford, CA',
        startDate: '2024-01-15',
        endDate: '2024-01-19'
      },
      {
        id: 'wsc-2',
        title: 'Explainable AI Methods for Industry Practitioners',
        organizedBy: 'ACM SF Bay Area Chapter',
        location: 'San Jose, CA',
        startDate: '2022-09-08',
        endDate: '2022-09-09'
      }
    ],
    resourcePersonRoles: [
      {
        id: 'rpr-1',
        eventTitle: 'National Seminar on Future of Autonomous Transportation',
        topic: 'AI Ethics and Safety Standards in Autonomous Cars',
        organizedBy: 'US Department of Transportation',
        date: '2023-11-04'
      },
      {
        id: 'rpr-2',
        eventTitle: 'Summer School on Advanced Computer Vision',
        topic: 'Visual Odometry and 3D Reconstruction',
        organizedBy: 'UC Berkeley',
        date: '2021-08-10'
      }
    ],
    externalExaminerRoles: [
      {
        id: 'eer-1',
        roleType: 'PhD Thesis',
        university: 'Carnegie Mellon University',
        department: 'Robotics Institute',
        year: '2023'
      },
      {
        id: 'eer-2',
        roleType: 'PhD Thesis',
        university: 'Oxford University',
        department: 'Department of Department of Engineering Science',
        year: '2021'
      }
    ],
    academicAchievements: [
      {
        id: 'ach-1',
        title: 'Elected IEEE Fellow',
        description: 'Recognized for pioneering research contributions to deep learning architectures for computer vision.',
        date: '2024-01'
      },
      {
        id: 'ach-2',
        title: 'Top 100 Most Influential AI Researchers (Academic Influence)',
        date: '2022'
      }
    ],
    patents: [
      {
        id: 'pat-1',
        title: 'System and Method for Real-Time Obstacle Avoidance using Monocular Camera Depth Inference',
        inventors: ['Sarah Jenkins', 'Linda Zhang'],
        patentNumber: 'US 11,345,982 B2',
        applicationNumber: 'US 16/829,384',
        status: 'Granted',
        country: 'United States',
        filingDate: '2020-03-24',
        grantDate: '2022-05-31'
      },
      {
        id: 'pat-2',
        title: 'Multimodal Attention Fusion for Autonomous Driving Sensor Networks',
        inventors: ['Sarah Jenkins', 'Marcus Alvarez'],
        applicationNumber: 'US 18/204,506',
        status: 'Published',
        country: 'United States',
        filingDate: '2023-06-01'
      }
    ],
    copyrights: [
      {
        id: 'cpy-1',
        title: 'Stanford Vision Lab Scene Annotator (SVL-SA) Software Suite',
        registrationNumber: 'TX 9-182-374',
        owners: ['Board of Trustees of the Leland Stanford Junior University'],
        year: '2021',
        status: 'Registered'
      }
    ]
  }
];

export function getFacultyById(id: string): FacultyProfile | undefined {
  return mockFacultyProfiles.find((profile) => profile.id === id);
}
