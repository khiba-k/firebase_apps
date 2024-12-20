"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { FaGithub } from "react-icons/fa";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

// Sign In With Github Button
const GitHubButton: React.FC = () => {
  const [signInWithGithub, githubUser, gitHubLoading, gitHubError] =
    useSignInWithGithub(auth);
  const router = useRouter();

  // Sign In With Github
  const handleGitHubSignIn = async () => {
    try {
      const result = await signInWithGithub();

      if (result) {
        router.push("/");
      }
    } catch (error) {
      console.error("Github error", error);
    }
  };

  return (
    <div className="w-full">
      <Button className="w-full" onClick={handleGitHubSignIn}>
        <FaGithub style={{ marginRight: "10px", fontSize: "16px" }} /> Sign in
        with Github
      </Button>
    </div>
  );
};
export default GitHubButton;
