import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Lock, 
  Unlock, 
  Download, 
  Database, 
  Check, 
  Search,
  FileCheck,
  FileText
} from 'lucide-react';

export default function LibrarianAdmin({ books, onDeleteBook, onToggleAccessLevel, onToggleFeatured }) {
  const [adminSearch, setAdminSearch] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    (Array.isArray(b.authors) ? b.authors.join(' ').toLowerCase().includes(adminSearch.toLowerCase()) : b.authors.toLowerCase().includes(adminSearch.toLowerCase()))
  );

  // 1-Click Database Export to downloadable JSON/SQL file
  const handleExportDatabase = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/export-db');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nacetem_library_database_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert('Database export requires running SQLite backend server.');
      }
    } catch (e) {
      // Offline client fallback export
      const exportObj = {
        exportTimestamp: new Date().toISOString(),
        databaseType: 'SQLite3 / PostgreSQL Compatible',
        booksCount: books.length,
        books
      };
      const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nacetem_library_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
      {/* Admin Title & Export Bar */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 text-purple-800 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">Librarian Admin Control & Database Export</h1>
            <p className="text-xs text-slate-500 font-medium">Manage repository records, access rules, and export SQLite database files</p>
          </div>
        </div>

        <button
          onClick={handleExportDatabase}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md transition-all hover:scale-105"
        >
          <Database className="w-4 h-4 text-amber-300" />
          <span>Export Local Database (.JSON / .SQL)</span>
        </button>
      </div>

      {/* Admin Search Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            placeholder="Search records to edit or remove..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-600"
          />
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing {filteredBooks.length} of {books.length} publications
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-4">Publication Title</th>
                <th className="p-4">Category & Sub-Series</th>
                <th className="p-4">Author(s)</th>
                <th className="p-4">Access Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 max-w-xs truncate">
                    {book.title}
                  </td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-bold">
                      {book.category}
                    </span>
                    {book.lectureSeriesSub && (
                      <span className="block text-[10px] text-amber-800 font-extrabold mt-0.5">
                        {book.lectureSeriesSub}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600">
                    {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onToggleAccessLevel(book.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center space-x-1 ${
                        book.accessLevel === 'Open Access'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {book.accessLevel === 'Open Access' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      <span>{book.accessLevel}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${book.title}" from SQLite database?`)) {
                          onDeleteBook(book.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold transition-all"
                      title="Delete publication record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
