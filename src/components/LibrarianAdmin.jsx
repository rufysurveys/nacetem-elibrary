import React, { useEffect, useState } from 'react';
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
  FileText,
  Users,
  UserX
} from 'lucide-react';

export default function LibrarianAdmin({ books, onDeleteBook, onToggleAccessLevel, onToggleFeatured }) {
  const [adminSearch, setAdminSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState('');

  const loadUsers = async () => {
    const token = localStorage.getItem('nacetem_auth_token');
    const response = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load accounts.');
    setUsers(data);
  };

  useEffect(() => {
    loadUsers().catch((error) => setUsersError(error.message));
  }, []);

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name}'s account and all documents they deposited?`)) return;
    const token = localStorage.getItem('nacetem_auth_token');
    const response = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) {
      setUsersError(data.error || 'Account could not be removed.');
      return;
    }
    setUsers((current) => current.filter((item) => item.id !== user.id));
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    (Array.isArray(b.authors) ? b.authors.join(' ').toLowerCase().includes(adminSearch.toLowerCase()) : b.authors.toLowerCase().includes(adminSearch.toLowerCase()))
  );

  // 1-Click Database Export to downloadable JSON/SQL file
  const handleExportDatabase = async () => {
    try {
      const token = localStorage.getItem('nacetem_auth_token');
      const response = await fetch('/api/admin/export-db', { headers: { Authorization: `Bearer ${token}` } });
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

      <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2"><Users className="w-5 h-5 text-emerald-700" /> User accounts</h2>
            <p className="text-xs text-slate-500 mt-1">Only verified administrators can remove accounts.</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{users.length} accounts</span>
        </div>
        {usersError && <p className="m-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{usersError}</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="bg-slate-50 text-[10px] uppercase text-slate-500"><th className="p-4">Account</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => <tr key={user.id}>
                <td className="p-4"><strong className="block text-slate-900">{user.name}</strong><span className="text-slate-500">{user.email}</span></td>
                <td className="p-4">{user.roleLabel || user.role}</td>
                <td className="p-4"><span className={user.isVerified ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{user.isVerified ? 'Verified' : 'Pending verification'}</span></td>
                <td className="p-4 text-right"><button onClick={() => handleDeleteUser(user)} disabled={user.role === 'admin'} title={user.role === 'admin' ? 'Admin accounts cannot be removed here' : 'Delete account'} className="p-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"><UserX className="w-4 h-4" /></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>

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
