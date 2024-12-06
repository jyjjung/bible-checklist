// lib/auth.js

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./firebase"; // Make sure to import your Firebase app

const auth = getAuth(app); // Initialize Firebase Authentication

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in", userCredential.user);
    return userCredential.user; // Returns user object
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error("Login failed");
  }
};

// Signup function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up", userCredential.user);
    return userCredential.user; // Returns user object
  } catch (error) {
    console.error("Signup error:", error.message);
    throw new Error("Signup failed");
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth); // Firebase sign out
    console.log("User signed out");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw new Error("Logout failed");
  }
};
