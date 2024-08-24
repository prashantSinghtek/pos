import { CiBellOn } from "react-icons/ci";
import HeaderSearch from "./HeaderSearch";
import ProfileBadge from "./ProfileBadge";
import { HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import BrandSection from "./BrandSection";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function Header() {
  const path = usePathname(); // Assuming this retrieves the pathname from the current URL
  const parts = path.split("/");

  const lastWords = parts.map((part) => {
    const subParts = part.split("/");
    return subParts[subParts.length - 1];
  });

  const Pagehead = lastWords[lastWords.length - 1];

  // console.log("Last words of each path segment:", Pagehead);
  return (
    <div>
      <header className="w-[100%] py-3 bg-opacity-20 flex  shadow-sm shadow-gray-300 items-center   z-50">
        <div className="w-[21%] ">
          <BrandSection />
        </div>
        <div className="flex  w-full items-center justify-between">
          <div className="text-[22px] font-medium px-2">
            {Pagehead.toUpperCase() == "POS"
              ? "DASHBOARD"
              : Pagehead.toUpperCase()}
          </div>
          <div className="px-3 flex space-x-1">
            <div className="flex items-center gap-[6px]">
              <div className="border-2 border-[#CDC8C6] text-[#867E7C] p-2 rounded-full">
                <IoChatboxEllipsesOutline size={25} />
              </div>
              <div className="border-2 border-[#CDC8C6] text-[#867E7C] p-2 rounded-full">
                <HiOutlineBell size={25} />
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <img src="/Ellipse9.png" alt="" />

                <div className="text-left mr-2">
                  <div className="text-[14px] text-primary font-bold capitalize">
                    prashant tiwari
                  </div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
