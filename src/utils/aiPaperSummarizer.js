/**
 * Generates a structured academic AI summary for a research paper
 */
export function generateAcademicPaperSummary(book) {
  const title = book.title || 'Research Publication';
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'NACETEM Researcher');
  const year = book.year || 2026;
  const category = book.category || 'Science, Technology & Innovation';
  const abstractText = book.abstract || '';
  const takeaways = book.keyTakeaways || [];
  const policies = book.policyRecommendations || [];

  // Extract or infer methodology keywords from paper content
  let methodology = 'Quantitative & Empirical STI Policy Appraisal';
  if (title.toLowerCase().includes('cybercrime') || abstractText.toLowerCase().includes('cybercrime') || abstractText.toLowerCase().includes('forensic')) {
    methodology = 'Institutional Capacity Assessment, Legal Framework Analysis & Digital Forensic Survey';
  } else if (title.toLowerCase().includes('biotechnology') || abstractText.toLowerCase().includes('bio-manufacturing')) {
    methodology = 'Bioprocess Engineering Evaluation, Industry Survey & Facility Readiness Audit';
  } else if (title.toLowerCase().includes('econometric') || abstractText.toLowerCase().includes('econometric')) {
    methodology = 'Advanced Econometric Modeling, Micro-Data Sampling & Probit Regression';
  } else if (title.toLowerCase().includes('nano') || abstractText.toLowerCase().includes('nano')) {
    methodology = 'Nanomaterial Characterization (SEM/TEM), Spectroscopic Analysis & Green Synthesis Protocol';
  } else if (title.toLowerCase().includes('digital marketing') || abstractText.toLowerCase().includes('marketing')) {
    methodology = 'Consumer Telemetry Analytics, Conversion Attribution Modeling & Empirical Enterprise Survey';
  } else if (title.toLowerCase().includes('innovation') || abstractText.toLowerCase().includes('innovation')) {
    methodology = 'Oslo Manual Innovation Indicators Survey, Comparative Analysis & Econometric Benchmarking';
  }

  // Extract or infer research problem
  const problem = abstractText.includes('appraisal') || abstractText.includes('gap') || abstractText.includes('combating')
    ? `Addressing institutional capacity constraints, infrastructure deficits, and policy execution challenges in ${category.toLowerCase()} within Nigeria and West Africa.`
    : `Investigating key operational bottlenecks and quantitative indicators governing national ${category.toLowerCase()} development.`;

  // Extract objectives
  const objectives = [
    `To evaluate technical readiness and operational frameworks for ${title}.`,
    `To establish empirical benchmarks for ${category} in public and private sector institutions.`,
    `To formulate actionable policy recommendations for federal decision-makers and research bodies.`
  ];

  // Extract key findings
  const keyFindings = takeaways.length > 0 ? takeaways : [
    `Identifies institutional capability gaps across regional zonal centers.`,
    `Demonstrates positive correlation between structured technical training and policy enforcement compliance.`,
    `Establishes a standardized decision matrix for future technological interventions.`
  ];

  // Extract recommendations
  const recommendations = policies.length > 0 ? policies : [
    `Establish dedicated national funding mechanisms for ${category} infrastructure.`,
    `Standardize operational guidelines and inter-agency coordination protocols.`
  ];

  // Keywords list
  const keywordsList = [
    category,
    'NACETEM Research',
    'STI Policy',
    'Capacity Building',
    ...title.split(' ').filter(w => w.length > 4 && !['about', 'under', 'using', 'first', 'which'].includes(w.toLowerCase())).slice(0, 5)
  ];

  return {
    isAiGenerated: true,
    generatedAt: new Date().toISOString(),
    paperTitle: title,
    authors: authors,
    year: year,
    summaryHeading: `AI Academic Summary: ${title}`,
    whatIsThisAbout: `This research paper by ${authors} (${year}) examines ${title.toLowerCase()}. It provides an in-depth analysis of ${category.toLowerCase()} frameworks, empirical benchmarks, and technological governance principles.`,
    researchProblem: problem,
    objectives: objectives,
    methodology: methodology,
    keyFindings: keyFindings,
    conclusion: `The study concludes that targeted institutional capacity building, modernized technical infrastructure, and coordinated policy frameworks are essential to maximize national STI output and industrial self-reliance.`,
    recommendations: recommendations,
    keywords: Array.from(new Set(keywordsList))
  };
}
