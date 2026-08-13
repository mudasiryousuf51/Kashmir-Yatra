import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kashmir-yatra.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kashmir-yatra',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kashmir-yatra.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.trim().length > 0
);

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
  }
}

export const app = appInstance;
export const auth = authInstance;
export const db = dbInstance;

export const getFirebaseApp = (): FirebaseApp | null => appInstance;
export const getFirebaseAuth = (): Auth | null => authInstance;
export const getFirebaseDb = (): Firestore | null => dbInstance;

// Prepared collection constants for future Firestore usage
export const COLLECTIONS = {
  PACKAGES: 'packages',
  DESTINATIONS: 'destinations',
  ENQUIRIES: 'enquiries',
  CONVERSATIONS: 'conversations',
  SETTINGS: 'settings',
} as const;

export default appInstance;


