"use client";
import React, { useEffect, useState } from "react";
import Addcashsale from "../Components/Addcashsale";
import Addcreditsale from "../Components/Addcreditsale";
import { CiCircleRemove } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { getProducts } from "@/controller/posauth";

export default function Page() {
  const [tabs, setTabs] = useState([{ id: 1, isChecked: false }]);
  const [activeTab, setActiveTab] = useState<any>(1);
  const [product, setProduct] = useState()
  const session = useSession();

  const addNewTab = () => {
    const newId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
    setTabs([...tabs, { id: newId, isChecked: false }]);
    setActiveTab(newId);
  };

  const handleCheckboxChange = (tabId:any) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId ? { ...tab, isChecked: !tab.isChecked } : tab
      )
    );
  };


  const removeTab = (tabId:any) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length) {
      setActiveTab(newTabs[0].id);
    } else if (!newTabs.length) {
      setActiveTab(null);
    }
  };

  return (
    <div className="">
      <div className="mt-4">
        <div className="flex gap-10 border-b px-10 border-gray-300 items-center">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`cursor-pointer flex items-center gap-2 p-2    rounded-t-md ${
                activeTab === tab.id ? "text-[#FF6E3F] border-b-2 border-[#FF6E3F]" : "text-gray-500 "
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              SALE #{tab.id}
              <button
              title="re"
                className={`"ml-2   ${activeTab === tab.id ? "text-[#FF6E3F]" : "text-gray-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
               <CiCircleRemove size={25} className="my-1"/>
              </button>
            </div>
          ))}
          <div
            // className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            onClick={addNewTab}
          >
            <IoAddCircle size={30} color="orange" />
          </div>
        </div>
      </div>

      <div className="rounded-b-md px-10 p-4">
        {tabs.map((tab) =>
          activeTab === tab.id ? (
            <div key={tab.id} className="mb-5 text-lg text-gray-800 font-semibold flex items-end gap-5">
              <div className="text-lg text-gray-800">Sale</div>
              <div className="flex gap-2 items-end">
                <span
                  className={`${
                    tab.isChecked ? "text-[#808080]" : "text-[#2D9CDB]"
                  }`}
                >
                  Cash
                </span>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      title="check"
                      type="checkbox"
                      checked={tab.isChecked}
                      onChange={() => handleCheckboxChange(tab.id)}
                      className="sr-only"
                      id={`creditlimit-${tab.id}`}
                    />
                    <div className="block h-8 w-16 rounded-full border border-[#2D9CDB] bg-white"></div>
                    <div
                      className={`dot bg-[#2D9CDB] absolute duration-100 top-1 h-6 w-6 rounded-full transition ${
                        tab.isChecked ? "right-1" : "left-1"
                      }`}
                    ></div>
                  </div>
                </label>
                <span
                  className={`${
                    tab.isChecked ? "text-[#2D9CDB]" : "text-[#808080]"
                  }`}
                >
                  Credit
                </span>
              </div>
            </div>
          ) : null
        )}

        {tabs.map((tab) =>
          activeTab === tab.id ? (
            <div key={tab.id}>
              {tab.isChecked ? <Addcreditsale product={product} /> : <Addcashsale product={product}/>}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
