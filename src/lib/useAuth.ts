import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (err) => {
          console.warn('Firebase Auth state change notice:', err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('onAuthStateChanged error:', err);
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setError(null);

    if (!auth) {
      const msg = 'Firebase Authentication is waiting for configuration. Please check your project settings.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
      setUser(userCredential.user);
      return { success: true, user: userCredential.user };
    } catch (err: any) {
      let message = 'Failed to sign in. Please verify your credentials.';
      const code = err?.code || '';

      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        message = 'Invalid email or password. Please check your administrator credentials.';
      } else if (code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (code === 'auth/user-disabled') {
        message = 'This administrator account has been disabled.';
      } else if (code === 'auth/too-many-requests') {
        message = 'Too many unsuccessful attempts. Access is temporarily paused for security. Please try again later.';
      } else if (code === 'auth/network-request-failed') {
        message = 'Network connection error. Please check your internet connection.';
      } else if (
        code === 'auth/api-key-not-valid' ||
        code === 'auth/invalid-api-key' ||
        (typeof err?.message === 'string' && err.message.toLowerCase().includes('api-key-not-valid'))
      ) {
        message = 'Firebase Web API Key is invalid or not authorized. Please verify the Web API key in Firebase Console (Project Settings > Web App).';
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    setError(null);
    if (!auth) {
      setUser(null);
      return { success: true };
    }
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return { success: true };
    } catch (err: any) {
      const message = err?.message || 'Failed to sign out.';
      setError(message);
      return { success: false, error: message };
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    setError,
    isAuthenticated: !!user,
    isConfigured: isFirebaseConfigured,
  };
}


