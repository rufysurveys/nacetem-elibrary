import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  Calendar, 
  MapPin, 
  Layers, 
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';

export default function PortfolioVisualizations({ portfolioSummary }) {
  if (!portfolioSummary || portfolioSummary.isEmpty) return null;

  const { typeCounts, researchThemes, researchEvolution, geographicFocus, totalPapers } = portfolioSummary;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-emerald-700" />
          <h2 className="font-extrabold text-base text-slate-900">Research Portfolio Visualizations & Analytics</h2>
        </div>
        <span className="text-xs font-semibold text-slate-500">Quantitative Output Metrics</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Publications Timeline by Year */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-slate-900 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Publications Timeline</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400">By Year</span>
          </div>

          <div className="space-y-2 pt-1">
            {researchEvolution.map((evo) => (
              <div key={evo.year} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="font-mono text-emerald-800 font-bold">{evo.year}</span>
                  <span className="text-slate-500">{evo.paperCount} Paper(s)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (evo.paperCount / totalPapers) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Major Research Themes Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-slate-900 flex items-center space-x-1.5">
              <PieChart className="w-4 h-4 text-purple-700" />
              <span>Research Themes</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400">Portfolio %</span>
          </div>

          <div className="space-y-2 pt-1">
            {researchThemes.map((thm, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="truncate max-w-[170px] text-slate-800">{thm.theme}</span>
                  <span className="font-mono font-bold text-purple-700">{thm.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${thm.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Publication Types & Formats */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-slate-900 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-blue-700" />
              <span>Publication Formats</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400">Total: {totalPapers}</span>
          </div>

          <div className="space-y-2.5 pt-1 text-xs font-medium">
            <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-950">Journal Papers</span>
              <span className="font-mono font-black text-emerald-800">{typeCounts.journal}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-xl border border-purple-200">
              <span className="font-bold text-purple-950">Conference Papers</span>
              <span className="font-mono font-black text-purple-800">{typeCounts.conference}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-950">Courseware & Lecture Modules</span>
              <span className="font-mono font-black text-amber-800">{typeCounts.courseware}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-sky-50 rounded-xl border border-sky-200">
              <span className="font-bold text-sky-950">Technical & Policy Reports</span>
              <span className="font-mono font-black text-sky-800">{typeCounts.report}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
