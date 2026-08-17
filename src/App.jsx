import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import BookCard from './components/BookCard';
import DocumentReaderModal from './components/DocumentReaderModal';
import AiCopilotDrawer from './components/AiCopilotDrawer';
import PersonalDashboard from './components/PersonalDashboard';
import RepositoryUploadModal from './components/RepositoryUploadModal';
import LibrarianAdmin from './components/LibrarianAdmin';
import AuthModal from './components/AuthModal';
import CitationModal from './components/CitationModal';
import Toast from './components/Toast';

import { INITIAL_BOOKS, INITIAL_USER_STATE } from './data/mockLibraryData';
import { BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Books state merged & sanitized to ensure accurate author names and years
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('nacetem_books_v4');
    let baseBooks = INITIAL_BOOKS;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const mergedMap = new Map();
        INITIAL_BOOKS.forEach(b => mergedMap.set(b.id, b));
        parsed.forEach(b => mergedMap.set(b.id, b));
        baseBooks = Array.from(mergedMap.values());
      } catch (e) {
        baseBooks = INITIAL_BOOKS;
      }
    }

    // Auto-Sanitize all saved books to fix any username strings like 'rufysanctuary' or incorrect years
    const sanitizedBooks = baseBooks.map(book => {
      let updatedBook = { ...book };

      // Repair author names if username string
      if (Array.isArray(updatedBook.authors)) {
        updatedBook.authors = updatedBook.authors.map(a => 
          a.toLowerCase().includes('rufysanctuary') ? 'Abubakar Rufai' : a
        );
      } else if (typeof updatedBook.authors === 'string' && updatedBook.authors.toLowerCase().includes('rufysanctuary')) {
        updatedBook.authors = ['Abubakar Rufai'];
      }

      // Repair institution if username string
      if (updatedBook.institution && updatedBook.institution.toLowerCase().includes('rufysanctuary')) {
        updatedBook.institution = 'National Centre for Technology Management (NACETEM)';
      }

      // Repair Cybercrime Act paper year & DOI
      if (updatedBook.title && updatedBook.title.toLowerCase().includes('cybercrime act')) {
        updatedBook.authors = ['Abubakar Rufai', 'Dr. Kazeem Abubakar'];
        updatedBook.year = 2015;
        updatedBook.institution = 'National Centre for Technology Management (NACETEM)';
        updatedBook.doi = '10.5281/nacetem.2015.001';
      }

      return updatedBook;
    });

    localStorage.setItem('nacetem_books_v4', JSON.stringify(sanitizedBooks));
    return sanitizedBooks;
  });

  // User state (shelf, notes, loans) with LocalStorage
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('nacetem_user_state');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  // Auth User Profile State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nacetem_current_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean username if 'rufysanctuary'
      if (parsed.name && parsed.name.toLowerCase().includes('rufysanctuary')) {
        parsed.name = 'Abubakar Rufai';
      }
      return parsed;
    }
    return { isAuthenticated: true, name: 'Abubakar Rufai', role: 'staff' };
  });

  // Role persona (staff, admin, other)
  const [currentRole, setCurrentRole] = useState(currentUser.role || 'staff');

  // Active Main Navigation View
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog', 'dashboard', 'admin'

  // Modals & Drawers
  const [readingBook, setReadingBook] = useState(null);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [focusedBookForAi, setFocusedBookForAi] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [initialBookForCitation, setInitialBookForCitation] = useState(null);
  const [toast, setToast] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('All Types');
  const [openAccessOnly, setOpenAccessOnly] = useState(false);

  // Save books to localStorage
  useEffect(() => {
    localStorage.setItem('nacetem_books_v4', JSON.stringify(books));
  }, [books]);

  // Save userState to localStorage
  useEffect(() => {
    localStorage.setItem('nacetem_user_state', JSON.stringify(userState));
  }, [userState]);

  // Save currentUser to localStorage
  useEffect(() => {
    localStorage.setItem('nacetem_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Handlers
  const handleAuthenticate = (profile) => {
    let cleanName = profile.name;
    if (cleanName.toLowerCase().includes('rufysanctuary')) {
      cleanName = 'Abubakar Rufai';
    }

    const updatedProfile = { ...profile, name: cleanName };
    setCurrentUser(updatedProfile);
    setCurrentRole(updatedProfile.role);
    showToast(`Welcome back, ${updatedProfile.name}! Signed in as ${updatedProfile.roleLabel}.`);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleLogout = () => {
    setCurrentUser({ isAuthenticated: false, name: '', role: 'other' });
    setCurrentRole('other');
    showToast('Signed out of NACETEM E-Library.');
  };

  // Filter computation
  const filteredBooks = books.filter((book) => {
    const matchesQuery = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (Array.isArray(book.authors) ? book.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) : book.authors.toLowerCase().includes(searchQuery.toLowerCase())) ||
      book.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.doi && book.doi.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'all' || 
      book.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'policy' && book.category.includes('Policy')) ||
      (selectedCategory === 'ai-tech' && book.category.includes('AI')) ||
      (selectedCategory === 'green-energy' && book.category.includes('Green')) ||
      (selectedCategory === 'agri-tech' && book.category.includes('Agri')) ||
      (selectedCategory === 'industrial' && book.category.includes('Industrial')) ||
      (selectedCategory === 'biotech' && book.category.includes('Biotech'));

    const matchesType = selectedType === 'All Types' || book.type === selectedType;
    const matchesAccess = !openAccessOnly || book.accessLevel === 'Open Access';

    return matchesQuery && matchesCategory && matchesType && matchesAccess;
  });

  // Action Handlers
  const handleBorrow = (bookId) => {
    const isAlreadyBorrowed = userState.borrowedBooks.some(b => b.bookId === bookId);
    if (isAlreadyBorrowed) {
      setUserState(prev => ({
        ...prev,
        borrowedBooks: prev.borrowedBooks.filter(b => b.bookId !== bookId)
      }));
      showToast('Returned publication from your shelf.');
    } else {
      const newBorrow = {
        bookId,
        borrowedDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        qrCode: `NAC-PASS-${Math.floor(1000000 + Math.random() * 9000000)}-2026`,
        progress: 0
      };
      setUserState(prev => ({
        ...prev,
        borrowedBooks: [...prev.borrowedBooks, newBorrow]
      }));
      showToast('🎉 Borrowed e-copy added to your shelf! (14 days loan)');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleToggleFavorite = (bookId) => {
    const isFav = userState.savedFavorites.includes(bookId);
    if (isFav) {
      setUserState(prev => ({
        ...prev,
        savedFavorites: prev.savedFavorites.filter(id => id !== bookId)
      }));
      showToast('Removed from Saved Favorites.');
    } else {
      setUserState(prev => ({
        ...prev,
        savedFavorites: [...prev.savedFavorites, bookId]
      }));
      showToast('Bookmark saved to your shelf.');
    }
  };

  const handleAskAi = (book) => {
    setFocusedBookForAi(book);
    setIsAiCopilotOpen(true);
  };

  const handleTriggerAiPrompt = (promptText) => {
    setSearchQuery(promptText);
  };

  const handleAddNote = (newNote) => {
    setUserState(prev => ({
      ...prev,
      notes: [newNote, ...prev.notes]
    }));
    showToast('Annotation saved to notes.');
  };

  const handleRemoveNote = (noteId) => {
    setUserState(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== noteId)
    }));
    showToast('Deleted note.');
  };

  const handleUploadBook = (newBook) => {
    setBooks(prev => [newBook, ...prev]);
    showToast('🚀 Publication successfully archived & AI-summarized in NACETEM Repository!');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const handleDeleteBook = (bookId) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
    showToast('Publication deleted from repository.');
  };

  const handleToggleAccessLevel = (bookId) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          accessLevel: b.accessLevel === 'Open Access' ? 'Institutional Only' : 'Open Access'
        };
      }
      return b;
    }));
    showToast('Access level updated.');
  };

  const handleToggleFeatured = (bookId) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, featured: !b.featured };
      }
      return b;
    }));
    showToast('Featured status updated.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header Bar */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
        onOpenDashboard={() => setActiveTab('dashboard')}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenAdmin={() => setActiveTab('admin')}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCitation={() => {
          setInitialBookForCitation(null);
          setIsCitationOpen(true);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        borrowedCount={userState.borrowedBooks.length}
        savedCount={userState.savedFavorites.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <div className="space-y-8 pb-16">
            {/* Hero Search Section */}
            <HeroSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              openAccessOnly={openAccessOnly}
              setOpenAccessOnly={setOpenAccessOnly}
              totalResults={filteredBooks.length}
              onTriggerAiPrompt={handleTriggerAiPrompt}
            />

            {/* Catalog Grid */}
            <div className="container mx-auto px-4 max-w-7xl">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl space-y-4 max-w-2xl mx-auto border border-slate-200 shadow-sm">
                  <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">No STI publications match your search filter.</h3>
                  <p className="text-xs text-slate-500 font-medium">Try clearing keywords or switching STI collections.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedType('All Types');
                      setOpenAccessOnly(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onRead={(b) => setReadingBook(b)}
                      onBorrow={handleBorrow}
                      onToggleFavorite={handleToggleFavorite}
                      onAskAi={handleAskAi}
                      isBorrowed={userState.borrowedBooks.some(item => item.bookId === book.id)}
                      isFavorite={userState.savedFavorites.includes(book.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <PersonalDashboard
            userState={userState}
            allBooks={books}
            currentRole={currentRole}
            currentUser={currentUser}
            onRead={(b) => setReadingBook(b)}
            onRemoveBorrow={handleBorrow}
            onRemoveFavorite={handleToggleFavorite}
            onRemoveNote={handleRemoveNote}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <LibrarianAdmin
            books={books}
            onDeleteBook={handleDeleteBook}
            onToggleAccessLevel={handleToggleAccessLevel}
            onToggleFeatured={handleToggleFeatured}
          />
        )}
      </main>

      {/* Reader Modal */}
      {readingBook && (
        <DocumentReaderModal
          book={readingBook}
          onClose={() => setReadingBook(null)}
          onAddNote={handleAddNote}
          notes={userState.notes.filter(n => n.bookId === readingBook.id)}
        />
      )}

      {/* AI Copilot Drawer */}
      <AiCopilotDrawer
        isOpen={isAiCopilotOpen}
        onClose={() => {
          setIsAiCopilotOpen(false);
          setFocusedBookForAi(null);
        }}
        focusedBook={focusedBookForAi}
        allBooks={books}
      />

      {/* Upload Repository Modal */}
      <RepositoryUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadBook={handleUploadBook}
        currentUser={currentUser}
      />

      {/* Auth Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthenticate={handleAuthenticate}
      />

      {/* Universal Citation Generator Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
        allBooks={books}
        initialBook={initialBookForCitation}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-600 space-y-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900">National Centre for Technology Management (NACETEM)</span>
            <span>•</span>
            <span className="text-emerald-800 font-semibold">Federal Ministry of Innovation, Science and Technology</span>
          </div>
          <div className="text-slate-500 text-[11px] font-mono font-medium">
            © 2026 NACETEM E-Library Knowledge Hub. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
