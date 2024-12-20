"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

// Sign In with Google Button
const GoogleButton: React.FC = () => {
  const [signInWithGoogle, gogleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const router = useRouter();

  // Sign In With Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      if (result) {
        router.push("/");
      }
    } catch (error) {
      console.error("Google error", error);
    }
  };

  return (
    <div className="w-full">
      <Button className="w-full bg-white text-black" onClick={handleGoogleSignIn}>
        <FaGoogle style={{ marginRight: "10px", fontSize: "16px" }} /> Sign in
        with Google
      </Button>
    </div>
  );
};
export default GoogleButton;
