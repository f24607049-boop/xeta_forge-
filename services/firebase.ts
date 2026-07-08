/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuration from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyC9DzMZ_SzQsrcsLaeUejtLJSBNynFdvJM",
  authDomain: "gen-lang-client-0523171342.firebaseapp.com",
  projectId: "gen-lang-client-0523171342",
  storageBucket: "gen-lang-client-0523171342.firebasestorage.app",
  messagingSenderId: "249094342896",
  appId: "1:249094342896:web:8bfc44cedb9cf1a792da35"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-xetaforge-6c6e1ff3-6df5-4011-90b2-e3ccb264372f");

export interface ConsultationBrief {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

export const saveConsultation = async (brief: ConsultationBrief): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'consultations'), {
      ...brief,
      createdAt: serverTimestamp()
    });
    console.log("Consultation saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Firebase store consultation error:", error);
    throw error;
  }
};

export interface ChatMessageSession {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const saveChatSessionMessage = async (sessionId: string, messages: ChatMessageSession[]): Promise<void> => {
  try {
    const sessionRef = collection(db, 'chat_sessions');
    await addDoc(sessionRef, {
      sessionId,
      messages,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving chat session message:", error);
  }
};
