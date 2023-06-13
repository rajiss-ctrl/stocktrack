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
  authDomain: "stockctrl-c00eb.firebaseapp.com",
  projectId: "stockctrl-c00eb",
  storageBucket: "stockctrl-c00eb.appspot.com",
  messagingSenderId: "908343798059",
  appId: "1:908343798059:web:b8c6b00055231e2cf37d6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// <----- Additional Changes ---->
const provider = new EmailAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { provider, auth, storage };
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
