import jsPDF from 'jspdf';

/**
 * Generates a clean, crisp, high-resolution official PDF Data URL for seeded library publications
 */
export function generateSamplePdfDataUrl(book) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header and Footer Helper
  const addHeaderFooter = (pageNo, totalPages) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(4, 120, 87);
    doc.text('NATIONAL CENTRE FOR TECHNOLOGY MANAGEMENT (NACETEM)', margin, 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Official STI Repository Document | ${book.id}`, pageWidth - margin, 10, { align: 'right' });
    
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 12, pageWidth - margin, 12);

    // Footer
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Federal Ministry of Innovation, Science and Technology, Nigeria`, margin, pageHeight - 7);
    doc.text(`Page ${pageNo} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // Title Box Banner
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(5, 150, 105);
  doc.roundedRect(margin, y, contentWidth, 42, 3, 3, 'FD');

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);

  const titleLines = doc.splitTextToSize((book.title || 'RESEARCH PUBLICATION').toUpperCase(), contentWidth - 10);
  doc.text(titleLines, margin + 5, y + 2);
  y += titleLines.length * 5.5 + 3;

  if (book.subtitle) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(book.subtitle, margin + 5, y);
    y += 5;
  }

  const authorsStr = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'Abubakar Rufai');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text(`Authors: ${authorsStr}`, margin + 5, y + 2);
  doc.text(`DOI: ${book.doi || '10.5281/nacetem.2026.001'} | Category: ${book.category} (${book.year})`, margin + 5, y + 7);

  y += 28;

  // Executive Abstract Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE ABSTRACT & LEGAL POLICY OVERVIEW', margin, y);
  y += 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const abstractLines = doc.splitTextToSize(book.abstract || '', contentWidth);
  doc.text(abstractLines, margin, y);
  y += abstractLines.length * 5 + 8;

  // Key Takeaways Box
  if (book.keyTakeaways && book.keyTakeaways.length > 0) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    const boxHeight = book.keyTakeaways.length * 7.5 + 12;
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(4, 120, 87);
    doc.text('KEY TAKEAWAYS & POLICY RECOMMENDATIONS:', margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);

    let ty = y + 12;
    book.keyTakeaways.forEach((point) => {
      const pLines = doc.splitTextToSize(`• ${point}`, contentWidth - 8);
      doc.text(pLines, margin + 4, ty);
      ty += pLines.length * 4.5;
    });

    y += boxHeight + 10;
  }

  // Full Text Sections
  const sections = book.fullText || [];
  sections.forEach((sec, idx) => {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = margin + 5;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(4, 120, 87);
    doc.text(`SECTION ${idx + 1}: ${(sec.sectionTitle || '').toUpperCase()}`, margin, y);
    y += 6;

    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    const secLines = doc.splitTextToSize(sec.content || '', contentWidth);

    secLines.forEach((line) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = margin + 5;
      }
      doc.text(line, margin, y);
      y += 5;
    });

    y += 8;
  });

  // Apply Headers and Footers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addHeaderFooter(i, totalPages);
  }

  return doc.output('datauristring');
}
