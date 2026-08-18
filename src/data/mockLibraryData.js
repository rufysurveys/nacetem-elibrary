export const NACETEM_COLLECTIONS = [
  { id: 'all', name: 'All Collections', count: 40 },
  { id: 'lecture-series', name: 'Departmental Lecture Series', count: 12 },
  { id: 'ppl-series', name: 'Planning, Programming & Linkages Lecture Series', count: 4 },
  { id: 'researchers-series', name: 'Researchers Lecture Series', count: 4 },
  { id: 'ict-series', name: 'ICT Lecture Series', count: 4 },
  { id: 'policy', name: 'STI Policy & Governance', count: 12 },
  { id: 'ai-tech', name: 'AI & Emerging Tech', count: 6 },
  { id: 'green-energy', name: 'Green Energy & Climate', count: 6 },
  { id: 'agri-tech', name: 'Agricultural Innovation', count: 4 },
  { id: 'industrial', name: 'Industrial & Tech Transfer', count: 4 },
  { id: 'biotech', name: 'Biotechnology & Health', count: 3 },
];

export const LECTURE_SERIES_OPTIONS = [
  'Planning, Programming and Linkages Lecture Series',
  'Researchers Lecture Series',
  'ICT Lecture Series'
];

export const DOCUMENT_TYPES = [
  'All Types',
  'Lecture Notes / Presentation',
  'Policy Brief',
  'Technical Report',
  'Journal Paper',
  'E-Book',
  'Conference Paper',
  'Dataset'
];

export const USER_ROLES = [
  { id: 'staff', label: 'NACETEM Staff', icon: 'UserCheck', badge: 'Institutional Staff' },
  { id: 'admin', label: 'Admin (Head Librarian)', icon: 'ShieldCheck', badge: 'System Administrator' },
  { id: 'other', label: 'Other User', icon: 'Globe', badge: 'Registered Reader' }
];

