"use client";
import Button from "@/app/Components/Button";
import CardPrototype from "@/app/Components/CardPrototype";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import { deleteParticularSaleCash, getSale } from "@/controller/posauth";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdPrint } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { RiBillLine, RiFileExcel2Line } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";

export default function Page() {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState()
  const [open1, setOpen1] = useState(false);
  const [id1, setId1] = useState()
  const session = useSession();
  const token = session?.data?.uToken;
  const firmid = localStorage.getItem("selectedStore");
  const PAGE_SIZE = 10;
  const [saleupdate,setSaleupdate] = useState(false)

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const header = [
    "Date",
    "Invoice No.",
    "Party Name ",
    "Transaction Type",
    "Payment Type",
    "Amount",
    "Balance Due",
    "Action",
    " ",
  ];

  // console.log(data,"===data");

  useEffect(() => {
    getSale(firmid)
      .then((res) => {
        setData(res);
        setSaleupdate(false)
        console.log(res, "===res");
      })
      .catch((error) => {
        console.error(error);
      })
  }, [token, firmid,saleupdate])


  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);

const handleDelete =async (id:any)=>{
  try {
    const res = await deleteParticularSaleCash(id)
    console.log(res)
    setSaleupdate(true)
  } catch (error) {
    console.log(error)
  }

}

  return (
    <div className="mr-5">
      <div className="mt-5">
        <CardPrototype>
          <>
            <div className="flex gap-5 items-end">
              <div className="w-[10%]  text-[22px] mb-1">This Month</div>
              <div className="rounded-md text-gray-800 bg-gray-200 px-5 py-2 h-fit">
                Between
              </div>
              <div className="w-[30%] flex flex-col justify-center items-start">
                <div className="text-gray-800 text-base w-full">
                  <TextInput
                    name="datefrom"
                    type="datefrom"
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
                    name="datefrom"
                    type="datefrom"
                    placeholder="05/04/2024"
                    label="Date To:"
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
              <div className="w-[10%] flex flex-col justify-center items-start">
                <div className="text-gray-800 text-base w-full">
                  <TextInput
                    name="datefrom"
                    type="datefrom"
                    placeholder=""
                    label=""
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-5 ">
              <div className="bg-[#DFF3FF] items-center pl-2 pr-9 py-2 w-fit flex gap-3 rounded-md">
                <div className="bg-[#B5E4FF] text-[#2D9CDB] p-3 rounded-full">
                  <MdCurrencyRupee size={25} />
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400 text-base">Paid</div>
                  <div className="text-sm">₹ 400000</div>
                </div>
              </div>
              <div className="text-gray-400 text-[30px]">+</div>
              <div className="bg-[#FFEBEB] items-center pl-2 pr-9 py-2 w-fit flex gap-3 rounded-md">
                <div className="bg-[#FFD4C6] text-[#FF6E3F] p-3 rounded-full">
                  <RiBillLine size={25} />
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400 text-base">Unpaid</div>
                  <div className="text-sm">₹ 0.00</div>
                </div>
              </div>
              <div className="text-gray-400 text-[30px]">=</div>
              <div className="bg-[#FEECD8] items-center px-6 py-2 w-fit flex gap-3 rounded-md">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-gray-400 text-base">Total</div>
                  <div className="text-sm">₹ 40000</div>
                </div>
              </div>
            </div>
          </>
        </CardPrototype>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="text-[20px]">Transaction</div>
          <TextInput
            name="search"
            type="text"
            placeholder="Search By"
            label=""
            istouched={"Touch"}
            className="text-gray-800 text-base w-full"
          />
          <div className="bg-blue-400 px-3 h-[45px] py-3 mt-[6px] rounded-lg">
            <CiFilter color="white" size={25} />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <VscGraph size={20} />
          </div>
          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <IoPrintOutline size={20} />
          </div>
          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <RiFileExcel2Line size={20} />
          </div>
          <div>
            <Button color={"bg-[#FF8900]"} title={"Add Sale"} link={"/addsale"} />
          </div>
        </div>
      </div>

      {/* <Table headerData={header} />   Table content*/}
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
                    {/* {console.log("item", item)} */}
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.invoiceDate}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.invoiceNumber || " "}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.partiesName}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.type}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.totalItemAmount}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      ₹{item?.totalAmount}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      ₹{item?.remainingBalance}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      <div className="flex justify-center gap-2">
                        <IoMdPrint className="text-gray-800 text-xl" />
                        <FaShare className="text-gray-800 text-xl" />
                      </div>
                    </td>
                    <td className="relative text-sm text-gray-700 text-center px-2 py-1 ">
                      <button className=" hover:bg-gray-100 hover:rounded-full px-2 py-2  bg-white" onClick={() => { setOpen1(!open1), setId1(item.id) }}>
                        <HiDotsVertical />
                      </button>
                      {open1 && item.id === id1 &&
                        <div className={`${index > currentDisplayedData.length / 2 ? "bottom-3" : " top-8 "} absolute right-8 z-50 text-xs  bg-white gap-1 rounded-lg flex flex-col shadow-lg py-3 border  px-2 text-start`}>
                          <Link href={`/addsale/${item.id}`}>
                            <div className="hover:bg-gray-200 hover:scale-110 py-1">
                              <button className="">
                                View/Edit
                              </button>
                            </div>
                          </Link>
                          <div className="hover:bg-gray-200 hover:scale-110 py-1" onClick={()=>handleDelete(item.id)}>
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

    </div>
  );
}
