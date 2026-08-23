import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  CheckCircle, 
  ArrowRight, 
  KeyRound,
  Inbox,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthenticate }) {
  const [tab, setTab] = useState('signin'); // 'signin', 'signup', 'verify'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Verification State
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [previewEmailUrl, setPreviewEmailUrl] = useState('');
  const [developmentCode, setDevelopmentCode] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresVerification) {
          setPendingEmail(data.email || email);
          setTab('verify');
          setErrorMessage('Your email requires confirmation before signing in. Check your inbox for the code below.');
        } else {
          setErrorMessage(data.error || 'Failed to sign in.');
        }
        setIsLoading(false);
        return;
      }

      localStorage.setItem('nacetem_auth_token', data.token);
      onAuthenticate(data.user);
      onClose();
    } catch {
      setErrorMessage('Unable to reach the authentication server. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to register account.');
        setIsLoading(false);
        return;
      }

      setPendingEmail(data.email);
      setPreviewEmailUrl(data.previewEmailUrl || '');
      setDevelopmentCode(data.developmentCode || '');
      setSuccessMessage(data.message);
      setTab('verify');

    } catch {
      setErrorMessage('Unable to reach the registration server. Your account was not created.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail || email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'A new code could not be sent.');
      setDevelopmentCode(data.developmentCode || '');
      setVerificationCode('');
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, code: verificationCode })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Invalid verification code. Please check your email inbox.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('nacetem_auth_token', data.token);
      onAuthenticate(data.user);
      onClose();

    } catch {
      setErrorMessage('Unable to reach the verification server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center text-lg">
              N
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">NACETEM E-Library Auth</h2>
              <p className="text-[11px] text-slate-500 font-medium">SQLite Database & Email Verification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        {tab !== 'verify' && (
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-extrabold">
            <button
              type="button"
              onClick={() => {
                setTab('signin');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'signin' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'signup' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>Institutional Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abubakar.rufai@nacetem.gov.ng"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Account Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to NACETEM E-Library'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 2: SIGN UP FORM */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>Full Name (e.g. Abubakar Rufai)</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Abubakar Rufai"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abubakar.rufai@nacetem.gov.ng"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Create Password *</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Sending Verification Email...' : 'Sign Up & Dispatch Verification Email'}</span>
              <Inbox className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        )}

        {/* TAB 3: EMAIL CONFIRMATION VERIFICATION FORM */}
        {tab === 'verify' && (
          <form onSubmit={handleVerifyEmail} className="space-y-4 text-xs font-medium">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 text-center">
              <Inbox className="w-8 h-8 text-emerald-700 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-sm text-emerald-950">Verification Email Dispatched</h3>
              <p className="text-[11px] text-emerald-800">
                We sent a 6-digit confirmation code to: <br />
                <strong className="text-slate-900 font-mono text-xs">{pendingEmail}</strong>
              </p>

              {previewEmailUrl && (
                <div className="pt-1">
                  <a
                    href={previewEmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-sky-700 hover:underline bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg"
                  >
                    <span>View Sent Email Inbox Online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              {developmentCode && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-900">
                  <span className="block text-[10px] font-bold uppercase">Development only code</span>
                  <strong className="font-mono text-lg tracking-widest">{developmentCode}</strong>
                </div>
              )}
              
            </div>

            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                <span>Enter 6-Digit Email Verification Code *</span>
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="e.g. 584920"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-bold font-mono text-center text-lg tracking-widest"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all"
              >
                {isLoading ? 'Verifying...' : 'Confirm & Sign In'}
              </button>
              <button type="button" onClick={handleResendCode} disabled={isLoading} className="w-full mt-2 py-2 text-emerald-800 font-bold hover:underline disabled:opacity-50">
                Send a new verification code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
