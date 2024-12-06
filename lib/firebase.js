// Import Firebase core and necessary modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvqK9Dx3YT1JT19cS_f0iTDPJLCJ83uPc",
  authDomain: "bibleapp-e8a7a.firebaseapp.com",
  projectId: "bibleapp-e8a7a",
  storageBucket: "bibleapp-e8a7a.firebasestorage.app",
  messagingSenderId: "267389686394",
  appId: "1:267389686394:web:61664468c1037e054d21c3",
  measurementId: "G-BT7JHNC1K7",
};

// Initialize Firebase app (only if not already initialized)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
