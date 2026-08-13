import React, { useState } from 'react';
import {
  ShieldCheck,
  LogOut,
  User,
  Database,
  CheckCircle2,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  Loader2,
  MessageSquare,
  Package as PackageIcon,
  Flame,
} from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import { Logo } from '../Logo';
import { AdminPackagesManager } from './AdminPackagesManager';
import { AdminEnquiriesManager } from './AdminEnquiriesManager';

interface AdminProtectedAreaProps {
  user: FirebaseUser;
  onLogout: () => Promise<void>;
  onNavigateHome: () => void;
}

type AdminSection = 'enquiries' | 'packages' | 'system';

export const AdminProtectedArea: React.FC<AdminProtectedAreaProps> = ({
  user,
  onLogout,
  onNavigateHome,
}) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('enquiries');

  const handleLogoutClick = async () => {
    setLoggingOut(true);
    try {
      await onLogout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between font-sans">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-emerald-900/30 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div onClick={onNavigateHome} className="cursor-pointer">
              <Logo variant="light" size="sm" />
            </div>
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              id="admin-logout-btn"
              onClick={handleLogoutClick}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-200 text-xs font-semibold border border-red-500/30 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {loggingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5 text-red-400" />
              )}
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex-grow space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Authentication Successful</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                KashmirYatra Admin Hub
              </h1>
              <p className="text-xs sm:text-sm text-stone-300">
                Manage AI customer conversations, booking requests, and tour package offerings in real-time.
              </p>
            </div>

            <div className="bg-stone-950/60 border border-emerald-500/20 rounded-xl p-3.5 text-xs text-stone-300 shrink-0 space-y-1">
              <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
                Active Administrator
              </div>
              <div className="font-mono text-emerald-300 font-semibold truncate max-w-[240px]">
                {user.email}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Navigation Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-900 border border-stone-800 rounded-2xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSection('enquiries')}
            className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
              activeSection === 'enquiries'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Enquiries & Leads</span>
          </button>

          <button
            onClick={() => setActiveSection('packages')}
            className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
              activeSection === 'packages'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <PackageIcon className="w-4 h-4" />
            <span>Tour Packages Catalog</span>
          </button>

          <button
            onClick={() => setActiveSection('system')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
              activeSection === 'system'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>System & Diagnostics</span>
          </button>
        </div>

        {/* Active Section Content */}
        {activeSection === 'enquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>AI Customer Conversations & Booking Tracking</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Track visitor questions, detected package interest, and incoming booking requests logged by the AI Concierge.
                </p>
              </div>
            </div>

            <AdminEnquiriesManager />
          </div>
        )}

        {activeSection === 'packages' && (
          <div className="space-y-4">
            <AdminPackagesManager />
          </div>
        )}

        {activeSection === 'system' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>System Security & Firestore Infrastructure</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Infrastructure diagnostics and Firebase Authentication status.
                </p>
              </div>
            </div>

            {/* Security & System Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Auth Card */}
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Administrator Account</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Firebase Email/Password</p>
                </div>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Email:</span>
                    <span className="text-stone-200 font-bold truncate max-w-[150px]">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">UID:</span>
                    <span className="text-stone-300 truncate max-w-[120px]">{user.uid}</span>
                  </div>
                </div>
              </div>

              {/* Database Card */}
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Cloud Firestore</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Packages & Conversations Collections</p>
                </div>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Project ID:</span>
                    <span className="font-mono text-blue-300 font-semibold">kashmir-yatra</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Status:</span>
                    <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Live Sync Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Route Protection</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Role-Based Access Control</p>
                </div>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Public Signup:</span>
                    <span className="text-amber-300 font-semibold">Disabled (Console Only)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Session:</span>
                    <span className="text-emerald-400 font-semibold">Secured by Firebase Auth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Admin Footer */}
      <footer className="border-t border-stone-900 bg-stone-950/80 px-4 py-4 text-center text-xs text-stone-400">
        KashmirYatra Administrator System • Protected by Firebase Auth • Awantipora, J&K
      </footer>
    </div>
  );
};
