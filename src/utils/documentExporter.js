import jsPDF from 'jspdf';
import { getPdfFromStorage } from './pdfStorage';

/**
 * Exports/Downloads a publication as its exact original uploaded PDF file payload.
 * Layer A: 100% Byte-for-byte exact original file preservation.
 */
export async function exportToPdf(book) {
  if (!book) return;

  // 1. Check if original file URL or in-memory pdfDataUrl exists
  let targetDataUrl = book.fileUrl || book.pdfDataUrl || null;

  // 2. If not in memory, retrieve exact binary payload from IndexedDB storage
  if (!targetDataUrl && book.id) {
    targetDataUrl = await getPdfFromStorage(book.id);
  }

  // If original binary payload is found, download exact original file byte-for-byte
  if (targetDataUrl) {
    const link = document.createElement('a');
    link.href = book.fileUrl ? (book.fileUrl.startsWith('http') || book.fileUrl.startsWith('/') ? book.fileUrl : `${book.fileUrl}?download=1`) : targetDataUrl;
    link.download = book.uploadedFileName || book.fileName || `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }

  // Fallback: If no binary exists, synthesize formatted PDF with jsPDF
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

  const addPageHeaderFooter = (pageNo, totalPages) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(4, 120, 87);
    doc.text('NATIONAL CENTRE FOR TECHNOLOGY MANAGEMENT (NACETEM)', margin, 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Official Repository Document | ${book.id}`, pageWidth - margin, 10, { align: 'right' });
    
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 12, pageWidth - margin, 12);

    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Federal Ministry of Innovation, Science and Technology, Nigeria`, margin, pageHeight - 7);
    doc.text(`Page ${pageNo} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(5, 150, 105);
  doc.roundedRect(margin, y + 2, contentWidth, 38, 3, 3, 'FD');

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);

  const titleLines = doc.splitTextToSize((book.title || 'RESEARCH PUBLICATION').toUpperCase(), contentWidth - 10);
  doc.text(titleLines, margin + 5, y + 2);
  y += titleLines.length * 5.5 + 2;

  if (book.subtitle) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(book.subtitle, margin + 5, y);
    y += 5;
  }

  const authorsStr = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'NACETEM Researcher');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text(`Authors: ${authorsStr}`, margin + 5, y + 2);
  doc.text(`DOI: ${book.doi || book.isbn || '10.5281/nacetem'} | Category: ${book.category} (${book.year})`, margin + 5, y + 7);

  y += 24;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE ABSTRACT & SUMMARY', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const abstractLines = doc.splitTextToSize(book.abstract || '', contentWidth);
  doc.text(abstractLines, margin, y);
  y += abstractLines.length * 5 + 6;

  if (book.keyTakeaways && book.keyTakeaways.length > 0) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    const boxHeight = book.keyTakeaways.length * 7 + 10;
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(4, 120, 87);
    doc.text('KEY TAKEAWAYS & POLICY HIGHLIGHTS:', margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);

    let ty = y + 11;
    book.keyTakeaways.forEach((point) => {
      const pLines = doc.splitTextToSize(`• ${point}`, contentWidth - 8);
      doc.text(pLines, margin + 4, ty);
      ty += pLines.length * 4.5;
    });

    y += boxHeight + 8;
  }

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

    y += 6;
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addPageHeaderFooter(i, totalPages);
  }

  doc.save(book.uploadedFileName || `${book.id}_NACETEM_Official_Paper.pdf`);
}

/**
 * Exports/Downloads a publication as a Microsoft Word Document (.doc / .docx)
 * Downloads exact original uploaded .doc / .docx file if available.
 */
