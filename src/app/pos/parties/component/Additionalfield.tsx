import TextInput from "@/app/Components/Textinput";
import React, { useState } from "react";

export default function Additionalfield() {
  const [isChecked, setIsChecked] = useState(false);
  const [fields, setFields] = useState([
    { name: "Additionfield01", label: "Addition Field 01", isChecked: false, value: "" },
    { name: "Additionfield02", label: "Addition Field 02", isChecked: false, value: "" },
    { name: "Additionfield03", label: "Addition Field 03", isChecked: false, value: "" },
    { name: "Additionfield04", label: "Addition Field 04", isChecked: false, value: "" },
    // Add more fields as needed
  ]);

  // const handleCheckboxChange = (index:any) => {
  //   const updatedFields = [...fields];
  //   updatedFields[index].isChecked = !updatedFields[index].isChecked;
  //   setFields(updatedFields);
  // };


  const handleCheckboxChange = (index : number) => {
    setFields(prevFields => prevFields.map((field, i) =>
      i === index ? { ...field, isChecked: !field.isChecked } : field
    ));
  };

  return (
    <>
      {fields.map((item, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex gap-5 my-4 w-full">
            <div className="flex items-end py-3">
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(index)}
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-[33%]">
              <TextInput
                name={item.name}
                type="text"
                placeholder=""
                label={item.label}
                value={item.value}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  setFields(updatedFields);
                }}
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            {item.isChecked && (
              <div className="w-[33%] mt-4">
                <TextInput
                  name="date"
                  type="text"
                  placeholder={`Value of ${item.value}`}
                  label=""
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
            )}
          </div>
          <div className="text-[#2D9CDB] px-10 flex gap-2">
            <span>Show In Print</span>
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="sr-only"
                />
                <div className="block h-6 w-10 rounded-full border border-[#2D9CDB] bg-white"></div>
                <div
                  className={`dot bg-[#2D9CDB] absolute duration-100 top-1 h-4 w-4 rounded-full transition ${
                    isChecked ? "right-1" : "left-1"
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      ))}
    </>
  );
}
