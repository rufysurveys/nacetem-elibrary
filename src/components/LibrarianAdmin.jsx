import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  BookOpen, 
  Download, 
  Users, 
  TrendingUp, 
  Star, 
  Trash2, 
  Lock, 
  Unlock, 
  Search,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export default function LibrarianAdmin({ books, onDeleteBook, onToggleAccessLevel, onToggleFeatured }) {
  const [adminSearch, setAdminSearch] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    b.authors.some(a => a.toLowerCase().includes(adminSearch.toLowerCase())) ||
    b.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const topSearchedKeywords = [
    { term: 'Nigeria STI Policy 2026', count: 1240, percentage: 85 },
    { term: 'AI Governance & Ethics', count: 980, percentage: 70 },
    { term: 'Solar Agribusiness Micro-Grid', count: 850, percentage: 62 },
    { term: 'University Tech Transfer', count: 640, percentage: 48 },
    { term: 'Biotech Bio-Economy 2030', count: 410, percentage: 32 }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-purple-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>Head Librarian Control Center</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            Repository & Analytics <span className="text-gradient-gold">Management</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium">Monitor usage statistics, manage catalog access, and audit search trends.</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-purple-900 bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl font-bold">
          <span>System Health: 100% Operational</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 space-y-2 border border-slate-200 border-l-4 border-l-emerald-600 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold">
            <span>Total Catalog Items</span>
            <BookOpen className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900">{books.length}</div>
          <div className="text-[11px] text-emerald-800 font-bold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-emerald-700" />
            <span>+3 new items this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-2 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold">
            <span>Monthly Downloads</span>
            <Download className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">24,310</div>
          <div className="text-[11px] text-amber-700 font-bold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            <span>+18.4% growth</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-2 border border-slate-200 border-l-4 border-l-sky-500 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold">
            <span>Active Researchers</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">3,890</div>
          <div className="text-[11px] text-sky-700 font-bold flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-sky-600" />
            <span>Active sessions</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-2 border border-slate-200 border-l-4 border-l-purple-500 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold">
            <span>Open Access Ratio</span>
            <FileCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">83.3%</div>
          <div className="text-[11px] text-purple-700 font-mono font-bold">
            UNESCO Compliant
          </div>
        </div>
      </div>

      {/* Top Search Trends & Analytics */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            <span>Top Searched STI Topics & Policy Keywords</span>
          </div>
          <span className="text-xs text-slate-500 font-mono font-semibold">Real-time Analytics</span>
        </div>

        <div className="space-y-3">
          {topSearchedKeywords.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-800 font-bold">
                <span>{item.term}</span>
                <span className="font-mono text-emerald-800">{item.count} queries</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Item Management Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="font-black text-slate-900 text-base">Repository Catalog Management</div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Search catalog by title..."
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 font-medium">
            <thead className="bg-slate-100 text-slate-800 uppercase font-mono text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Title & Category</th>
                <th className="p-3">Authors</th>
                <th className="p-3">Year</th>
                <th className="p-3">Access</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 line-clamp-1">{b.title}</div>
                    <div className="text-[10px] text-emerald-700 font-bold">{b.category} • {b.type}</div>
                  </td>
                  <td className="p-3 text-slate-600">{b.authors[0]}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">{b.year}</td>
                  <td className="p-3">
                    <button
                      onClick={() => onToggleAccessLevel(b.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold flex items-center space-x-1 ${
                        b.accessLevel === 'Open Access'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {b.accessLevel === 'Open Access' ? <Unlock className="w-3 h-3 text-emerald-700" /> : <Lock className="w-3 h-3 text-amber-700" />}
                      <span>{b.accessLevel}</span>
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => onToggleFeatured(b.id)}
                      className={`p-1 rounded ${b.featured ? 'text-amber-500' : 'text-slate-300'}`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => onDeleteBook(b.id)}
                      className="p-1.5 rounded bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-slate-200"
                      title="Delete Publication"
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
