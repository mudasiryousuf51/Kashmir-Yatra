import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db, COLLECTIONS } from './firebase';
import { PACKAGES } from '../data/kashmirData';
import { Package, PackageCategory } from '../types';

const LOCAL_STORAGE_OVERRIDE_KEY = 'kashmir_yatra_packages_override';

// Helper to normalize Firestore document data into standard Package type
export function normalizePackageDoc(data: any, id: string): Package {
  const price = Number(data.startingPricePerPerson ?? data.price ?? 11999);
  const nights = Number(data.nightsCount ?? data.nights ?? 3);
  const days = Number(data.daysCount ?? data.days ?? nights + 1);

  return {
    id: id || data.id || `package-${Date.now()}`,
    title: data.title || 'Kashmir Tour Package',
    tagline: data.tagline || '',
    category: (data.category as PackageCategory) || 'holiday',
    duration: data.duration || `${nights} Nights / ${days} Days`,
    nightsCount: nights,
    daysCount: days,
    startingPricePerPerson: isNaN(price) ? 11999 : price,
    destinationsCovered: Array.isArray(data.destinationsCovered)
      ? data.destinationsCovered
      : Array.isArray(data.destinations)
      ? data.destinations
      : ['Srinagar', 'Gulmarg', 'Pahalgam'],
    keyHighlights: Array.isArray(data.keyHighlights)
      ? data.keyHighlights
      : Array.isArray(data.highlights)
      ? data.highlights
      : [],
    overview: data.overview || data.description || '',
    itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
    accommodationInfo: data.accommodationInfo || '3-Star / 4-Star Deluxe Hotel & Houseboat',
    transportationInfo: data.transportationInfo || 'Dedicated Private Sedan/SUV (Etios/Innova)',
    inclusions: Array.isArray(data.inclusions) ? data.inclusions : [],
    exclusions: Array.isArray(data.exclusions) ? data.exclusions : [],
    bestTime: data.bestTime || 'April to October & December to February (Snow)',
    difficulty: data.difficulty || 'Easy',
    importantNotes: Array.isArray(data.importantNotes) ? data.importantNotes : [],
    image:
      data.image ||
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    active: data.active !== false, // default to active if not specified
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

// Convert Package instance to plain Firestore document payload
export function packageToFirestorePayload(pkg: Partial<Package>) {
  return {
    id: pkg.id,
    title: pkg.title,
    tagline: pkg.tagline || '',
    category: pkg.category || 'holiday',
    duration: pkg.duration || `${pkg.nightsCount || 3} Nights / ${pkg.daysCount || 4} Days`,
    nightsCount: Number(pkg.nightsCount || 3),
    daysCount: Number(pkg.daysCount || 4),
    nights: Number(pkg.nightsCount || 3),
    days: Number(pkg.daysCount || 4),
    startingPricePerPerson: Number(pkg.startingPricePerPerson || 0),
    price: Number(pkg.startingPricePerPerson || 0),
    destinationsCovered: pkg.destinationsCovered || [],
    destinations: pkg.destinationsCovered || [],
    keyHighlights: pkg.keyHighlights || [],
    highlights: pkg.keyHighlights || [],
    overview: pkg.overview || '',
    description: pkg.overview || '',
    itinerary: pkg.itinerary || [],
    accommodationInfo: pkg.accommodationInfo || '',
    transportationInfo: pkg.transportationInfo || '',
    inclusions: pkg.inclusions || [],
    exclusions: pkg.exclusions || [],
    bestTime: pkg.bestTime || '',
    difficulty: pkg.difficulty || 'Easy',
    importantNotes: pkg.importantNotes || [],
    image: pkg.image || '',
    active: pkg.active !== false,
    updatedAt: new Date().toISOString(),
  };
}

// Fetch Active Packages for Public Website (with static fallback)
export async function getActivePackages(): Promise<Package[]> {
  // 1. Try Firestore if available
  if (db) {
    try {
      const packagesRef = collection(db, COLLECTIONS.PACKAGES);
      const snapshot = await getDocs(packagesRef);

      if (!snapshot.empty) {
        const firestorePackages: Package[] = [];
        snapshot.forEach((docSnap) => {
          const pkg = normalizePackageDoc(docSnap.data(), docSnap.id);
          if (pkg.active !== false) {
            firestorePackages.push(pkg);
          }
        });

        if (firestorePackages.length > 0) {
          return firestorePackages;
        }
      }
    } catch (err) {
      console.warn('Firestore fetch notice (using static fallback):', err);
    }
  }

  // 2. Fallback to LocalStorage overrides if any exist
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_OVERRIDE_KEY);
    if (cached) {
      const parsed: Package[] = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((p) => p.active !== false);
      }
    }
  } catch (e) {
    // Ignore localStorage parse error
  }

  // 3. Fallback to static packages from src/data/kashmirData.ts
  return PACKAGES.map((pkg) => ({
    ...pkg,
    active: true,
  }));
}

// Fetch All Packages for Admin (including inactive)
export async function getAllPackagesForAdmin(): Promise<{ packages: Package[]; isFromFirestore: boolean }> {
  if (db) {
    try {
      const packagesRef = collection(db, COLLECTIONS.PACKAGES);
      const snapshot = await getDocs(packagesRef);

      if (!snapshot.empty) {
        const firestorePackages: Package[] = [];
        snapshot.forEach((docSnap) => {
          firestorePackages.push(normalizePackageDoc(docSnap.data(), docSnap.id));
        });
        return { packages: firestorePackages, isFromFirestore: true };
      }
    } catch (err) {
      console.warn('Admin Firestore fetch notice:', err);
    }
  }

  // Fallback to local storage or static data
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_OVERRIDE_KEY);
    if (cached) {
      const parsed: Package[] = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { packages: parsed, isFromFirestore: false };
      }
    }
  } catch (e) {
    // ignore
  }

  return {
    packages: PACKAGES.map((pkg) => ({ ...pkg, active: true })),
    isFromFirestore: false,
  };
}

