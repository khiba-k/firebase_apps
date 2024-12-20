"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub } from "react-icons/fa";

import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import GitHubButton from "@/screens/auth/GitHubButton";
import { useRouter } from "next/navigation";
import GoogleButton from "@/screens/auth/GoogleButton";

// Sign Up Page
const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [authorisedUser, authorisedLoading, authorisedError] =
    useAuthState(auth);

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

  // Sign Up with email and password
  const [
    createUserWithEmailAndPassword,
    signUpUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);

  //Form submit function
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(email, password);

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
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <GitHubButton />
        <GoogleButton />
        <div className="w-full flex justify-center text-gray-600 mt-2">or</div>
        <h5 className="text-center text-2xl font-bold text-[#212121] mt-4">
          Sign Up With Email
        </h5>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {signUpLoading && (
          <div className="text-center text-sm text-gray-600">
            Creating account...
          </div>
        )}

        {/* Sign Up Form */}
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
              disabled={signUpLoading}
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
              disabled={signUpLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF3D00] text-white hover:bg-[#FF5722] focus:outline-none"
            disabled={signUpLoading}
          >
            {signUpLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
