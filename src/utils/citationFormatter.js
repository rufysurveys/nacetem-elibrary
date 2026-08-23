/**
 * Intelligent Academic Citation Formatting Engine
 * Formats citations accurately in APA 7th, Harvard, IEEE, MLA 9th, Chicago 17th, and BibTeX
 */

// Helper to format author names into academic styles
export function formatAuthors(authorsInput, style = 'APA') {
  if (!authorsInput) return '[Author not supplied]';

  let rawAuthors = [];
  if (Array.isArray(authorsInput)) {
    rawAuthors = authorsInput;
  } else if (typeof authorsInput === 'string') {
    rawAuthors = authorsInput.split(/;|, and | and |,/).map(a => a.trim()).filter(Boolean);
  }

  // Sanitize usernames / email prefixes like 'rufysanctuary' into proper author names
  const cleanAuthors = rawAuthors.map(authorStr => String(authorStr).trim()).filter(Boolean);

  if (cleanAuthors.length === 0) return '[Author not supplied]';

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

  if (style === 'BibTeX') {
    return cleanAuthors.join(' and ');
  }

  return cleanAuthors.join(', ');
}

/**
 * Format publication title to sentence case for APA or title case for MLA/Chicago
 */
export function formatTitle(title, style = 'APA') {
  if (!title) return '[Title not supplied]';
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
  const title = docMeta.title || '[Title not supplied]';
  const year = docMeta.year || docMeta.pubYear || 'n.d.';

  const rawPublisher = docMeta.publisher || docMeta.institution || '[Publisher not supplied]';
  const doi = docMeta.doi || '';
  const volume = docMeta.volume || '';
  const issue = docMeta.issue || '';
  const pages = docMeta.pages || '';

  // Clean publisher string (strip out usernames like 'rufysanctuary')
  const cleanPublisher = rawPublisher.trim();

  const authorsFormatted = formatAuthors(docMeta.authors || docMeta.authorList, style);
  const formattedTitle = formatTitle(title, style);

  // Clean DOI format
  const cleanDoi = doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').trim();
  const validDoi = /^10\.\d{4,9}\/\S+$/i.test(cleanDoi) ? cleanDoi : '';
  const doiStr = validDoi ? `https://doi.org/${validDoi}` : '';
  const doiSuffix = doiStr ? ` ${doiStr}` : '';

  switch (style) {
    case 'APA':
      let apaJournal = cleanPublisher;
      if (volume) apaJournal += `, ${volume}`;
      if (issue) apaJournal += `(${issue})`;
      if (pages) apaJournal += `, ${pages}`;
      return `${authorsFormatted} (${year}). ${formattedTitle}. ${apaJournal}.${doiSuffix}`;

    case 'Harvard':
      let harvardPub = cleanPublisher;
      if (volume) harvardPub += `, ${volume}`;
      if (issue) harvardPub += `(${issue})`;
      if (pages) harvardPub += `, pp.${pages}`;
      return `${authorsFormatted}, ${year}. ${formattedTitle}. ${harvardPub}.${doiStr ? ` Available at: <${doiStr}>.` : ''}`;

    case 'IEEE':
      let ieeeLoc = cleanPublisher;
      if (volume) ieeeLoc += `, vol. ${volume}`;
      if (issue) ieeeLoc += `, no. ${issue}`;
      if (pages) ieeeLoc += `, pp. ${pages}`;
      return `${authorsFormatted}, "${formattedTitle}," ${ieeeLoc}, ${year}.${validDoi ? ` doi: ${validDoi}.` : ''}`;

    case 'MLA':
      let mlaPub = cleanPublisher;
      if (volume) mlaPub += `, vol. ${volume}`;
      if (issue) mlaPub += `, no. ${issue}`;
      if (pages) mlaPub += `, pp. ${pages}`;
      return `${authorsFormatted}. "${formattedTitle}." ${mlaPub}, ${year}${doiStr ? `, ${doiStr}` : ''}.`;

    case 'Chicago':
      let chicagoPub = cleanPublisher;
      if (volume) chicagoPub += ` ${volume}`;
      if (issue) chicagoPub += `, no. ${issue}`;
      if (pages) chicagoPub += ` (${year}): ${pages}`;
      else chicagoPub += ` (${year})`;
      return `${authorsFormatted}. "${formattedTitle}." ${chicagoPub}.${doiSuffix}`;

    case 'BibTeX':
      const firstAuthor = Array.isArray(docMeta.authors) ? docMeta.authors[0] : String(docMeta.authors || 'unknown').split(/[;,]/)[0];
      const surname = firstAuthor.trim().split(/\s+/).pop().replace(/[^a-z0-9]/gi, '').toLowerCase() || 'unknown';
      const citeKey = `${surname}${String(year).replace(/\W/g, '') || 'nd'}`;
      const fields = [
        `  author = {${authorsFormatted}}`,
        `  title = {${title}}`,
        `  journal = {${cleanPublisher}}`,
        `  year = {${year}}`,
        volume && `  volume = {${volume}}`,
        issue && `  number = {${issue}}`,
        pages && `  pages = {${pages}}`,
        validDoi && `  doi = {${validDoi}}`
      ].filter(Boolean);
      return `@article{${citeKey},\n${fields.join(',\n')}\n}`;

    default:
      return `${authorsFormatted} (${year}). ${formattedTitle}. ${cleanPublisher}.`;
  }
}
