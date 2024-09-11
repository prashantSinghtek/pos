"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loginpage from "./auth/pos/page";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && session?.uToken) {
      // Set the token in localStorage
      localStorage.setItem("authToken", session.uToken);
    } else if (status === "unauthenticated") {
  
    }
  }, [session, status]);
  
  return (
    <div className="select-none">
      <Loginpage />
      <Toaster position="top-right" />
    </div>
  );
}
