import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Compass, 
  Layers, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  Target, 
  TrendingUp, 
  MapPin, 
  FileText, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  X
} from 'lucide-react';
import { queryUserResearchPortfolio } from '../utils/aiResearchSynthesizer';

export default function ResearchPortfolioSummarizer({ portfolioSummary, isOpen, onClose }) {
  const [customQuery, setCustomQuery] = useState('');
  const [queryResult, setQueryResult] = useState('');

  if (!isOpen || !portfolioSummary || portfolioSummary.isEmpty) return null;

  const handleRunQuery = (queryText) => {
    const q = queryText || customQuery;
    if (!q.trim()) return;
    const res = queryUserResearchPortfolio(q, portfolioSummary);
    setQueryResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-5xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-emerald-800 flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h1 className="text-xl md:text-2xl font-black tracking-tight">Integrated Research Portfolio Analysis</h1>
            </div>
            <p className="text-xs text-emerald-200 font-medium">
              Synthesized across {portfolioSummary.totalPapers} publication(s) ({portfolioSummary.yearSpan}) for {portfolioSummary.researcherName}
            </p>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-xs font-medium">
          
          {/* 1. Overall Research Profile */}
          <section className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <h2 className="font-extrabold text-sm text-emerald-950 flex items-center space-x-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>1. Overall Research Profile</span>
            </h2>
            <p className="text-slate-800 leading-relaxed font-serif text-xs md:text-sm">
              {portfolioSummary.overallProfile}
            </p>
          </section>

          {/* 2. Research Themes */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-purple-700" />
              <span>2. Core Research Themes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolioSummary.researchThemes.map((thm, i) => (
                <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{thm.theme}</span>
                    <span className="font-mono text-purple-700">{thm.percentage}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{thm.count} paper(s) addressing this domain.</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Research Evolution & 4. Key Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <section className="space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-sky-700" />
                <span>3. Research Evolution Over Time</span>
              </h2>
              <div className="space-y-2">
                {portfolioSummary.researchEvolution.map((evo) => (
                  <div key={evo.year} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-mono font-bold text-sky-700">{evo.year}</span>
                    <p className="text-slate-800 font-semibold text-xs">{evo.focus}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>4. Key Investigated Research Questions</span>
              </h2>
              <ul className="space-y-2 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                {portfolioSummary.keyQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-800">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* 5. Methodologies Used */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
              <Target className="w-4 h-4 text-emerald-700" />
              <span>5. Methodologies Appearing Across Portfolio</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolioSummary.methodologiesUsed.map((m, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{m.method}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full uppercase">{m.frequency}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{m.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Major Findings & 7. Research Contributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <section className="space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>6. Major Portfolio Findings</span>
              </h2>
              <ul className="space-y-2 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                {portfolioSummary.majorFindings.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-800">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>7. Research Contributions</span>
              </h2>
              <ul className="space-y-2 bg-purple-50/60 p-4 rounded-2xl border border-purple-200">
                {portfolioSummary.researchContributions.map((c, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-800">
                    <span className="text-purple-700 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* 8. Geographic Focus & 9. Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <section className="space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>8. Geographic Scope & Focus</span>
              </h2>
              <div className="space-y-2">
                {portfolioSummary.geographicFocus.map((g, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-900">{g.location}</span>
                    <p className="text-slate-600 text-[11px]">{g.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <Tag className="w-4 h-4 text-sky-700" />
                <span>9. Frequently Used Research Keywords</span>
              </h2>
              <div className="flex flex-wrap gap-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                {portfolioSummary.rankedKeywords.map((kw, i) => (
                  <span key={i} className="bg-white border border-slate-300 text-slate-800 font-semibold px-2.5 py-1 rounded-lg text-xs flex items-center space-x-1 shadow-2xs">
                    <span>#{kw.keyword}</span>
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded">({kw.count})</span>
                  </span>
                ))}
              </div>
            </section>

          </div>

          {/* 11. Research Gaps & 12. Future Directions */}
          <section className="p-5 bg-amber-50/80 border border-amber-300 rounded-2xl space-y-4">
            <h2 className="font-extrabold text-sm text-amber-950 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>11 & 12. Research Gaps & Potential Future Directions</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="font-extrabold text-amber-900 uppercase text-[10px]">Explicit Gaps Identified in Research</span>
                <ul className="space-y-1 text-slate-800">
                  {portfolioSummary.researchGaps.explicitGaps.map((g, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-extrabold text-emerald-900 uppercase text-[10px]">AI-Inferred Potential Future Directions</span>
                <ul className="space-y-1 text-slate-800">
                  {portfolioSummary.futureDirections.map((d, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CROSS-PAPER INTELLIGENCE QUERY ENGINE */}
          <section className="p-5 bg-slate-900 text-white rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-emerald-400" />
              <h2 className="font-extrabold text-sm text-white">Cross-Paper Portfolio Intelligence Engine</h2>
            </div>
            <p className="text-xs text-slate-300">
              Ask questions comparing papers across your research portfolio (e.g. *"How are my papers related?"*, *"Which methodology have I used most?"*, *"Which papers discuss Nigeria?"*)
            </p>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Ask cross-paper question..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleRunQuery()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
              >
                Analyze
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <button onClick={() => handleRunQuery('How are my papers related across years?')} className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-lg border border-slate-700">
                • Compare papers across years
              </button>
              <button onClick={() => handleRunQuery('Which methodologies have I used most frequently?')} className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-lg border border-slate-700">
                • Most used methodologies
              </button>
              <button onClick={() => handleRunQuery('Which papers discuss Nigeria?')} className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-lg border border-slate-700">
                • Nigeria & regional focus
              </button>
            </div>

            {queryResult && (
              <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {queryResult}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
