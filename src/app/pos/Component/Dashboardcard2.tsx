import React from "react";
import { motion } from "framer-motion";

export default function Dashboardcard2({ image, title, number, colour }: any) {
  return (
    <div
      className={`w-[25%] px-4 py-6 flex gap-5 rounded-lg  h-full overflow-x-hidden opacity-85 transition-all ${colour}`}
    >
      <div>
        <img src={image} alt="" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-[18px] text-[#696969]">{title}</div>
        <div className="text-[16px] font-semibold text-gray-900">{number}</div>
      </div>
    </div>
  );
}
