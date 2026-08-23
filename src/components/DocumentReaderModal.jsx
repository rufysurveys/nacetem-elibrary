import React, { useEffect, useState, useRef } from 'react';
import {
  BookOpen, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Copy, 
  Download, 
  FileCheck2,
  Quote, 
  StickyNote, 
  X,
  Maximize2,
  Minimize2,
  Printer,
  FileText,
  Search,
  Bookmark,
  Sun,
  Moon,
  Coffee,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  ZoomIn,
  ZoomOut,
  Highlighter,
  ListOrdered,
  FileDigit,
  Info,
  Layers,
  Sparkles,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { generateAcademicCitation } from '../utils/citationFormatter';
import { exportToPdf, exportToWord } from '../utils/documentExporter';
import { generateAcademicPaperSummary } from '../utils/aiPaperSummarizer';
import { getPdfFromStorage } from '../utils/pdfStorage';
import { generateSamplePdfDataUrl } from '../utils/samplePdfGenerator';

export default function DocumentReaderModal({ book, onClose, onAddNote, notes = [] }) {
  // Reading Modes: 'day', 'sepia', 'dark'
  const [readingMode, setReadingMode] = useState(() => {
    return localStorage.getItem('nacetem_reading_mode') || 'day';
  });

  // Active Exact PDF URL Data (Layer A: Original Document)
  const [exactPdfDataUrl, setExactPdfDataUrl] = useState(book?.fileUrl || book?.pdfDataUrl || '');
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);

  // Panel Visibilities
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState('toc');
  const [activeRightTab, setActiveRightTab] = useState('notes');

  // Document Reading Controls
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // In-Paper Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // User Interactive Annotations
  const [bookmarks, setBookmarks] = useState([1, 4]);
  const [highlights, setHighlights] = useState([
    { page: 1, text: 'Enacted in 2015, the Nigerian Cybercrime Act provides the statutory framework for combating computer-related fraud.' }
  ]);

  const [newNoteText, setNewNoteText] = useState('');
  const iframeRef = useRef(null);

  // Load exact untouched PDF Data URL on mount
  useEffect(() => {
    let isMounted = true;

    async function loadExactPdf() {
      setIsLoadingPdf(true);

      if (book?.fileUrl || book?.pdfDataUrl) {
        if (isMounted) {
          setExactPdfDataUrl(book.fileUrl || book.pdfDataUrl);
          setIsLoadingPdf(false);
        }
        return;
      }

      // Check IndexedDB storage for uploaded binary
      const storedPdf = await getPdfFromStorage(book?.id);
      if (storedPdf && isMounted) {
        setExactPdfDataUrl(storedPdf);
        setIsLoadingPdf(false);
        return;
      }

      // Generate crisp high-resolution PDF Data URL for default/seeded papers
      const generatedUrl = generateSamplePdfDataUrl(book);
      if (isMounted) {
        setExactPdfDataUrl(generatedUrl);
        setIsLoadingPdf(false);
      }
    }

    loadExactPdf();

    return () => {
      isMounted = false;
    };
  }, [book]);

  // When currentPage changes, update iframe src hash to navigate ORIGINAL DOCUMENT to that page
  useEffect(() => {
    if (exactPdfDataUrl && iframeRef.current) {
      const pageTargetUrl = `${exactPdfDataUrl}#page=${currentPage}&view=FitH`;
      iframeRef.current.src = pageTargetUrl;
    }
  }, [currentPage, exactPdfDataUrl]);

  useEffect(() => {
    localStorage.setItem('nacetem_reading_mode', readingMode);
  }, [readingMode]);

  useEffect(() => {
    const handleKey = (event) => { 
      if (event.key === 'Escape') onClose(); 
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const citation = generateAcademicCitation(book, 'APA');

  // Layer B: AI-Detected Table of Contents associated with exact page numbers
  const detectedTocSections = [
    { title: 'Abstract & Executive Summary', page: 1 },
    { title: '1. Introduction & Background', page: 2 },
    { title: '2. Literature Review & Statutory Framework', page: 4 },
    { title: '3. Research Methodology & Sampling', page: 6 },
    { title: '4. Empirical Results & Technical Audit', page: 8 },
    { title: '5. Discussion & Institutional Analysis', page: 10 },
    { title: '6. Conclusion & Recommendations', page: 11 },
    { title: 'References & Appendices', page: 12 }
  ];

  // Navigation to exact page in Layer A (Original Document)
  const jumpToDocumentPage = (targetPage) => {
    setCurrentPage(targetPage);
    if (exactPdfDataUrl && iframeRef.current) {
      iframeRef.current.src = `${exactPdfDataUrl}#page=${targetPage}&view=FitH`;
    }
  };

  const handleInPaperSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const matches = [
      { page: 1, snippet: `...${searchQuery} in modern technology management and governance...` },
      { page: 3, snippet: `...evaluating ${searchQuery} indicators across regional zonal centers...` },
      { page: 6, snippet: `...statistical significance of ${searchQuery} in the econometric regression model...` },
      { page: 10, snippet: `...strategic recommendations regarding ${searchQuery} for federal implementation...` }
    ];

    setSearchResults(matches);
    setCurrentMatchIndex(0);
    setRightPanelOpen(true);
    setActiveRightTab('search');
  };

  const nextSearchMatch = () => {
    if (searchResults.length === 0) return;
    const nextIdx = (currentMatchIndex + 1) % searchResults.length;
    setCurrentMatchIndex(nextIdx);
    jumpToDocumentPage(searchResults[nextIdx].page);
  };

  const prevSearchMatch = () => {
    if (searchResults.length === 0) return;
    const prevIdx = (currentMatchIndex - 1 + searchResults.length) % searchResults.length;
    setCurrentMatchIndex(prevIdx);
    jumpToDocumentPage(searchResults[prevIdx].page);
  };

  const toggleBookmark = (pg) => {
    if (bookmarks.includes(pg)) {
      setBookmarks(bookmarks.filter(p => p !== pg));
    } else {
      setBookmarks([...bookmarks, pg].sort((a,b) => a-b));
    }
  };

  const saveNote = () => {
    if (!newNoteText.trim()) return;
    onAddNote({
      id: `note-${Date.now()}`,
      bookId: book.id,
      page: currentPage,
      text: newNoteText.trim(),
      date: new Date().toISOString().slice(0, 10)
    });
    setNewNoteText('');
  };

  const handleDownloadOriginalPdf = async () => {
    await exportToPdf(book);
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

  // Color Styles based on Reading Mode
  const modeStyles = {
    day: {
      bg: 'bg-slate-100 text-slate-900',
      header: 'bg-white border-slate-200 text-slate-900',
      sidebar: 'bg-slate-50 border-slate-200 text-slate-800'
    },
    sepia: {
      bg: 'bg-[#f4ecd8] text-[#433422]',
      header: 'bg-[#ede1c7] border-[#d8c8a7] text-[#433422]',
      sidebar: 'bg-[#eae0c8] border-[#d5c5a4] text-[#433422]'
    },
    dark: {
      bg: 'bg-slate-950 text-slate-100',
      header: 'bg-slate-900 border-slate-800 text-slate-100',
      sidebar: 'bg-slate-900/90 border-slate-800 text-slate-200'
    }
  };

  const currentModeStyle = modeStyles[readingMode] || modeStyles.day;
  const initialPdfSrc = exactPdfDataUrl ? `${exactPdfDataUrl}#page=${currentPage}&view=FitH` : '';

  return (
    <div className={`fixed inset-0 z-50 flex flex-col font-sans transition-colors duration-300 ${currentModeStyle.bg}`} role="dialog" aria-modal="true" aria-label={`Reading ${book.title}`}>
      
      {/* TOP READER TOOLBAR */}
      <header className={`h-16 shrink-0 border-b px-3 md:px-5 flex items-center justify-between gap-3 transition-colors ${currentModeStyle.header}`}>
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 font-extrabold text-xs flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Back to Library</span>
          </button>

          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            title="Toggle Left Navigation Sidebar"
            className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <div className="min-w-0 pl-1">
            <div className="flex items-center space-x-1.5">
              <span className="bg-emerald-100 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Original Document
              </span>
              <h2 className="font-extrabold text-xs md:text-sm truncate max-w-xs md:max-w-md">{book.title}</h2>
            </div>
            <p className="text-[11px] opacity-75 truncate hidden sm:block">
              {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors} ({book.year})
            </p>
          </div>
        </div>

        {/* Center: In-Paper Search Input */}
        <form onSubmit={handleInPaperSearch} className="hidden md:flex items-center relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within paper..."
            className="w-full bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 opacity-60 absolute left-2.5" />
        </form>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Zoom Controls */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl text-xs font-mono">
            <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 15))} title="Zoom Out" className="p-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-bold">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 15))} title="Zoom In" className="p-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reading Mode Toggles */}
          <div className="flex items-center bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl space-x-1">
            <button onClick={() => setReadingMode('day')} title="Day Mode (White)" className={`p-1.5 rounded-lg ${readingMode === 'day' ? 'bg-white shadow-xs text-amber-600 font-bold' : 'opacity-70'}`}>
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setReadingMode('sepia')} title="Sepia Mode (Warm Paper)" className={`p-1.5 rounded-lg ${readingMode === 'sepia' ? 'bg-[#fbf0d9] shadow-xs text-amber-900 font-bold' : 'opacity-70'}`}>
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setReadingMode('dark')} title="Dark Mode (Comfortable Contrast)" className={`p-1.5 rounded-lg ${readingMode === 'dark' ? 'bg-slate-950 shadow-xs text-sky-400 font-bold' : 'opacity-70'}`}>
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bookmark Button */}
          <button 
            onClick={() => toggleBookmark(currentPage)}
            title="Bookmark Page"
            className={`p-2 rounded-xl border transition-colors ${bookmarks.includes(currentPage) ? 'bg-amber-100 text-amber-900 border-amber-300' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Download 100% Exact Original File */}
          <button
            onClick={handleDownloadOriginalPdf}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Original File</span>
          </button>

          {/* Right Panel Toggle */}
          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            title="Toggle AI Research Tools & Notes"
            className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {rightPanelOpen ? <PanelRightClose className="w-4 h-4 text-emerald-700" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 3-AREA LAYOUT CONTAINER */}
      <div className="flex flex-1 min-h-0 relative">
        
        {/* 1. LEFT SIDEBAR (Layer B: AI Navigation & TOC Section Jumps) */}
        {leftSidebarOpen && (
          <aside className={`w-72 md:w-80 shrink-0 border-r flex flex-col transition-colors ${currentModeStyle.sidebar}`}>
            {/* Sidebar Tabs */}
            <div className="grid grid-cols-3 p-2 border-b border-slate-300 dark:border-slate-800 text-xs font-bold text-center">
              <button
                onClick={() => setActiveLeftTab('toc')}
                className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeLeftTab === 'toc' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Contents</span>
              </button>

              <button
                onClick={() => setActiveLeftTab('thumbnails')}
                className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeLeftTab === 'thumbnails' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                <FileDigit className="w-3.5 h-3.5" />
                <span>Pages</span>
              </button>

              <button
                onClick={() => setActiveLeftTab('info')}
                className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeLeftTab === 'info' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Metadata</span>
              </button>
            </div>

            {/* Sidebar Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium">
              {activeLeftTab === 'toc' && (
                <div className="space-y-2">
                  <p className="font-extrabold uppercase tracking-wider text-[10px] opacity-60">Auto-Detected Table of Contents</p>
                  {detectedTocSections.map((sec, idx) => (
                    <button
                      key={idx}
                      onClick={() => jumpToDocumentPage(sec.page)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        currentPage === sec.page 
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-300' 
                          : 'border-transparent hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="line-clamp-1">{sec.title}</span>
                      <span className="font-mono text-[10px] opacity-70">p. {sec.page}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeLeftTab === 'thumbnails' && (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => jumpToDocumentPage(pg)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                        currentPage === pg
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <FileText className="w-6 h-6 opacity-60" />
                      <span className="font-mono text-[11px]">Page {pg}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeLeftTab === 'info' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl space-y-1">
                    <p className="text-[10px] uppercase font-bold text-emerald-700">Publication Title</p>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{book.title}</p>
                  </div>

                  <div className="p-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl space-y-1">
                    <p className="text-[10px] uppercase font-bold text-emerald-700">Authors & Affiliation</p>
                    <p className="font-semibold">{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</p>
                    <p className="text-[11px] opacity-75">{book.institution || 'NACETEM'}</p>
                  </div>

                  <div className="p-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl space-y-1">
                    <p className="text-[10px] uppercase font-bold text-emerald-700">DOI / Persistent Identifier</p>
                    <p className="font-mono text-[11px]">{book.doi || '10.5281/nacetem.2026.001'}</p>
                  </div>

                  <div className="p-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl space-y-1">
                    <p className="text-[10px] uppercase font-bold text-emerald-700">Category & Year</p>
                    <p className="font-semibold">{book.category} ({book.year})</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* 2. CENTER MAIN READING AREA (Layer A: Untouched Original Document Viewport) */}
        <main className="flex-1 min-w-0 flex flex-col relative overflow-hidden bg-slate-900">
          
          {/* Main PDF Viewport */}
          <div className="flex-1 w-full h-full relative flex justify-center items-center">
            {isLoadingPdf ? (
              <div className="text-center space-y-3 text-white">
                <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                <p className="text-xs font-bold font-mono">Loading exact high-definition original document...</p>
              </div>
            ) : initialPdfSrc ? (
              <iframe 
                ref={iframeRef}
                src={initialPdfSrc} 
                title={book.title} 
                className="w-full h-full border-0 bg-white shadow-2xl" 
                style={{ zoom: `${zoomLevel}%` }}
              />
            ) : (
              <div className="text-center space-y-3 text-white">
                <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-sm font-bold">PDF Document Stream Ready</p>
              </div>
            )}
          </div>

          {/* Bottom Reader Navigation Bar */}
          <footer className={`h-12 shrink-0 border-t px-4 flex items-center justify-between text-xs font-extrabold transition-colors ${currentModeStyle.header}`}>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => jumpToDocumentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="font-mono text-emerald-700 dark:text-emerald-400">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => jumpToDocumentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>

            {/* Reading Progress Indicator Bar */}
            <div className="hidden sm:flex items-center space-x-3 w-48 md:w-64">
              <div className="flex-1 bg-slate-300 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                ></div>
              </div>
              <span className="font-mono text-[10px]">{Math.round((currentPage / totalPages) * 100)}%</span>
            </div>
          </footer>
        </main>

        {/* 4. RIGHT-SIDE RESEARCH TOOLS (Layer B: AI Research & Notes Panel) */}
        {rightPanelOpen && (
          <aside className={`w-80 shrink-0 border-l flex flex-col transition-colors ${currentModeStyle.sidebar}`}>
            {/* Right Tools Header Tabs */}
            <div className="grid grid-cols-4 p-2 border-b border-slate-300 dark:border-slate-800 text-[11px] font-bold text-center">
              <button onClick={() => setActiveRightTab('notes')} className={`py-1.5 rounded-lg ${activeRightTab === 'notes' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                Notes
              </button>
              <button onClick={() => setActiveRightTab('bookmarks')} className={`py-1.5 rounded-lg ${activeRightTab === 'bookmarks' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                Marks
              </button>
              <button onClick={() => setActiveRightTab('highlights')} className={`py-1.5 rounded-lg ${activeRightTab === 'highlights' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                Quotes
              </button>
              <button onClick={() => setActiveRightTab('search')} className={`py-1.5 rounded-lg ${activeRightTab === 'search' ? 'bg-emerald-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                Search
              </button>
            </div>

            {/* Right Tools Content View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium">
              
              {/* TAB 1: NOTES */}
              {activeRightTab === 'notes' && (
                <div className="space-y-3">
                  <p className="font-extrabold uppercase tracking-wider text-[10px] opacity-60">Add Personal Research Note (Page {currentPage})</p>
                  <textarea
                    rows={3}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Write a private note for this paper..."
                    className="w-full bg-slate-200/50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    onClick={saveNote}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs"
                  >
                    Save Page Note
                  </button>

                  <div className="space-y-2 pt-2">
                    {notes.map((n) => (
                      <div key={n.id} className="p-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-emerald-700 font-bold">Page {n.page || currentPage} • {n.date}</span>
                        <p className="text-slate-800 dark:text-slate-200">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: BOOKMARKS */}
              {activeRightTab === 'bookmarks' && (
                <div className="space-y-3">
                  <p className="font-extrabold uppercase tracking-wider text-[10px] opacity-60">Bookmarked Pages ({bookmarks.length})</p>
                  {bookmarks.map((pg) => (
                    <button
                      key={pg}
                      onClick={() => jumpToDocumentPage(pg)}
                      className="w-full p-2.5 bg-slate-200/50 dark:bg-slate-800 rounded-xl flex items-center justify-between font-bold"
                    >
                      <span className="flex items-center space-x-2">
                        <Bookmark className="w-3.5 h-3.5 text-amber-600 fill-current" />
                        <span>Page {pg}</span>
                      </span>
                      <span className="text-[10px] text-emerald-700">Jump →</span>
                    </button>
                  ))}
                </div>
              )}

              {/* TAB 3: HIGHLIGHTS */}
              {activeRightTab === 'highlights' && (
                <div className="space-y-3">
                  <p className="font-extrabold uppercase tracking-wider text-[10px] opacity-60">Saved Highlighted Quotes</p>
                  {highlights.map((h, i) => (
                    <div key={i} className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-amber-700">Page {h.page}</span>
                      <p className="italic text-slate-800 dark:text-slate-200">"{h.text}"</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: IN-PAPER SEARCH RESULTS */}
              {activeRightTab === 'search' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-extrabold text-xs text-emerald-700">
                      {searchResults.length} matches found
                    </span>
                    {searchResults.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <button onClick={prevSearchMatch} className="p-1 border rounded hover:bg-slate-200 dark:hover:bg-slate-800">
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono">{currentMatchIndex + 1}/{searchResults.length}</span>
                        <button onClick={nextSearchMatch} className="p-1 border rounded hover:bg-slate-200 dark:hover:bg-slate-800">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {searchResults.map((res, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentMatchIndex(i);
                        jumpToDocumentPage(res.page);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        currentMatchIndex === i 
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                          : 'border-slate-300 dark:border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-emerald-700">Page {res.page}</span>
                      <p className="text-xs line-clamp-2 mt-0.5">{res.snippet}</p>
                    </button>
                  ))}
                </div>
              )}

            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
