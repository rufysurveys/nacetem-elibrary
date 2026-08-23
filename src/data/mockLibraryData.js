export const NACETEM_COLLECTIONS = [
  { id: 'all', name: 'All Collections', count: 45 },
  { id: 'pg-courses', name: 'Postgraduate Courses', count: 16 },
  { id: 'mtech-tech-mgmt', name: '1. M.Tech Technology Management', count: 4 },
  { id: 'mtech-digital-mkt', name: '2. M.Tech Digital Marketing', count: 4 },
  { id: 'mtech-nano-tech', name: '3. M.Tech Nanotechnology', count: 4 },
  { id: 'pgd-tech-mgmt', name: '4. PGD Technology Management', count: 4 },
  { id: 'lecture-series', name: 'Departmental Monthly Lecture Series', count: 12 },
  { id: 'ict-series', name: '1. ICT Lecture Series', count: 4 },
  { id: 'researchers-series', name: '2. Researchers Lecture Series', count: 4 },
  { id: 'ppl-series', name: '3. Planning, Programming & Linkages Lecture Series', count: 4 },
  { id: 'policy', name: 'STI Policy & Governance', count: 12 },
  { id: 'ai-tech', name: 'AI & Emerging Tech', count: 6 },
  { id: 'green-energy', name: 'Green Energy & Climate', count: 6 },
  { id: 'agri-tech', name: 'Agricultural Innovation', count: 4 },
  { id: 'industrial', name: 'Industrial & Tech Transfer', count: 4 },
  { id: 'biotech', name: 'Biotechnology & Health', count: 3 },
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
  'Lecture Notes / Presentation',
  'Courseware Module',
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
  // Postgraduate Courses Seed Papers
  {
    id: 'pg-mtech-tm-2026-001',
    title: 'Strategic Management of Technological Innovation and Industrial R&D Portfolios',
    subtitle: 'Postgraduate Courses: M.Tech Technology Management',
    authors: ['Prof. M. O. Ilori', 'Dr. Akindele Joshua Famurewa'],
    institution: 'NACETEM Postgraduate School (M.Tech Technology Management)',
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
        content: `Technology management bridges engineering innovation and strategic business leadership. This module examines the lifecycle of technological innovation.`
      }
    ]
  },
  {
    id: 'pg-mtech-dm-2026-002',
    title: 'Data-Driven Digital Marketing, Consumer Analytics, and Enterprise Growth Systems',
    subtitle: 'Postgraduate Courses: M.Tech Digital Marketing',
    authors: ['Blessing Ojuloge', 'Dr. Grace N. Okafor'],
    institution: 'NACETEM Postgraduate School (M.Tech Digital Marketing)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Postgraduate Courses',
    pgCourseSub: 'M.Tech Digital Marketing',
    type: 'Courseware Module',
    year: 2026,
    doi: '10.5281/nacetem.pg.dm.2026.02',
    isbn: '978-978-54288-2-8',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 142,
    downloadsCount: 3890,
    pageCount: 95,
    coverColor: 'from-purple-700 via-indigo-900 to-slate-900',
    coverAccent: '#7c3aed',
    featured: true,
    audioAvailable: true,
    abstract: `Advanced postgraduate module for M.Tech Digital Marketing students. Covers search engine optimization, programmatic advertising, social media telemetry analytics, and customer conversion funnels for tech-enabled MSMEs.`,
    keyTakeaways: [
      'Outlines quantitative attribution models for digital marketing campaign ROI.',
      'Explores privacy-preserving analytics in compliance with global data protection laws.'
    ],
    policyRecommendations: [
      'Promote digital marketing adoption among agricultural cooperatives to expand export market access.'
    ],
    fullText: [
      {
        sectionTitle: 'Module 1: Digital Ecosystems & Marketing Telemetry',
        content: `Digital marketing leverages big data analytics to optimize customer acquisition and retention strategies.`
      }
    ]
  },
  {
    id: 'pg-mtech-nano-2026-003',
    title: 'Nanomaterial Synthesis, Characterization, and Industrial Applications in Energy & Medicine',
    subtitle: 'Postgraduate Courses: M.Tech Nanotechnology',
    authors: ['Dr. Kazeem Abubakar', 'Dr. Olushola Odusanya'],
    institution: 'NACETEM Postgraduate School (M.Tech Nanotechnology)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Postgraduate Courses',
    pgCourseSub: 'M.Tech Nanotechnology',
    type: 'Courseware Module',
    year: 2026,
    doi: '10.5281/nacetem.pg.nano.2026.03',
    isbn: '978-978-54288-3-5',
    accessLevel: 'Open Access',
    rating: 5.0,
    citationsCount: 188,
    downloadsCount: 4650,
    pageCount: 130,
    coverColor: 'from-sky-700 via-cyan-900 to-slate-900',
    coverAccent: '#0284c7',
    featured: true,
    audioAvailable: true,
    abstract: `Flagship postgraduate courseware for M.Tech Nanotechnology. Explores carbon nanotubes, quantum dots, nanocomposites, electron microscopy techniques (SEM/TEM), and nano-biosensors for healthcare and solar cells.`,
    keyTakeaways: [
      'Details green synthesis methods using indigenous botanical extracts for silver nanoparticles.',
      'Outlines safety and environmental risk assessment guidelines for nanomaterial handling.'
    ],
    policyRecommendations: [
      'Establish a National Center for Advanced Characterization and Nanofabrication.'
    ],
    fullText: [
      {
        sectionTitle: 'Module 1: Quantum Mechanics & Nanomaterial Physics',
        content: `At the nanometer scale, quantum confinement effects govern material properties, creating unique optical and electronic characteristics.`
      }
    ]
  },
  {
    id: 'pg-pgd-tm-2026-004',
    title: 'Fundamentals of Technology Transfer, Intellectual Property, and Project Management',
    subtitle: 'Postgraduate Courses: PGD Technology Management',
    authors: ['Dr. Olawale Rafiu Olaopa', 'Oluwatope O.B. (Omolayo Oluwatope)'],
    institution: 'NACETEM Postgraduate School (PGD Technology Management)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Postgraduate Courses',
    pgCourseSub: 'PGD Technology Management',
    type: 'Courseware Module',
    year: 2026,
    doi: '10.5281/nacetem.pg.pgdtm.2026.04',
    isbn: '978-978-54288-4-2',
    accessLevel: 'Open Access',
    rating: 4.8,
    citationsCount: 120,
    downloadsCount: 3200,
    pageCount: 88,
    coverColor: 'from-amber-600 via-orange-800 to-slate-900',
    coverAccent: '#d97706',
    featured: true,
    audioAvailable: true,
    abstract: `Comprehensive diploma courseware for PGD Technology Management students. Introduces technology policy formulation, project appraisal methodologies, feasibility studies, and industrial patent filing.`,
    keyTakeaways: [
      'Teaches project feasibility formulation and net present value (NPV) calculations for industrial tech.',
      'Covers patent drafting and trademark registration protocols in West Africa.'
    ],
    policyRecommendations: [
      'Provide PGD graduates with executive internships in technology incubation hubs.'
    ],
    fullText: [
      {
        sectionTitle: 'Module 1: Principles of Technology Policy & IP',
        content: `Postgraduate Diploma students gain foundational knowledge in managing intellectual property and evaluating technology transfer projects.`
      }
    ]
  },
  // Departmental Monthly Lecture Series Seed Papers
  {
    id: 'lect-ict-2026-003',
    title: 'Artificial Intelligence, Cloud Computing, and Cybersecurity Systems for Public Sector IT',
    subtitle: 'Departmental Monthly Lecture Series: 1. ICT Lecture Series',
    authors: ['Abubakar Rufai', 'Dr. Kazeem Abubakar'],
    institution: 'NACETEM ICT Directorate (Departmental Monthly Lecture Series)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Monthly Lecture Series',
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
    abstract: `Delivered under the Departmental Monthly Lecture Series (1. ICT Lecture Series), this technical monograph covers cloud deployment architectures, machine learning threat detection models, and data privacy compliance for public sector information infrastructure.`,
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
    id: 'lect-res-2026-002',
    title: 'Advanced Econometric Methodologies and Data Integrity in STI Surveys',
    subtitle: 'Departmental Monthly Lecture Series: 2. Researchers Lecture Series',
    authors: ['Prof. Olumuyiwa Olamade', 'Dr. Olawale Rafiu Olaopa'],
    institution: 'NACETEM Research Directorate (Departmental Monthly Lecture Series)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Monthly Lecture Series',
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
    abstract: `Delivered under the Departmental Monthly Lecture Series (2. Researchers Lecture Series), this comprehensive guide covers advanced micro-data sampling, survey design, Oslo Manual indicators, and econometric modeling for STI policy researchers.`,
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
    id: 'lect-ppl-2026-001',
    title: 'Strategic Planning, Project Programming, and Inter-Agency Linkages in STI Governance',
    subtitle: 'Departmental Monthly Lecture Series: 3. Planning, Programming and Linkages Lecture Series',
    authors: ['Dr. Akindele Joshua Famurewa', 'PPL Directorate Team'],
    institution: 'NACETEM PPL Directorate (Departmental Monthly Lecture Series)',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Departmental Monthly Lecture Series',
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
    abstract: `Delivered under the Departmental Monthly Lecture Series (3. Planning, Programming and Linkages Lecture Series), this monograph provides practical methodologies for aligning STI project portfolios with national development plans and ECOWAS science indicators.`,
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
  savedFavorites: ['user-paper-priority-rufai', 'pg-mtech-tm-2026-001', 'pg-mtech-nano-2026-003', 'lect-ict-2026-003'],
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
