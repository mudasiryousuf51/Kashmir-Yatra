import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../Logo';

interface AdminLoginProps {
  onLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  error: string | null;
  onClearError: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLogin,
  error,
  onClearError,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localValidation, setLocalValidation] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidation(null);
    onClearError();

    if (!email.trim()) {
      setLocalValidation('Please enter your administrator email address.');
      return;
    }

    if (!password) {
      setLocalValidation('Please enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      await onLogin(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  const displayedError = localValidation || error;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 flex flex-col justify-between text-stone-100 px-4 py-8">
      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          id="admin-back-to-site-btn"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg transition-colors cursor-pointer border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to KashmirYatra Public Site</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-amber-300/80 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Protected Admin Gateway</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-stone-900/90 border border-emerald-500/20 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          {/* Header & Logo */}
          <div className="text-center space-y-3 mb-6">
            <div className="flex justify-center">
              <Logo variant="light" size="md" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Administrator Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-stone-400 leading-relaxed">
              Enter your authorized Firebase credentials to manage KashmirYatra.
            </p>
          </div>

          {/* Error Banner */}
          {displayedError && (
            <div
              id="admin-login-error"
              className="mb-5 p-3.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-semibold block text-red-300">Authentication Error</span>
                <p className="text-red-200/90 leading-relaxed">{displayedError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email-input"
                className="block text-xs font-semibold text-stone-300 mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email-input"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (localValidation) setLocalValidation(null);
                    if (error) onClearError();
                  }}
                  placeholder="admin@kashmiryatra.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-950/70 border border-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm text-white placeholder-stone-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-semibold text-stone-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (localValidation) setLocalValidation(null);
                    if (error) onClearError();
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-950/70 border border-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm text-white placeholder-stone-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ring-1 ring-emerald-400/30"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Sign In as Administrator</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-stone-800 text-center">
            <p className="text-[11px] text-stone-400 leading-relaxed">
              🔐 <strong>Access Restricted:</strong> Administrator accounts are created and authenticated directly via Firebase. Public registration is permanently disabled.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-stone-400">
        KashmirYatra • Awantipora, Jammu & Kashmir — 192122
      </div>
    </div>
  );
};
