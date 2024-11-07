"use client"
import Button from "@/app/Components/Button";
import CardPrototype from "@/app/Components/CardPrototype";
import { customStyles } from "@/app/Components/Customstyle";
import TextInput from "@/app/Components/Textinput";
import { getEstimate } from "@/controller/posauth";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";

import Select from "react-select";

export default function Page() {
  const header = [
    "Date",
    "Reference No.",
    "Party Name ",
    "Total Amount",
    "Balance Due",
    "Status",
    "Action",
    " ",
  ];

  const [selectedestimate, setSelectedestimate] = useState()



  const [open, setOpen] = useState(false);
  const [id, setId] = useState()
  const [open1, setOpen1] = useState(false);
  const [id1, setId1] = useState()
  const session = useSession();
  const token = ""
  const PAGE_SIZE = 4;

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  // const bodyData = [
  //   { value1: "Data1", value2: "Data2", value3: "Data3", value4: "Data4", value5: "Data5", value6: "Data6", value7:"data7" },
  //   { value1: "Data1", value2: "Data2", value3: "Data3", value4: "Data4", value5: "Data5", value6: "Data6", value7:"data7" },
  //   { value1: "Data1", value2: "Data2", value3: "Data3", value4: "Data4", value5: "Data5", value6: "Data6", value7:"data7" },
  //   // Add more dummy data as needed
  // ];


  const [allfirm, setAllfirm] = useState<any>(["All Firm", "Sheela Business"]);
  const [selectedallfirmOption, setSelectedallfirmOptions] = useState<any>();
  const [touchedallfirm, setTouchedallfirm] = useState({ state: false });


  const stateOptions = allfirm?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));
  const handleChangedallfirm = (selectedOption: any) => {
    setSelectedallfirmOptions(selectedOption);
  };



  // useEffect(() => {
  //   getEstimate(firmid)
  //     .then((res) => {
  //       setData(res.data)
  //       // console.log(res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [token, firmid])


  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);



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
                  <Select
                    options={stateOptions}
                    placeholder={"with allfirm"}
                    value={selectedallfirmOption}
                    onChange={handleChangedallfirm}
                    onBlur={() => setTouchedallfirm({ ...touchedallfirm, state: true })}
                    styles={customStyles}
                    className="w-[100%]  bg-white  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
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
          {/* <div className="bg-blue-400 px-3 h-[45px] py-3 mt-[6px] rounded-lg">
            <CiFilter color="white" size={25} />
          </div> */}
        </div>
        <div className="flex gap-3 items-center">

          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <IoPrintOutline size={20} />
          </div>
          <div className="text-[#769FB6] border-2 border-[#769FB6] rounded-full p-2">
            <RiFileExcel2Line size={20} />
          </div>
          <div>
            <Button color={"bg-[#FF8900]"} title={"Add Estimate"} link={"/"} />
          </div>
        </div>
      </div>

      {/* <Table2 headerData={header} bodyData={bodyData}/>  Table content*/}

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
                    className={`font-light border-y b
                      order-gray-200 ${index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
                      }`}
                  >
                    {/* {console.log("item", item)} */}
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.invoiceDate}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.refrenceNumber || " "}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.partiesname}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.totalItemAmount}
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {/* {item?.remainingBalance} */}
                      {/* {item?.paymentType}  Balance Due */} Balance Due
                    </td>
                    <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                      {item?.status}
                    </td>
                    <td className="relative text-sm text-gray-700 text-center px-2 py-1 ">
                      <button className="border border-gray-300 px-3 py-1 shadow-inner bg-white hover:bg-[#FFF1EC]" onClick={() => { setOpen(!open), setId(item.id) }}>
                        Convert
                      </button>
                      {open && item.id === id &&
                        <div className="absolute top-8 text-xs  bg-white gap-1 rounded-lg flex flex-col shadow-lg py-3 border  px-2 text-start ">
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
                    <td className=" text-sm text-gray-700 text-center px-2 py-1 ">
                      <button className=" hover:bg-gray-100 hover:rounded-full px-2 py-2  bg-white" onClick={() => { setOpen1(!open1), setId1(item.id) }}>
                        <HiDotsVertical />
                      </button>
                      {open1 && item.id === id1 &&
                        <div className="absolute right-8 z-50 top-8 text-xs  bg-white gap-1 rounded-lg flex flex-col shadow-lg py-3 border  px-2 text-start ">
                          <Link href={`/addestimate/${item.id}`}>
                            <div className="hover:bg-gray-200 hover:scale-110 py-1" >
                              <button className="">
                                View/Edit
                              </button>
                            </div>
                          </Link>
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

      {/* Table end */}

    </div>
  );
}