export async function exportToWord(book) {
  if (!book) return;

  let targetDataUrl = book.fileUrl || book.pdfDataUrl || null;
  if (!targetDataUrl && book.id) {
    targetDataUrl = await getPdfFromStorage(book.id);
  }

  // If uploaded file is a word document, download exact original file payload
  if (targetDataUrl && (book.uploadedFileName?.toLowerCase().endsWith('.doc') || book.uploadedFileName?.toLowerCase().endsWith('.docx'))) {
    const link = document.createElement('a');
    link.href = targetDataUrl;
    link.download = book.uploadedFileName || `${book.id}_Original_Document.docx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }

  const authorsStr = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;

  let wordContent = `
    <html xmlns:o='urn:schemas-microsoft-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${book.title}</title>
      <style>
        body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; margin: 1in; }
        h1 { font-family: 'Arial', sans-serif; font-size: 18pt; color: #047857; text-transform: uppercase; margin-bottom: 4pt; }
        h2 { font-family: 'Arial', sans-serif; font-size: 14pt; color: #0f172a; border-bottom: 2px solid #047857; padding-bottom: 3pt; margin-top: 18pt; }
        h3 { font-family: 'Arial', sans-serif; font-size: 12pt; color: #047857; margin-top: 14pt; }
        .subtitle { font-style: italic; color: #475569; font-size: 12pt; margin-bottom: 12pt; }
        .meta-box { background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 12pt; margin-bottom: 16pt; border-radius: 4pt; }
        .meta-item { font-size: 10pt; color: #334155; font-weight: bold; }
        .abstract-box { background-color: #f0fdf4; border-left: 4px solid #047857; padding: 12pt; margin-bottom: 16pt; font-size: 10.5pt; }
        .key-takeaway { margin-bottom: 4pt; font-size: 10pt; }
        .footer { font-size: 9pt; color: #94a3b8; border-top: 1px solid #cbd5e1; padding-top: 8pt; margin-top: 24pt; }
      </style>
    </head>
    <body>
      <div class="header" style="text-align: center; border-bottom: 2px solid #047857; padding-bottom: 8pt; margin-bottom: 16pt;">
        <p style="font-size: 10pt; font-weight: bold; color: #047857; margin: 0;">FEDERAL REPUBLIC OF NIGERIA</p>
        <p style="font-size: 9pt; color: #475569; margin: 0;">Federal Ministry of Innovation, Science and Technology</p>
        <p style="font-size: 11pt; font-weight: bold; color: #0f172a; margin: 2pt 0 0 0;">NATIONAL CENTRE FOR TECHNOLOGY MANAGEMENT (NACETEM)</p>
      </div>

      <h1>${book.title}</h1>
      ${book.subtitle ? `<div class="subtitle">${book.subtitle}</div>` : ''}

      <div class="meta-box">
        <p class="meta-item">Authors: ${authorsStr}</p>
        <p class="meta-item">Institution: ${book.institution || 'NACETEM'}</p>
        <p class="meta-item">DOI: ${book.doi || book.isbn || '10.5281/nacetem'} | Publication Year: ${book.year} | Category: ${book.category}</p>
      </div>

      <h2>Executive Abstract</h2>
      <div class="abstract-box">
        <p>${book.abstract || ''}</p>
      </div>

      ${book.keyTakeaways && book.keyTakeaways.length > 0 ? `
        <h3>Key Takeaways & Policy Recommendations:</h3>
        <ul>
          ${book.keyTakeaways.map(pt => `<li class="key-takeaway">${pt}</li>`).join('')}
        </ul>
      ` : ''}

      <h2>Full Publication Text</h2>
      ${(book.fullText || []).map((sec, idx) => `
        <h3>Section ${idx + 1}: ${sec.sectionTitle}</h3>
        <p style="text-align: justify; font-family: 'Georgia', serif;">${(sec.content || '').replace(/\n/g, '<br/>')}</p>
      `).join('')}

      <div class="footer">
        <p>© ${book.year} National Centre for Technology Management (NACETEM). All Rights Reserved.</p>
        <p>Document URL: https://nacetem.gov.ng/repository/#${book.id}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordContent], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = book.uploadedFileName || `${book.id}_NACETEM_Paper.doc`;
  link.click();
  URL.revokeObjectURL(url);
}
