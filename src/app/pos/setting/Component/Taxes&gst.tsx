"use client";
import Checkbox from "@/app/Components/Checkbox";
import React, { useState } from "react";

export default function Taxesgst() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (isChecked: boolean, title: string) => {
    setCheckedItems((prevState) => {
      if (isChecked) {
        return [...prevState, title];
      } else {
        return prevState.filter((item) => item !== title);
      }
    });
  };
  return (
    <div className="lg:flex sm:flex-warp px-8 ">
      <div className="w-[50%]">
        <h1 className="text-2xl  mb-4">GST Settings</h1>
        <div className="flex flex-col gap-3">
          <Checkbox title="Estimate/Quotation" onCheck={handleCheck} />
          <Checkbox title="Sale/Purchase Order" onCheck={handleCheck} />
          <Checkbox title="Other Income" onCheck={handleCheck} />
          <Checkbox title="Fixed Assets (FA)" onCheck={handleCheck} />
          <Checkbox title="Delivery Challan" onCheck={handleCheck} />
          
        </div>
      </div>
     
    </div>
  );
}
