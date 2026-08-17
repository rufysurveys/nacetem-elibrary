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
    id: 'nac-2026-odusanya',
    title: 'Biotechnology Infrastructure and STI Policy Framework for Bio-Manufacturing in Nigeria',
    subtitle: 'Strategic Roadmap for Bioprocess Engineering, Vaccine Self-Reliance, and Industrial Bio-Economy',
    authors: ['Dr. Olushola Odusanya', 'Dr. Grace N. Okafor', 'Prof. M. O. Ilori'],
    institution: 'National Centre for Technology Management (NACETEM - DG/CEO Office)',
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
      },
      {
        sectionTitle: 'Chapter 2: Financial Architecture & Public-Private Partnerships',
        content: `Capital Expenditure Model for a National Pilot Bio-Manufacturing Facility:
- Bioreactor Racks (500L to 5,000L capacity): ₦240,000,000
- Sterilization & Air Filtration Systems: ₦65,000,000
- Quality Control & High-Performance Liquid Chromatography (HPLC): ₦85,000,000
- Payback Horizon: 4.2 years with an estimated gross profit margin of 38.5% on commercial enzyme sales.`
      },
      {
        sectionTitle: 'Chapter 3: Actionable Policy Framework for 2026-2030',
        content: `1. Enact a Bio-Economy Incentive Act exempting bio-manufacturing equipment from import tariffs.
2. Mandate public healthcare procurement of 25% locally manufactured biological diagnostic kits.
3. Formulate the NACETEM Bio-Innovation Sandbox to fast-track regulatory clearance for bio-entrepreneurs.`
      }
    ]
  },
  {
    id: 'nac-2026-famurewa',
    title: 'Biofuel Policy Framework and Jatropha Feedstock Enterprise Development in Nigeria',
    subtitle: 'Strategic Management of Renewable Energy & Agricultural Innovation Systems',
    authors: ['Dr. Akindele Joshua Famurewa', 'Prof. M. O. Ilori', 'Dr. F. E. Siyanbola'],
    institution: 'National Centre for Technology Management (NACETEM)',
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
        content: `Biofuel technology represents a critical nexus between agricultural development, energy security, and environmental sustainability in Nigeria. This research monograph by Dr. Akindele Joshua Famurewa examines the operationalization of Nigeria's National Biofuel Policy. By leveraging non-food crops such as Jatropha curcas alongside industrial cassava varieties, Nigeria can reduce petroleum product import dependence while generating over 250,000 rural green jobs.`
      },
      {
        sectionTitle: 'Chapter 1: Feedstock Evaluation & Zonal Readiness Audit',
        content: `A national survey conducted across 36 states evaluated soil suitability and harvesting yields for biofuel feedstocks:
1. South-West Zone: Cassava starch conversion yielded 280 liters of bio-ethanol per ton of dry tuber.
2. North-Central Zone: Jatropha curcas plantations demonstrated high drought resilience in Niger and Kwara states, yielding 1,400 liters of bio-diesel per hectare.
3. North-West Zone: High potential for sweet sorghum cultivation integrated with local sugar processing facilities.`
      },
      {
        sectionTitle: 'Chapter 2: Techno-Economic Analysis & Refinery Schematics',
        content: `Capital Expenditure (CAPEX) for a modular 5,000-liter per day decentralized bio-ethanol processing facility:
- Distillation & Dehydration Unit: ₦85,000,000
- Fermentation Racks & Feedstock Storage: ₦32,000,000
- Effluent Treatment & Biogas Generation: ₦18,000,000
- Net Payback Period: 3.4 years with an Internal Rate of Return (IRR) of 26.8%.`
      },
      {
        sectionTitle: 'Chapter 3: Strategic Recommendations & Action Plan',
        content: `1. Enact a statutory framework establishing the National Renewable Fuel Standard (NRFS).
2. Mandate public procurement of 15% bio-diesel blend for federal fleet vehicles.
3. Establish a ₦50 Billion Biofuel Venture Fund managed by the Bank of Industry in partnership with NACETEM.`
      }
    ]
  },
  {
    id: 'nac-2026-adeyeye-oluwatope',
    title: 'Knowledge Sources, Innovation Determinants, and Firm Performance in Nigerian Manufacturing',
    subtitle: 'An Empirical Micro-Econometric Assessment of Industrial Innovation Capacity',
    authors: ['Oluwatope O.B. (Omolayo Oluwatope)', 'David Adeyeye', 'Dr. A. O. Egbetokun'],
    institution: 'NACETEM Industrial Technology Division',
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
    abstract: `Co-authored by Oluwatope O.B. (Omolayo Oluwatope) and David Adeyeye, this empirical study investigates the micro-level determinants of technological innovation across 800 manufacturing firms in Nigeria. Utilizing Oslo Manual frameworks, the paper evaluates how external knowledge sourcing, internal R&D, and institutional collaboration impact firm productivity and export competitiveness.`,
    keyTakeaways: [
      'Firms engaging in collaborative R&D with universities exhibit a 34% higher innovation success rate.',
      'High import duties on industrial equipment constitute the primary barrier to process innovation.',
      'Identifies supplier networks and customer feedback as the top external knowledge sources for product innovation.'
    ],
    policyRecommendations: [
      'Establish R&D tax credit matching schemes for manufacturing firms investing in local prototyping.',
      'Create sector-specific industrial innovation clusters in Ikeja, Aba, Nnewi, and Kano.'
    ],
    fullText: [
      {
        sectionTitle: '1. Introduction & Theoretical Framework',
        content: `Technological innovation is the primary engine of firm competitiveness and structural transformation. This empirical paper by Oluwatope O.B. and David Adeyeye investigates the channels through which Nigerian manufacturing enterprises acquire, assimilate, and exploit innovative knowledge.`
      },
      {
        sectionTitle: '2. Econometric Methodology & Micro-Data Survey',
        content: `Sampling & Data Collection:
Data was collected from 850 manufacturing enterprises across 6 industrial zones covering food processing, pharmaceuticals, basic metals, chemicals, and textiles.

Probit Regression Model Results:
- In-house R&D expenditure positively correlates with product innovation (p < 0.01).
- Foreign technology licensing increases process innovation efficiency by 28%.
- Inadequate electricity supply reduces probability of introducing novel products by 41%.`
      },
      {
        sectionTitle: '3. Policy Implications for Industrial Technology Management',
        content: `To build resilient national innovation systems, NACETEM recommends:
1. Fast-tracking patent registration procedures through a digitized Intellectual Property Office.
2. Establishing shared industrial laboratory facilities equipped with advanced testing machinery in major commercial hubs.`
      }
    ]
  },
  {
    id: 'nac-2026-olaopa',
    title: 'Indigenous Knowledge Systems and Structural Transformation in Africa',
    subtitle: 'Pathways for Science, Technology and Innovation Policy Integration',
    authors: ['Dr. Olawale Rafiu Olaopa', 'Prof. O. O. Oyelaran-Oyeyinka'],
    institution: 'NACETEM Development Studies Directorate',
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
    abstract: `Dr. Olawale Rafiu Olaopa explores the strategic integration of Indigenous Knowledge Systems (IKS) into formal national STI policies. The study demonstrates how traditional agricultural practices, herbal medicine formulations, and community governance models can be scientifically validated, patented, and commercialized to drive sustainable economic growth.`,
    keyTakeaways: [
      'Proposes a National Indigenous Knowledge Patenting Framework to safeguard community IP rights.',
      'Demonstrates that integrating indigenous organic pest-control techniques reduces chemical fertilizer expenditure by 29%.',
      'Recommends establishing Regional IKS Validation Laboratories across university research institutes.'
    ],
    policyRecommendations: [
      'Enact legal protection against biopiracy of native medicinal flora.',
      'Fund interdisciplinary research bridging traditional bone-setters/herbalists with pharmaceutical scientists.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary & Conceptual Overview',
        content: `Indigenous Knowledge Systems (IKS) represent centuries of accumulated ecological, agricultural, and pharmacological wisdom. Dr. Olawale Rafiu Olaopa argues that African development policy has historically marginalized IKS in favor of imported technologies. This policy brief provides a roadmap for mainstreaming IKS into national STI indicator frameworks.`
      },
      {
        sectionTitle: '2. Case Studies in Agricultural & Medicinal IKS',
        content: `Case Study 1: Herbal Antimalarial Formulations (South-West & North-Central Nigeria)
Scientific validation of standardized botanical extracts demonstrated high efficacy against resistant Plasmodium strains, establishing a model for indigenous pharmaceutical spin-offs.

Case Study 2: Indigenous Grain Storage Techniques (Northern Nigeria)
Traditional neem-leaf and ash hermetic storage methods preserved cowpea harvests for 12 months with zero post-harvest pest destruction.`
      },
      {
        sectionTitle: '3. Legislative & Institutional Blueprint',
        content: `1. Formulate a Sui Generis Intellectual Property Legislation protecting collective community knowledge.
2. Incorporate IKS metrics into annual national science surveys conducted by NACETEM.`
      }
    ]
  },
  {
    id: 'nac-2026-abubakar-kazeem',
    title: 'Compressed Natural Gas (CNG) Energy Transition and Material Engineering Assessment for Nigeria',
    subtitle: 'Techno-Economic Roadmap for Public Transportation Decarbonization',
    authors: ['Dr. Kazeem Abubakar', 'Engr. T. A. Adewale', 'Dr. M. K. Bello'],
    institution: 'NACETEM Material Engineering & Energy Division',
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
    abstract: `Dr. Kazeem Abubakar presents a comprehensive material engineering and techno-economic evaluation of Compressed Natural Gas (CNG) conversion systems for Nigeria's public transport fleets. The report analyzes cylinder fatigue limits, conversion kit safety standards, distribution station economics, and national carbon reduction targets.`,
    keyTakeaways: [
      'CNG conversion reduces public transit operational fuel costs by 62% compared to premium motor spirit (PMS).',
      'Recommends Type-3 composite carbon-fiber cylinders for optimal weight reduction and safety compliance.',
      'Outlines a masterplan for 150 CNG mother-daughter refueling stations along major interstate transport corridors.'
    ],
    policyRecommendations: [
      'Eliminate import tariffs on CNG conversion equipment and high-pressure compression pumps.',
      'Establish a Mandatory Safety Inspection Protocol certified by SON and NACETEM.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary & Energy Transition Context',
        content: `With vast natural gas reserves exceeding 200 trillion cubic feet, Nigeria possesses a strategic opportunity to transition its transport sector to Compressed Natural Gas (CNG). Dr. Kazeem Abubakar evaluates the structural mechanics, material safety standards, and economic viability of scaling CNG conversion infrastructure.`
      },
      {
        sectionTitle: '2. Material Engineering & Safety Compliance',
        content: `Cylinder Material Selection Analysis:
- Type-1 (All-Steel): Low cost, but heavy (requires reinforced vehicle suspension).
- Type-2 (Hoop-Wrapped Steel): 30% weight reduction.
- Type-3 (Aluminum Liner with Carbon Fiber Wrap): Optimal strength-to-weight ratio, burst pressure rating > 700 bar. Recommended standard for commercial buses.`
      },
      {
        sectionTitle: '3. Economic Impact & Refueling Network Design',
        content: `Converting 100,000 commercial buses to CNG saves vehicle operators over ₦320 Billion annually in fuel expenditure while mitigating 1.8 Million metric tons of CO2 emissions per year.`
      }
    ]
  },
  {
    id: 'nac-2026-olamade',
    title: 'Industrial Technology Transfer and Structural Economic Transformation in Sub-Saharan Africa',
    subtitle: 'International Trade Dynamics and Manufacturing Competitiveness',
    authors: ['Prof. Olumuyiwa Olamade', 'Dr. F. O. Festus'],
    institution: 'NACETEM Macroeconomic & Trade Directorate',
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
    abstract: `Prof. Olumuyiwa Olamade provides an authoritative treatise on industrial technology acquisition and global value chain integration for African economies. The book details mechanisms for absorptive capacity building, joint venture technology transfer clauses, and local content compliance frameworks.`,
    keyTakeaways: [
      'Emphasizes that technology transfer requires deliberate domestic learning investments, not passive equipment importation.',
      'Formulates a Joint Venture Technology Absorptive Index for monitoring international engineering contracts.',
      'Highlights successful industrial park models in Southeast Asia adaptable to West Africa.'
    ],
    policyRecommendations: [
      'Mandate 30% local engineering participation in foreign direct investment (FDI) infrastructure projects.',
      'Fund specialized polytechnic institutes dedicated to industrial automation and robotics.'
    ],
    fullText: [
      {
        sectionTitle: 'Chapter 1: The Political Economy of Technology Transfer',
        content: `Industrialization is fundamentally a process of technological learning and capability building. Prof. Olumuyiwa Olamade demonstrates why importing turnkey factories without domestic skill accumulation leaves developing nations technologically dependent.`
      },
      {
        sectionTitle: 'Chapter 2: Building National Absorptive Capacity',
        content: `Absorptive capacity consists of four dimensions: acquisition, assimilation, transformation, and exploitation of technological knowledge. The monograph outlines concrete indicators for assessing firm-level engineering readiness.`
      }
    ]
  },
  {
    id: 'nac-2026-adebowale',
    title: 'Gender Mainstreaming and Innovation Policy in Nigeria Informal Enterprise Sector',
    subtitle: 'Empowering Women-Led MSMEs Through Inclusive Technology Access',
    authors: ['Boladale Adebowale', 'Dr. Grace N. Okafor'],
    institution: 'NACETEM Social & Gender Policy Directorate',
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
    abstract: `Boladale Adebowale examines gender disparities in technological access and credit allocation within Nigeria's informal MSME sector. The research proposes targeted micro-grant schemes, digital literacy bootcamps, and mobile-enabled processing equipment for women-owned agricultural and textile processing enterprises.`,
    keyTakeaways: [
      'Women-led informal enterprises represent 54% of micro-enterprises but receive less than 12% of formal R&D grants.',
      'Providing mobile solar-powered processing machinery increased female entrepreneurs income by 48%.',
      'Recommends gender-disaggregated STI indicator collection across federal statistical surveys.'
    ],
    policyRecommendations: [
      'Earmark 30% of the National STI Development Fund specifically for female tech innovators.',
      'Establish community technology centers providing free internet access and digital accounting software training.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary & Socio-Economic Context',
        content: `Gender equality is both a fundamental human right and a prerequisite for maximizing national innovative potential. Boladale Adebowale assesses the structural barriers faced by female entrepreneurs in adopting digital tools and mechanized food processing technologies.`
      },
      {
        sectionTitle: '2. Field Survey Findings & Policy Blueprint',
        content: `Field interviews conducted with 400 female MSME owners in Oyo, Kano, and Enugu states revealed that lack of collateral and limited formal technical training represent the top obstacles to scaling technological operations.`
      }
    ]
  },
  {
    id: 'nac-2026-ojuloge',
    title: 'Technological Assessment and Innovation Adoption in Nigerian Commercial Banking and Agribusiness',
    subtitle: 'Digital Transformation, Fintech Integration, and Smallholder Credit Access',
    authors: ['Blessing Ojuloge', 'Dr. A. O. Egbetokun'],
    institution: 'NACETEM Technology Assessment Division',
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
    abstract: `Blessing Ojuloge conducts an in-depth technological assessment of digital banking platforms, AI credit scoring algorithms, and fintech integrations serving rural agricultural processing hubs in Nigeria. The report provides guidelines for reducing transaction costs and expanding credit to smallholder farmers.`,
    keyTakeaways: [
      'Mobile USSD banking solutions expanded agricultural input loan disbursement efficiency by 54%.',
      'Recommends open API banking standards to facilitate seamless agricultural insurance claim processing.',
      'Highlights risk mitigation strategies for rural digital financial literacy.'
    ],
    policyRecommendations: [
      'Expand rural telecommunications infrastructure to zero-signal farming zones.',
      'Mandate transparent AI credit scoring disclosures to prevent algorithmic exclusion of rural borrowers.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Overview & Digital Banking Landscape',
        content: `The rapid evolution of financial technology (Fintech) offers unprecedented opportunities for financial inclusion. Blessing Ojuloge analyzes how digital payment gateways and mobile credit scoring models are transforming credit accessibility for rural agricultural enterprises.`
      },
      {
        sectionTitle: '2. Technological Assessment Framework',
        content: `Evaluation of 15 commercial banks and 8 agricultural fintech platforms:
- System Uptime & Transaction Speed: 99.4% average reliability.
- User Experience for Low-Literacy Farmers: Voice-guided audio prompts in native languages increased transaction completion rates by 68%.`
      }
    ]
  },
  {
    id: 'nac-2026-rufai',
    title: 'Big Data Analytics and Artificial Intelligence Infrastructure for Cybercrime Detection',
    subtitle: 'Sovereign Data Security and Machine Learning Threat Intelligence',
    authors: ['Abubakar Rufai', 'Dr. Kazeem Abubakar'],
    institution: 'NACETEM ICT & Cyber Security Directorate',
    category: 'AI & Emerging Tech',
    type: 'Journal Paper',
    year: 2026,
    doi: '10.5281/nacetem.2026.108',
    isbn: '978-978-54203-3-1',
    accessLevel: 'Open Access',
    rating: 4.9,
    citationsCount: 156,
    downloadsCount: 3780,
    pageCount: 90,
    coverColor: 'from-sky-700 via-blue-950 to-slate-900',
    coverAccent: '#0284c7',
    featured: false,
    audioAvailable: true,
    abstract: `Abubakar Rufai presents a machine learning architecture for real-time anomaly detection and cybersecurity protection across Nigeria's digital financial infrastructure. The paper outlines big data pipeline configurations, neural network threat intelligence, and data protection compliance.`,
    keyTakeaways: [
      'Deploys recurrent neural networks (RNN) achieving 98.7% accuracy in detecting fraudulent electronic transactions.',
      'Recommends establishing a National Sovereign Security Operations Center (SOC).',
      'Outlines compliance guidelines under the Nigeria Data Protection Act (NDPA).'
    ],
    policyRecommendations: [
      'Mandate real-time threat intelligence sharing across financial institutions and law enforcement agencies.',
      'Invest in specialized cybersecurity training programs for public sector IT managers.'
    ],
    fullText: [
      {
        sectionTitle: '1. Introduction & Cyber Security Architecture',
        content: `As Nigeria accelerates digital government services and electronic payments, protecting critical information infrastructure becomes a national security priority. Abubakar Rufai details an AI-driven anomaly detection model designed to intercept cyber threats in real time.`
      },
      {
        sectionTitle: '2. Neural Network Model & Experimental Results',
        content: `Performance metrics of the deep learning classification model:
- Precision: 98.4%
- Recall: 99.1%
- False Positive Rate: 0.02%
The model processed over 10 Million synthetic transaction logs with sub-10 millisecond latency.`
      }
    ]
  },
  {
    id: 'nac-2026-iroh',
    title: 'Socio-Economic Assessment of Climate-Smart Agricultural Technology Adoption in Central Nigeria',
    subtitle: 'Evaluating Drought-Resistant Crops and Solar Irrigation Impact',
    authors: ['Iroh Emmanuel', 'Dr. Wakawa Rahila', 'Engr. T. A. Adewale'],
    institution: 'NACETEM North-Central Zonal Directorate (Abuja)',
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
    abstract: `Iroh Emmanuel and Dr. Wakawa Rahila evaluate the adoption rates and socio-economic impact of climate-smart agricultural technologies among 600 smallholder farming households in Benue, Nasarawa, and Niger states. The report details yield increases from solar irrigation and drought-tolerant seed varieties.`,
    keyTakeaways: [
      'Solar-powered drip irrigation increased dry-season vegetable farming yields by 52%.',
      'Drought-tolerant maize varieties mitigated crop loss during mid-season dry spells by 88%.',
      'Recommends community extension worker training programs focused on climate-smart practices.'
    ],
    policyRecommendations: [
      'Subsidize solar water pumps for registered agricultural farmer cooperatives.',
      'Establish regional climate-smart seed distribution centers.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary & Field Methodology',
        content: `Climate variability poses significant challenges to rain-fed agriculture in Nigeria. Iroh Emmanuel presents empirical data from North-Central Nigeria demonstrating how climate-smart technologies improve household income and food security.`
      },
      {
        sectionTitle: '2. Econometric Survey & Yield Assessment',
        content: `Survey findings across 600 farming households indicate that farmers using solar irrigation achieved an average annual net income increase of ₦480,000 compared to rain-fed farmers.`
      }
    ]
  },
  {
    id: 'nac-2026-wakawa',
    title: 'Capacity Building and STI Institutional Frameworks for Zonal Technology Incubation in Nigeria',
    subtitle: 'Strengthening Regional Innovation Ecosystems and Polytechnic Synergy',
    authors: ['Dr. Wakawa Rahila', 'Iroh Emmanuel', 'Dr. F. E. Siyanbola'],
    institution: 'NACETEM Institutional Development Division',
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
    abstract: `Dr. Wakawa Rahila outlines an institutional framework for enhancing regional technology incubation centers and polytechnic innovation hubs across Nigeria. The policy brief provides guidelines for executive capacity building, mentorship networks, and commercial prototype validation.`,
    keyTakeaways: [
      'Proposes a Zonal Technology Incubation Charter linking polytechnics directly with local manufacturing firms.',
      'Recommends annual executive capacity building workshops for state government technology commissioners.',
      'Establishes a standardized incubation evaluation scorecard.'
    ],
    policyRecommendations: [
      'Allocate 10% of zonal intervention funds to polytechnic fabrication laboratories.',
      'Form regional innovation advisory councils comprising industry leaders and NACETEM researchers.'
    ],
    fullText: [
      {
        sectionTitle: '1. Executive Summary & Strategic Rationale',
        content: `Regional technology incubation centers serve as vital bridges between academic research and commercial market deployment. Dr. Wakawa Rahila details strategies for upgrading zonal technology centers to foster youth entrepreneurship and local manufacturing.`
      },
      {
        sectionTitle: '2. Zonal Incubation Architecture & Performance Scorecard',
        content: `Key pillars of the Zonal Incubation Framework:
1. Technical Mentorship: Pairing student innovators with senior industrial engineers.
2. Prototyping Infrastructure: Providing access to 3D printers, CNC milling machines, and electronics testing stations.`
      }
    ]
  }
];

export const INITIAL_USER_STATE = {
  borrowedBooks: [
    {
      bookId: 'nac-2026-odusanya',
      borrowedDate: '2026-08-01',
      dueDate: '2026-08-15',
      qrCode: 'NAC-PASS-8839201-2026',
      progress: 65
    }
  ],
  savedFavorites: ['nac-2026-famurewa', 'nac-2026-adeyeye-oluwatope', 'nac-2026-olaopa'],
  readingHistory: [
    { bookId: 'nac-2026-odusanya', lastReadPage: 44, timestamp: '2026-08-11T14:20:00' },
    { bookId: 'nac-2026-abubakar-kazeem', lastReadPage: 12, timestamp: '2026-08-10T09:15:00' }
  ],
  notes: [
    {
      id: 'note-1',
      bookId: 'nac-2026-famurewa',
      page: 14,
      text: 'Key Biofuel policy target: Establishing 6 Zonal Biofuel Commercialization Hubs by 2028.',
      date: '2026-08-11'
    }
  ]
};
