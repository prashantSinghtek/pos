import React from "react";

export default function Partiescard({ icon, title, value }: any) {
  return (
    <div className="lg:w-[27%] 2xl:w-[29%] flex mb-[40px] gap-3">
      <div className="text-[#2D9CDB] text-[25px] font-semibold pt-2">{icon}</div>
      <div className="flex flex-col">
        <div className="text-gray-400">{title}</div>
        <div className="text-gray-800">{value}</div>
      </div>
    </div>
  );
}
