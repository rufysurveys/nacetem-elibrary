import React from 'react';
import { 
  Search, 
  Sparkles, 
  Filter, 
  X, 
  BookOpen, 
  FileText, 
  Award, 
  CheckCircle2, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { NACETEM_COLLECTIONS, DOCUMENT_TYPES } from '../data/mockLibraryData';

export default function HeroSearch({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  openAccessOnly,
  setOpenAccessOnly,
  totalResults,
  onTriggerAiPrompt
}) {
  const quickPrompts = [
    '🇳🇬 Nigeria STI Policy 2026',
    '🤖 AI Governance & Ethics',
    '☀️ Solar Micro-Grid Agribusiness',
    '🔬 University Tech Transfer'
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-12 px-4 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 border-b border-slate-200">
      {/* Background Subtle Element */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Title & Badge */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>National Repository for Science, Technology & Innovation</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Discover & Explore Nigeria's <br />
            <span className="text-gradient-emerald">STI Research Knowledge Engine</span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Access policy monographs, technical reports, peer-reviewed journals, and dataset archives curated by the National Centre for Technology Management (NACETEM).
          </p>
        </div>

        {/* Smart Search Bar Container */}
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-slate-200 max-w-3xl mx-auto space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-emerald-600 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, DOI, keyword, or STI policy topic..."
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 rounded-2xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm md:text-base focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick AI Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
            <span className="flex items-center text-emerald-700 font-bold space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Suggested:</span>
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onTriggerAiPrompt(prompt.replace(/^[^\w\s]+/, '').trim())}
                className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-100 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 font-semibold transition-all text-xs flex items-center space-x-1"
              >
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Filter Controls Row */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Document Type Dropdown */}
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-slate-600 font-semibold">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-100 text-slate-800 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
              >
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Open Access Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer text-slate-700 hover:text-slate-900 select-none font-medium">
              <input
                type="checkbox"
                checked={openAccessOnly}
                onChange={(e) => setOpenAccessOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="flex items-center space-x-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open Access Only</span>
              </span>
            </label>

            {/* Search Counter Result Badge */}
            <div className="text-emerald-800 font-mono text-xs font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              Showing <span className="text-slate-900 font-black">{totalResults}</span> STI publications
            </div>
          </div>
        </div>

        {/* Collection Filter Category Tabs */}
        <div className="mt-8 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {NACETEM_COLLECTIONS.map((col) => {
            const isActive = selectedCategory === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setSelectedCategory(col.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'
                }`}
              >
                <span>{col.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
