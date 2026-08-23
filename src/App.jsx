import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import DgWelcomeBanner from './components/DgWelcomeBanner';
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
  // The server repository is the source of truth; mock records are display-only seed content.
  const [books, setBooks] = useState(() => {
    const mergedMap = new Map();
    INITIAL_BOOKS.forEach(b => {
      if (!mergedMap.has(b.id)) mergedMap.set(b.id, b);
    });

    const combinedList = Array.from(mergedMap.values());

    return combinedList.map(book => {
      let updated = { ...book };
      if (Array.isArray(updated.authors)) {
        updated.authors = updated.authors.map(a => 
          a.toLowerCase().includes('rufysanctuary') ? 'Abubakar Rufai' : a
        );
      } else if (typeof updated.authors === 'string' && updated.authors.toLowerCase().includes('rufysanctuary')) {
        updated.authors = ['Abubakar Rufai'];
      }

      if (updated.institution && updated.institution.toLowerCase().includes('rufysanctuary')) {
        updated.institution = 'National Centre for Technology Management (NACETEM)';
      }

      if (updated.title && updated.title.toLowerCase().includes('cybercrime act')) {
        updated.authors = ['Abubakar Rufai', 'Dr. Kazeem Abubakar'];
        updated.year = 2015;
        updated.institution = 'National Centre for Technology Management (NACETEM)';
        updated.doi = '10.5281/nacetem.2015.001';
        updated.isUserUploaded = true;
      }
      return updated;
    });
  });

  // User state
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('nacetem_user_state');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  // Auth User Profile State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nacetem_current_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.name) {
        if (parsed.name.toLowerCase().includes('rufysanctuary')) {
          parsed.name = 'Abubakar Rufai';
        }
        return parsed;
      }
    }
    return { isAuthenticated: false, name: '', email: '', role: 'other', roleLabel: 'Visitor' };
  });

  // Role persona
  const [currentRole, setCurrentRole] = useState(currentUser?.role || 'other');

  // Active Navigation View
  const [activeTab, setActiveTab] = useState('catalog');

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

  useEffect(() => {
    localStorage.setItem('nacetem_user_state', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    if (currentUser && currentUser.isAuthenticated) {
      localStorage.setItem('nacetem_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nacetem_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    const token = localStorage.getItem('nacetem_auth_token');
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (!response.ok) throw new Error('Invalid session');
        return response.json();
      })
      .then((profile) => {
        const authenticated = { ...profile, isAuthenticated: true };
        setCurrentUser(authenticated);
        setCurrentRole(profile.role);
      })
      .catch(() => {
        localStorage.removeItem('nacetem_auth_token');
        localStorage.removeItem('nacetem_current_user');
        setCurrentUser({ isAuthenticated: false, name: '', email: '', role: 'other', roleLabel: 'Visitor' });
        setCurrentRole('other');
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/books')
      .then((response) => {
        if (!response.ok) throw new Error('Repository unavailable');
        return response.json();
      })
      .then((repositoryBooks) => {
        if (cancelled) return;
        setBooks((current) => {
          const repositoryIds = new Set(repositoryBooks.map((book) => book.id));
          return [...repositoryBooks, ...current.filter((book) => !repositoryIds.has(book.id))];
        });
      })
      .catch(() => showToast('The repository server is offline. Showing the local catalogue.'));
    return () => { cancelled = true; };
  }, []);

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!window.location.hash.startsWith('#confirm-email?')) return;
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const token = params.get('token');
    const email = params.get('email');
    if (!token) return;
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email })
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Email confirmation failed.');
        localStorage.setItem('nacetem_auth_token', data.token);
        handleAuthenticate(data.user);
        window.history.replaceState(null, '', window.location.pathname);
        showToast('Email confirmed. Your account is now active.');
      })
      .catch((error) => showToast(error.message));
  }, []);

  const handleAuthenticate = (profile) => {
    let cleanName = profile.name;
    if (cleanName.toLowerCase().includes('rufysanctuary')) {
      cleanName = 'Abubakar Rufai';
    }

    const updatedProfile = { ...profile, name: cleanName, isAuthenticated: true };
    setCurrentUser(updatedProfile);
    setCurrentRole(updatedProfile.role || 'staff');
    localStorage.setItem('nacetem_current_user', JSON.stringify(updatedProfile));
    showToast(`Welcome back, ${updatedProfile.name}! Signed in successfully.`);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleLogout = () => {
    const unauthObj = { isAuthenticated: false, name: '', email: '', role: 'other', roleLabel: 'Visitor' };
    setCurrentUser(unauthObj);
    setCurrentRole('other');
    localStorage.removeItem('nacetem_current_user');
    localStorage.removeItem('nacetem_auth_token');
    showToast('Successfully signed out of NACETEM E-Library.');
  };

  const handleSelectLectureSeries = (seriesName) => {
    setSearchQuery(seriesName);
    setSelectedCategory('lecture-series');
    showToast(`Filtered by ${seriesName}`);
  };

  const handleOpenCatalog = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('All Types');
    setOpenAccessOnly(false);
    setActiveTab('catalog');
  };

  const filteredBooks = books.filter((book) => {
    const matchesQuery = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (Array.isArray(book.authors) ? book.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) : book.authors.toLowerCase().includes(searchQuery.toLowerCase())) ||
      book.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.doi && book.doi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.lectureSeriesSub && book.lectureSeriesSub.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'all' || 
      book.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'lecture-series' && (book.category.includes('Departmental') || book.category.includes('Lecture'))) ||
      (selectedCategory === 'ict-series' && (book.lectureSeriesSub?.includes('ICT') || book.subtitle?.includes('ICT'))) ||
      (selectedCategory === 'researchers-series' && (book.lectureSeriesSub?.includes('Researchers') || book.subtitle?.includes('Researchers'))) ||
      (selectedCategory === 'ppl-series' && (book.lectureSeriesSub?.includes('Planning') || book.subtitle?.includes('Planning'))) ||
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

  const handleUploadBook = async (newBook) => {
    const token = localStorage.getItem('nacetem_auth_token');
    if (!currentUser?.isAuthenticated || !token) throw new Error('Sign in before uploading a paper.');
    const metadata = { ...newBook, file: undefined, fileName: newBook.file.name };
    const metadataHeader = btoa(unescape(encodeURIComponent(JSON.stringify(metadata))));
    const response = await fetch('/api/books/upload-file', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/pdf',
        'X-Document-Metadata': metadataHeader
      },
      body: newBook.file
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Upload failed.');
    const taggedBook = {
      ...newBook,
      file: undefined,
      id: result.id,
      fileUrl: result.fileUrl,
      fileChecksum: result.checksum,
      isUserUploaded: true,
      uploadedBy: currentUser.name
    };
    setBooks((current) => [taggedBook, ...current.filter((book) => book.id !== taggedBook.id)]);
    
    showToast('Paper archived with integrity verification and added to the catalogue.');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setActiveTab('dashboard');
  };

  const openUpload = () => {
    if (!currentUser?.isAuthenticated) {
      setIsAuthOpen(true);
      showToast('Sign in to deposit a paper.');
      return;
    }
    setIsUploadOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    const token = localStorage.getItem('nacetem_auth_token');
    const response = await fetch(`/api/books/${encodeURIComponent(bookId)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const result = await response.json();
    if (!response.ok) {
      showToast(result.error || 'The publication could not be deleted.');
      return;
    }
    setBooks((current) => current.filter((book) => book.id !== bookId));
    showToast('Publication and original file deleted from the repository.');
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
      {/* Header Bar with Departmental Monthly Lecture Series Menu */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenDashboard={() => setActiveTab('dashboard')}
        onOpenUpload={openUpload}
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
        onSelectLectureSeries={handleSelectLectureSeries}
        onOpenCatalog={handleOpenCatalog}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <div className="space-y-8 pb-16">
            {/* Official Welcome Message Banner from Director-General Dr. Olushola Odusanya */}
            <DgWelcomeBanner />

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
            onDeleteBook={handleDeleteBook}
            onOpenUpload={openUpload}
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

      {/* Upload Repository Modal */}
      <RepositoryUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadBook={handleUploadBook}
        currentUser={currentUser}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthenticate={handleAuthenticate}
      />

      {/* Citation Modal */}
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
