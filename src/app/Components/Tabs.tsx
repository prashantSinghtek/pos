"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { RiDropboxFill } from "react-icons/ri";

export default function Tabs({ heading, content, icon }: any) {
  const [tabs, setTabs] = useState(0);
  const handleTabs = (val: any) => {
    setTabs(val);
  };

  const path = usePathname();

  return (
    <div>
      <div
        className={`flex  p-2 pt-4 border-b-2  border-gray-300 overflow-x-auto   gap-12 px-5  ${
          path == "/mycompany" ? "bg-[#fe9419] rounded-b-xl " : ""
        }`}
        style={{
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        {heading.map((item: any, index: any) => (
          <div
            key={index}
            className={`min-w-fit cursor-pointer py-3 px-4 mb-[-9px] z-50  uppercase ${tabs === index ?  path == "/mycompany" ?" text-white border-b-4 border-white":  "text-[#FF6E3F] border-b-4 border-[#FF6E3F] "
                : path == "/mycompany" ?"text-white": "text-[#6a6969]"
            }`}
            onClick={() => handleTabs(index)}
          >
            <p className="text-[16px] flex gap-2 items-center">
              {item.icon}
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="px-2">
        {content.map(
          (item: any, index: any) =>
            tabs === index && <div key={index}>{item}</div>
        )}
      </div>
    </div>
  );
}
