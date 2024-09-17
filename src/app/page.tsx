// pages/index.tsx
"use client";
import { useSession } from "next-auth/react";
import Loginpage from "./auth/pos/page";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { store } from "@/store"; // Import your Redux store
import { useDispatch } from "react-redux";

const Home = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.uToken) {
      localStorage.setItem("authToken", session.uToken);
    }
  }, [session, status]);
      

  
  useEffect(() => {
    
  console.log(store , "store");
  console.log(store.getState() , "storeOut");
    return () => {
      
    }
  }, [dispatch])
  return (
    <div className="select-none">
      <Loginpage />
      <Toaster position="top-right" />
    </div>
  );
};

export default Home;
