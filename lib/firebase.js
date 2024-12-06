import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDvqK9Dx3YT1JT19cS_f0iTDPJLCJ83uPc",
  authDomain: "bibleapp-e8a7a.firebaseapp.com",
  projectId: "bibleapp-e8a7a",
  storageBucket: "bibleapp-e8a7a.firebasestorage.app",
  messagingSenderId: "267389686394",
  appId: "1:267389686394:web:61664468c1037e054d21c3",
  measurementId: "G-BT7JHNC1K7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
