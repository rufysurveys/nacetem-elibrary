import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Download, 
  Quote, 
  Search, 
  Filter, 
  Trash2, 
  Calendar, 
  Layers, 
  BarChart3, 
  Bookmark, 
  ShieldCheck, 
  User, 
  Building,
  GraduationCap
} from 'lucide-react';
import PortfolioVisualizations from './PortfolioVisualizations';
import ResearchPortfolioSummarizer from './ResearchPortfolioSummarizer';
import { synthesizeUserResearchPortfolio } from '../utils/aiResearchSynthesizer';
import { exportToPdf, exportToWord } from '../utils/documentExporter';

export default function MyResearchDashboard({
  currentUser,
  allBooks = [],
  onOpenReader,
  onOpenLanding,
  onOpenUpload,
  onDeleteBook
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isSummarizerOpen, setIsSummarizerOpen] = useState(false);

  // Filter papers owned by or associated with the current user
  const userPapers = allBooks.filter(book => {
    if (!currentUser || !currentUser.isAuthenticated) return false;
    const currentName = (currentUser.name || '').toLowerCase();
    const currentEmail = (currentUser.email || '').toLowerCase();

    const isUploader = book.uploadedBy && book.uploadedBy.toLowerCase() === currentName;
    const isUserUploadedFlag = book.isUserUploaded && (book.uploadedBy === currentUser.name || currentName.includes('rufai'));
    
    const isAuthor = Array.isArray(book.authors) 
      ? book.authors.some(a => a.toLowerCase().includes(currentName) || a.toLowerCase().includes('rufai'))
      : (book.authors || '').toLowerCase().includes('rufai');

    return isUploader || isUserUploadedFlag || isAuthor;
  });

  const portfolioSummary = synthesizeUserResearchPortfolio(userPapers, currentUser);

  // Apply filters
  const filteredPapers = userPapers.filter(paper => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear = selectedYear === 'all' || paper.year?.toString() === selectedYear;
    const matchesType = selectedType === 'all' || paper.type?.toLowerCase().includes(selectedType.toLowerCase());

    return matchesSearch && matchesYear && matchesType;
  });

  const yearsList = Array.from(new Set(userPapers.map(p => p.year || 2026))).sort((a, b) => b - a);

  return (
    <div className="container mx-auto px-4 max-w-7xl py-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Authenticated Researcher Space
            </span>
            <span className="text-emerald-300 text-xs font-semibold">User ID: {currentUser?.name || 'Abubakar Rufai'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            My Research Repository & Knowledge Base
          </h1>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Your personal academic portfolio collecting published journal papers, conference proceedings, lecture series, and technical reports. Indexed for cross-paper AI synthesis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* ✨ SUMMARIZE MY RESEARCH Button */}
          <button
            onClick={() => setIsSummarizerOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
            <span>✨ SUMMARIZE MY RESEARCH</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-md"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Deposit New Paper</span>
          </button>
        </div>
      </div>

      {/* TOP RESEARCH OUTPUT METRICS COUNTER */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-slate-900">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Papers</p>
          <p className="text-2xl font-black text-emerald-800 font-mono">{portfolioSummary.totalPapers || 0}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Journal Papers</p>
          <p className="text-2xl font-black text-emerald-800 font-mono">{portfolioSummary.typeCounts?.journal || 0}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Conferences</p>
          <p className="text-2xl font-black text-purple-800 font-mono">{portfolioSummary.typeCounts?.conference || 0}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Courseware/Lecture</p>
          <p className="text-2xl font-black text-amber-800 font-mono">{portfolioSummary.typeCounts?.courseware || 0}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Policy Reports</p>
          <p className="text-2xl font-black text-sky-800 font-mono">{portfolioSummary.typeCounts?.report || 0}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Years Spanned</p>
          <p className="text-sm font-black text-slate-800 font-mono pt-1">{portfolioSummary.yearSpan || '2026'}</p>
        </div>
      </div>

      {/* PORTFOLIO VISUALIZATIONS */}
      {userPapers.length > 0 && (
        <PortfolioVisualizations portfolioSummary={portfolioSummary} />
      )}

      {/* SEARCH & MULTI-FACET FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers within your research portfolio..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-bold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filter By:</span>
          </span>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none"
          >
            <option value="all">All Years</option>
            {yearsList.map(y => (
              <option key={y} value={y.toString()}>{y}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none"
          >
            <option value="all">All Formats</option>
            <option value="journal">Journal Papers</option>
            <option value="conference">Conference Papers</option>
            <option value="courseware">Courseware & Lecture</option>
            <option value="report">Policy Reports</option>
          </select>
        </div>
      </div>

      {/* USER PAPERS GRID */}
      <div className="space-y-4">
        <h2 className="font-black text-lg text-slate-900 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>Your Research Publications ({filteredPapers.length})</span>
        </h2>

        {filteredPapers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200 max-w-xl mx-auto shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No matching research papers in your portfolio.</h3>
            <p className="text-xs text-slate-500 font-medium">Click "Deposit New Paper" above to upload your journal articles, theses, or lecture modules.</p>
            <button
              onClick={onOpenUpload}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs"
            >
              Deposit Research Paper
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPapers.map((paper) => (
              <div 
                key={paper.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold text-[10px] px-3 py-0.5 rounded-full uppercase">
                      {paper.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {paper.year}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onOpenLanding(paper)}
                    className="font-extrabold text-base text-slate-900 hover:text-emerald-800 cursor-pointer line-clamp-2 leading-snug"
                  >
                    {paper.title}
                  </h3>

                  {paper.subtitle && (
                    <p className="text-xs text-slate-500 italic font-medium line-clamp-1">{paper.subtitle}</p>
                  )}

                  <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
                    {paper.abstract}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-extrabold">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenLanding(paper)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      View Details & AI Summary
                    </button>

                    <button
                      onClick={() => onOpenReader(paper)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => exportToPdf(paper)}
                      title="Download PDF"
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
                    >
                      <Download className="w-4 h-4 text-emerald-700" />
                    </button>

                    <button
                      onClick={() => onDeleteBook(paper.id)}
                      title="Delete publication"
                      className="p-2 rounded-xl border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✨ SUMMARIZE MY RESEARCH MODAL */}
      <ResearchPortfolioSummarizer
        portfolioSummary={portfolioSummary}
        isOpen={isSummarizerOpen}
        onClose={() => setIsSummarizerOpen(false)}
      />

    </div>
  );
}
