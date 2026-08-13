import React, { useEffect } from 'react';
import { useAuth } from '../../lib/useAuth';
import { AdminLogin } from './AdminLogin';
import { AdminProtectedArea } from './AdminProtectedArea';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  onNavigateHome: () => void;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ onNavigateHome }) => {
  const { user, loading, error, login, logout, setError, isAuthenticated } = useAuth();

  // Ensure page title reflects the admin section
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'KashmirYatra Administrator Portal';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-200 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          Verifying Administrator Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <AdminLogin
        onLogin={login}
        error={error}
        onClearError={() => setError(null)}
        onNavigateHome={onNavigateHome}
      />
    );
  }

  return (
    <AdminProtectedArea
      user={user}
      onLogout={async () => {
        await logout();
      }}
      onNavigateHome={onNavigateHome}
    />
  );
};
