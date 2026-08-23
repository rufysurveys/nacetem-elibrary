import React, { useState } from 'react';
import { 
  BookOpen, 
  UploadCloud, 
  FileCheck, 
  GraduationCap, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  LogOut,
  LogIn,
  BookMarked
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
  onSelectLectureSeries,
  onSelectPgCourse
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLectureDropdown, setShowLectureDropdown] = useState(false);
  const [showPgDropdown, setShowPgDropdown] = useState(false);

  const handleLectureClick = (seriesName) => {
    setShowLectureDropdown(false);
    setShowPgDropdown(false);
    setActiveTab('catalog');
    if (onSelectLectureSeries) {
      onSelectLectureSeries(seriesName);
    }
  };

  const handlePgCourseClick = (courseName) => {
    setShowPgDropdown(false);
    setShowLectureDropdown(false);
    setActiveTab('catalog');
    if (onSelectPgCourse) {
      onSelectPgCourse(courseName);
    }
  };

  const handleSignOut = () => {
    setShowRoleDropdown(false);
    onLogout();
  };

  const isAuthenticated = currentUser?.isAuthenticated;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between gap-3">
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
        <nav className="hidden xl:flex items-center space-x-1 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'catalog'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Catalog</span>
          </button>

          {/* Departmental Monthly Lecture Series Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLectureDropdown(!showLectureDropdown);
                setShowPgDropdown(false);
              }}
              className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-all flex items-center space-x-1 font-black shadow-2xs"
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
                  <p className="text-[10px] text-slate-500 font-medium">Select sub-series to view or upload</p>
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

          {/* Postgraduate Courses Dropdown (New Feature) */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPgDropdown(!showPgDropdown);
                setShowLectureDropdown(false);
              }}
              className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-300 transition-all flex items-center space-x-1 font-black shadow-2xs"
            >
              <BookMarked className="w-4 h-4 text-purple-700" />
              <span>Postgraduate Courses</span>
              <ChevronDown className="w-3.5 h-3.5 text-purple-700" />
            </button>

            {showPgDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-[11px] font-black text-purple-950 uppercase tracking-wider">
                    Postgraduate Courses Subdivisions
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">Select course to view courseware & modules</p>
                </div>

                <button
                  onClick={() => handlePgCourseClick('M.Tech Technology Management')}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 text-slate-800 hover:text-purple-950 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>1. M.Tech Technology Management</span>
                </button>

                <button
                  onClick={() => handlePgCourseClick('M.Tech Digital Marketing')}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 text-slate-800 hover:text-purple-950 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span>2. M.Tech Digital Marketing</span>
                </button>

                <button
                  onClick={() => handlePgCourseClick('M.Tech Nanotechnology')}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 text-slate-800 hover:text-purple-950 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  <span>3. M.Tech Nanotechnology</span>
                </button>

                <button
                  onClick={() => handlePgCourseClick('PGD Technology Management')}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 text-slate-800 hover:text-purple-950 font-bold text-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <span>4. PGD Technology Management</span>
                </button>

                <div className="border-t border-slate-100 mt-1 pt-1.5 px-2">
                  <button
                    onClick={() => {
                      setShowPgDropdown(false);
                      onOpenUpload();
                    }}
                    className="w-full py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Courseware Module</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenDashboard}
            className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>My Shelf</span>
            {(borrowedCount > 0 || savedCount > 0) && (
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {borrowedCount + savedCount}
              </span>
            )}
          </button>

          {currentRole === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Admin</span>
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

          {/* Account Authentication & User Profile Button */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="p-2 md:px-3.5 md:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-extrabold text-xs flex items-center space-x-2 transition-all shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <span className="hidden md:inline line-clamp-1 max-w-[120px]">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs font-medium animate-in fade-in">
                  <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="font-extrabold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">{currentUser.email || 'abubakar.rufai@nacetem.gov.ng'}</p>
                    <span className="inline-block mt-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {currentUser.roleLabel || 'NACETEM Researcher'}
                    </span>
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

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 font-extrabold flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Sign Out / Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md transition-all hover:scale-105"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
