import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom-5">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <div className="text-xs font-semibold">{toast.message}</div>
      <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
