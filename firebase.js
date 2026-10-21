// ============================================================
//  Shared Firebase setup — sob page ekhan theke use kore
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore, collection, getDocs, getDoc, doc, addDoc, setDoc, updateDoc,
  deleteDoc, writeBatch, serverTimestamp, query, where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const SDK_VERSION = "10.8.0";

export const firebaseConfig = {
  apiKey: "AIzaSyDl2pILFM9x3C7YmoR_njvi0D0nhoXMGwc",
  authDomain: "islamic-7d4c8.firebaseapp.com",
  projectId: "islamic-7d4c8",
  storageBucket: "islamic-7d4c8.firebasestorage.app",
  messagingSenderId: "620918372317",
  appId: "1:620918372317:web:20dd4cf1f4c4957b772834",
  measurementId: "G-44K8JXMP3N"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export {
  collection, getDocs, getDoc, doc, addDoc, setDoc, updateDoc,
  deleteDoc, writeBatch, serverTimestamp, query, where
};

// File upload to Firebase Storage (loaded only when needed)
export async function uploadFile(file, path, onProgress) {
  const { getStorage, ref, uploadBytesResumable, getDownloadURL } = await import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-storage.js`);
  const r = ref(getStorage(app), path), task = uploadBytesResumable(r, file);
  await new Promise((res, rej) => task.on('state_changed', (s) => onProgress && onProgress(s.bytesTransferred / (s.totalBytes || 1)), rej, res));
  return getDownloadURL(r);
}
