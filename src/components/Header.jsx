import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  Globe, 
  Bookmark, 
  Layers, 
  UploadCloud, 
  BarChart3, 
  ChevronDown,
  LogIn,
  LogOut,
  Quote
} from 'lucide-react';
import { USER_ROLES } from '../data/mockLibraryData';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  onOpenAiCopilot, 
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
  savedCount
}) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case 'staff': return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'admin': return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      default: return <Globe className="w-4 h-4 text-slate-500" />;
    }
  };

  const activeRoleObj = USER_ROLES.find(r => r.id === currentRole) || USER_ROLES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-1.5 text-xs text-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2 container mx-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
          <span className="font-bold text-emerald-800">FEDERAL REPUBLIC OF NIGERIA</span>
          <span className="text-slate-300">•</span>
          <span>Federal Ministry of Innovation, Science and Technology</span>
          <span className="hidden md:inline text-slate-300">•</span>
          <span className="hidden md:inline text-slate-600">National Centre for Technology Management (NACETEM) Digital Library</span>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <span className="text-emerald-700 font-mono text-[11px] font-semibold">System Status: Online | v2.6 Light Portal</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('catalog')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                NACETEM
              </span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                E-Library
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Science, Technology & Innovation Knowledge Hub</p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Navigation Tabs */}
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'catalog' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Catalog</span>
          </button>

          {/* Universal Citation Generator */}
          <button
            onClick={onOpenCitation}
            className="px-3.5 py-2 rounded-xl text-sm font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all flex items-center space-x-1.5"
            title="Cite Any Document or Custom Text (APA, Harvard, IEEE, MLA, Chicago, BibTeX)"
          >
            <Quote className="w-4 h-4 text-amber-700" />
            <span className="hidden md:inline">Cite Tool</span>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={onOpenAiCopilot}
            className="px-3.5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md flex items-center space-x-2 transition-all hover:scale-105 border border-emerald-500"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-bounce" />
            <span className="hidden sm:inline">STI-Assist AI</span>
          </button>

          {/* User Bookshelf / Dashboard */}
          <button
            onClick={onOpenDashboard}
            className="relative px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-1.5 border border-slate-200"
          >
            <Bookmark className="w-4 h-4 text-amber-600 fill-amber-100" />
            <span className="hidden md:inline">My Shelf</span>
            {(borrowedCount > 0 || savedCount > 0) && (
              <span className="ml-1 bg-amber-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {borrowedCount + savedCount}
              </span>
            )}
          </button>

          {/* Research Submission */}
          <button
            onClick={onOpenUpload}
            className="hidden lg:flex px-3 py-2 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all items-center space-x-1.5"
          >
            <UploadCloud className="w-4 h-4 text-emerald-700" />
            <span>Submit Research</span>
          </button>

          {/* Admin Dashboard */}
          {currentRole === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2 rounded-xl text-sm font-semibold bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-all flex items-center space-x-1.5"
            >
              <BarChart3 className="w-4 h-4 text-purple-700" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          )}

          {/* User Sign In / Account Status */}
          {currentUser?.isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div className="hidden xl:flex flex-col text-right text-xs">
                <span className="font-bold text-slate-900 leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-700 font-mono font-semibold">{currentUser.roleLabel}</span>
              </div>

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-700 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <LogIn className="w-4 h-4 text-emerald-700" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 hover:border-emerald-500 text-xs text-slate-800 font-semibold transition-all"
            >
              {getRoleIcon(currentRole)}
              <span className="hidden lg:inline">{activeRoleObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl py-2 border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  User Categories
                </div>
                {USER_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setCurrentRole(role.id);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentRole === role.id ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(role.id)}
                      <span>{role.label}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      {role.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
