"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import GitHubButton from "@/screens/auth/GitHubButton";
import GoogleButton from "@/screens/auth/GoogleButton";

// SignIn Page
const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [authorisedUser, authorisedLoading, authorisedError] =
    useAuthState(auth);

  // Check if user is logged in
  useEffect(() => {
    if (authorisedLoading) {
      setIsLoad(true);
    }
    if (!authorisedLoading) {
      setIsLoad(false);
      if (authorisedUser) {
        router.push("/");
      }
    }
  }, [authorisedUser, router]);

  // Sign In with email and password
  const [signInWithEmailAndPassword, user, loading, signInError] =
    useSignInWithEmailAndPassword(auth);

  // Form Submit function
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signInWithEmailAndPassword(email, password);

      if (result) {
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (e: any) {
      setError(e.message);
      console.error("Error creating user:", e.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <GitHubButton />
        <GoogleButton />
        <div className="w-full flex justify-center">or</div>
        <h6 className="text-center text-2xl font-bold text-gray-900">
          Sign In With Email
        </h6>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-sm text-gray-600">
            Creating account...
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF3D00] text-white hover:bg-[#FF5722] focus:outline-none"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
