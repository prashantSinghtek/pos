import Button from "@/app/Components/Button";
import Table from "@/app/Components/Table";
import Tabs from "@/app/Components/Tabs";
import TextInput from "@/app/Components/Textinput";
import React from "react";

export default function page() {
    const header = [
        "Item Name",
        "Name of Labels",
        "Header",
        "Line 01",
        "Line 02",
      ];
      const body = [
        {
          value1: "appearance",
          value2: "02",
          value3: "H001",
          value4: "₹500",
          value5: "₹500",
        },
      ];
   
  return (
    <div>
      <div className="flex items-center pt-2 pb-5 pr-5 justify-between">
        <div className="text-[20px]">Bar Code Generator</div>
        <div>Input</div>
      </div>
      <div className="flex justify-end pb-5 px-5">
        <Button color={"bg-[#FF8900]"} title={"Add For Barcode"} link={"/"} />
      </div>
      <div className="flex w-[100%] flex-wrap gap-10 my-5">
        <div className="w-[30%] flex gap-2 items-end">
          <div className="w-[70%]">
            <TextInput
              name="Phonenumber"
              type="text"
              placeholder=""
              label="Phone Number"
              istouched={"Touch"}
              className="text-gray-800 text-base w-[100%] "
            />
          </div>
        </div>
        <div className="w-[30%] flex gap-2 items-end">
          <div className="w-[70%]">
            <TextInput
              name="billingaddress"
              type="text"
              placeholder=""
              label="Billing Address"
              istouched={"Touch"}
              className="text-gray-800 text-base w-[100%] "
            />
          </div>
        </div>
        <div className="w-[30%] flex gap-2 items-end">
          <div className="w-[70%]">
            <TextInput
              name="billingaddress"
              type="text"
              placeholder=""
              label="Billing Address"
              istouched={"Touch"}
              className="text-gray-800 text-base w-[100%] "
            />
          </div>
        </div>
        <div className="w-[30%] flex gap-2 items-end">
          <div className="w-[70%]">
            <TextInput
              name="billingaddress"
              type="text"
              placeholder=""
              label="Billing Address"
              istouched={"Touch"}
              className="text-gray-800 text-base w-[100%] "
            />
          </div>
        </div>
        <div className="w-[30%] flex gap-2 items-end">
          <div className="w-[70%]">
            <TextInput
              name="billingaddress"
              type="text"
              placeholder=""
              label="Billing Address"
              istouched={"Touch"}
              className="text-gray-800 text-base w-[100%] "
            />
          </div>
        </div>
        <div className="w-[30%] flex gap-2 items-end">
          <div className="w-[70%]">
            <TextInput
              name="billingaddress"
              type="text"
              placeholder=""
              label="Billing Address"
              istouched={"Touch"}
              className="text-gray-800 text-base w-[100%] "
            />
          </div>
        </div>
      </div>
      <div className="my-7 mr-5">
      <Table headerData={header} bodyData={body} />
      </div>
    </div>
  );
}
