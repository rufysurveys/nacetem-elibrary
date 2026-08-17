import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  QrCode, 
  FileText, 
  Trash2, 
  ExternalLink, 
  Download, 
  Check, 
  User, 
  Sparkles,
  Printer,
  Share2,
  Copy,
  UploadCloud,
  FileCheck,
  Award,
  Layers
} from 'lucide-react';
import { exportToPdf, exportToWord } from '../utils/documentExporter';
import { generateAcademicCitation } from '../utils/citationFormatter';

export default function PersonalDashboard({
  userState,
  allBooks,
  currentRole,
  currentUser,
  onRead,
  onRemoveBorrow,
  onRemoveFavorite,
  onRemoveNote,
  onOpenUpload
}) {
  const [activeSubTab, setActiveSubTab] = useState('my-papers'); // 'my-papers', 'shelf', 'favorites', 'notes'
  const [showQrModal, setShowQrModal] = useState(null);
  const [copiedSharePortfolio, setCopiedSharePortfolio] = useState(false);
  const [showPortfolioReportModal, setShowPortfolioReportModal] = useState(false);

  const userName = currentUser?.name || 'Abubakar Rufai';

  // Filter books authored / uploaded by the logged-in user
  const myPapers = allBooks.filter(book => {
    const authorStr = Array.isArray(book.authors) ? book.authors.join(' ') : book.authors;
    return (
      authorStr.toLowerCase().includes(userName.toLowerCase()) ||
      authorStr.toLowerCase().includes('abubakar rufai') ||
      authorStr.toLowerCase().includes('rufai') ||
      book.id.includes('user-paper') ||
      book.id.includes('nac-2026-rufai')
    );
  });

  const borrowedList = userState.borrowedBooks.map(item => {
    const book = allBooks.find(b => b.id === item.bookId);
    return { ...item, book };
  }).filter(item => item.book);

  const favoritesList = allBooks.filter(b => userState.savedFavorites.includes(b.id));

  // Compute Total Metrics for User Portfolio
  const totalCitations = myPapers.reduce((acc, curr) => acc + (curr.citationsCount || 0), 0);
  const totalDownloads = myPapers.reduce((acc, curr) => acc + (curr.downloadsCount || 0), 0);

  const handleSharePortfolio = () => {
    const text = `Scholar Portfolio: ${userName} (NACETEM)\nTotal Publications: ${myPapers.length} | Citations: ${totalCitations} | Downloads: ${totalDownloads}\nView papers at: ${window.location.origin}/#scholar-${userName.replace(/\s+/g, '-').toLowerCase()}`;
    navigator.clipboard.writeText(text);
    setCopiedSharePortfolio(true);
    setTimeout(() => setCopiedSharePortfolio(false), 2000);
  };

  const handlePrintPortfolioReport = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      {/* Scholar Executive Profile Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-black text-2xl shadow-md border-2 border-white">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl md:text-2xl font-black text-slate-900">{userName}</h1>
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {currentUser?.roleLabel || 'NACETEM Researcher'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">National Centre for Technology Management (NACETEM) • Research & STI Directorate</p>
          </div>
        </div>

        {/* Scholar Portfolio Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPortfolioReportModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Summarized Scholar Report</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs flex items-center space-x-1.5 transition-all"
          >
            <UploadCloud className="w-4 h-4 text-emerald-700" />
            <span>Upload New Paper</span>
          </button>

          <button
            onClick={handleSharePortfolio}
            className="px-3.5 py-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 hover:bg-sky-100 font-bold text-xs flex items-center space-x-1.5 transition-all"
          >
            {copiedSharePortfolio ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4 text-sky-700" />}
            <span>{copiedSharePortfolio ? 'Copied Link!' : 'Share Portfolio'}</span>
          </button>
        </div>
      </div>

      {/* Portfolio Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Deposited Papers</span>
            <FileCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{myPapers.length}</p>
          <p className="text-[11px] text-emerald-700 font-bold">100% Readable & Downloadable</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Citations</span>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalCitations}</p>
          <p className="text-[11px] text-amber-700 font-bold">Indexed across APA/IEEE/Harvard</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Downloads</span>
            <Download className="w-5 h-5 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalDownloads}</p>
          <p className="text-[11px] text-sky-700 font-bold">PDF & Word Formats</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Loans</span>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{borrowedList.length}</p>
          <p className="text-[11px] text-purple-700 font-bold">14-Day E-Copies</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('my-papers')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'my-papers'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>My Uploaded Research ({myPapers.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('shelf')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'shelf'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Borrowed E-Copies ({borrowedList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'favorites'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Saved Favorites ({favoritesList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notes')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'notes'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Notes ({userState.notes.length})</span>
        </button>
      </div>

      {/* Sub-Tab 1: My Deposited Research Papers */}
      {activeSubTab === 'my-papers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-lg text-slate-900">My Authored & Deposited Papers</h2>
            <button
              onClick={() => setShowPortfolioReportModal(true)}
              className="text-xs text-emerald-800 font-bold hover:underline flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Summarize All My Papers</span>
            </button>
          </div>

          {myPapers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-3">
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="font-bold text-sm text-slate-900">You haven't uploaded any research papers yet.</p>
              <button
                onClick={onOpenUpload}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
              >
                Upload Your First Paper
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myPapers.map(paper => (
                <div key={paper.id} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-lg">
                      {paper.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-500">Year: {paper.year}</span>
                  </div>

                  <h3 
                    onClick={() => onRead(paper)}
                    className="font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-2"
                  >
                    {paper.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">{paper.abstract}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 leading-snug">
                    <span className="font-bold text-emerald-800 block text-[10px] uppercase mb-1">Formatted APA Citation:</span>
                    {generateAcademicCitation(paper, 'APA')}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onRead(paper)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read & Print</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => exportToPdf(paper)}
                        className="px-2.5 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 font-bold text-xs flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => exportToWord(paper)}
                        className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Word</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Borrowed Shelf */}
      {activeSubTab === 'shelf' && (
        <div className="space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900">Active Borrowed E-Copies</h2>
          {borrowedList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2 text-slate-500 text-xs">
              <p className="font-bold">No active loans on your shelf.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {borrowedList.map(({ book, qrCode, dueDate }) => (
                <div key={book.id} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{book.title}</h3>
                    <button
                      onClick={() => setShowQrModal(qrCode)}
                      className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-bold flex items-center space-x-1"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Access Pass</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">Loan Due Date: {dueDate}</p>
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => onRead(book)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                    >
                      Continue Reading
                    </button>
                    <button
                      onClick={() => onRemoveBorrow(book.id)}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Return Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 3: Favorites */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900">Saved Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoritesList.map(book => (
              <div key={book.id} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">{book.title}</h3>
                <p className="text-xs text-slate-500">By {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</p>
                <div className="pt-2 flex justify-between items-center">
                  <button onClick={() => onRead(book)} className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs">
                    Read Publication
                  </button>
                  <button onClick={() => onRemoveFavorite(book.id)} className="text-xs text-red-600 font-bold hover:underline">
                    Remove Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Notes */}
      {activeSubTab === 'notes' && (
        <div className="space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900">My Annotations & Notes</h2>
          <div className="space-y-3">
            {userState.notes.map(note => (
              <div key={note.id} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-1 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800">Section {note.page} • {note.date}</span>
                  <p className="text-xs text-slate-800 font-medium">{note.text}</p>
                </div>
                <button onClick={() => onRemoveNote(note.id)} className="text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Access Pass Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4">
            <h3 className="font-black text-lg text-slate-900">NACETEM E-Access Pass</h3>
            <div className="p-4 bg-slate-100 rounded-2xl inline-block font-mono text-sm font-bold text-emerald-900">
              {showQrModal}
            </div>
            <button onClick={() => setShowQrModal(null)} className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
              Close
            </button>
          </div>
        </div>
      )}

      {/* AI Summarized Scholar Portfolio Report Modal (Printable & Shareable) */}
      {showPortfolioReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:max-w-none print:shadow-none print:border-none">
            {/* Report Header */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="font-black text-lg text-slate-900">Executive Scholar Portfolio Report</h2>
                  <p className="text-xs text-slate-500 font-medium">National Centre for Technology Management (NACETEM) Synthesis</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 print:hidden">
                <button
                  onClick={handlePrintPortfolioReport}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4 text-slate-700" />
                  <span>Print Report</span>
                </button>
                <button
                  onClick={() => setShowPortfolioReportModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Researcher Info */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium space-y-1">
              <p className="font-extrabold text-sm text-slate-900">Researcher: {userName}</p>
              <p className="text-slate-600">Affiliation: National Centre for Technology Management (NACETEM)</p>
              <p className="text-slate-500">Date Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            {/* AI Synthesized Executive Summary of All Papers */}
            <div className="space-y-3 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1">1. Consolidated AI Research Impact Summary</h3>
              <p className="text-slate-700 leading-relaxed font-serif">
                This executive synthesis summarizes the cumulative research contributions of <strong>{userName}</strong> within the National Centre for Technology Management (NACETEM) repository. Across {myPapers.length} major publication(s), the research focuses on institutional capacity evaluation, technology transfer mechanisms, cybersecurity policy, and Science, Technology & Innovation (STI) indicator frameworks in Nigeria.
              </p>
            </div>

            {/* Annotated Publications List */}
            <div className="space-y-3 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1">2. Authored Publications & Formatted Academic Citations</h3>
              <div className="space-y-3">
                {myPapers.map((p, idx) => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-slate-900">{idx + 1}. {p.title} ({p.year})</p>
                    <p className="font-mono text-[11px] text-emerald-800">{generateAcademicCitation(p, 'APA')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Print Footer */}
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>NACETEM STI Knowledge Hub Official Report</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
