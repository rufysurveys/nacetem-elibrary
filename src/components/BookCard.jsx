import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  Download, 
  Quote, 
  Share2, 
  Check, 
  Lock, 
  Unlock, 
  Printer
} from 'lucide-react';

export default function BookCard({
  book,
  onRead,
  onBorrow,
  onToggleFavorite,
  onAskAi,
  isBorrowed,
  isFavorite
}) {
  const [copiedDoi, setCopiedDoi] = React.useState(false);
  const [copiedShare, setCopiedShare] = React.useState(false);

  const handleCopyDoi = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(book.doi || book.isbn);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleQuickShare = (e) => {
    e.stopPropagation();
    const shareText = `Check out "${book.title}" by ${book.authors.join(', ')} on NACETEM E-Library (DOI: ${book.doi || book.isbn})`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${book.coverColor || 'from-emerald-600 to-teal-700'}`}></div>

      <div className="space-y-4 pt-1">
        {/* Category & Access Badge Row */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold tracking-wide">
            {book.category}
          </span>

          <div className="flex items-center space-x-1.5">
            <span className="flex items-center space-x-1 text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
              <Unlock className="w-3 h-3 text-emerald-700" />
              <span>100% Downloadable</span>
            </span>

            {/* Share Button */}
            <button
              onClick={handleQuickShare}
              title="Share Publication"
              className="p-1.5 rounded-lg border bg-slate-50 text-slate-500 border-slate-200 hover:text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-all"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Favorite Bookmark Toggle */}
            <button
              onClick={() => onToggleFavorite(book.id)}
              title={isFavorite ? 'Remove from Shelf' : 'Save to Shelf'}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite 
                  ? 'bg-amber-100 text-amber-700 border-amber-300' 
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-amber-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Book Visual Header & Title */}
        <div className="space-y-1">
          <h3 
            onClick={() => onRead(book)} 
            className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-xs text-slate-500 italic line-clamp-1">{book.subtitle}</p>
          )}
        </div>

        {/* Authors & Year Metadata */}
        <div className="text-xs text-slate-700 space-y-0.5 font-medium">
          <div className="font-bold text-slate-900">
            {book.authors.join(', ')}
          </div>
          <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
            <span className="truncate max-w-[200px]">{book.institution}</span>
            <span>•</span>
            <span className="font-mono text-emerald-700 font-bold">{book.year}</span>
          </div>
        </div>

        {/* Abstract Snippet */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {book.abstract}
        </p>

        {/* Citation, Page Count & Audio Badges */}
        <div className="flex items-center justify-between border-t border-b border-slate-100 py-2 text-xs text-slate-600 font-medium">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-slate-600">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>{book.pageCount} pages</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-600">
              <Quote className="w-3.5 h-3.5 text-amber-600" />
              <span>{book.citationsCount} citations</span>
            </span>
          </div>

          <span className="flex items-center space-x-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
            <Download className="w-3 h-3 text-emerald-700" />
            <span>PDF & TXT Ready</span>
          </span>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="pt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Read Publication */}
          <button
            onClick={() => onRead(book)}
            className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-all"
          >
            <BookOpen className="w-4 h-4 text-white" />
            <span>Read & Print</span>
          </button>

          {/* Borrow or Active Badge */}
          {isBorrowed ? (
            <button
              onClick={() => onBorrow(book.id)}
              className="py-2.5 px-3 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center justify-center space-x-1.5"
            >
              <Check className="w-4 h-4 text-amber-700" />
              <span>On My Shelf</span>
            </button>
          ) : (
            <button
              onClick={() => onBorrow(book.id)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Borrow E-Copy</span>
            </button>
          )}
        </div>

        {/* AI Assist & DOI bar */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <button
            onClick={() => onAskAi(book)}
            className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Summarize & Cite</span>
          </button>

          <button
            onClick={handleCopyDoi}
            className="text-slate-500 hover:text-slate-900 font-mono transition-colors font-semibold"
            title="Click to copy DOI / ISBN"
          >
            {copiedDoi ? (
              <span className="text-emerald-700 font-bold flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </span>
            ) : (
              <span>DOI: {book.doi || book.isbn}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
