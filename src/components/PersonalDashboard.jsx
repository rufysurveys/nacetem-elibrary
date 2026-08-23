import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  QrCode, 
  FileText, 
  Trash2, 
  Download, 
  Check, 
  Sparkles,
  Printer,
  Share2,
  UploadCloud,
  FileCheck,
  Award,
  Layers,
  Plus,
  AlertCircle
} from 'lucide-react';
import { exportToPdf } from '../utils/documentExporter';
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
  onDeleteBook,
  onOpenUpload
}) {
  const [activeSubTab, setActiveSubTab] = useState('my-papers');
  const [showQrModal, setShowQrModal] = useState(null);
  const [copiedSharePortfolio, setCopiedSharePortfolio] = useState(false);
  const [showPortfolioReportModal, setShowPortfolioReportModal] = useState(false);

  const userName = currentUser?.name || 'Reader';

  const myPapers = allBooks
    .filter((book) => book.isUserUploaded && (
      book.uploadedByUserId === currentUser?.id ||
      (!book.uploadedByUserId && book.uploadedBy?.toLowerCase() === userName.toLowerCase())
    ))
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

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
                {currentUser?.roleLabel || (currentRole === 'admin' ? 'Head Librarian (Admin)' : 'NACETEM Researcher')}
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
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md hover:scale-105"
          >
            <Plus className="w-4 h-4" />
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">My Uploaded Papers</span>
            <FileCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{myPapers.length}</p>
          <p className="text-[11px] text-emerald-700 font-bold">Priority Rendered at Top</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Citations</span>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalCitations}</p>
          <p className="text-[11px] text-amber-700 font-bold">APA/IEEE/Harvard Formatted</p>
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Repository Papers</span>
            <Layers className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{allBooks.length}</p>
          <p className="text-[11px] text-purple-700 font-bold">Indexed in System</p>
        </div>
      </div>

      {/* PROMINENT ALWAYS-VISIBLE PRIORITY UPLOADED PAPERS CONTAINER */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-3xl p-6 md:p-8 border-2 border-emerald-300 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping"></span>
              <h2 className="text-xl font-black text-emerald-950">My Uploaded & Priority Deposited Papers ({myPapers.length})</h2>
            </div>
            <p className="text-xs text-emerald-800 font-medium">All publications deposited by you are rendered here first with full download & citation tools</p>
          </div>

          <button
            onClick={onOpenUpload}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Another Paper</span>
          </button>
        </div>

        {myPapers.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-emerald-300 space-y-3">
            <UploadCloud className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="font-extrabold text-base text-slate-900">No deposited research papers found yet.</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Click the button below to upload your PDF or Word document into the NACETEM Repository.</p>
            <button
              onClick={onOpenUpload}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md"
            >
              Upload Your Research Paper Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myPapers.map((paper) => (
              <div key={paper.id} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-lg">
                    {paper.category}
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Year: {paper.year}
                    </span>

                    {/* Admin or Author Delete Button */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${paper.title}" from your repository?`)) {
                          onDeleteBook(paper.id);
                        }
                      }}
                      title="Remove paper"
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 transition-all font-bold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>

                <h3 
                  onClick={() => onRead(paper)}
                  className="font-bold text-sm md:text-base text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-2 leading-snug"
                >
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">{paper.abstract}</p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 leading-snug">
                  <span className="font-bold text-emerald-800 block text-[10px] uppercase mb-1">Accurate APA Reference:</span>
                  {generateAcademicCitation(paper, 'APA')}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onRead(paper)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read & Print</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => exportToPdf(paper)}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Original PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('all-library')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'all-library'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>All Repository Papers ({allBooks.length})</span>
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

      {/* Sub-Tab: All Repository Papers */}
      {activeSubTab === 'all-library' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-lg text-slate-900">All Repository Publications ({allBooks.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allBooks.map(paper => (
              <div key={paper.id} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-xs">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded-lg">
                    {paper.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500">Year: {paper.year}</span>
                </div>

                <h3 onClick={() => onRead(paper)} className="font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-2">
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">{paper.abstract}</p>

                <div className="pt-2 flex items-center justify-between">
                  <button onClick={() => onRead(paper)} className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs">
                    Read & Print
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${paper.title}"?`)) onDeleteBook(paper.id);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 font-bold text-xs flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
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

      {/* AI Summarized Scholar Portfolio Report Modal */}
      {showPortfolioReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:max-w-none print:shadow-none print:border-none">
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

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium space-y-1">
              <p className="font-extrabold text-sm text-slate-900">Researcher: {userName}</p>
              <p className="text-slate-600">Affiliation: National Centre for Technology Management (NACETEM)</p>
              <p className="text-slate-500">Date Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="space-y-3 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1">1. Consolidated AI Research Impact Summary</h3>
              <p className="text-slate-700 leading-relaxed font-serif">
                This executive synthesis summarizes the cumulative research contributions of <strong>{userName}</strong> within the National Centre for Technology Management (NACETEM) repository. Across {myPapers.length} priority publication(s), the research focuses on institutional capacity evaluation, technology transfer mechanisms, cybersecurity policy, and Science, Technology & Innovation (STI) indicator frameworks in Nigeria.
              </p>
            </div>

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
