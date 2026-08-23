import React, { useState, useEffect } from 'react';
import { 
  X, 
  Quote, 
  Check, 
  Copy, 
  Download, 
  BookOpen, 
  Plus, 
  Edit3,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { generateAcademicCitation } from '../utils/citationFormatter';

export default function CitationModal({ isOpen, onClose, allBooks, initialBook }) {
  const [citationSourceMode, setCitationSourceMode] = useState(initialBook ? 'library' : 'custom'); // 'library' or 'custom'
  const [selectedBookId, setSelectedBookId] = useState(initialBook?.id || allBooks[0]?.id || '');
  const [selectedFormat, setSelectedFormat] = useState('APA');
  const [copied, setCopied] = useState(false);
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);

  // Citation Metadata Fields
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');

  const currentBook = allBooks.find(b => b.id === selectedBookId) || initialBook || allBooks[0];

  // Sync state when switching document selection or mode
  useEffect(() => {
    if (citationSourceMode === 'library' && currentBook) {
      setTitle(currentBook.title || '');
      setAuthors(Array.isArray(currentBook.authors) ? currentBook.authors.join(', ') : currentBook.authors || '');
      setPubYear(currentBook.year ? currentBook.year.toString() : '2015');
      setPublisher(currentBook.publisher || currentBook.institution || 'National Centre for Technology Management (NACETEM)');
      setVolume(currentBook.volume || '');
      setIssue(currentBook.issue || '');
      setPages(currentBook.pages || '');
      setDoi(currentBook.doi || '');
    } else if (citationSourceMode === 'custom') {
      setTitle('');
      setAuthors('');
      setPubYear('');
      setPublisher('');
      setVolume('');
      setIssue('');
      setPages('');
      setDoi('');
    }
  }, [selectedBookId, citationSourceMode, isOpen]);

  if (!isOpen) return null;

  const docMeta = {
    title,
    authors,
    year: pubYear,
    publisher,
    volume,
    issue,
    pages,
    doi
  };

  const formattedText = generateAcademicCitation(docMeta, selectedFormat);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportBibTeX = () => {
    const bibContent = generateAcademicCitation(docMeta, 'BibTeX');
    const blob = new Blob([bibContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.slice(0, 20).replace(/[^a-z0-9]/gi, '_')}_citation.bib`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Quote className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Academic Citation Generator</h2>
              <p className="text-xs text-slate-500 font-medium">Intelligent formatting in APA 7th, Harvard, IEEE, MLA 9th, Chicago 17th & BibTeX</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Mode Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setCitationSourceMode('library')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              citationSourceMode === 'library'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Library Papers ({allBooks.length})</span>
          </button>
          <button
            onClick={() => setCitationSourceMode('custom')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              citationSourceMode === 'custom'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Custom Document / Text</span>
          </button>
        </div>

        {/* Select Document if Library mode */}
        {citationSourceMode === 'library' && (
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800">Select Document to Cite:</label>
              <button
                onClick={() => setIsEditingMetadata(!isEditingMetadata)}
                className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingMetadata ? 'Done Editing' : 'Edit Citation Details'}</span>
              </button>
            </div>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
            >
              {allBooks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} — {Array.isArray(b.authors) ? b.authors[0] : b.authors} ({b.year})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Citation Metadata Editor Fields */}
        {(citationSourceMode === 'custom' || isEditingMetadata) && (
          <div className="space-y-3 text-xs font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Citation Metadata Controls</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Publication Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Appraising Institutional Capacity For Implementation Of The Nigerian Cybercrime Act 2015"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Author Full Name(s) * (e.g. Abubakar Rufai)</label>
                <input
                  type="text"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  placeholder="Abubakar Rufai"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Publication Year * (e.g. 2015)</label>
                <input
                  type="text"
                  value={pubYear}
                  onChange={(e) => setPubYear(e.target.value)}
                  placeholder="2015"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Journal / Publisher Name</label>
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="National Centre for Technology Management (NACETEM)"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">DOI / URL (optional)</label>
                <input
                  type="text"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  placeholder="10.5281/nacetem.2015.001"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Volume</label>
                <input
                  type="text"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Vol. 4"
                  className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Issue / No.</label>
                <input
                  type="text"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="No. 2"
                  className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Pages</label>
                <input
                  type="text"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="45-58"
                  className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Citation Format Style Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Select Academic Citation Style:
          </label>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {['APA', 'Harvard', 'IEEE', 'MLA', 'Chicago', 'BibTeX'].map((style) => (
              <button
                key={style}
                onClick={() => setSelectedFormat(style)}
                className={`px-3.5 py-2 rounded-xl transition-all border ${
                  selectedFormat === style
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Formatted Output Display */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-emerald-800 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Formatted Reference ({selectedFormat} Style):</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-xs text-slate-900 leading-relaxed break-words font-semibold">
            {formattedText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 text-xs font-bold">
          {selectedFormat === 'BibTeX' && (
            <button
              onClick={handleExportBibTeX}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 flex items-center justify-center space-x-1.5"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Export .BIB File</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center space-x-2 shadow-xs transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy {selectedFormat} Citation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
