import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, COLLECTIONS } from './firebase';
import { Conversation, ChatMessage, EnquiryStatus } from '../types';
import { PACKAGES } from '../data/kashmirData';

const SESSION_STORAGE_KEY = 'kashmir_yatra_anon_session_id';
const CONVERSATION_STORAGE_KEY = 'kashmir_yatra_active_conv_id';
const LOCAL_CONVERSATIONS_CACHE = 'kashmir_yatra_admin_conversations_cache';

// 1. ANONYMOUS SESSION MANAGEMENT
export function getOrCreateAnonymousSessionId(): string {
  try {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = `ky_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  } catch (e) {
    return `ky_sess_${Date.now()}_temp`;
  }
}

export function getOrCreateConversationId(): string {
  try {
    let convId = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (!convId) {
      const sessionId = getOrCreateAnonymousSessionId();
      convId = `conv_${sessionId}`;
      localStorage.setItem(CONVERSATION_STORAGE_KEY, convId);
    }
    return convId;
  } catch (e) {
    return `conv_${Date.now()}`;
  }
}

// 2. INTELLIGENT PACKAGE, DESTINATION & BOOKING INTENT DETECTOR
export interface DetectionResult {
  detectedPackage: string | null;
  detectedDestination: string | null;
  bookingIntent: boolean;
  bookingRequested: boolean;
}

export function analyzeConversationIntent(
  messages: ChatMessage[],
  latestUserText: string
): DetectionResult {
  const fullText = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.text.toLowerCase())
    .join(' ') + ' ' + latestUserText.toLowerCase();

  const latestText = latestUserText.toLowerCase();

  // A. Detect Package (confident matching only)
  let detectedPackage: string | null = null;

  if (
    fullText.includes('escape') ||
    fullText.includes('3n/4d') ||
    fullText.includes('3 night') ||
    fullText.includes('4 day holiday') ||
    fullText.includes('kashmir escape')
  ) {
    detectedPackage = 'Kashmir Escape (3N/4D)';
  } else if (
    fullText.includes('explorer') ||
    fullText.includes('4n/5d') ||
    fullText.includes('4 night') ||
    fullText.includes('5 day') ||
    fullText.includes('kashmir explorer') ||
    fullText.includes('5 days kashmir')
  ) {
    if (fullText.includes('gurez') || fullText.includes('offbeat explorer')) {
      detectedPackage = 'Offbeat Kashmir Explorer (4N/5D)';
    } else if (fullText.includes('trek') || fullText.includes('alpine lake')) {
      detectedPackage = 'Alpine Lakes Trekking (4N/5D)';
    } else {
      detectedPackage = 'Kashmir Explorer (4N/5D)';
    }
  } else if (
    fullText.includes('grand tour') ||
    fullText.includes('5n/6d') ||
    fullText.includes('5 night') ||
    fullText.includes('6 day') ||
    fullText.includes('kashmir grand') ||
    fullText.includes('golden triangle')
  ) {
    if (fullText.includes('offbeat grand') || fullText.includes('bangus')) {
      detectedPackage = 'Offbeat Kashmir Grand Experience (5N/6D)';
    } else if (fullText.includes('rafting') || fullText.includes('safari') || fullText.includes('thrill')) {
      detectedPackage = 'Kashmir Thrill — Rafting & Safari (5N/6D)';
    } else {
      detectedPackage = 'Kashmir Grand Tour (5N/6D)';
    }
  } else if (fullText.includes('gurez') || fullText.includes('dawar') || fullText.includes('habba khatoon')) {
    detectedPackage = 'Offbeat Kashmir Explorer (4N/5D)';
  } else if (fullText.includes('ski') || fullText.includes('snowboard') || fullText.includes('powder snow')) {
    detectedPackage = 'Gulmarg Alpine Ski & Snow Expedition (3N/4D)';
  } else if (fullText.includes('trek') || fullText.includes('camping')) {
    detectedPackage = 'Alpine Lakes Trekking & Camping (4N/5D)';
  } else if (fullText.includes('doodhpathri') || fullText.includes('yusmarg')) {
    detectedPackage = 'Offbeat Kashmir Escape (3N/4D)';
  }

  // Cross-check with PACKAGES data if still null
  if (!detectedPackage) {
    for (const p of PACKAGES) {
      if (fullText.includes(p.title.toLowerCase())) {
        detectedPackage = p.title;
        break;
      }
    }
  }

  // B. Detect Destination
  let detectedDestination: string | null = null;
  const destinationKeywords = [
    { name: 'Gulmarg', keys: ['gulmarg', 'gondola', 'apharwat', 'kungdoor'] },
    { name: 'Pahalgam', keys: ['pahalgam', 'betaab', 'aru valley', 'baisaran', 'chandanwari', 'lidder'] },
    { name: 'Sonamarg', keys: ['sonamarg', 'thajiwas', 'sindh river', 'glacier'] },
    { name: 'Gurez Valley', keys: ['gurez', 'dawar', 'habba khatoon', 'razdan'] },
    { name: 'Doodhpathri', keys: ['doodhpathri', 'shaliganga', 'valley of milk'] },
    { name: 'Yusmarg', keys: ['yusmarg', 'doodh ganga', 'nilnag'] },
    { name: 'Aharbal', keys: ['aharbal', 'veshav'] },
    { name: 'Srinagar / Dal Lake', keys: ['srinagar', 'dal lake', 'shikara', 'houseboat', 'mughal garden', 'nishat', 'shalimar'] },
  ];

  for (const item of destinationKeywords) {
    if (item.keys.some((k) => fullText.includes(k))) {
      detectedDestination = item.name;
      break;
    }
  }

  // C. Detect Booking Intent & Booking Request
  const bookingIntentKeywords = [
    'i want to book',
    'want to book',
    'can i book',
    'how to book',
    'how do i book',
    'can i reserve',
    'i want to reserve',
    'confirm the trip',
    'confirm booking',
    'reserve this',
    'book this',
    'book for',
    'reserve for',
    'proceed with booking',
    'make a reservation',
    'book now',
    'please book',
    'booking request',
    'ready to book',
    'schedule booking',
  ];

  const bookingIntent = bookingIntentKeywords.some(
    (kw) => latestText.includes(kw) || fullText.includes(kw)
  );

  const bookingRequested = bookingIntentKeywords.some((kw) => latestText.includes(kw));

  return {
    detectedPackage,
    detectedDestination,
    bookingIntent,
    bookingRequested,
  };
}

// 3. PERSIST CONVERSATION TO FIRESTORE (AND LOCAL CACHE)
export async function trackAndSaveConversation(params: {
  conversationId: string;
  anonymousSessionId: string;
  allMessages: ChatMessage[];
  latestUserMessage: string;
  customDetectedPackage?: string | null;
}): Promise<DetectionResult> {
  const {
    conversationId,
    anonymousSessionId,
    allMessages,
    latestUserMessage,
    customDetectedPackage,
  } = params;

  const analysis = analyzeConversationIntent(allMessages, latestUserMessage);
  const finalDetectedPackage = customDetectedPackage || analysis.detectedPackage;

  const now = new Date().toISOString();

  // Determine status: If booking requested, promote to 'Booking Requested'
  let calculatedStatus: EnquiryStatus = 'New';
  if (analysis.bookingIntent || analysis.bookingRequested) {
    calculatedStatus = 'Booking Requested';
  } else if (allMessages.length > 3) {
    calculatedStatus = 'In Progress';
  }

  const conversationRecord: Conversation = {
    id: conversationId,
    conversationId,
    anonymousSessionId,
    createdAt: now,
    updatedAt: now,
    messages: allMessages,
    detectedPackage: finalDetectedPackage,
    detectedDestination: analysis.detectedDestination,
    enquiryStatus: calculatedStatus,
    bookingIntent: analysis.bookingIntent,
    bookingRequested: analysis.bookingRequested,
    lastUserMessage: latestUserMessage,
  };

  // 1. Try writing to Firestore
  if (db) {
    try {
      const docRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId);
      await setDoc(
        docRef,
        {
          ...conversationRecord,
          updatedAt: now,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore conversation logging notice (using resilient local cache):', err);
    }
  }

  // 2. Always maintain local cache for resilience and offline support
  updateLocalConversationCache(conversationRecord);

  return analysis;
}

// 4. ADMIN DASHBOARD ENQUIRY QUERIES
export async function getAllConversationsForAdmin(): Promise<{
  conversations: Conversation[];
  isFromFirestore: boolean;
}> {
  if (db) {
    try {
      const convRef = collection(db, COLLECTIONS.CONVERSATIONS);
      const snapshot = await getDocs(convRef);

      if (!snapshot.empty) {
        const firestoreList: Conversation[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          firestoreList.push(normalizeConversationDoc(data, docSnap.id));
        });

        // Sort descending by updatedAt
        firestoreList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

        // Update local cache
        try {
          localStorage.setItem(LOCAL_CONVERSATIONS_CACHE, JSON.stringify(firestoreList));
        } catch (e) {}

        return { conversations: firestoreList, isFromFirestore: true };
      }
    } catch (err) {
      console.warn('Admin Firestore conversation fetch notice:', err);
    }
  }

  // Fallback to local cache
  try {
    const cached = localStorage.getItem(LOCAL_CONVERSATIONS_CACHE);
    if (cached) {
      const parsed: Conversation[] = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        return { conversations: parsed, isFromFirestore: false };
      }
    }
  } catch (e) {}

  return { conversations: [], isFromFirestore: false };
}

// 5. UPDATE ENQUIRY STATUS & ADMIN NOTES
export async function updateEnquiryStatus(
  conversationId: string,
  newStatus: EnquiryStatus,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const updatePayload: any = {
    enquiryStatus: newStatus,
    updatedAt: new Date().toISOString(),
  };
  if (notes !== undefined) {
    updatePayload.notes = notes;
  }

  if (db) {
    try {
      const docRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId);
      await updateDoc(docRef, updatePayload);
      updateLocalConversationPartial(conversationId, updatePayload);
      return { success: true };
    } catch (err: any) {
      console.warn('Firestore status update notice:', err);
      try {
        const docRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId);
        await setDoc(docRef, updatePayload, { merge: true });
        updateLocalConversationPartial(conversationId, updatePayload);
        return { success: true };
      } catch (inner: any) {
        updateLocalConversationPartial(conversationId, updatePayload);
        return { success: true, error: inner.message };
      }
    }
  }

  updateLocalConversationPartial(conversationId, updatePayload);
  return { success: true };
}

// 6. DELETE CONVERSATION
export async function deleteConversationRecord(
  conversationId: string
): Promise<{ success: boolean; error?: string }> {
  if (db) {
    try {
      const docRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Firestore delete notice:', err);
    }
  }

  deleteFromLocalConversationCache(conversationId);
  return { success: true };
}

// Helper to normalize Firestore conversation document
function normalizeConversationDoc(data: any, id: string): Conversation {
  return {
    id: id || data.conversationId || `conv-${Date.now()}`,
    conversationId: data.conversationId || id,
    anonymousSessionId: data.anonymousSessionId || 'anon_session',
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    messages: Array.isArray(data.messages) ? data.messages : [],
    detectedPackage: data.detectedPackage || null,
    detectedDestination: data.detectedDestination || null,
    enquiryStatus: (data.enquiryStatus as EnquiryStatus) || 'New',
    bookingIntent: Boolean(data.bookingIntent),
    bookingRequested: Boolean(data.bookingRequested),
    lastUserMessage: data.lastUserMessage || (data.messages?.length ? data.messages[data.messages.length - 1].text : ''),
    notes: data.notes || '',
  };
}

// Helper to cache in localStorage
function updateLocalConversationCache(conv: Conversation) {
  try {
    const raw = localStorage.getItem(LOCAL_CONVERSATIONS_CACHE);
    let list: Conversation[] = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((c) => c.conversationId === conv.conversationId);
    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        ...conv,
        createdAt: list[idx].createdAt || conv.createdAt,
      };
    } else {
      list.unshift(conv);
    }
    localStorage.setItem(LOCAL_CONVERSATIONS_CACHE, JSON.stringify(list));
  } catch (e) {}
}

function updateLocalConversationPartial(convId: string, partial: Partial<Conversation>) {
  try {
    const raw = localStorage.getItem(LOCAL_CONVERSATIONS_CACHE);
    if (raw) {
      let list: Conversation[] = JSON.parse(raw);
      const idx = list.findIndex((c) => c.conversationId === convId);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...partial };
        localStorage.setItem(LOCAL_CONVERSATIONS_CACHE, JSON.stringify(list));
      }
    }
  } catch (e) {}
}

function deleteFromLocalConversationCache(convId: string) {
  try {
    const raw = localStorage.getItem(LOCAL_CONVERSATIONS_CACHE);
    if (raw) {
      let list: Conversation[] = JSON.parse(raw);
      list = list.filter((c) => c.conversationId !== convId);
      localStorage.setItem(LOCAL_CONVERSATIONS_CACHE, JSON.stringify(list));
    }
  } catch (e) {}
}
