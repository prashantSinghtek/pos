"use client"; // Mark this as a client component

import { Provider } from "react-redux";
import { store } from "@/store"; // Import your Redux store
import NextAuthSessionProvider from "./nextAuthSessionProvider";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}> {/* Redux Provider */}
      <NextAuthSessionProvider> {/* NextAuth Provider */}
        {children}
        <Toaster position="top-right" />
      </NextAuthSessionProvider>
    </Provider>
  );
}
