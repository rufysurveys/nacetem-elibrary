import React from 'react';
import { Quote, Sparkles, BookOpen, Award } from 'lucide-react';
import dgPhoto from '../assets/dg.webp';

export default function DgWelcomeBanner() {
  return (
    <section className="container mx-auto px-4 max-w-7xl pt-6">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Top Decorative Emerald Stripe */}
        <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-emerald-600 via-teal-700 to-amber-500"></div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 pt-2">
          {/* DG Photo Column */}
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="relative group">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-emerald-100 shadow-xl bg-slate-100 relative">
                <img 
                  src={dgPhoto} 
                  alt="Dr. Olushola Odusanya - Director General / CEO, NACETEM"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                DG / CEO NACETEM
              </span>
            </div>

            <div className="mt-5 space-y-0.5">
              <h3 className="font-black text-base text-slate-900">Dr. Olushola Odusanya</h3>
              <p className="text-xs font-bold text-emerald-800">Director-General / CEO</p>
              <p className="text-[11px] text-slate-500 font-semibold max-w-[200px]">
                National Centre for Technology Management (NACETEM)
              </p>
            </div>
          </div>

          {/* Welcome Message Column */}
          <div className="flex-1 space-y-4 text-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Quote className="w-5 h-5 text-emerald-700" />
              </div>
              <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                Official Welcome Address from the Director-General
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Welcome to the NACETEM E-Library
            </h2>

            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-slate-700 font-medium">
              <p>
                Welcome to the <strong className="text-slate-900 font-bold">NACETEM E-Library</strong>—your digital gateway to knowledge, research, publications, and learning resources.
              </p>
              <p>
                This platform is designed to make valuable information <strong className="text-emerald-900 font-bold">accessible, organised, and available whenever you need it</strong>. Whether you are conducting research, developing your professional skills, or simply seeking new knowledge, the E-Library provides a convenient space to discover and access relevant resources.
              </p>
            </div>

            {/* Tagline Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="font-black text-sm text-emerald-950 tracking-wide">
                Explore. Learn. Research. Innovate.
              </p>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              We hope you find the NACETEM E-Library useful in supporting your learning, research, and professional development.
            </p>

            <div className="pt-1 flex items-center justify-between border-t border-slate-100">
              <p className="font-extrabold text-xs text-emerald-900">
                Welcome, and happy learning!
              </p>
              <span className="text-[10px] text-slate-400 font-mono font-semibold">
                Federal Ministry of Innovation, Science and Technology
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
