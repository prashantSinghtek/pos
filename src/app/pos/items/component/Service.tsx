"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { MdGroupAdd, MdOutlineEmail } from "react-icons/md";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { RiFileExcel2Line, RiPagesLine } from "react-icons/ri";
import { IoMdAdd, IoMdCard } from "react-icons/io";
import { PiMapPinBold } from "react-icons/pi";
import Modal from "@/app/Components/Modal";
import Button from "@/app/Components/Button";
import Partiescard from "../../parties/component/partiescard";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Productfrom from "./Productfrom";
import Serviceform from "./Serviceform";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getParticularService, getService } from "@/controller/posauth";

// import { PiMapPinAreaBold } from "react-icons/pi";

export default function Service() {
  const [selectedtab, setSelectedtab] = useState(1);
  const [modalopen, setModalopen] = useState(false);
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const Router = useRouter();
  const firmid = localStorage.getItem("selectedStore");
  const session = useSession();
  const token = session?.data?.uToken;
  const [service, setService] = useState([]);
  const [Particularservice, setParticularService] = useState<any>([]);
  const [selectedlistitem, setSelectedlistitem] = useState();
  const [modalOpenFrom, setModalOpenFrom] = useState("");
  const data = [
    {
      id: 1,
      name: "All",
      amount: 1234,
    },
    {
      id: 1,
      name: "prashant",
      amount: 1234,
    },
    {
      id: 1,
      name: "rahul",
      amount: 1234,
    },
  ];

  const header = [
    "Type",
    "Invoice No.",
    "Item ",
    "Date",
    "Qty",
    "Price/Unit",
    "Status",
  ];

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
   getService(firmid)
      .then((res) => {
        setService(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [firmid, token]);
  useEffect(() => {
   getParticularService(selectedtab)
      .then((res) => {
        // setService(res.data)
        setParticularService(res?.data?.itemService);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedtab, token]);

  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex flex-wrap lg:flex-nowrap mt-5 gap-5">
        <div className="sm:w-screen lg:w-[25%] rounded-lg overflow-hidden ">
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="flex justify-between px-3 pb-3 pt-1 gap-3 w-[100%] items-center">
              <div className="w-[31%]">
                <TextInput
                  name="search"
                  type="text"
                  placeholder="Search By"
                  label=""
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-full"
                />
              </div>
              <div
                className=" bg-[#fda80c] text-sm text-white rounded-lg px-3 overflow-hidden gap-2 items-center mt-2 flex h-[45px]"
                title="Add Parties"
              >
                <div
                  className="flex items-center"
                  onClick={() => setModalopen(!modalopen)}
                >
                  <IoMdAdd size={25} />
                  Add Service
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[16px] flex justify-between">
              <div>Service Name</div>
            </div>
            <List
              listdata={service}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
              page={"service"}
              setSelectedbank={setSelectedlistitem}
              setModalopen={setModalopen}
              setModalOpenFrom={setModalOpenFrom}
            />
          </div>
        </div>

        <div className="sm:w-screen lg:w-[75%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex justify-between px-7 pb-5">
                <div>{Particularservice?.serviceName}</div>
              </div>
              <div className="flex flex-wrap  ">
                <Partiescard
                  icon={<IoPersonOutline />}
                  title={"Sale Price"}
                  value={"₹ 0.00"}
                />
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="text-[25px]">Transaction</div>
            <div className="w-[300px]">
              <TextInput
                name="search"
                type="text"
                placeholder="Search By"
                label=""
                istouched={"Touch"}
                className="text-gray-800 text-base w-full"
              />
            </div>
          </div>

          <div>
            <Table headerData={header} />
          </div>
        </div>
      </div>
      <Modal isOpen={modalopen} onClose={() => setModalopen(false)}>
        <>
          <div className=" flex gap-2 items-center py-2">
            <span
              className={`${
                isChecked == true ? "text-[#808080]" : "text-[#2D9CDB]"
              }`}
            >
              Product
            </span>
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  title="check"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                  id="creditlimit"
                />
                <div className="block h-8 w-16 rounded-full border border-[#2D9CDB] bg-white"></div>
                <div
                  className={`dot bg-[#2D9CDB] absolute duration-100 top-1 h-6 w-6 rounded-full transition ${
                    isChecked == true ? "right-1" : "left-1"
                  }`}
                ></div>
              </div>
            </label>
            <span
              className={`${
                isChecked == true ? "text-[#2D9CDB]" : "text-[#808080]"
              }`}
            >
              Service
            </span>
          </div>
          {isChecked == true ? <Serviceform /> : <Productfrom />}
        </>
      </Modal>
      <Modal
        isOpen={adjustitemmodalopen}
        onClose={() => setAdjustitemmodalopen(false)}
      >
        <>
          <div className="pb-2 flex">Stock Adjustment</div>
          <div className="flex justify-between my-5 border-b border-groove pb-3 ">
            <div className="flex flex-col">
              <div className="text-gray-600 text-sm">Item Name</div>
              <div className="text-gray-800 text-sm font-semibold">XYZ</div>
            </div>
          </div>
          <div className="flex gap-5 my-5 w-full">
            <div className="w-[25%]">
              <TextInput
                name="Qty"
                type="text"
                placeholder=""
                label="Total Qty"
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            <div className="w-[25%]">
              <TextInput
                name="Price"
                type="text"
                placeholder=""
                label="At Price"
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            <div className="w-[25%]">
              <TextInput
                name="Details"
                type="text"
                placeholder=""
                label="Details"
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}
