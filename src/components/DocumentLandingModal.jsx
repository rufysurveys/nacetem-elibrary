import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Download,
  FileText,
  Quote,
  Bookmark,
  Share2,
  Sparkles,
  Check,
  Calendar,
  Building,
  User,
  ExternalLink,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { generateAcademicCitation } from '../utils/citationFormatter';
import { generateAcademicPaperSummary } from '../utils/aiPaperSummarizer';
import { exportToPdf, exportToWord } from '../utils/documentExporter';

export default function DocumentLandingModal({ book, isOpen, onClose, onOpenReader, onOpenCitation, isFavorite, onToggleFavorite }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !book) return null;

  const citation = generateAcademicCitation(book, 'APA');
  const aiSummary = generateAcademicPaperSummary(book);

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadOriginalFile = async () => {
    await exportToPdf(book);
  };

  const handleDownloadWordFile = async () => {
    await exportToWord(book);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-4xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-5 md:p-6 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold">
              <span className="bg-emerald-600 text-white px-3 py-0.5 rounded-full uppercase tracking-wider">
                {book.category}
              </span>
              <span className="bg-slate-800 text-emerald-400 border border-slate-700 px-2.5 py-0.5 rounded-full">
                {book.type}
              </span>
              <span className="text-slate-400 font-mono">Year {book.year}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-black leading-tight text-white">{book.title}</h1>
            {book.subtitle && <p className="text-xs md:text-sm text-slate-300 font-medium italic">{book.subtitle}</p>}

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300 pt-1">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>{book.institution || 'NACETEM'}</span>
              </span>
              <span>•</span>
              <span className="font-mono text-emerald-400">DOI: {book.doi || '10.5281/nacetem.2026.001'}</span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold">
          <div className="flex items-center space-x-2">
            {/* Open Original Document */}
            <button
              onClick={() => {
                onClose();
                onOpenReader(book);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Original Document</span>
            </button>

            {/* Download Exact Original File */}
            <button
              onClick={handleDownloadOriginalFile}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center space-x-1.5 shadow-xs"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Original File</span>
            </button>

            <button
              onClick={handleDownloadWordFile}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold flex items-center space-x-1.5"
            >
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Word</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenCitation(book)}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center space-x-1"
              title="Cite publication"
            >
              <Quote className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Cite</span>
            </button>

            <button
              onClick={() => onToggleFavorite(book.id)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center space-x-1 ${
                isFavorite ? 'bg-amber-100 border-amber-300 text-amber-900' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
              }`}
              title="Bookmark publication"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current text-amber-600' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleShareLink}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center space-x-1"
              title="Share publication link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 flex space-x-6 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'summary' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Layer B: AI Insights & Summary</span>
          </button>

          <button
            onClick={() => setActiveTab('metadata')}
            className={`py-3 border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'metadata' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Academic Metadata & Citations</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-medium">
          {activeTab === 'summary' && (
            <div className="space-y-5">
              
              {/* Layer B Disclaimer Badge */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-950 font-bold">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Layer B: AI Intelligence (Derived from Untouched Layer A Document)</span>
                </div>
                <span className="text-[10px] bg-white border border-emerald-300 px-2 py-0.5 rounded-full font-mono text-emerald-800">
                  Original Document Untouched
                </span>
              </div>

              {/* 1. What is this research about? */}
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900">1. What is this research about?</h3>
                <p className="text-slate-700 leading-relaxed font-serif text-xs md:text-sm bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {aiSummary.whatIsThisAbout}
                </p>
              </div>

              {/* 2. Research Problem */}
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900">2. Research Problem</h3>
                <p className="text-slate-700 leading-relaxed font-serif text-xs md:text-sm bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {aiSummary.researchProblem}
                </p>
              </div>

              {/* 3. Objectives */}
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900">3. Research Objectives</h3>
                <ul className="space-y-1 text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {aiSummary.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Methodology */}
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900">4. Methodology</h3>
                <p className="text-slate-700 leading-relaxed font-serif text-xs md:text-sm bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {aiSummary.methodology}
                </p>
              </div>

              {/* 5. Key Findings */}
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900">5. Key Findings</h3>
                <ul className="space-y-1 text-slate-700 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                  {aiSummary.keyFindings.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Conclusion & 7. Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm text-slate-900">6. Conclusion</h3>
                  <p className="text-slate-700 leading-relaxed font-serif text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    {aiSummary.conclusion}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm text-slate-900">7. Recommendations</h3>
                  <ul className="space-y-1 text-slate-700 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
                    {aiSummary.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 8. Keywords */}
              <div className="space-y-2 pt-2">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">8. Research Keywords</h3>
                <div className="flex flex-wrap gap-1.5">
                  {aiSummary.keywords.map((kw, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 border border-slate-300 font-semibold px-2.5 py-0.5 rounded-lg text-[11px]">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'metadata' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">Official APA 7th Reference</h3>
                <p className="p-3 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-800 leading-relaxed break-words">
                  {citation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="font-bold text-slate-900">Indexing Authority</span>
                  <p className="text-slate-600">National Centre for Technology Management (NACETEM) STI Repository</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="font-bold text-slate-900">Access Level</span>
                  <span className="inline-block bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {book.accessLevel || 'Open Access'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