export const INITIAL_BOOKS = [
  {
    id: 'user-paper-priority-rufai',
    isUserUploaded: true,
    uploadedBy: 'Abubakar Rufai',
    title: 'Appraising Institutional Capacity For Implementation Of The Nigerian Cybercrime Act 2015',
    subtitle: 'Priority Deposited Research & Technology Governance Assessment',
    authors: ['Abubakar Rufai', 'Dr. Kazeem Abubakar'],
    institution: 'National Centre for Technology Management (NACETEM)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'AI & Emerging Tech',
    type: 'Journal Paper',
    year: 2015,
    doi: '10.5281/nacetem.2015.001',
    isbn: '978-978-54203-3-1',
    accessLevel: 'Open Access',
    rating: 5.0,
    citationsCount: 215,
    downloadsCount: 5420,
    pageCount: 58,
    coverColor: 'from-emerald-600 via-teal-800 to-slate-900',
    coverAccent: '#059669',
    featured: true,
    audioAvailable: true,
    abstract: `Authored by Abubakar Rufai, this landmark study conducts a comprehensive appraisal of Nigeria's institutional capacity for enforcing the Cybercrime (Prohibition, Prevention, Etc.) Act of 2015. The paper analyzes inter-agency technical capabilities, digital forensic infrastructure readiness, law enforcement training, and public-private cybersecurity monitoring frameworks across West Africa.`,
    keyTakeaways: [
      'Identifies a 42% technical capacity gap in digital forensic laboratory machinery across law enforcement agencies.',
      'Proposes establishing a National Cyber Threat Intelligence Data Exchange managed by NACETEM.',
      'Recommends continuous executive capacity building programs for judicial officers handling cybercrime litigation.'
    ],
    policyRecommendations: [
      'Establish a dedicated Cyber Security Capacity Building Fund under the Ministry of Innovation, Science & Technology.',
      'Mandate standardized digital evidence chain-of-custody protocols compliant with international ISO/IEC 27037 standards.'
    ],
    fullText: [
      {
        sectionTitle: 'Executive Abstract & Legal Policy Overview',
        content: `Enacted in 2015, the Nigerian Cybercrime Act provides the statutory framework for combating computer-related fraud, critical national information infrastructure protection, and electronic evidence admissibility.`
      }
    ]
  },
  // Departmental Lecture Series Seed Papers
  {
    id: 'lect-ppl-2026-001',
    title: 'Strategic Planning, Project Programming, and Inter-Agency Linkages in STI Governance',
    subtitle: 'Departmental Lecture Series: Planning, Programming and Linkages (PPL Series)',
    authors: ['Dr. Akindele Joshua Famurewa', 'PPL Directorate Team'],
    institution: 'NACETEM PPL Directorate (Departmental Lecture Series)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Lecture Series',
    lectureSeriesSub: 'Planning, Programming and Linkages Lecture Series',
    type: 'Lecture Notes / Presentation',
    year: 2026,
    doi: '10.5281/nacetem.ppl.2026.01',
    isbn: '978-978-54299-1-0',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 88,
    downloadsCount: 2450,
    pageCount: 42,
    coverColor: 'from-amber-600 via-orange-800 to-slate-900',
    coverAccent: '#d97706',
    featured: true,
    audioAvailable: true,
    abstract: `Delivered under the NACETEM Departmental Lecture Series (Planning, Programming and Linkages), this monograph provides practical methodologies for aligning STI project portfolios with national development plans and ECOWAS science indicators.`,
    keyTakeaways: [
      'Outlines the 5-phase project programming matrix for institutional STI interventions.',
      'Establishes key performance indicators for inter-departmental linkages.'
    ],
    policyRecommendations: [
      'Standardize project programming templates across all federal research institutes.'
    ],
    fullText: [
      {
        sectionTitle: 'Lecture Module 1: Strategic Planning Frameworks',
        content: `Planning, programming, and linkages constitute the operational bedrock of effective science policy execution. This lecture series module equips researchers with tools for mapping stakeholder networks.`
      }
    ]
  },
  {
    id: 'lect-res-2026-002',
    title: 'Advanced Econometric Methodologies and Data Integrity in STI Surveys',
    subtitle: 'Departmental Lecture Series: Researchers Lecture Series',
    authors: ['Prof. Olumuyiwa Olamade', 'Dr. Olawale Rafiu Olaopa'],
    institution: 'NACETEM Research Directorate (Departmental Lecture Series)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Lecture Series',
    lectureSeriesSub: 'Researchers Lecture Series',
    type: 'Lecture Notes / Presentation',
    year: 2026,
    doi: '10.5281/nacetem.res.2026.02',
    isbn: '978-978-54299-2-7',
    accessLevel: 'Open Access',
    rating: 5.0,
    citationsCount: 114,
    downloadsCount: 3120,
    pageCount: 65,
    coverColor: 'from-teal-700 via-emerald-900 to-slate-900',
    coverAccent: '#0f766e',
    featured: true,
    audioAvailable: true,
    abstract: `Delivered as part of the Researchers Lecture Series, this comprehensive guide covers advanced micro-data sampling, survey design, Oslo Manual indicators, and econometric modeling for STI policy researchers.`,
    keyTakeaways: [
      'Provides practical tutorials on probit regression and structural equation modeling.',
      'Details data validation procedures for large-scale industrial innovation surveys.'
    ],
    policyRecommendations: [
      'Mandate annual quantitative research methodology refreshers for institutional staff.'
    ],
    fullText: [
      {
        sectionTitle: 'Lecture Module 1: Econometric Foundations',
        content: `High-quality policy formulation requires rigorous empirical data. This module explores sampling protocols for national science indicator surveys.`
      }
    ]
  },
  {
    id: 'lect-ict-2026-003',
    title: 'Artificial Intelligence, Cloud Computing, and Cybersecurity Systems for Public Sector IT',
    subtitle: 'Departmental Lecture Series: ICT Lecture Series',
    authors: ['Abubakar Rufai', 'Dr. Kazeem Abubakar'],
    institution: 'NACETEM ICT Directorate (Departmental Lecture Series)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Lecture Series',
    lectureSeriesSub: 'ICT Lecture Series',
    type: 'Lecture Notes / Presentation',
    year: 2026,
    doi: '10.5281/nacetem.ict.2026.03',
    isbn: '978-978-54299-3-4',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 130,
    downloadsCount: 3890,
    pageCount: 54,
    coverColor: 'from-blue-700 via-indigo-900 to-slate-900',
    coverAccent: '#1d4ed8',
    featured: true,
    audioAvailable: true,
    abstract: `Delivered under the ICT Lecture Series, this technical monograph covers cloud deployment architectures, machine learning threat detection models, and data privacy compliance for public sector information infrastructure.`,
    keyTakeaways: [
      'Outlines zero-trust architecture design for public sector digital repositories.',
      'Provides practical guidelines for compliance with the Nigeria Data Protection Act.'
    ],
    policyRecommendations: [
      'Transition public records to encrypted cloud infrastructure.'
    ],
    fullText: [
      {
        sectionTitle: 'Lecture Module 1: Cloud Architecture & Cybersecurity',
        content: `Information and Communication Technology (ICT) infrastructure is vital for modern governance. This lecture provides hands-on configurations for securing enterprise systems.`
      }
    ]
  },
  {
    id: 'nac-2026-odusanya',
    title: 'Biotechnology Infrastructure and STI Policy Framework for Bio-Manufacturing in Nigeria',
    subtitle: 'Strategic Roadmap for Bioprocess Engineering, Vaccine Self-Reliance, and Industrial Bio-Economy',
    authors: ['Dr. Olushola Odusanya', 'Dr. Grace N. Okafor', 'Prof. M. O. Ilori'],
    institution: 'National Centre for Technology Management (NACETEM - DG/CEO Office)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Biotechnology & Health',
    type: 'Policy Brief',
    year: 2026,
    doi: '10.5281/nacetem.2026.100',
    isbn: '978-978-54210-0-3',
    accessLevel: 'Open Access',
    rating: 5.0,
    citationsCount: 289,
    downloadsCount: 7420,
    pageCount: 115,
    coverColor: 'from-emerald-700 via-teal-900 to-slate-900',
    coverAccent: '#047857',
    featured: true,
    audioAvailable: true,
    abstract: `Authored by Dr. Olushola Odusanya (Director-General/CEO of NACETEM), this flagship study delivers a strategic blueprint for scaling bio-manufacturing capacity in Nigeria. The research evaluates bioprocess engineering capabilities, fermenter infrastructure, indigenous enzyme production, and vaccine manufacturing readiness across national research institutes and polytechnics.`,
    keyTakeaways: [
      'Proposes establishing 3 National Bio-Manufacturing Pilot Plants for local biopharmaceutical production.',
      'Recommends a 10-year tax holiday for private biotechnology firms commercializing university research.',
      'Outlines biosafety regulatory harmonization across ECOWAS to facilitate regional trade in bio-products.'
    ],
    policyRecommendations: [
      'Establish a National Bio-Process Development Fund under the Ministry of Innovation, Science and Technology.',
      'Fund specialized post-graduate fellowships in synthetic biology, fermentation technology, and downstream processing.'
    ],
    fullText: [
      {
        sectionTitle: 'Executive Summary & National Vision',
        content: `Biotechnology constitutes one of the most transformative pillars of the global knowledge economy. Under the leadership of Dr. Olushola Odusanya, NACETEM presents this policy framework to position Nigeria as West Africa's hub for industrial bio-manufacturing.`
      }
    ]
  },
  {
    id: 'nac-2026-famurewa',
    title: 'Biofuel Policy Framework and Jatropha Feedstock Enterprise Development in Nigeria',
    subtitle: 'Strategic Management of Renewable Energy & Agricultural Innovation Systems',
    authors: ['Dr. Akindele Joshua Famurewa', 'Prof. M. O. Ilori', 'Dr. F. E. Siyanbola'],
    institution: 'National Centre for Technology Management (NACETEM)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Green Energy & Climate',
    type: 'Policy Brief',
    year: 2026,
    doi: '10.5281/nacetem.2026.101',
    isbn: '978-978-54210-4-1',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 142,
    downloadsCount: 3890,
    pageCount: 78,
    coverColor: 'from-emerald-700 via-teal-800 to-slate-900',
    coverAccent: '#059669',
    featured: true,
    audioAvailable: true,
    abstract: `Authored by Dr. Akindele Joshua Famurewa and NACETEM policy researchers, this comprehensive study evaluates the strategic development of biofuel policies in Nigeria.`,
    keyTakeaways: [
      'Proposes establishing 6 Zonal Biofuel Commercialization Hubs.'
    ],
    policyRecommendations: [
      'Zero-rate import duties on bio-refinery processing machinery.'
    ],
    fullText: [
      {
        sectionTitle: 'Executive Summary & Policy Background',
        content: `Biofuel technology represents a critical nexus between agricultural development, energy security, and environmental sustainability in Nigeria.`
      }
    ]
  }
];

export const INITIAL_USER_STATE = {
  borrowedBooks: [
    {
      bookId: 'user-paper-priority-rufai',
      borrowedDate: '2026-08-01',
      dueDate: '2026-08-15',
      qrCode: 'NAC-PASS-8839201-2026',
      progress: 65
    }
  ],
  savedFavorites: ['user-paper-priority-rufai', 'lect-ppl-2026-001', 'lect-ict-2026-003'],
  readingHistory: [
    { bookId: 'user-paper-priority-rufai', lastReadPage: 44, timestamp: '2026-08-11T14:20:00' }
  ],
  notes: [
    {
      id: 'note-1',
      bookId: 'user-paper-priority-rufai',
      page: 14,
      text: 'Key Cybercrime Act 2015 finding: Establishing National Threat Intelligence Exchange.',
      date: '2026-08-11'
    }
  ]
};
