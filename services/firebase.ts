/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let connectionChecked = false;
export async function testConnection(): Promise<void> {
  if (connectionChecked) return;
  connectionChecked = true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

export interface ConsultationBrief {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

export const saveConsultation = async (brief: ConsultationBrief): Promise<string> => {
  await testConnection();
  const path = 'consultations';
  try {
    const docRef = await addDoc(collection(db, path), {
      name: brief.name.trim().slice(0, 120),
      company: brief.company.trim().slice(0, 120),
      email: brief.email.trim().slice(0, 254),
      projectType: brief.projectType.trim().slice(0, 100),
      message: brief.message.trim().slice(0, 2000),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export interface ChatMessageSession {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const saveChatSessionMessage = async (
  sessionId: string,
  messages: ChatMessageSession[]
): Promise<void> => {
  await testConnection();
  const path = 'chat_sessions';
  const safeSessionId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 100) || 'session_default';
  const boundedMessages = messages.slice(-50).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    text: String(m.text).slice(0, 4000),
    timestamp: String(m.timestamp).slice(0, 64),
  }));

  try {
    await addDoc(collection(db, path), {
      sessionId: safeSessionId,
      messages: boundedMessages,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};
