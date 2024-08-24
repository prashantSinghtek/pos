"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log("vfgvfdsvgsdfgv",children)
  return <SessionProvider>{children}</SessionProvider>;
}
