import React, { useEffect, useState } from 'react';
import {
  BookOpen, 
  Check, 
  ChevronLeft, 
  Copy, 
  Download, 
  ExternalLink, 
  FileCheck2,
  Quote, 
  StickyNote, 
  X,
  Maximize2,
  Minimize2,
  Printer,
  FileText
} from 'lucide-react';
import { generateAcademicCitation } from '../utils/citationFormatter';
import { exportToPdf, exportToWord } from '../utils/documentExporter';

export default function DocumentReaderModal({ book, onClose, onAddNote, notes = [] }) {
  const [showCitation, setShowCitation] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fileUrl = book.fileUrl || book.pdfDataUrl || '';
  const pdfUrl = fileUrl ? `${fileUrl}#view=FitH` : '';
  const citation = generateAcademicCitation(book, 'APA');

  useEffect(() => {
    const handleKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const copyCitation = async () => {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const saveNote = () => {
    if (!note.trim()) return;
    onAddNote({ id: `note-${Date.now()}`, bookId: book.id, page: null, text: note.trim(), date: new Date().toISOString().slice(0, 10) });
    setNote('');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 font-sans animate-in fade-in" role="dialog" aria-modal="true" aria-label={`Reading ${book.title}`}>
      {/* Reader Top Toolbar */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-3 md:px-5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={onClose} 
            title="Close reader" 
            className="p-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-800" />
          </button>
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-slate-950 truncate max-w-md">{book.title}</h2>
            <p className="text-xs text-slate-500 truncate">
              {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors} · {book.year} · {book.category}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {fileUrl && (
            <span className="hidden lg:flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg">
              <FileCheck2 className="w-4 h-4 text-emerald-700" /> Original File Preserved
            </span>
          )}

          {/* Citation Button */}
          <button 
            onClick={() => { setShowCitation(!showCitation); setShowNotes(false); }} 
            title="Cite paper" 
            className={`p-2 rounded-xl border transition-all ${showCitation ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
          >
            <Quote className="w-4 h-4" />
          </button>

          {/* Notes Button */}
          <button 
            onClick={() => { setShowNotes(!showNotes); setShowCitation(false); }} 
            title="Reading notes" 
            className={`p-2 rounded-xl border transition-all ${showNotes ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
          >
            <StickyNote className="w-4 h-4" />
          </button>

          {/* Download Original PDF Button */}
          <button 
            onClick={() => exportToPdf(book)} 
            title="Download Original PDF" 
            className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          {/* Download Word Document Button */}
          <button 
            onClick={() => exportToWord(book)} 
            title="Download Word Document" 
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span className="hidden sm:inline">Download Word</span>
          </button>

          {/* Print Button */}
          <button 
            onClick={() => window.print()} 
            title="Print document" 
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hidden md:block"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen} 
            title="Toggle fullscreen" 
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hidden md:block"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button 
            onClick={onClose} 
            title="Close reader" 
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 min-w-0 bg-slate-900 flex flex-col relative">
          {pdfUrl ? (
            <div className="w-full h-full relative bg-slate-900">
              <iframe 
                src={pdfUrl} 
                title={book.title} 
                className="w-full h-full border-0 bg-white shadow-2xl" 
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-4 md:p-10">
              <article className="max-w-4xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-2xl rounded-2xl space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <span className="text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full uppercase">
                    {book.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{book.title}</h1>
                  {book.subtitle && <p className="text-sm font-semibold text-slate-600 italic">{book.subtitle}</p>}
                  
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                    <span>Authors: {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</span>
                    <span>•</span>
                    <span>Published: {book.year}</span>
                    <span>•</span>
                    <span>DOI: {book.doi || '10.5281/nacetem.2026.001'}</span>
                  </div>
                </div>

                {/* Abstract Section */}
                <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">Executive Abstract</h2>
                  <p className="text-sm text-slate-800 leading-relaxed font-serif">{book.abstract}</p>
                </div>

                {/* Key Takeaways */}
                {book.keyTakeaways && book.keyTakeaways.length > 0 && (
                  <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">Key Takeaways & Recommendations</h2>
                    <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                      {book.keyTakeaways.map((pt, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Publication Sections */}
                <div className="space-y-6 pt-4">
                  {(book.fullText || [{ sectionTitle: 'Full Text', content: book.abstract }]).map((section, index) => (
                    <section key={index} className="space-y-3">
                      <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">
                        {section.sectionTitle}
                      </h2>
                      <p className="whitespace-pre-line leading-relaxed text-sm text-slate-800 font-serif">
                        {section.content}
                      </p>
                    </section>
                  ))}
                </div>
              </article>
            </div>
          )}
        </main>

        {/* Sidebar: Citation & Notes */}
        {(showCitation || showNotes) && (
          <aside className="w-80 shrink-0 bg-white text-slate-900 border-l border-slate-200 overflow-y-auto p-5 shadow-xl animate-in slide-in-from-right">
            {showCitation && (
              <section className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-extrabold text-sm text-slate-900">Academic Citation (APA 7th)</h3>
                  <button onClick={() => setShowCitation(false)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed break-words">
                  {citation}
                </div>

                <button 
                  onClick={copyCitation} 
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex justify-center items-center gap-2 shadow-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Citation Copied!' : 'Copy Formatted Citation'}</span>
                </button>
              </section>
            )}

            {showNotes && (
              <section className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-extrabold text-sm text-slate-900">Private Reading Notes</h3>
                  <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <textarea 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)} 
                  rows={4} 
                  className="w-full border border-slate-300 p-3 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600" 
                  placeholder="Write a private research note..." 
                />

                <button 
                  onClick={saveNote} 
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Save Note
                </button>

                <div className="space-y-2 pt-2">
                  {notes.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                      <span className="text-[10px] text-emerald-800 font-mono font-bold">{item.date}</span>
                      <p className="text-slate-800 font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
