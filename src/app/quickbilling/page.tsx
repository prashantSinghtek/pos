"use client";
import React, { useState } from "react";
import TextInput from "../Components/Textinput";
import Table from "../Components/Table";
import Quickbillingcard from "./component/quickbillingcard";
import CardPrototype from "../Components/CardPrototype";

export default function Page() {
  const [presskey, setPresskey] = useState<any>();
  const [onlickey, setOnlickey] = useState<any>();
  console.log("presskey", presskey);
  console.log("onlickey", onlickey);
  const header = [
    "#",
    "Item Code",
    "Item Name",
    "QTY.",
    "Unit",
    "Price/Unit(₹)",
    "Discount(₹)",
    "Tax Applied(₹)",
    "Total(₹)",
  ];
  const body = [
    {
      value1: "001",
      value2: "00000",
      value3: "colgate",
      value4: "1",
      value5: "pac",
      value6: "₹20.00",
      value7: "₹1.00",
      value8: "₹2.00",
      value9: "₹19.00",
    },
  ];
  return (
    <div
      tabIndex={0} // Add tabIndex so that the div can be focused
      onKeyDown={(e) => {
        if (e.key === "F2" || e.key === "F3" || e.key === "F4" || e.key === "F7" || e.key === "F8" || e.key === "F9" || e.key === "F12") {
          setPresskey(e.key);
        } else if (e.ctrlKey && e.key.toLowerCase() === "b") {
          e.preventDefault(); // Prevent default browser behavior for Ctrl + B (bookmark)
          setPresskey("Ctrl + B");
        } else if (e.ctrlKey && e.key.toLowerCase() === "p") {
          e.preventDefault(); // Prevent default browser behavior for Ctrl + P (print)
          setPresskey("Ctrl + P");
        } else {
          return null
        }
      }}
      
    >
      <div className="flex w-[100%] gap-5 m-5 mr-5">
        <div className="w-[70%] flex flex-col">
          <div className="w-[100%]">
            <TextInput
              name="search"
              type="text"
              placeholder="Search By"
              label=""
              istouched={"Touch"}
              className="text-gray-800 text-base w-full"
            />
          </div>
          <div className="h-[75vh] mb-10">
            <Table headerData={header} bodyData={body} />
          </div>
          <div className="flex flex-wrap gap-5">
            <Quickbillingcard
              titleclick={setOnlickey}
              title={"Change Quantity[F2]"}
            />
            <Quickbillingcard
              titleclick={setOnlickey}
              title={"Item Discount[F3]"}
            />
            <Quickbillingcard
              titleclick={setOnlickey}
              title={"Remove Item[F4]"}
            />
            <Quickbillingcard titleclick={setOnlickey} title={"Bill Tax[F7]"} />
            <Quickbillingcard
              titleclick={setOnlickey}
              title={"Additional Change[F8]"}
            />
            <Quickbillingcard
              titleclick={setOnlickey}
              title={"Bill Discount[F9]"}
            />
            <Quickbillingcard titleclick={setOnlickey} title={"Remarks[F12]"} />
          </div>
        </div>
        <div className="w-[27%]">
          <CardPrototype>
            <>
              <div className="text-lg text-gray-800">Customer Details</div>
              <div className="bg-gray-200 my-2 rounded-lg h-[50px] w-full">
                <div className="w-[100%]">
                  <TextInput
                    name="search"
                    type="text"
                    placeholder="|"
                    label=""
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
              <div className="text-lg text-gray-800 my-5">Bill Details</div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="text-[#737373]">Sub Total</div>
                  <div className="text-[#363636]">₹20.00</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#737373]">Item discount</div>
                  <div className="text-[#363636]">₹1.20</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#737373]">Item tax</div>
                  <div className="text-[#363636]">₹3.38</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#737373]">Round off</div>
                  <div className="text-[#363636]">₹0.18</div>
                </div>
                <div className="flex justify-between border-y py-3 border-gray-200">
                  <div className="text-[#737373] text-xl">Total Amount</div>
                  <div className="text-[#FF7006] text-lg">₹22.00</div>
                </div>
              </div>
              <div className="text-lg text-gray-800 my-5">Cash/UPI</div>
              <div className=" flex-col space-y-2 w-[100%]">
                <div className="text-[#808080]">Payment Mode</div>
                <div className="w-[100%]">
                  <TextInput
                    name="search"
                    type="text"
                    placeholder="|"
                    label=""
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
              <div className=" flex-col space-y-2 mt-6 w-[100%]">
                <div className="text-[#808080]">Amount Received</div>
                <div className="w-[100%]">
                  <TextInput
                    name="search"
                    type="text"
                    placeholder="|"
                    label=""
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between my-6 py-3">
                <div className="text-gray-800 text-2xl">Change/Return</div>
                <div className="text-[#878A92] text-lg">₹22.00</div>
              </div>
              <div className="bg-[#FF8900] text-white rounded-full w-full py-3 flex justify-center items-center">
                Save & Print Bill [Ctrl+P]
              </div>
              <div className="flex gap-3 my-5">
                <div className="bg-[#2F9DDB] text-white rounded-full w-full py-3 flex justify-center items-center">
                  Partial Pay [Ctrl+B]
                </div>
                <div className="bg-[#9FAFB8] text-white rounded-full w-full py-3 flex justify-center items-center">
                  Multi Pay [Ctrl+M]
                </div>
              </div>
            </>
          </CardPrototype>
        </div>
      </div>
    </div>
  );
}
