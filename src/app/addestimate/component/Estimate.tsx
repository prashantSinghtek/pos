"use client";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
import { useSession } from "next-auth/react";

import AddEstimmate from "@/app/Components/AddEstimate";
import { getProducts } from "@/controller/posauth";


const firmid = localStorage.getItem("selectedStore");
export default function Estimate({res}:any) {
    const [tabs, setTabs] = useState([{ id: 1, isChecked: false }]);
    const [activeTab, setActiveTab] = useState<any>(1);
    const [product, setProduct] = useState()
    const session = useSession();
    const token = localStorage.getItem("authToken");
console.log("=>>>>>>>>>>>>>>>>>",res)
    const addNewTab = () => {
        const newId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
        setTabs([...tabs, { id: newId, isChecked: false }]);
        setActiveTab(newId);
    };

    const handleCheckboxChange = (tabId: any) => {
        setTabs(
            tabs.map((tab) =>
                tab.id === tabId ? { ...tab, isChecked: !tab.isChecked } : tab
            )
        );
    };
    useEffect(() => {
        getProducts(firmid).then((res) => { setProduct(res.data) }).catch((err) => console.log(err))
    }, [token, firmid])

    const removeTab = (tabId: any) => {
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
                            className={`cursor-pointer flex items-center gap-2 p-2    rounded-t-md ${activeTab === tab.id ? "text-[#FF6E3F] border-b-2 border-[#FF6E3F]" : "text-gray-500 "
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            Estimmate #{tab.id}
                            <button
                                title="re"
                                className={`"ml-2   ${activeTab === tab.id ? "text-[#FF6E3F]" : "text-gray-500"}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTab(tab.id);
                                }}
                            >
                                <CiCircleRemove size={25} className="my-1" />
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
                        <div key={tab.id}>
                            <AddEstimmate product={product} estimatedata={res} />
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
