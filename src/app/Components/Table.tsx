"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { TransactionInterface } from "@/Redux/Item/types";

const Table = ({
  headerData,
  bodyData,
  onPageChange,
  count,
  isFullScreen,
}: any) => {
  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = bodyData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, bodyData?.length);
  const path = usePathname();

  const shouldShowBorder = !(path === "/pos");

  const headerRegex = (headerName: any) => new RegExp(`^${headerName}$`, "i");
  const containerClasses = `w-full h-[100%] my-5 ${
    shouldShowBorder
      ? "border border-gray-300 rounded-xl shadow-md "
      : "rounded-md"
  }  overflow-x-auto   pb-[10px] bg-white border border-gray-300 ${
    isFullScreen == true ? " h-[85vh] " : ""
  }`;

  const onPageChanged = (page: any) => {
    onPageChange(page);
  };
  return (
    <div className="h-[100%]">
      <div className={containerClasses}>
        <table className="w-full">
          {/* Header */}
          <thead
            className={` rounded-t-lg ${
              shouldShowBorder ? "bg-[#FFF1EC]" : " bg-[#FFF1EC] "
            }`}
          >
            <tr className="">
              {headerData.map((header: string, index: number) => (
                <th
                  key={index}
                  className="py-3 text-[14px] font-semibold text-gray-700 px-4 whitespace-nowrap text-left lg:px-6  uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Body */}
          <tbody>

            
            {bodyData?.map((item: TransactionInterface, index: any) => (
              <tr
                key={index}
                className={`font-light border-y border-gray-200 ${
                  index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
                }`}
              >
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.operationType ? item.operationType.replace("_", " ") : "NA"}
                  </td>
              
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.invoiceNumber ?item.invoiceNumber  :"NA"}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.partyName ? item.partyName : "NA"}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.dateOfTransaction ? item.dateOfTransaction : "NA"}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.quantity ? item.quantity : "NA"}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.unitPrice ? item.unitPrice : "NA"}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-1 ">
                    {item.status ? item.status : "NA"}
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
            of <span className="font-semibold text-gray-500 ">{count}</span>
          </span>

          {/* Pagination Buttons */}
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-14">
            <li>
              <button
                onClick={() => {
                  onPageChanged(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }}
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
                      ? "flex items-center justify-center px-3 h-10 leading-tight text-gray-50 bg-[#FFF1EC] border border-blue-300 hover:bg-blue-100 hover:text-[#FFF1EC]  cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      : "flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  onPageChanged(currentPage + 1);
                  setCurrentPage(currentPage + 1);
                }}
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
  );
};

export default Table;
