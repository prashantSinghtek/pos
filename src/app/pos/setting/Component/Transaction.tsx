"use client";
import Checkbox from "@/app/Components/Checkbox";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function Transaction() {
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
    <div className="px-8">
      <div className="lg:flex sm:flex-warp  ">
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">Transaction Header</h1>
          <div className="flex flex-col gap-3">
            <Checkbox title="Estimate/Quotation" onCheck={handleCheck} />
            <Checkbox title="Sale/Purchase Order" onCheck={handleCheck} />
            <Checkbox title="Other Income" onCheck={handleCheck} />
            <Checkbox title="Fixed Assets (FA)" onCheck={handleCheck} />
            <Checkbox title="Delivery Challan" onCheck={handleCheck} />
          </div>
        </div>
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">Items Table</h1>
          <div className="flex flex-col gap-3">
            <Checkbox title="Estimate/Quotation" onCheck={handleCheck} />
            <Checkbox title="Sale/Purchase Order" onCheck={handleCheck} />
            <Checkbox title="Other Income" onCheck={handleCheck} />
            <Checkbox title="Fixed Assets (FA)" onCheck={handleCheck} />
            <Checkbox title="Delivery Challan" onCheck={handleCheck} />
          </div>
        </div>
      </div>
      <div className="lg:flex sm:flex-warp mt-5 ">
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">Transaction Header</h1>
          <div className="flex flex-col gap-3">
            <Checkbox title="Estimate/Quotation" onCheck={handleCheck} />
            <Checkbox title="Sale/Purchase Order" onCheck={handleCheck} />
            <Checkbox title="Other Income" onCheck={handleCheck} />
            <div className="flex"></div>
          </div>
        </div>
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">Items Table</h1>
          <div className="flex flex-col gap-3">
            <Checkbox title="Estimate/Quotation" onCheck={handleCheck} />
            <Checkbox title="Sale/Purchase Order" onCheck={handleCheck} />
            <Checkbox title="Other Income" onCheck={handleCheck} />
            <Checkbox title="Fixed Assets (FA)" onCheck={handleCheck} />
            <Checkbox title="Delivery Challan" onCheck={handleCheck} />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-2xl  mb-4">Transaction Prefixes</div>
      </div>
    </div>
  );
}
