"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function Page() {
  const Router = useRouter();

  return (
    <>
      <div className="flex gap-3 font-extralight text-[#525E66] text-sm px-5 py-1 ">
        <div
          className="cursor-pointer"
          onClick={() => Router.push("/mycompany")}
        >
          company
        </div>
        <div className="cursor-pointer">Help</div>
        <div className="cursor-pointer">shortcuts</div>
      </div>
    </>
  );
}
