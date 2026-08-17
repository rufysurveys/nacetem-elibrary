import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  UserCheck, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  Lock,
  Mail,
  User,
  Check
} from 'lucide-react';
import { USER_ROLES } from '../data/mockLibraryData';

export default function AuthModal({ isOpen, onClose, onAuthenticate }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [role, setRole] = useState('staff'); // 'staff', 'admin', 'other'
  
  // User Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Format clean user display name from input or email
    let cleanName = fullName.trim();
    if (!cleanName) {
      if (email.includes('@')) {
        const prefix = email.split('@')[0];
        cleanName = prefix.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      } else {
        cleanName = email;
      }
    }

    const roleObj = USER_ROLES.find(r => r.id === role) || USER_ROLES[0];

    onAuthenticate({
      isAuthenticated: true,
      email,
      name: cleanName,
      role,
      roleLabel: roleObj.label,
      badge: roleObj.badge
    });

    onClose();
  };

  const handleDemoSignIn = (selectedRole) => {
    const roleObj = USER_ROLES.find(r => r.id === selectedRole) || USER_ROLES[0];
    let demoName = 'Dr. Akindele Famurewa';
    if (selectedRole === 'admin') demoName = 'Prof. Olumuyiwa Olamade (Head Librarian)';
    if (selectedRole === 'other') demoName = 'Abubakar Rufai';

    onAuthenticate({
      isAuthenticated: true,
      email: `${selectedRole}@nacetem.gov.ng`,
      name: demoName,
      role: selectedRole,
      roleLabel: roleObj.label,
      badge: roleObj.badge
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">
                {authMode === 'signin' ? 'Sign In to E-Library' : 'Register Scholar Account'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Access full text papers, citations, shelf & downloads</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setAuthMode('signin')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'signin'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'signup'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Demo Fast Account Switchers */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            1-Click Demo Persona Sign In:
          </span>
          <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
            <button
              onClick={() => handleDemoSignIn('staff')}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 flex flex-col items-center justify-center space-y-1 text-center"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>NACETEM Staff</span>
            </button>
            <button
              onClick={() => handleDemoSignIn('admin')}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 flex flex-col items-center justify-center space-y-1 text-center"
            >
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Admin Librarian</span>
            </button>
            <button
              onClick={() => handleDemoSignIn('other')}
              className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 flex flex-col items-center justify-center space-y-1 text-center"
            >
              <Globe className="w-4 h-4 text-sky-700" />
              <span>Other User</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium pt-2">
          {/* User Account Role Dropdown */}
          <div className="space-y-1">
            <label className="text-slate-800 font-bold">Account Category *</label>
            <div className="grid grid-cols-3 gap-2">
              {USER_ROLES.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                    role === r.id
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full Author Name for Sign Up */}
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="text-slate-800 font-bold">Full Author / Scholar Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="First Name Last Name (e.g. Abubakar Rufai)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-slate-800 font-bold">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="author@nacetem.gov.ng or scholar@gmail.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-slate-800 font-bold">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{authMode === 'signin' ? 'Sign In Now' : 'Create Account & Proceed'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
