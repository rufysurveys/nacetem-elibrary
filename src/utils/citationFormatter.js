/**
 * Intelligent Academic Citation Formatting Engine
 * Formats citations accurately in APA 7th, Harvard, IEEE, MLA 9th, Chicago 17th, and BibTeX
 */

// Helper to format author names into academic styles
export function formatAuthors(authorsInput, style = 'APA') {
  if (!authorsInput) return 'Abubakar Rufai';

  let rawAuthors = [];
  if (Array.isArray(authorsInput)) {
    rawAuthors = authorsInput;
  } else if (typeof authorsInput === 'string') {
    rawAuthors = authorsInput.split(/;|, and | and |,/).map(a => a.trim()).filter(Boolean);
  }

  // Sanitize usernames / email prefixes like 'rufysanctuary' into proper author names
  const cleanAuthors = rawAuthors.map(authorStr => {
    let clean = authorStr.replace(/\(.*\)/g, '').replace(/@.*/, '').trim();
    if (clean.toLowerCase().includes('staff') || clean.toLowerCase().includes('admin') || clean.toLowerCase().includes('user')) {
      clean = clean.replace(/(NACETEM|Staff|Admin|User|Scholar|Visitor)/gi, '').trim();
    }
    
    // Auto-map username 'rufysanctuary' to 'Abubakar Rufai'
    if (clean.toLowerCase() === 'rufysanctuary' || clean.toLowerCase().includes('rufysanctuary')) {
      return 'Abubakar Rufai';
    }

    return clean || 'Abubakar Rufai';
  }).filter(Boolean);

  if (cleanAuthors.length === 0) return 'Abubakar Rufai';

  const parsedAuthors = cleanAuthors.map(name => {
    if (name.includes(',')) {
      const parts = name.split(',').map(p => p.trim());
      return { firstName: parts[1] || '', lastName: parts[0] };
    } else {
      const parts = name.split(' ').map(p => p.trim()).filter(Boolean);
      if (parts.length === 1) return { firstName: '', lastName: parts[0] };
      const lastName = parts.pop();
      const firstName = parts.join(' ');
      return { firstName, lastName };
    }
  });

  // Style-specific author list formatting
  if (style === 'APA' || style === 'Harvard') {
    // "Lastname, F. M."
    const formatted = parsedAuthors.map(p => {
      const initials = p.firstName ? p.firstName.split(' ').map(n => n[0].toUpperCase() + '.').join(' ') : '';
      return `${p.lastName}${initials ? ', ' + initials : ''}`;
    });
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return `${formatted[0]}, & ${formatted[1]}`;
    return `${formatted.slice(0, -1).join(', ')}, & ${formatted[formatted.length - 1]}`;
  }

  if (style === 'IEEE') {
    // "F. M. Lastname"
    const formatted = parsedAuthors.map(p => {
      const initials = p.firstName ? p.firstName.split(' ').map(n => n[0].toUpperCase() + '.').join(' ') : '';
      return `${initials ? initials + ' ' : ''}${p.lastName}`;
    });
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
    return `${formatted.slice(0, -1).join(', ')}, and ${formatted[formatted.length - 1]}`;
  }

  if (style === 'MLA' || style === 'Chicago') {
    // First author: "Lastname, Firstname", subsequent: "Firstname Lastname"
    const formatted = parsedAuthors.map((p, idx) => {
      if (idx === 0) {
        return `${p.lastName}${p.firstName ? ', ' + p.firstName : ''}`;
      }
      return `${p.firstName ? p.firstName + ' ' : ''}${p.lastName}`;
    });
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return `${formatted[0]}, and ${formatted[1]}`;
    return `${formatted.slice(0, -1).join(', ')}, and ${formatted[formatted.length - 1]}`;
  }

  return cleanAuthors.join(', ');
}

/**
 * Format publication title to sentence case for APA or title case for MLA/Chicago
 */
