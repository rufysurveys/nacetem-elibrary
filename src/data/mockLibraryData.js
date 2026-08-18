export const NACETEM_COLLECTIONS = [
  { id: 'all', name: 'All Collections', count: 35 },
  { id: 'policy', name: 'STI Policy & Governance', count: 12 },
  { id: 'ai-tech', name: 'AI & Emerging Tech', count: 6 },
  { id: 'green-energy', name: 'Green Energy & Climate', count: 6 },
  { id: 'agri-tech', name: 'Agricultural Innovation', count: 4 },
  { id: 'industrial', name: 'Industrial & Tech Transfer', count: 4 },
  { id: 'biotech', name: 'Biotechnology & Health', count: 3 },
];

export const DOCUMENT_TYPES = [
  'All Types',
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
        content: `Enacted in 2015, the Nigerian Cybercrime Act provides the statutory framework for combating computer-related fraud, critical national information infrastructure protection, and electronic evidence admissibility. This paper by Abubakar Rufai evaluates the operational capacity of statutory enforcement institutions.`
      },
      {
        sectionTitle: 'Chapter 1: Institutional Capacity Audit & Technical Readiness',
        content: `Audit Findings across federal law enforcement and regulatory agencies:
1. Technical Infrastructure: 65% of regional offices require upgraded network intrusion detection sensors.
2. Skill Allocation: Identified urgent demand for specialized malware reverse-engineers and mobile forensic specialists.
3. Inter-Agency Coordination: Recommends real-time automated data sharing protocols to minimize incident response latency.`
      },
      {
        sectionTitle: 'Chapter 2: Techno-Legal Enforcement & Policy Roadmap',
        content: `Strategic Interventions:
1. Enact continuous training modules for police prosecutors and legal practitioners.
2. Establish public-private partnerships with commercial banks and telecom operators for real-time fraud telemetry sharing.`
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
        content: `Biotechnology constitutes one of the most transformative pillars of the global knowledge economy. Under the leadership of Dr. Olushola Odusanya, NACETEM presents this policy framework to position Nigeria as West Africa's hub for industrial bio-manufacturing. By translating university research in enzymes, bio-pesticides, and therapeutic proteins into commercial production, Nigeria can build sovereign resilience against global supply disruptions.`
      },
      {
        sectionTitle: 'Chapter 1: Infrastructure Assessment & Bioprocess Readiness Audit',
        content: `National Audit Findings across 40 tertiary institutions and research centers:
1. Fermentation Capacity: Identified 12 research laboratories equipped with pilot-scale bioreactors needing digital sensor integration.
2. Downstream Processing: High demand for industrial chromatography units and freeze-drying equipment.
3. Bio-Ethanol & Industrial Enzymes: Strains isolated from indigenous cassava waste demonstrated high thermal stability for industrial starch conversion.`
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
    abstract: `Authored by Dr. Akindele Joshua Famurewa and NACETEM policy researchers, this comprehensive study evaluates the strategic development of biofuel policies in Nigeria. It focuses on Jatropha curcas and cassava feedstocks, benchmarking technological readiness across Nigeria's six geopolitical zones and proposing commercialization frameworks for domestic bio-refineries.`,
    keyTakeaways: [
      'Proposes establishing 6 Zonal Biofuel Commercialization Hubs to support rural farmer outgrower schemes.',
      'Recommends a mandatory 10% biofuel blend (E10/B10) for commercial transport fuels by 2028.',
      'Outlines tax incentives for private sector investment in indigenous cassava-to-ethanol processing plants.'
    ],
    policyRecommendations: [
      'Zero-rate import duties on bio-refinery processing machinery and enzyme catalysts.',
      'Provide targeted R&D grants to polytechnics for local enzyme formulation.'
    ],
    fullText: [
      {
        sectionTitle: 'Executive Summary & Policy Background',
        content: `Biofuel technology represents a critical nexus between agricultural development, energy security, and environmental sustainability in Nigeria. This research monograph by Dr. Akindele Joshua Famurewa examines the operationalization of Nigeria's National Biofuel Policy.`
      }
    ]
  },
  {
    id: 'nac-2026-adeyeye-oluwatope',
    title: 'Knowledge Sources, Innovation Determinants, and Firm Performance in Nigerian Manufacturing',
    subtitle: 'An Empirical Micro-Econometric Assessment of Industrial Innovation Capacity',
    authors: ['Oluwatope O.B. (Omolayo Oluwatope)', 'David Adeyeye', 'Dr. A. O. Egbetokun'],
    institution: 'NACETEM Industrial Technology Division',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Industrial & Tech Transfer',
    type: 'Journal Paper',
    year: 2026,
    doi: '10.5281/nacetem.2026.102',
    isbn: '978-978-54210-9-6',
    accessLevel: 'Open Access',
    rating: 4.8,
    citationsCount: 198,
    downloadsCount: 4210,
    pageCount: 94,
    coverColor: 'from-blue-700 via-indigo-900 to-slate-900',
    coverAccent: '#2563eb',
    featured: true,
    audioAvailable: true,
    abstract: `Co-authored by Oluwatope O.B. (Omolayo Oluwatope) and David Adeyeye, this empirical study investigates the micro-level determinants of technological innovation across 800 manufacturing firms in Nigeria.`,
    keyTakeaways: [
      'Firms engaging in collaborative R&D with universities exhibit a 34% higher innovation success rate.',
      'High import duties on industrial equipment constitute the primary barrier to process innovation.'
    ],
    policyRecommendations: [
      'Establish R&D tax credit matching schemes for manufacturing firms investing in local prototyping.'
    ],
    fullText: [
      {
        sectionTitle: '1. Introduction & Theoretical Framework',
        content: `Technological innovation is the primary engine of firm competitiveness and structural transformation.`
      }
    ]
  },
  {
    id: 'nac-2026-olaopa',
    title: 'Indigenous Knowledge Systems and Structural Transformation in Africa',
    subtitle: 'Pathways for Science, Technology and Innovation Policy Integration',
    authors: ['Dr. Olawale Rafiu Olaopa', 'Prof. O. O. Oyelaran-Oyeyinka'],
    institution: 'NACETEM Development Studies Directorate',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'STI Policy & Governance',
    type: 'Policy Brief',
    year: 2026,
    doi: '10.5281/nacetem.2026.103',
    isbn: '978-978-54201-1-2',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 230,
    downloadsCount: 5120,
    pageCount: 110,
    coverColor: 'from-amber-700 via-orange-950 to-slate-900',
    coverAccent: '#d97706',
    featured: true,
    audioAvailable: true,
    abstract: `Dr. Olawale Rafiu Olaopa explores the strategic integration of Indigenous Knowledge Systems (IKS) into formal national STI policies.`,
    keyTakeaways: [
      'Proposes a National Indigenous Knowledge Patenting Framework to safeguard community IP rights.'
    ],
    policyRecommendations: [
      'Enact legal protection against biopiracy of native medicinal flora.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary & Conceptual Overview',
        content: `Indigenous Knowledge Systems (IKS) represent centuries of accumulated ecological, agricultural, and pharmacological wisdom.`
      }
    ]
  },
  {
    id: 'nac-2026-abubakar-kazeem',
    title: 'Compressed Natural Gas (CNG) Energy Transition and Material Engineering Assessment for Nigeria',
    subtitle: 'Techno-Economic Roadmap for Public Transportation Decarbonization',
    authors: ['Dr. Kazeem Abubakar', 'Engr. T. A. Adewale'],
    institution: 'NACETEM Material Engineering & Energy Division',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Green Energy & Climate',
    type: 'Technical Report',
    year: 2026,
    doi: '10.5281/nacetem.2026.104',
    isbn: '978-978-54205-8-7',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 185,
    downloadsCount: 4600,
    pageCount: 96,
    coverColor: 'from-emerald-600 via-teal-900 to-slate-900',
    coverAccent: '#047857',
    featured: true,
    audioAvailable: true,
    abstract: `Dr. Kazeem Abubakar presents a comprehensive material engineering and techno-economic evaluation of Compressed Natural Gas (CNG) conversion systems for Nigeria's public transport fleets.`,
    keyTakeaways: [
      'CNG conversion reduces public transit operational fuel costs by 62%.'
    ],
    policyRecommendations: [
      'Eliminate import tariffs on CNG conversion equipment.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary',
        content: `With vast natural gas reserves exceeding 200 trillion cubic feet, Nigeria possesses a strategic opportunity to transition its transport sector to CNG.`
      }
    ]
  },
  {
    id: 'nac-2026-olamade',
    title: 'Industrial Technology Transfer and Structural Economic Transformation in Sub-Saharan Africa',
    subtitle: 'International Trade Dynamics and Manufacturing Competitiveness',
    authors: ['Prof. Olumuyiwa Olamade', 'Dr. F. O. Festus'],
    institution: 'NACETEM Macroeconomic & Trade Directorate',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Industrial & Tech Transfer',
    type: 'E-Book',
    year: 2026,
    doi: '10.5281/nacetem.2026.105',
    isbn: '978-978-54212-0-1',
    accessLevel: 'Open Access',
    rating: 4.8,
    citationsCount: 275,
    downloadsCount: 6100,
    pageCount: 220,
    coverColor: 'from-purple-700 via-indigo-950 to-slate-900',
    coverAccent: '#7c3aed',
    featured: false,
    audioAvailable: true,
    abstract: `Prof. Olumuyiwa Olamade provides an authoritative treatise on industrial technology acquisition and global value chain integration for African economies.`,
    keyTakeaways: [
      'Emphasizes that technology transfer requires deliberate domestic learning investments.'
    ],
    policyRecommendations: [
      'Mandate 30% local engineering participation in FDI projects.'
    ],
    fullText: [
      {
        sectionTitle: 'Chapter 1: Technology Transfer',
        content: `Industrialization is fundamentally a process of technological learning and capability building.`
      }
    ]
  },
  {
    id: 'nac-2026-adebowale',
    title: 'Gender Mainstreaming and Innovation Policy in Nigeria Informal Enterprise Sector',
    subtitle: 'Empowering Women-Led MSMEs Through Inclusive Technology Access',
    authors: ['Boladale Adebowale', 'Dr. Grace N. Okafor'],
    institution: 'NACETEM Social & Gender Policy Directorate',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'STI Policy & Governance',
    type: 'Policy Brief',
    year: 2026,
    doi: '10.5281/nacetem.2026.106',
    isbn: '978-978-54200-0-6',
    accessLevel: 'Open Access',
    rating: 4.7,
    citationsCount: 112,
    downloadsCount: 3100,
    pageCount: 64,
    coverColor: 'from-fuchsia-700 via-pink-950 to-slate-900',
    coverAccent: '#d946ef',
    featured: false,
    audioAvailable: true,
    abstract: `Boladale Adebowale examines gender disparities in technological access and credit allocation within Nigeria's informal MSME sector.`,
    keyTakeaways: [
      'Women-led informal enterprises represent 54% of micro-enterprises.'
    ],
    policyRecommendations: [
      'Earmark 30% of the National STI Development Fund for female tech innovators.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary',
        content: `Gender equality is both a fundamental human right and a prerequisite for maximizing national innovative potential.`
      }
    ]
  },
  {
    id: 'nac-2026-ojuloge',
    title: 'Technological Assessment and Innovation Adoption in Nigerian Commercial Banking and Agribusiness',
    subtitle: 'Digital Transformation, Fintech Integration, and Smallholder Credit Access',
    authors: ['Blessing Ojuloge', 'Dr. A. O. Egbetokun'],
    institution: 'NACETEM Technology Assessment Division',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'AI & Emerging Tech',
    type: 'Technical Report',
    year: 2026,
    doi: '10.5281/nacetem.2026.107',
    isbn: '978-978-54202-2-4',
    accessLevel: 'Open Access',
    rating: 4.8,
    citationsCount: 164,
    downloadsCount: 3950,
    pageCount: 82,
    coverColor: 'from-cyan-700 via-sky-950 to-slate-900',
    coverAccent: '#0891b2',
    featured: false,
    audioAvailable: true,
    abstract: `Blessing Ojuloge conducts an in-depth technological assessment of digital banking platforms and AI credit scoring algorithms.`,
    keyTakeaways: [
      'Mobile USSD banking solutions expanded agricultural loan disbursement by 54%.'
    ],
    policyRecommendations: [
      'Expand rural telecommunications infrastructure to zero-signal farming zones.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Overview',
        content: `The rapid evolution of financial technology (Fintech) offers unprecedented opportunities for financial inclusion.`
      }
    ]
  },
  {
    id: 'nac-2026-iroh',
    title: 'Socio-Economic Assessment of Climate-Smart Agricultural Technology Adoption in Central Nigeria',
    subtitle: 'Evaluating Drought-Resistant Crops and Solar Irrigation Impact',
    authors: ['Iroh Emmanuel', 'Dr. Wakawa Rahila'],
    institution: 'NACETEM North-Central Zonal Directorate',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'Agricultural Innovation',
    type: 'Technical Report',
    year: 2026,
    doi: '10.5281/nacetem.2026.109',
    isbn: '978-978-54204-4-8',
    accessLevel: 'Open Access',
    rating: 4.8,
    citationsCount: 138,
    downloadsCount: 3420,
    pageCount: 76,
    coverColor: 'from-teal-700 via-emerald-950 to-slate-900',
    coverAccent: '#0d9488',
    featured: false,
    audioAvailable: true,
    abstract: `Iroh Emmanuel and Dr. Wakawa Rahila evaluate adoption rates of climate-smart agricultural technologies among 600 smallholder farming households.`,
    keyTakeaways: [
      'Solar-powered drip irrigation increased dry-season vegetable yields by 52%.'
    ],
    policyRecommendations: [
      'Subsidize solar water pumps for registered agricultural farmer cooperatives.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary',
        content: `Climate variability poses significant challenges to rain-fed agriculture in Nigeria.`
      }
    ]
  },
  {
    id: 'nac-2026-wakawa',
    title: 'Capacity Building and STI Institutional Frameworks for Zonal Technology Incubation in Nigeria',
    subtitle: 'Strengthening Regional Innovation Ecosystems and Polytechnic Synergy',
    authors: ['Dr. Wakawa Rahila', 'Iroh Emmanuel'],
    institution: 'NACETEM Institutional Development Division',
    publisher: 'National Centre for Technology Management (NACETEM)',
    category: 'STI Policy & Governance',
    type: 'Policy Brief',
    year: 2026,
    doi: '10.5281/nacetem.2026.110',
    isbn: '978-978-54205-5-5',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 145,
    downloadsCount: 3600,
    pageCount: 70,
    coverColor: 'from-emerald-700 via-green-950 to-slate-900',
    coverAccent: '#15803d',
    featured: false,
    audioAvailable: true,
    abstract: `Dr. Wakawa Rahila outlines an institutional framework for enhancing regional technology incubation centers and polytechnic innovation hubs.`,
    keyTakeaways: [
      'Proposes a Zonal Technology Incubation Charter linking polytechnics directly with local manufacturing firms.'
    ],
    policyRecommendations: [
      'Allocate 10% of zonal intervention funds to polytechnic fabrication laboratories.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary',
        content: `Regional technology incubation centers serve as vital bridges between academic research and commercial market deployment.`
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
  savedFavorites: ['user-paper-priority-rufai', 'nac-2026-famurewa', 'nac-2026-adeyeye-oluwatope'],
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
