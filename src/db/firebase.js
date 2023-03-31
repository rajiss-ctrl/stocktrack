// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "stockctrl-c00eb.firebaseapp.com",
  projectId: "stockctrl-c00eb",
  storageBucket: "stockctrl-c00eb.appspot.com",
  messagingSenderId: "908343798059",
  appId: "1:908343798059:web:b8c6b00055231e2cf37d6e"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export default app

const provider = new EmailAuthProvider();
const auth = getAuth(app);
const storage = getStorage(app)
export {provider, auth, storage}

