import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db, firebaseConfigured } from './firebase';


function removeUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(removeUndefined);
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, child]) => child !== undefined)
        .map(([key, child]) => [key, removeUndefined(child)])
    );
  }
  return value;
}

function requireDb() {
  if (!db) throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* values to .env.local.');
  return db;
}

export async function getCollection<T = Record<string, unknown>>(name: string): Promise<T[]> {
  try {
    console.log("Firebase configured:", firebaseConfigured);
    console.log("Collection requested:", name);

    if (!firebaseConfigured || !db) {
      console.error("Firebase database not initialized");
      return [];
    }

    const snapshot = await getDocs(collection(db, name));

    console.log("Documents fetched:", snapshot.size);
    console.log("Fetched data:", snapshot.docs.map(doc => doc.data()));

    return snapshot.docs.map((item) => ({
      ...item.data(),
      id: item.id
    } as T));

  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}
export async function getUserCollection<T = Record<string, unknown>>(name: string, uid: string): Promise<T[]> {
  const database = requireDb();
  const snapshot = await getDocs(query(collection(database, name), where('userId', '==', uid)));
  return snapshot.docs.map((item) => ({ ...item.data(), id: item.id } as T));
}

export async function createRecord(name: string, data: Record<string, unknown>) {
  const database = requireDb();
  const { id: _ignoredId, ...payload } = data;
  const cleanPayload = removeUndefined(payload) as Record<string, unknown>;
  const ref = await addDoc(collection(database, name), { ...cleanPayload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  return { ...cleanPayload, id: ref.id };
}

export async function updateRecord(name: string, id: string, data: Record<string, unknown>) {
  const database = requireDb();
  const cleanData = removeUndefined(data) as Record<string, unknown>;
  await updateDoc(doc(database, name, id), { ...cleanData, updatedAt: new Date().toISOString() });
}

export async function deleteRecord(name: string, id: string) {
  const database = requireDb();
  await deleteDoc(doc(database, name, id));
}

export async function getRecord(name: string, id: string) {
  const database = requireDb();
  const snapshot = await getDoc(doc(database, name, id));
  return snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null;
}

export async function saveUserRecord(name: string, id: string, data: Record<string, unknown>) {
  const database = requireDb();
  const cleanData = removeUndefined(data) as Record<string, unknown>;
  await setDoc(doc(database, name, id), { ...cleanData, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function registerUser(name: string, email: string, password: string) {
  if (!auth) throw new Error('Firebase Authentication is not configured.');
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  await saveUserRecord('users', result.user.uid, { uid: result.user.uid, name, email: result.user.email });
  return result.user;
}

export async function loginUser(email: string, password: string) {
  if (!auth) throw new Error('Firebase Authentication is not configured.');
  return (await signInWithEmailAndPassword(auth, email, password)).user;
}

export async function logoutUser() {
  if (auth) await signOut(auth);
}
