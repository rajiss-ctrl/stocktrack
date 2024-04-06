import { initializeApp } from "firebase/app";
import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// <----- Additional Changes ---->
const provider = new EmailAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default db;

// Logout function
export function logOut() {
  return signOut(auth);
}

// custom hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}

export { provider, auth, storage };
