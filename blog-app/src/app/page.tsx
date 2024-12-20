"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";

// Home Page
export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    if (loading) {
      setIsLoad(true);
    }
    if (!loading) {
      setIsLoad(false);
      if (!user) {
        router.push("/sign-in");
      }
    }
  }, [user, router]);

  console.log("user", user);

  return (
    <>
      {isLoad ? (
        <div>Loading...</div>
      ) : (
        <Button
          onClick={() => {
            signOut(auth);
          }}
        >
          Sign Out
        </Button>
      )}
    </>
  );
}
