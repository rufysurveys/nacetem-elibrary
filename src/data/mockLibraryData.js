export const NACETEM_COLLECTIONS = [
  { id: 'all', name: 'All STI Collections', count: 45 },
  { id: 'policy', name: 'STI Policy & Governance', count: 12 },
  { id: 'ai-tech', name: 'AI & Emerging Tech', count: 8 },
  { id: 'green-energy', name: 'Green Energy & Climate', count: 6 },
  { id: 'agri-tech', name: 'Agricultural Innovation', count: 5 },
  { id: 'industrial', name: 'Industrial & Tech Transfer', count: 4 },
  { id: 'biotech', name: 'Biotechnology & Health', count: 4 },
  { id: 'pg-courses', name: 'Postgraduate Courses', count: 16 },
  { id: 'lecture-series', name: 'Departmental Monthly Lecture Series', count: 12 }
];

export const LECTURE_SERIES_OPTIONS = [
  'ICT Lecture Series',
  'Researchers Lecture Series',
  'Planning, Programming and Linkages Lecture Series'
];

export const POSTGRADUATE_COURSES_OPTIONS = [
  'M.Tech Technology Management',
  'M.Tech Digital Marketing',
  'M.Tech Nanotechnology',
  'PGD Technology Management'
];

export const DOCUMENT_TYPES = [
  'All Types',
  'Research Paper',
  'Journal Article',
  'Conference Paper',
  'Policy Brief',
  'Technical Report',
  'Lecture Notes / Presentation (PPTX/PDF)',
  'Courseware Module'
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
    type: 'Research Paper',
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
    uploadedFileName: 'Cybercrime_Act_2015_Appraisal_Rufai.pdf',
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
  {
    id: 'nac-2026-odusanya',
    title: 'Biotechnology Infrastructure and STI Policy Framework for Bio-Manufacturing in Nigeria',
    subtitle: 'Strategic Roadmap for Bioprocess Engineering, Vaccine Self-Reliance, and Industrial Bio-Economy',
    authors: ['Dr. Olushola Odusanya', 'Dr. Grace N. Okafor', 'Prof. M. O. Ilori'],
    institution: 'National Centre for Technology Management (NACETEM - DG/CEO Office)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Biotechnology & Health',
    type: 'Research Paper',
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
    uploadedFileName: 'Biotechnology_Infrastructure_Odusanya_2026.pdf',
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
    id: 'pg-mtech-tm-2026-001',
    title: 'Strategic Management of Technological Innovation and Industrial R&D Portfolios',
    subtitle: 'M.Tech Technology Management Course Module',
    authors: ['Prof. M. O. Ilori', 'Dr. Akindele Joshua Famurewa'],
    institution: 'NACETEM Postgraduate School',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Postgraduate Courses',
    pgCourseSub: 'M.Tech Technology Management',
    type: 'Courseware Module',
    year: 2026,
    doi: '10.5281/nacetem.pg.tm.2026.01',
    isbn: '978-978-54288-1-1',
    accessLevel: 'Open Access',
    rating: 5.0,
    citationsCount: 165,
    downloadsCount: 4120,
    pageCount: 110,
    coverColor: 'from-emerald-700 via-teal-900 to-slate-900',
    coverAccent: '#047857',
    featured: true,
    audioAvailable: true,
    uploadedFileName: 'MTech_Tech_Management_Module1.pdf',
    abstract: `Core postgraduate courseware module for the M.Tech Technology Management program. Covers technological forecasting, patent analysis, technology transfer contracts, and strategic management of corporate research portfolios in emerging economies.`,
    keyTakeaways: [
      'Provides decision matrices for technology evaluation and technology readiness levels (TRL 1-9).',
      'Examines IP commercialization and licensing agreements in developing countries.'
    ],
    policyRecommendations: [
      'Integrate technology audit metrics into postgraduate engineering management curricula.'
    ],
    fullText: [
      {
        sectionTitle: 'Module 1: Foundations of Technology Management',
        content: `Technology management bridges engineering innovation and strategic business leadership.`
      }
    ]
  },
  {
    id: 'lect-ict-2026-003',
    title: 'Artificial Intelligence, Cloud Computing, and Cybersecurity Systems for Public Sector IT',
    subtitle: 'Departmental Monthly Lecture Series Presentation',
    authors: ['Abubakar Rufai', 'Dr. Kazeem Abubakar'],
    institution: 'NACETEM ICT Directorate',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Monthly Lecture Series',
    lectureSeriesSub: 'ICT Lecture Series',
    type: 'Lecture Notes / Presentation (PPTX/PDF)',
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
    uploadedFileName: 'ICT_Lecture_Series_AI_Cybersecurity.pptx',
    abstract: `Delivered under the Departmental Monthly Lecture Series (ICT Lecture Series), this presentation covers cloud deployment architectures, machine learning threat detection models, and data privacy compliance for public sector information infrastructure.`,
    keyTakeaways: [
      'Outlines zero-trust architecture design for public sector digital repositories.',
      'Provides practical guidelines for compliance with the Nigeria Data Protection Act.'
    ],
    policyRecommendations: [
      'Transition public records to encrypted cloud infrastructure.'
    ],
    fullText: [
      {
        sectionTitle: 'Lecture Presentation Overview',
        content: `Information and Communication Technology (ICT) infrastructure is vital for modern governance.`
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
  savedFavorites: ['user-paper-priority-rufai', 'nac-2026-odusanya', 'pg-mtech-tm-2026-001'],
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
