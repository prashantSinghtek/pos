"use client";
import Button from "@/app/Components/Button";
import Modal from "@/app/Components/Modal";
import Table from "@/app/Components/Table";
import Table2 from "@/app/Components/Table2";
import TextInput from "@/app/Components/Textinput";
import { addDeliveryChallan, getParticularDeliveryChallan } from "@/controller/posauth";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";

interface Filters {
  [key: string]: string;
}

const firmid = localStorage.getItem("selectedStore");
export default function Page() {
  const session = useSession();
  const token = session?.data?.uToken;
  console.log("sessionPage", session)
  const [data, setData] = useState([])
  const [Returndata, setReturnData] = useState([])
  const [id, setId] = useState()
  // console.log(data)
  const header = [
    "challan No.",
    "Party Name ",
    "Date",
    "Due Date",
    "Paid",
    "Total",
    "Status",
    "Action",
    ""
  ];
  const PAGE_SIZE = 10;
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const bodyData = data.map((item: any) => {
    return {
      value1: item?.challanNumber,
      value2: item?.partiesName,
      value3: item?.invoiceDate,
      value4: item?.dueDate,
      value5: item?.paid == false ? "Unpaid" : "Paid",
      value6: item?.deliveryChallanAmount,
      value7: item?.status,
    };
  });
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = data?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data?.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data?.length);



  const headerRegex = (headerName: any) => new RegExp(`^${headerName}$`, "i");
  const containerClasses = "w-full my-5 mr-5 border border-gray-300 rounded-xl shadow-md rounded-md overflow-x-auto   pb-[10px] bg-white border border-gray-300 "

  const onPageChanged = (page: number) => {
    setCurrentPage(page);

  };

  const handleFilterChange = (columnName: string, value: string) => {
    setFilters({
      ...filters,
      [columnName]: value,
    });
  };

  const applyFilters = (data: any[]) => {
    if (!Object.keys(filters).length) return data;

    return data.filter((item) => {
      for (let key in filters) {
        const filterValue = filters[key];
        if (
          filterValue &&
          !item[key]
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
  };

  const toggleFilterCollapse = (header: string) => {
    setIsFilterOpen((prev) => ({
      ...prev,
      [header]: !prev[header],
    }));
  };


  useEffect(() => {
    // addDeliveryChallan(token).then((res) => { setData(res.data) })
    //   .catch((err) => console.log(err))

  }, [token])
  useEffect(() => {
    getParticularDeliveryChallan( id).then((res) => { console.log(res.data); setReturnData(res.data.items) })
      .catch((err) => console.log(err))

  }, [token, id])
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
              title={"Add Delivery Challan"}
              link={"/adddeliverychallan"}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className={`${containerClasses} w-full`} style={{
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}>
          <table className="w-full">
            {/* Header */}
            <thead
              className={`rounded-t-lg w-[100%] bg-[#FFF1EC]`}
            >
              <tr>
                {header.map((header: string, index: number) => (
                  <th
                    key={index}
                    className="py-3 text-[13px] text-gray-800 px-4 whitespace-nowrap text-left lg:px-6 uppercase relative"
                  >

                    {header}
                    {/* Filter component */}
                    <div className="absolute 2xl:right-7 lg:right-0 top-0 h-full flex items-center">
                      {
                        header.length > 0 &&

                        <button
                          title="fd"
                          className="focus:outline-none text-[#2D9CDB]"
                          onClick={() => toggleFilterCollapse(header)}
                        >
                          <MdOutlineFilterAlt size={20} />
                        </button>
                      }
                      {/* Filter collapse */}
                      {isFilterOpen[header] && (
                        <div className="absolute top-full -left-12 mt-2 w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          {/* Selector filter */}
                          <div className="p-2">
                            <label className="block mb-1 text-sm font-semibold">
                              Select Filter
                            </label>
                            <select
                              title="f"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                              value={filters[header] || ""}
                              onChange={(e) =>
                                handleFilterChange(header, e.target.value)
                              }
                            >
                              <option value="">Select...</option>
                              {Array.from(
                                new Set(
                                  bodyData.map(
                                    (item: any) => item[header.toLowerCase()]
                                  )
                                )
                              ).map((value: any, index: any) => (
                                <option key={index} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Body */}
            <tbody className="w-full">
              {/* Apply filters to displayed data */}
              {applyFilters(currentDisplayedData).map((item: any, index: any) => (
                <tr
                  key={index}
                  className={`font-light border-y border-gray-200 ${index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
                    }`}
                >
                  {/* Render table data */}
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item?.challanNumber}
                  </td>
                  <td className="text-sm text-gray-700 text-center  py-1">
                    {item?.partiesName}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item?.invoiceDate}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item?.dueDate}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item?.paid == false ? "Unpaid" : "Paid"}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item?.deliveryChallanAmount}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1 ">
                    {item?.status}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1 ">
                    <button className="border border-gray-300 px-3 py-1 shadow-inner bg-white hover:bg-[#FFF1EC]" onClick={() => { setOpen(!open), setId(item.id) }}>
                      Convert To Sale
                    </button>

                  </td>
                  <td className="text-sm text-gray-700 text-center py-1 ">
                    <HiDotsVertical />
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-3"
            aria-label="Table navigation"
          >
            {/* Pagination Info */}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-500 ">
                {itemStartIndex}-{itemEndIndex}
              </span>{" "}
              of <span className="font-semibold text-gray-500 ">{data?.length}</span>
            </span>
            {/* Pagination Buttons */}
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-14">
              {/* Previous Button */}
              <li>
                <button
                  onClick={() => onPageChanged(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-[#FFF1EC] hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {/* Page Buttons */}
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    disabled={currentPage === index + 1}
                    className={
                      currentPage === index + 1
                        ? "flex items-center justify-center px-3 h-10 leading-tight text-gray-800 bg-[#FFF1EC] border border-gray-300 hover:bg-[#FF8900] cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              {/* Next Button */}
              <li>
                <button
                  onClick={() => onPageChanged(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-[#FFF1EC] hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <>
            <div className="mb-5 text-gray-800">Return Goods</div>
            <div className="mb-5 text-gray-800">
              List Of Items on Challan
            </div>
            <table className="w-full text-gray-800 ">
              <thead>
                <tr className="text-sm bg-gray-100">
                  <th className="px-4 py-2 text-center ">Items</th>
                  <th className="px-4 py-2 text-center ">Shipped</th>
                  <th className="px-4 py-2 text-center ">Unit</th>
                  <th className="px-4 py-2 text-center ">Returned Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Returndata.map((item: any, index: any) => (
                  <>
                    {console.log("item", item)}
                    <tr className="text-sm">
                      <td className="px-4 py-2 text-center ">{item?.itemName}</td>
                      <td className="px-4 py-2 text-center ">{item?.itemPricing?.quantity}</td>
                      <td className="px-4 py-2 text-center ">{item?.unit}</td>
                      <td className="px-4 py-2 text-center "> 
                        <input type="text" className="border border-gray-800 bg-white p-1" />
                      </td>
                    </tr>
                  </>

                ))}
              </tbody>
            </table>

            <div className="flex justify-end px-20 border-t border-gray-400 py-5">
              <div className="bg-[#FF8900] text-white px-5 py-2 rounded-lg">
                Done
              </div>
            </div>

          </>
        </Modal>
      </div>

    </div>
  );
}
 