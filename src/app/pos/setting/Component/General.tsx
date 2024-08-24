"use client";
import Checkbox from "@/app/Components/Checkbox";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function General() {
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
      <div className="lg:flex sm:flex-warp">
        <div className="w-2/5">
          <h1 className="text-2xl  mb-4">Application</h1>
          <Checkbox title="GSTIN Number" onCheck={handleCheck} />
        </div>
        <div className="w-3/5">
          <h1 className="text-2xl  mb-4">Multi firm</h1>
          <div className="border border-gray-400 rounded-md bg-white flex gap-5 items-center py-3 px-6 ">
            <div className="">
              <input
                title="v"
                type="checkbox"
                id={"Multi firm"}
                // checked={isChecked}
                // onChange={handleCheckboxChange}
                className="mr-2 h-5 w-5 text-blue-600  border-gray-300 rounded-full focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-1 justify-between items-center">
              <div className="flex flex-col gap-1 text-[#737373]">
                <div className="text-lg">My Company</div>
                <div className="text-sm">Default</div>
              </div>
              <div className="">
                <FaPencilAlt size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex sm:flex-warp mt-5 ">
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">More Transactions</h1>
          <div className="flex flex-col gap-3">
            <Checkbox title="Estimate/Quotation" onCheck={handleCheck} />
            <Checkbox title="Sale/Purchase Order" onCheck={handleCheck} />
            <Checkbox title="Other Income" onCheck={handleCheck} />
            <Checkbox title="Fixed Assets (FA)" onCheck={handleCheck} />
            <Checkbox title="Delivery Challan" onCheck={handleCheck} />
            <div className="pl-8 flex flex-col gap-3">
              <Checkbox
                title="Goods return on Delivery Challan"
                onCheck={handleCheck}
              />
              <Checkbox
                title="Print amount in Delivery Challan"
                onCheck={handleCheck}
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] ">
          <h1 className="text-2xl  mb-4">Stock Transfer Between Godowns</h1>
          <div className="flex flex-col gap-3 text-[#737373]">
            <div>
              Manage all your stores/godowns and transfer stock seamlessly
              between them. Using this feature, you can transfer stock between
              stores/godowns and manage your inventory more efficiently.
            </div>
            <div className="px-1">
              <Checkbox
                title="Godown management & Stock transfer"
                onCheck={handleCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
