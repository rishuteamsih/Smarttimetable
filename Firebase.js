// ✅ Campus Connect Firebase Configuration (v10.8.1)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, getDocs, updateDoc, addDoc,
  collection, query, where, orderBy, onSnapshot, serverTimestamp,
  arrayUnion, arrayRemove, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  getStorage, ref as sRef, uploadBytesResumable, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// 🔧 Firebase config  (your same project)
const firebaseConfig = {
  apiKey: "AIzaSyAFKmM22FUSQPYy-eMsBzcZN3bmAxglXl0",
  authDomain: "smart-timetable-266fe.firebaseapp.com",
  projectId: "smart-timetable-266fe",
  storageBucket: "smart-timetable-266fe.appspot.com",
};

// 🚀 Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//
// ─── PROFILE HELPERS ──────────────────────────────
//
export async function getUserProfile(uid) {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
}
export async function saveUserProfile(uid, data) {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(ref, data, { merge: true });
    return true;
  } catch (err) {
    console.error("Error saving profile:", err);
    return false;
  }
}

//
// ─── AUTH HELPER ──────────────────────────────────
//
export function requireAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("Session expired or not logged in. Please sign in again.");
      window.location.href = "index.html";
    } else {
      callback(user);
    }
  });
}

// optional: get current user once
export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user || null);
    });
  });
}

//
// ─── EXPORT EVERYTHING ────────────────────────────
//
export {
  app, auth, db, storage,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
  doc, setDoc, getDoc, getDocs, updateDoc, addDoc,
  collection, query, where, orderBy, onSnapshot,
  serverTimestamp, arrayUnion, arrayRemove, deleteDoc,
  sRef, uploadBytesResumable, getDownloadURL
};