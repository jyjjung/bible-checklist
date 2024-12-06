"use client"; // Mark this file as a client component

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Input, Button, Spacer } from "@nextui-org/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Login successful");
      router.push("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-center text-2xl font-semibold text-blue-600 mb-6">
          Sign In
        </h3>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </Button>
          <Spacer y={1} />
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
