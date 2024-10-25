"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Select from "react-select";
import { IoMdAdd, IoMdPrint } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import CardPrototype from "@/app/Components/CardPrototype";
import Modal from "@/app/Components/Modal";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import Payment from "../../Component/Payment";

import { customStyles } from "@/app/Components/Customstyle";
import { FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { getParticularPaymentIn, getPaymentIn } from "@/controller/posauth";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [id,setId] = useState()
  const [id1, setId1] = useState()
  const session = useSession();
  const token = ""
  const [defaultdata,setDefaultdata] = useState()


  const [data, setData] = useState([]);
  const [allFirm, setAllFirm] = useState(["All Firm", "Sheela Business"]);
  const [selectedAllFirmOption, setSelectedAllFirmOptions] = useState(null);
  const [touchedAllFirm, setTouchedAllFirm] = useState({ state: false });
  const [paymentOptions, setPaymentOptions] = useState([
    "All Transaction",
    "Sale",
    "Purchase",
    "Payment-In",
    "Payment-Out",
  ]);
  const [selectedPaymentOption, setSelectedPaymentOptions] = useState(null);
  const [touchedPayment, setTouchedPayment] = useState({ state: false });
  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
getPaymentIn()
      .then((res) => {
        console.log(res)
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, open]);
  useEffect(() => {
getParticularPaymentIn(id)
      .then((res) => {
        console.log(res.data)
        setDefaultdata(res?.data)
       
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, open,id]);

  const header = [
    "Date",
    "Ref No.",
    "Party Name",
    "Category Name",
    "Type",
    "Total",
    "Received/Paid",
    "Balance",
    "Print/share",
    " ",
  ];


  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);

  const stateOptions = allFirm.map((option) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));

  const handleChangedAllFirm = (selectedOption: any) => {
    setSelectedAllFirmOptions(selectedOption);
  };

  const statePaymentOptions = paymentOptions.map((option) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));

  const handleChangedPayment = (selectedOption: any) => {
    setSelectedPaymentOptions(selectedOption);
  };

  return (
    <div className="mr-5">
      <div className="mt-5">
        <CardPrototype>
          <>
            <div className="flex gap-5 items-end">
              <div className="w-[10%] text-[22px] mb-1">This Month</div>
              <div className="rounded-md text-gray-800 bg-gray-200 px-5 py-2 h-fit">
                Between
              </div>
              <div className="w-[30%] flex flex-col justify-center items-start">
                <div className="text-gray-800 text-base w-full">
                  <TextInput
                    name="dateFrom"
                    type="date"
                    placeholder="05/04/2024"
                    label="Date From:"
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-start">
                <div className="text-gray-800 text-base w-full">
                  <TextInput
                    name="dateTo"
                    type="date"
                    placeholder="05/04/2024"
                    label="Date To:"
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
              <div className="w-[10%] flex flex-col justify-center items-start">
                <div className="text-gray-800 text-base w-full">
                  <Select
                    options={stateOptions}
                    placeholder="Select"
                    value={selectedAllFirmOption}
                    onChange={handleChangedAllFirm}
                    onBlur={() =>
                      setTouchedAllFirm({ ...touchedAllFirm, state: true })
                    }
                    styles={customStyles}
                    className="w-[100%] bg-white outline-none font-medium font-optima text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-5 ">
              <div className="w-[30%] flex flex-col justify-center items-start">
                <div className="text-gray-800 text-base w-full">
                  <Select
                    options={statePaymentOptions}
                    placeholder="Select"
                    value={selectedPaymentOption}
                    onChange={handleChangedPayment}
                    onBlur={() =>
                      setTouchedPayment({ ...touchedPayment, state: true })
                    }
                    styles={customStyles}
                    className="w-[100%] bg-white outline-none font-medium font-optima text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
                </div>
              </div>
            </div>
          </>
        </CardPrototype>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-3 items-center">
          <TextInput
            name="search"
            type="text"
            placeholder="Search By"
            label=""
            istouched={true}
            className="text-gray-800 text-base w-full"
          />
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <IoPrintOutline size={20} />
          </div>
          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <RiFileExcel2Line size={20} />
          </div>
          <div>
            <div
              onClick={() => setOpen(!open)}
              className="bg-[#FF8900] cursor-pointer rounded-full px-5 py-2 flex gap-3 text-white items-center"
            >
              <IoMdAdd />
              Add Payment In
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {data.length > 0 && (
          <div className="w-full h-[100%] my-5 border border-gray-300 shadow-md rounded-md overflow-x-auto pb-[10px] bg-white">
            <table className="w-full">
              <thead className="rounded-t-lg bg-[#FFF1EC]">
                <tr>
                  {header.map((headerItem, index) => (
                    <th
                      key={index}
                      className="py-3 text-[14px] font-semibold text-gray-700 px-4 whitespace-nowrap text-left lg:px-6 uppercase"
                    >
                      {headerItem}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentDisplayedData.map((item: any, index: any) => (
                  <tr
                    key={index}
                    className={`font-light border-y border-gray-200 ${index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
                      }`}
                  >
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item.date}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item.refrenceNum || " "}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item.partiesName}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {" "}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      Payment-In
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item.receivedAmount}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item.receivedAmount}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      0
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      <div className="flex justify-center gap-2">
                        <IoMdPrint className="text-gray-800 text-xl" />
                        <FaShare className="text-gray-800 text-xl" />
                      </div>
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      <div className="relative">

                      <button className=" hover:bg-gray-100 hover:rounded-full px-2 py-2  bg-transparent" onClick={() => { setOpen1(!open1), setId1(item.id) }}>
                        <HiDotsVertical />
                      </button>
                      {open1 && item.id === id1 &&
                        <div className="absolute z-50 right-4 top-8 text-xs bg-white gap-1 rounded-lg flex flex-col shadow-lg py-3 border  px-2 text-start ">
                          <div className="hover:bg-gray-200 hover:scale-110 py-1" onClick={()=>{setOpen(true),setId(item.id)}}>
                            <button className="">
                              View/Edit
                            </button>
                          </div>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1">
                            <button>
                              Delete
                            </button>
                          </div>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1">
                            <button>
                              Duplicate
                            </button>
                          </div>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1">
                            <button>
                              Open PDF
                            </button>
                          </div>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1">
                            <button>
                              Preview
                            </button>
                          </div>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1">
                            <button>
                              Print
                            </button>
                          </div>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1">
                            <button>
                              View History
                            </button>
                          </div>
                        </div>
                      }
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-3"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing{" "}
                <span className="font-semibold text-gray-500 ">
                  {itemStartIndex}-{itemEndIndex}
                </span>{" "}
                of <span className="font-semibold text-gray-500 ">{data.length}</span>
              </span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-14">
                <li>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-[#FFF1EC] hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      disabled={currentPage === index + 1}
                      className={
                        currentPage === index + 1
                          ? "flex items-center justify-center px-3 h-10 leading-tight text-gray-50 bg-[#FFF1EC] border border-blue-300 hover:bg-blue-100 hover:text-[#FFF1EC] cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          : "flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-[#FFF1EC] hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <>
          <div className="mb-5">Payment-In</div>
          <div>
            <Payment setOpen={setOpen} defaultdata={defaultdata}/>
          </div>
        </>
      </Modal>
    </div>
  );
}
