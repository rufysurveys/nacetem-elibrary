import React from 'react';
import { 
  BookOpen, 
  Download, 
  Bookmark, 
  Sparkles, 
  User, 
  Calendar, 
  Building, 
  ExternalLink,
  Quote,
  ShieldCheck
} from 'lucide-react';
import { exportToPdf } from '../utils/documentExporter';

export default function BookCard({
  book,
  onRead,
  onOpenLanding,
  onBorrow,
  onToggleFavorite,
  onAskAi,
  isBorrowed,
  isFavorite
}) {
  const authorsStr = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'NACETEM Researcher');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      {/* Top Banner Accent */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
            {book.category}
          </span>
          <span className="bg-slate-100 text-slate-700 font-mono text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-200">
            {book.year}
          </span>
        </div>

        {/* Paper Title */}
        <h3 
          onClick={() => onOpenLanding ? onOpenLanding(book) : onRead(book)}
          className="font-extrabold text-base md:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {book.title}
        </h3>

        {book.subtitle && (
          <p className="text-xs text-slate-500 italic font-medium line-clamp-1">{book.subtitle}</p>
        )}

        {/* Authors & Journal Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-emerald-700" />
            <span className="line-clamp-1">{authorsStr}</span>
          </span>
          <span>•</span>
          <span className="text-slate-500 truncate">{book.institution || 'NACETEM'}</span>
        </div>

        {/* Abstract Snippet */}
        <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3 pt-1">
          {book.abstract}
        </p>

        {/* DOI Badge */}
        {book.doi && (
          <p className="text-[10px] font-mono text-emerald-800 font-semibold">
            DOI: {book.doi}
          </p>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-extrabold">
        <div className="flex items-center space-x-2">
          {/* Read Button */}
          <button
            onClick={() => onRead(book)}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Paper</span>
          </button>

          {/* AI Summary Button */}
          <button
            onClick={() => onOpenLanding ? onOpenLanding(book) : onRead(book)}
            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">AI Summary</span>
          </button>
        </div>

        <div className="flex items-center space-x-1">
          {/* Download Button */}
          <button
            onClick={() => exportToPdf(book)}
            title="Download PDF"
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-200 text-slate-700"
          >
            <Download className="w-4 h-4 text-emerald-700" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleFavorite(book.id)}
            title="Bookmark paper"
            className={`p-2 rounded-xl border transition-colors ${
              isFavorite ? 'bg-amber-100 text-amber-900 border-amber-300' : 'border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current text-amber-600' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
