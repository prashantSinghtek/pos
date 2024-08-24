"use client";
import Checkbox from "@/app/Components/Checkbox";
import TextInput from "@/app/Components/Textinput";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function Party() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [check, setCheck] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (isChecked: boolean, title: string) => {
    setCheckedItems((prevState) => {
      if (isChecked) {
        return [...prevState, title];
      } else {
        return prevState.filter((item) => item !== title);
      }
    });
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [selectedindex, setSelectedindex] = useState<any>([]);
//   console.log(selectedindex, "selectedindex");

  const [fields, setFields] = useState([
    { name: "Additionfield01", label: "Addition Field 01", isChecked: false },
    { name: "Additionfield02", label: "Addition Field 02", isChecked: false },
    // Add more fields as needed
  ]);
  return (
    <div className="px-8">
      <div className="lg:flex sm:flex-warp">
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">Party Settings</h1>
          <Checkbox title="Party Grouping" onCheck={handleCheck} />
        </div>
        <div className="w-[50%]">
          <h1 className="text-2xl  mb-4">Additional fields</h1>
          {fields.map((item: any, index: any) => (
            <div className="flex flex-col" key={index}>
              <div className="flex gap-5 my-5 w-full">
                <div className="flex items-end py-3">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    title="check"
                    placeholder=""
                    className="w-[20px] h-[20px]"
                    onClick={(e) => {
                      const target = e.target as HTMLInputElement;
                      setCheck(target.checked);
                      if (target.checked) {
                        setSelectedindex([...selectedindex, index]);
                      } else {
                        setSelectedindex(
                          selectedindex.filter((idx: number) => idx !== index)
                        );
                      }
                    }}
                  />
                </div>

                <div className="w-[100%]">
                  <TextInput
                    name={item.name}
                    type="text"
                    placeholder=""
                    label={item.label}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[30%]"
                  />
                </div>
              </div>
              <div className="text-[#2D9CDB] px-10 flex gap-2">
                <span>Show In Print</span>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      title="check"
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    <div className="block h-6 w-10 rounded-full border border-[#2D9CDB] bg-white"></div>
                    <div
                      className={`dot bg-[#2D9CDB] absolute duration-100 top-1 h-4 w-4 rounded-full transition ${
                        isChecked == true ? "right-1" : "left-1"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
