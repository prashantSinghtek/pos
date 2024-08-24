"use client";
import Button from "@/app/Components/Button";
import Table from "@/app/Components/Table";
import Table2 from "@/app/Components/Table2";
import TextInput from "@/app/Components/Textinput";
import pos_controller from "@/controller/posauth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";

export default function Saleorder() {
  const header = [
    "Party Name ",
    "Phone No.",
    "Date",
    "Due Date",
    "Total Amount",
    "Balance",
    "Type",
    "Status",
    "Action",
    " ",
  ];
  const [open, setOpen] = useState(false);
  const [id, setId] = useState()
  const [open1, setOpen1] = useState(false);
  const [id1, setId1] = useState()
  const auth = new pos_controller();
  const session = useSession();
  const token = session?.data?.user?.image;
  const firmid = localStorage.getItem("selectedStore");
  const PAGE_SIZE = 10;

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);


  useEffect(() => {
    auth.GetSaleOrder(token, firmid)
      .then((res) => {
        setData(res.data);
        console.log(res, "===res");
      })
      .catch((error) => {
        console.error(error);
      })
  }, [token, firmid])

  return (
    <div>
      <div className="mt-5 flex justify-between w-[100%]">
        <div className="flex gap-3 items-center w-[30%]">
          <TextInput
            name="search"
            type="text"
            placeholder="Search By"
            label=""
            istouched={"Touch"}
            className="text-gray-800 text-base w-[100%]"
          />
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <Button
              color={"bg-[#FF8900]"}
              title={"Add Sale Order"}
              link={"/"}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        {/* <Table2 headerData={header} bodyData={bodyData} />  Table start*/}

        <div className="mt-5">
          {data.length > 0 && (
            <div className="w-full h-[100%] my-5 border border-gray-300 shadow-md rounded-md overflow-x-auto pb-[10px] bg-white">
              <table className="w-full">
                <thead className="rounded-t-lg bg-[#FFF1EC]">
                  <tr>
                    {header.map((headerItem, index) => (
                      <th
                        key={index}
                        className="py-3 text-[14px] font-semibold text-gray-700 px-4 whitespace-nowrap text-center lg:px-6 uppercase"
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
                      <td className="text-sm text-gray-700 text-center px-2 py-1 hover:underline hover:text-blue-500">
                        {item?.partiesName}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {item?.phoneNumber}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {item?.orderDate}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {item?.dueDate}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {item?.totalAmount}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {item?.remainingBalance}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {item?.paymentType}
                      </td>
                      <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                        {/* {item?.remainingBalance}  */} Status
                      </td>
                      <td className="relative text-sm text-gray-700 text-center px-2 py-1 ">
                        <button className="border border-gray-300 px-3 py-1 shadow-inner bg-white hover:bg-[#FFF1EC]" onClick={() => { setOpen(!open), setId(item.id) }}>
                          Convert
                        </button>
                        {open && item.id === id &&
                          <div className="absolute z-50 top-8 text-xs  bg-white gap-1 rounded-lg flex flex-col shadow-lg py-3 border  px-2 text-start ">
                            <div className="hover:bg-gray-200 hover:scale-110 py-1">
                              <button className="">
                                Convert to sale
                              </button>
                            </div>
                            <div className="hover:bg-gray-200 hover:scale-110 py-1">
                              <button>
                                Convert to sale Order
                              </button>
                            </div>
                          </div>
                        }
                      </td>
                      <td className=" relative text-sm text-gray-700 text-center px-2 py-1 ">
                        <button className=" hover:bg-gray-100 hover:rounded-full px-2 py-2  bg-transparent" onClick={() => { setOpen1(!open1), setId1(item.id) }}>
                          <HiDotsVertical />
                        </button>
                        {open1 && item.id === id1 &&
                          <div className={`${index > currentDisplayedData.length/2 ? "bottom-3":" top-8 " } absolute right-8 z-50 text-xs  bg-white gap-1 rounded-lg flex flex-col shadow-lg py-3 border  px-2 text-start`}>
                            <div className="hover:bg-gray-200 hover:scale-110 py-1">
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


        {/* Table End */}
      </div>
    </div>
  );
}