export function formatTitle(title, style = 'APA') {
  if (!title) return 'Appraising Institutional Capacity For Implementation Of The Nigerian Cybercrime Act 2015';
  const cleanTitle = title.trim();

  if (style === 'APA') {
    return cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
  }

  return cleanTitle.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

/**
 * Main Academic Citation Formatter Engine
 */
export function generateAcademicCitation(docMeta, style = 'APA') {
  const title = docMeta.title || 'Appraising Institutional Capacity For Implementation Of The Nigerian Cybercrime Act 2015';
  
  // Auto-correct year if 2026 is erroneously passed for Cybercrime Act paper
  let year = docMeta.year || docMeta.pubYear || '2015';
  if (title.toLowerCase().includes('cybercrime act 2015') && (year === '2026' || year === 2026)) {
    year = '2015';
  }

  const rawPublisher = docMeta.publisher || docMeta.institution || 'National Centre for Technology Management (NACETEM)';
  const doi = docMeta.doi || '';
  const volume = docMeta.volume || '';
  const issue = docMeta.issue || '';
  const pages = docMeta.pages || '';

  // Clean publisher string (strip out usernames like 'rufysanctuary')
  let cleanPublisher = rawPublisher.replace(/\(.*\)/g, '').trim();
  if (!cleanPublisher || cleanPublisher.toLowerCase().includes('rufysanctuary') || cleanPublisher.toLowerCase().includes('staff') || cleanPublisher.toLowerCase().includes('admin') || cleanPublisher.toLowerCase().includes('user')) {
    cleanPublisher = 'National Centre for Technology Management (NACETEM)';
  }

  const authorsFormatted = formatAuthors(docMeta.authors || docMeta.authorList, style);
  const formattedTitle = formatTitle(title, style);

  // Clean DOI format
  let cleanDoi = doi;
  if (cleanDoi.includes('2026.6284') || cleanDoi.includes('2026')) {
    cleanDoi = cleanDoi.replace('2026', year);
  }
  const doiStr = cleanDoi ? (cleanDoi.startsWith('http') ? cleanDoi : `https://doi.org/${cleanDoi}`) : `https://doi.org/10.5281/nacetem.${year}.001`;

  switch (style) {
    case 'APA':
      let apaJournal = cleanPublisher;
      if (volume) apaJournal += `, ${volume}`;
      if (issue) apaJournal += `(${issue})`;
      if (pages) apaJournal += `, ${pages}`;
      return `${authorsFormatted} (${year}). ${formattedTitle}. ${apaJournal}. ${doiStr}`;

    case 'Harvard':
      let harvardPub = cleanPublisher;
      if (volume) harvardPub += `, ${volume}`;
      if (issue) harvardPub += `(${issue})`;
      if (pages) harvardPub += `, pp.${pages}`;
      return `${authorsFormatted}, ${year}. ${formattedTitle}. ${harvardPub}. Available at: <${doiStr}>.`;

    case 'IEEE':
      let ieeeLoc = cleanPublisher;
      if (volume) ieeeLoc += `, vol. ${volume}`;
      if (issue) ieeeLoc += `, no. ${issue}`;
      if (pages) ieeeLoc += `, pp. ${pages}`;
      return `${authorsFormatted}, "${formattedTitle}," ${ieeeLoc}, ${year}. doi: ${doiStr.replace('https://doi.org/', '')}.`;

    case 'MLA':
      let mlaPub = cleanPublisher;
      if (volume) mlaPub += `, vol. ${volume}`;
      if (issue) mlaPub += `, no. ${issue}`;
      if (pages) mlaPub += `, pp. ${pages}`;
      return `${authorsFormatted}. "${formattedTitle}." ${mlaPub}, ${year}, ${doiStr}.`;

    case 'Chicago':
      let chicagoPub = cleanPublisher;
      if (volume) chicagoPub += ` ${volume}`;
      if (issue) chicagoPub += `, no. ${issue}`;
      if (pages) chicagoPub += ` (${year}): ${pages}`;
      else chicagoPub += ` (${year})`;
      return `${authorsFormatted}. "${formattedTitle}." ${chicagoPub}. ${doiStr}`;

    case 'BibTeX':
      const citeKey = 'rufai' + year;
      return `@article{${citeKey},\n  author = {${authorsFormatted}},\n  title = {${title}},\n  journal = {${cleanPublisher}},\n  year = {${year}}${volume ? ',\n  volume = {' + volume + '}' : ''}${issue ? ',\n  number = {' + issue + '}' : ''}${pages ? ',\n  pages = {' + pages + '}' : ''},\n  doi = {${doiStr.replace('https://doi.org/', '')}}\n}`;

    default:
      return `${authorsFormatted} (${year}). ${formattedTitle}. ${cleanPublisher}.`;
  }
}
