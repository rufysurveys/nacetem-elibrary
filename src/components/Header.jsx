import React, { useState } from 'react';
import { 
  BookOpen, 
  UploadCloud, 
  Bookmark, 
  FileCheck, 
  GraduationCap, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  LogOut,
  CheckCircle
} from 'lucide-react';
import { USER_ROLES } from '../data/mockLibraryData';

export default function Header({
  currentRole,
  setCurrentRole,
  onOpenDashboard,
  onOpenUpload,
  onOpenAdmin,
  onOpenAuth,
  onOpenCitation,
  currentUser,
  onLogout,
  activeTab,
  setActiveTab,
  borrowedCount,
  savedCount,
  onSelectLectureSeries
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLectureDropdown, setShowLectureDropdown] = useState(false);

  const handleLectureClick = (seriesName) => {
    setShowLectureDropdown(false);
    setActiveTab('catalog');
    if (onSelectLectureSeries) {
      onSelectLectureSeries(seriesName);
    }
  };

  const handleSignOut = () => {
    setShowRoleDropdown(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between gap-4">
        {/* Left: NACETEM Official Branding */}
        <div 
          onClick={() => setActiveTab('catalog')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-emerald-100 group-hover:scale-105 transition-transform">
            N
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-base md:text-lg text-slate-900 tracking-tight leading-none">
                NACETEM
              </span>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300">
                E-Library
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold leading-tight">
              National Centre for Technology Management
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'catalog'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Repository Catalog</span>
          </button>

          {/* Departmental Monthly Lecture Series Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLectureDropdown(!showLectureDropdown)}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-all flex items-center space-x-1.5 font-black shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>Departmental Monthly Lecture Series</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
            </button>

            {showLectureDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-[11px] font-black text-amber-950 uppercase tracking-wider">
                    Departmental Monthly Lecture Series
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">Select sub-series to view or upload documents</p>
                </div>

                <button
                  onClick={() => handleLectureClick('ICT Lecture Series')}
                  className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>1. ICT Lecture Series</span>
                </button>

                <button
                  onClick={() => handleLectureClick('Researchers Lecture Series')}
                  className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  <span>2. Researchers Lecture Series</span>
                </button>

                <button
                  onClick={() => handleLectureClick('Planning, Programming and Linkages Lecture Series')}
                  className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <span>3. Planning, Programming & Linkages</span>
                </button>

                <div className="border-t border-slate-100 mt-1 pt-1.5 px-2">
                  <button
                    onClick={() => {
                      setShowLectureDropdown(false);
                      onOpenUpload();
                    }}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Lecture Series Doc</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenDashboard}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>My Shelf & Uploads</span>
            {(borrowedCount > 0 || savedCount > 0) && (
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {borrowedCount + savedCount}
              </span>
            )}
          </button>

          {currentRole === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Librarian Admin</span>
            </button>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-xs transition-all hover:scale-105"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Document</span>
          </button>

          {/* User Persona & Role Selector */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="p-2 md:px-3.5 md:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-extrabold text-xs flex items-center space-x-2 transition-all"
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span className="hidden md:inline line-clamp-1 max-w-[120px]">{currentUser?.name || 'Abubakar Rufai'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs font-medium animate-in fade-in">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-extrabold text-slate-900">{currentUser?.name || 'Abubakar Rufai'}</p>
                  <p className="text-[11px] text-slate-500 font-semibold">{currentUser?.email || 'abubakar.rufai@nacetem.gov.ng'}</p>
                </div>

                <div className="py-1">
                  <p className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Switch Active Persona:</p>
                  {USER_ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setCurrentRole(role.id);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center justify-between ${
                        currentRole === role.id ? 'font-bold text-emerald-800 bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{role.label}</span>
                      {currentRole === role.id && <span className="text-emerald-700 font-bold">✓</span>}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-1 space-y-1">
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      onOpenAuth();
                    }}
                    className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 font-bold"
                  >
                    Switch Account / Sign In
                  </button>

                  {/* Explicit Red Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 font-bold flex items-center space-x-2 border-t border-slate-100 pt-2"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>Sign Out / Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
