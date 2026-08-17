import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Play, 
  Pause, 
  Type, 
  Quote, 
  Check, 
  Sparkles, 
  Download, 
  StickyNote,
  Plus,
  Scroll,
  Layers,
  Printer,
  Share2,
  Copy,
  FileText,
  FileType
} from 'lucide-react';
import { exportToPdf, exportToWord } from '../utils/documentExporter';
import { generateAcademicCitation } from '../utils/citationFormatter';

export default function DocumentReaderModal({ book, onClose, onAddNote, notes = [] }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [readingTheme, setReadingTheme] = useState('light'); // light, sepia, dark
  const [fontSize, setFontSize] = useState(16); // font size in px
  const [viewMode, setViewMode] = useState('paged'); // 'paged' or 'continuous'
  const [showCitations, setShowCitations] = useState(false);
  const [selectedCitationFormat, setSelectedCitationFormat] = useState('APA');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Notes state
  const [newNoteText, setNewNoteText] = useState('');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);

  const fullTextPages = book?.fullText || [
    {
      sectionTitle: 'Executive Abstract & Complete Paper Overview',
      content: book?.abstract || 'No full text section provided.'
    }
  ];

  const currentPage = fullTextPages[currentPageIndex] || fullTextPages[0];

  // Speech Synthesis Controller
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${currentPage.sectionTitle}. ${currentPage.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = speechRate;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleSpeechRateChange = (rate) => {
    setSpeechRate(rate);
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  // Download Actions
  const handleDownloadPdf = () => {
    exportToPdf(book);
    setShowDownloadDropdown(false);
  };

  const handleDownloadWord = () => {
    exportToWord(book);
    setShowDownloadDropdown(false);
  };

  const handleDownloadTxt = () => {
    let fullDocText = `====================================================\n`;
    fullDocText += `${book.title.toUpperCase()}\n`;
    fullDocText += `${book.subtitle ? book.subtitle + '\n' : ''}`;
    fullDocText += `Authors: ${Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}\n`;
    fullDocText += `Institution: ${book.institution}\n`;
    fullDocText += `DOI: ${book.doi || book.isbn}\n`;
    fullDocText += `Year: ${book.year} | Category: ${book.category}\n`;
    fullDocText += `====================================================\n\n`;
    fullDocText += `ABSTRACT:\n${book.abstract}\n\n`;
    fullDocText += `----------------------------------------------------\n`;
    fullDocText += `FULL PUBLICATION CONTENT\n`;
    fullDocText += `----------------------------------------------------\n\n`;

    fullTextPages.forEach((sec, idx) => {
      fullDocText += `SECTION ${idx + 1}: ${sec.sectionTitle.toUpperCase()}\n\n`;
      fullDocText += `${sec.content}\n\n`;
      fullDocText += `----------------------------------------------------\n\n`;
    });

    const blob = new Blob([fullDocText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.id}_NACETEM_Full_Document.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setShowDownloadDropdown(false);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  // Intelligent Citation Formatter
  const formattedCitationText = generateAcademicCitation(book, selectedCitationFormat);

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(formattedCitationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/#book-${book.id}`;
    const cleanAuthorStr = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
    navigator.clipboard.writeText(`Check out this publication on NACETEM E-Library: "${book.title}" by ${cleanAuthorStr} - ${shareUrl}`);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  const handleSaveNote = () => {
    if (!newNoteText.trim()) return;
    onAddNote({
      id: 'note-' + Date.now(),
      bookId: book.id,
      page: currentPageIndex + 1,
      text: newNoteText,
      date: new Date().toISOString().split('T')[0]
    });
    setNewNoteText('');
  };

  const getThemeClasses = () => {
    switch (readingTheme) {
      case 'sepia':
        return 'bg-[#fbf0d9] text-[#433422] border-[#e2d5ba] shadow-xl';
      case 'dark':
        return 'bg-slate-900 text-slate-100 border-slate-800 shadow-xl';
      default:
        return 'bg-white text-slate-900 border-slate-200 shadow-xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in">
      {/* Top Control Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between text-slate-900 shadow-xs print:hidden">
        <div className="flex items-center space-x-3 max-w-xl">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-sm md:text-base text-slate-900 line-clamp-1">{book.title}</h2>
            <p className="text-xs text-slate-500 font-semibold line-clamp-1">
              By {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors} • {book.institution} ({book.year})
            </p>
          </div>
        </div>

        {/* Reader Customizer Tools */}
        <div className="flex items-center space-x-2 md:space-x-4 text-xs">
          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100 border border-slate-300 rounded-xl p-1 font-bold">
            <button
              onClick={() => setViewMode('paged')}
              className={`px-2.5 py-1 rounded-lg text-[11px] flex items-center space-x-1 transition-colors ${
                viewMode === 'paged' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Section View</span>
            </button>
            <button
              onClick={() => setViewMode('continuous')}
              className={`px-2.5 py-1 rounded-lg text-[11px] flex items-center space-x-1 transition-colors ${
                viewMode === 'continuous' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scroll className="w-3 h-3" />
              <span>Read Full Paper</span>
            </button>
          </div>

          {/* Download Dropdown (PDF & Word & TXT) */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold flex items-center space-x-1 shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Paper</span>
            </button>

            {showDownloadDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Format:
                </div>
                <button
                  onClick={handleDownloadPdf}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 flex items-center space-x-2"
                >
                  <FileType className="w-4 h-4 text-red-600" />
                  <span>PDF Document (.pdf)</span>
                </button>
                <button
                  onClick={handleDownloadWord}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Microsoft Word (.doc / .docx)</span>
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center space-x-2 border-t border-slate-100 mt-1 pt-2"
                >
                  <FileType className="w-4 h-4 text-slate-500" />
                  <span>Plain Text (.txt)</span>
                </button>
              </div>
            )}
          </div>

          {/* Print */}
          <button
            onClick={handlePrintDocument}
            className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 transition-all font-bold flex items-center space-x-1"
          >
            <Printer className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 hover:bg-sky-100 transition-all font-bold flex items-center space-x-1"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-700" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Audio TTS */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-100 border border-slate-300 rounded-xl px-2 py-1">
            <button
              onClick={handleToggleSpeech}
              className={`p-1.5 rounded-lg flex items-center space-x-1 font-bold transition-all ${
                isPlayingAudio 
                  ? 'bg-emerald-700 text-white animate-pulse' 
                  : 'text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-[11px]">{isPlayingAudio ? 'Pause Voice' : 'Listen TTS'}</span>
            </button>

            <select
              value={speechRate}
              onChange={(e) => handleSpeechRateChange(parseFloat(e.target.value))}
              className="bg-white text-slate-800 border border-slate-300 rounded px-1 py-0.5 text-[10px] font-semibold"
            >
              <option value="0.8">0.8x</option>
              <option value="1.0">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>

          {/* Theme */}
          <div className="flex items-center space-x-1 bg-slate-100 border border-slate-300 rounded-xl p-1 font-bold">
            <button
              onClick={() => setReadingTheme('light')}
              className={`px-2 py-1 rounded-lg text-[11px] transition-colors ${
                readingTheme === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              White
            </button>
            <button
              onClick={() => setReadingTheme('sepia')}
              className={`px-2 py-1 rounded-lg text-[11px] transition-colors ${
                readingTheme === 'sepia' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Warm
            </button>
            <button
              onClick={() => setReadingTheme('dark')}
              className={`px-2 py-1 rounded-lg text-[11px] transition-colors ${
                readingTheme === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dark
            </button>
          </div>

          {/* Font Resizer */}
          <div className="hidden xl:flex items-center space-x-1 bg-slate-100 border border-slate-300 rounded-xl px-2 py-1 text-slate-800 font-bold">
            <Type className="w-3.5 h-3.5 text-emerald-700" />
            <button 
              onClick={() => setFontSize(Math.max(13, fontSize - 1))}
              className="px-1.5 py-0.5 hover:bg-slate-200 rounded font-bold"
            >-</button>
            <span className="font-mono text-[11px]">{fontSize}px</span>
            <button 
              onClick={() => setFontSize(Math.min(22, fontSize + 1))}
              className="px-1.5 py-0.5 hover:bg-slate-200 rounded font-bold"
            >+</button>
          </div>

          {/* Cite Button */}
          <button
            onClick={() => setShowCitations(!showCitations)}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all font-bold flex items-center space-x-1"
          >
            <Quote className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Cite</span>
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 transition-all font-bold flex items-center space-x-1"
          >
            <StickyNote className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex overflow-hidden relative bg-slate-100">
        {/* Section Navigation Sidebar */}
        <div className="hidden md:block w-72 bg-white border-r border-slate-200 p-4 overflow-y-auto text-xs space-y-2 print:hidden">
          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-2">
            Table of Contents ({fullTextPages.length} Sections)
          </div>
          {fullTextPages.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentPageIndex(idx);
                setViewMode('paged');
              }}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                currentPageIndex === idx && viewMode === 'paged'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-xs'
                  : 'border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-mono mb-1">Section {idx + 1}</div>
              <div className="line-clamp-2 leading-snug">{sec.sectionTitle}</div>
            </button>
          ))}
        </div>

        {/* Reader Document View Window */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center items-start">
          <div 
            className={`w-full max-w-3xl rounded-3xl p-6 md:p-12 border transition-colors ${getThemeClasses()}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {viewMode === 'paged' ? (
              /* Single Section Paged Reading Mode */
              <>
                <div className="border-b pb-6 mb-8 border-current/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-70">
                      Section {currentPageIndex + 1} of {fullTextPages.length}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold mt-1 leading-tight">
                      {currentPage.sectionTitle}
                    </h1>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-current/30 opacity-80 font-mono">
                    {book.id}
                  </span>
                </div>

                <div className="prose max-w-none leading-relaxed space-y-6 whitespace-pre-line font-serif">
                  {currentPage.content}
                </div>
              </>
            ) : (
              /* Continuous Full Document Mode */
              <div className="space-y-12">
                <div className="border-b pb-6 mb-8 border-current/20 text-center space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-70">
                    COMPLETE PUBLICATION TEXT ({fullTextPages.length} SECTIONS)
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                    {book.title}
                  </h1>
                  {book.subtitle && <p className="text-sm opacity-80 italic">{book.subtitle}</p>}
                  <p className="text-xs font-semibold pt-2">
                    By {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors} • {book.institution} ({book.year})
                  </p>
                </div>

                {fullTextPages.map((sec, idx) => (
                  <div key={idx} className="space-y-4 border-b border-current/15 pb-8">
                    <div className="text-xs font-mono font-bold opacity-60 uppercase">Section {idx + 1}</div>
                    <h2 className="text-xl md:text-2xl font-bold">{sec.sectionTitle}</h2>
                    <div className="prose max-w-none leading-relaxed space-y-4 whitespace-pre-line font-serif">
                      {sec.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 pt-6 border-t border-current/20 flex items-center justify-between text-xs opacity-60 font-sans">
              <span>National Centre for Technology Management (NACETEM)</span>
              <span>Full Access Mode</span>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Share2 className="w-4 h-4 text-sky-600" />
                  <span>Share Publication</span>
                </div>
                <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-slate-700 font-bold">{book.title}</p>
                <p className="text-slate-500">DOI: {book.doi || book.isbn}</p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 break-all">
                  {window.location.origin}/#book-{book.id}
                </div>
              </div>

              <button
                onClick={handleCopyShareLink}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                {copiedShareLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Share Citation Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Citation Drawer */}
        {showCitations && (
          <div className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-white border-l border-slate-200 p-5 z-20 overflow-y-auto shadow-2xl animate-in slide-in-from-right print:hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2 text-amber-700 font-bold">
                <Quote className="w-5 h-5" />
                <span>Academic Citation</span>
              </div>
              <button onClick={() => setShowCitations(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                {['APA', 'Harvard', 'IEEE', 'MLA', 'Chicago', 'BibTeX'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedCitationFormat(fmt)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedCitationFormat === fmt
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 leading-relaxed break-words font-semibold text-xs">
                {formattedCitationText}
              </div>

              <button
                onClick={handleCopyCitation}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Quote className="w-4 h-4" />
                    <span>Copy {selectedCitationFormat} Reference</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Notes Drawer */}
        {showNotesDrawer && (
          <div className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-white border-l border-slate-200 p-5 z-20 overflow-y-auto shadow-2xl animate-in slide-in-from-right print:hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                <StickyNote className="w-5 h-5 text-emerald-700" />
                <span>My Annotations & Notes</span>
              </div>
              <button onClick={() => setShowNotesDrawer(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="text-slate-700 font-bold">Add note for Section {currentPageIndex + 1}:</label>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type your insights, references, or key citations..."
                  className="w-full h-24 bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
                ></textarea>
                <button
                  onClick={handleSaveNote}
                  className="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Note to Shelf</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Saved Notes ({notes.length})</span>
                {notes.length === 0 ? (
                  <p className="text-slate-400 italic">No notes saved for this document yet.</p>
                ) : (
                  notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[10px] text-emerald-700 font-mono font-bold">
                        <span>Section {n.page}</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-slate-800">{n.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Page Navigation Controls */}
      <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between print:hidden">
        <button
          disabled={currentPageIndex === 0 || viewMode === 'continuous'}
          onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Section</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-600 font-mono font-semibold">
          <span>Viewing</span>
          <span className="font-bold text-emerald-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
            {viewMode === 'continuous' ? 'Complete Paper (Continuous)' : `Section ${currentPageIndex + 1} of ${fullTextPages.length}`}
          </span>
        </div>

        <button
          disabled={currentPageIndex === fullTextPages.length - 1 || viewMode === 'continuous'}
          onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1 disabled:opacity-40 disabled:pointer-events-none shadow-xs"
        >
          <span>Next Section</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
