"use client"; // Mark this file as a client component

import { useState } from "react";
import { signup } from "@/lib/auth"; // Ensure this method integrates Firebase signup logic
import { useRouter } from "next/navigation";
import { Input, Button, Spacer } from "@nextui-org/react";
import { FirebaseError } from "firebase/app"; // Import FirebaseError

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state before attempting signup
    try {
      await signup(email, password);
      console.log("Signup successful");
      router.push("/"); // Redirect to home page after successful signup
    } catch (err) {
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific error codes
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("The email address is already in use.");
            break;
          case "auth/invalid-email":
            setError("The email address is not valid.");
            break;
          case "auth/operation-not-allowed":
            setError("Email/password accounts are not enabled.");
            break;
          case "auth/weak-password":
            setError(
              "The password is too weak. Please use a stronger password."
            );
            break;
          default:
            setError("An unknown error occurred. Please try again later.");
        }
      } else {
        // Handle non-Firebase errors (fallback)
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-center text-2xl font-semibold text-blue-600 mb-6">
          Create an Account
        </h3>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Input
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div>
            <Input
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          {error && (
            <div className="text-center text-red-500 text-sm mt-2">{error}</div>
          )}
          <Button fullWidth color="primary" type="submit">
            Sign Up
          </Button>
          <Spacer y={1} />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
