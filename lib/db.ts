import { db } from './firebase';
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  Query,
  CollectionReference
} from 'firebase/firestore';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Generic function to get a document
export async function getDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// Generic function to get documents with filters
export async function getDocuments(
  collectionName: string,
  filters?: { field: string; operator: string; value: any }[],
  orderByField?: string,
  limitCount?: number
) {
  let q: Query<DocumentData> = collection(db, collectionName);
  
  if (filters) {
    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator as any, filter.value));
    });
  }
  
  if (orderByField) {
    q = query(q, orderBy(orderByField));
  }
  
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Generic function to create or update a document
export async function setDocument(collectionName: string, docId: string, data: DocumentData) {
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, data, { merge: true });
  return docId;
}

// Generic function to update a document
export async function updateDocument(collectionName: string, docId: string, data: DocumentData) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
  return docId;
}

// Generic function to delete a document
export async function deleteDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
  return docId;
}

// User-specific operations
export async function getUser(userId: string) {
  return getDocument('users', userId);
}

export async function updateUser(userId: string, data: DocumentData) {
  return updateDocument('users', userId, data);
}

// Admin-specific operations
export async function getAdmin(adminId: string) {
  return getDocument('admin', adminId);
}

// Content-specific operations
export async function getContent(userId: string) {
  return getDocuments('content_gen', [{ field: 'user_id', operator: '==', value: userId }]);
}

export async function createContent(data: DocumentData) {
  const docId = doc(collection(db, 'content_gen')).id;
  return setDocument('content_gen', docId, { ...data, created_at: new Date().toISOString() });
}

// Keywords-specific operations
export async function getKeywords(userId: string) {
  return getDocuments('keywords', [{ field: 'user_id', operator: '==', value: userId }]);
}

export async function createKeyword(data: DocumentData) {
  const docId = doc(collection(db, 'keywords')).id;
  return setDocument('keywords', docId, { ...data, created_at: new Date().toISOString() });
}

// Competitors-specific operations
export async function getCompetitors(userId: string) {
  return getDocuments('competitors', [{ field: 'user_id', operator: '==', value: userId }]);
}

export async function createCompetitor(data: DocumentData) {
  const docId = doc(collection(db, 'competitors')).id;
  return setDocument('competitors', docId, { ...data, created_at: new Date().toISOString() });
}

// Shorts-specific operations
export async function getShorts(userId: string) {
  return getDocuments('shorts', [{ field: 'user_id', operator: '==', value: userId }]);
}

export async function createShort(data: DocumentData) {
  const docId = doc(collection(db, 'shorts')).id;
  return setDocument('shorts', docId, { ...data, created_at: new Date().toISOString() });
} 