// Migrate Static Packages into Firestore (Safe & Idempotent, Never Duplicates)
export async function migrateStaticPackagesToFirestore(): Promise<{ count: number; error?: string }> {
  if (!db) {
    // Cache to localStorage if Firestore is not directly reachable
    try {
      localStorage.setItem(LOCAL_STORAGE_OVERRIDE_KEY, JSON.stringify(PACKAGES.map((p) => ({ ...p, active: true }))));
      return { count: PACKAGES.length };
    } catch (e: any) {
      return { count: 0, error: e.message || 'Firestore is unconfigured' };
    }
  }

  try {
    const batch = writeBatch(db);
    let count = 0;

    for (const pkg of PACKAGES) {
      const docRef = doc(db, COLLECTIONS.PACKAGES, pkg.id);
      const payload = packageToFirestorePayload({
        ...pkg,
        active: true,
      });
      batch.set(docRef, payload, { merge: true });
      count++;
    }

    await batch.commit();

    // Also sync local cache
    try {
      localStorage.setItem(LOCAL_STORAGE_OVERRIDE_KEY, JSON.stringify(PACKAGES.map((p) => ({ ...p, active: true }))));
    } catch (e) {
      // ignore
    }

    return { count };
  } catch (err: any) {
    console.error('Error during static package migration:', err);
    return { count: 0, error: err.message || 'Failed to migrate packages to Firestore' };
  }
}

// Save or Update a Package in Firestore
export async function savePackage(pkg: Package): Promise<{ success: boolean; error?: string }> {
  const payload = packageToFirestorePayload(pkg);

  if (db) {
    try {
      const docRef = doc(db, COLLECTIONS.PACKAGES, pkg.id);
      await setDoc(docRef, payload, { merge: true });
      updateLocalCache(pkg);
      return { success: true };
    } catch (err: any) {
      console.error('Error saving package to Firestore:', err);
      // Fallback update to local cache
      updateLocalCache(pkg);
      return { success: true, error: err.message };
    }
  }

  updateLocalCache(pkg);
  return { success: true };
}

// Toggle Package Active Status
export async function togglePackageActive(id: string, currentActive: boolean): Promise<{ success: boolean; error?: string }> {
  const newActive = !currentActive;

  if (db) {
    try {
      const docRef = doc(db, COLLECTIONS.PACKAGES, id);
      await updateDoc(docRef, {
        active: newActive,
        updatedAt: new Date().toISOString(),
      });
      updateLocalCachePartial(id, { active: newActive });
      return { success: true };
    } catch (err: any) {
      console.warn('Firestore toggle notice:', err);
      // Try setDoc with merge if document wasn't yet created
      try {
        const docRef = doc(db, COLLECTIONS.PACKAGES, id);
        await setDoc(docRef, { active: newActive, updatedAt: new Date().toISOString() }, { merge: true });
        updateLocalCachePartial(id, { active: newActive });
        return { success: true };
      } catch (innerErr: any) {
        updateLocalCachePartial(id, { active: newActive });
        return { success: false, error: innerErr.message };
      }
    }
  }

  updateLocalCachePartial(id, { active: newActive });
  return { success: true };
}

// Delete a Package from Firestore
export async function deletePackage(id: string): Promise<{ success: boolean; error?: string }> {
  if (db) {
    try {
      const docRef = doc(db, COLLECTIONS.PACKAGES, id);
      await deleteDoc(docRef);
      deleteFromLocalCache(id);
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting package:', err);
      deleteFromLocalCache(id);
      return { success: false, error: err.message };
    }
  }

  deleteFromLocalCache(id);
  return { success: true };
}

// Local cache helpers
function updateLocalCache(pkg: Package) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_OVERRIDE_KEY);
    let list: Package[] = raw ? JSON.parse(raw) : [...PACKAGES.map((p) => ({ ...p, active: true }))];
    const index = list.findIndex((p) => p.id === pkg.id);
    if (index >= 0) {
      list[index] = pkg;
    } else {
      list.push(pkg);
    }
    localStorage.setItem(LOCAL_STORAGE_OVERRIDE_KEY, JSON.stringify(list));
  } catch (e) {
    // ignore
  }
}

function updateLocalCachePartial(id: string, partial: Partial<Package>) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_OVERRIDE_KEY);
    let list: Package[] = raw ? JSON.parse(raw) : [...PACKAGES.map((p) => ({ ...p, active: true }))];
    const index = list.findIndex((p) => p.id === id);
    if (index >= 0) {
      list[index] = { ...list[index], ...partial };
      localStorage.setItem(LOCAL_STORAGE_OVERRIDE_KEY, JSON.stringify(list));
    }
  } catch (e) {
    // ignore
  }
}

function deleteFromLocalCache(id: string) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_OVERRIDE_KEY);
    if (raw) {
      let list: Package[] = JSON.parse(raw);
      list = list.filter((p) => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_OVERRIDE_KEY, JSON.stringify(list));
    }
  } catch (e) {
    // ignore
  }
}
