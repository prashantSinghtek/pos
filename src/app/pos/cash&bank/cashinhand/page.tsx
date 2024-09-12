"use client"
import CardPrototype from '@/app/Components/CardPrototype';
import pos_controller from '@/controller/posauth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';


export default function page() {
    const firmid = localStorage.getItem("selectedStore");
    const session = useSession();
    const token = localStorage.getItem("authToken");
    const auth = new pos_controller()
    const [body, setBody] = useState<any>([]);
    const [selecteduser, setSelecteduser] = useState<any>();
    console.log("selecteduser",selecteduser)
    const header = ["Type", "Name", "Date", "Amount", ""];
    const [open, setOpen] = useState(false);
    const [moduleopen, setModuleopen] = useState(false);
    const [cash,setCash] = useState<any>()
    const [cashtransaction,setCashtransaction] = useState<any>()
    const PAGE_SIZE = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentDisplayedData = body?.slice(startIndex, endIndex);
    const totalPages = Math.ceil(body.length / PAGE_SIZE);
    const itemStartIndex = startIndex + 1;
    const itemEndIndex = Math.min(startIndex + PAGE_SIZE, body?.length);
    const [cashamount , SetCashAmount] = useState<any>([]);
  
    const headerRegex = (headerName: any) => new RegExp(`^${headerName}$`, "i");
    const containerClasses = `w-full h-[100%] my-5 ${"border border-gray-300 rounded-xl shadow-md "}  overflow-x-auto   pb-[10px] bg-white border border-gray-300 `;
  
    const onPageChanged = (page: any) => {
      onPageChanged(page);
    };

    useEffect(()=>{
        getcash(token,firmid).then((res)=>{setBody(res.data),console.log(res.data)}).catch((err)=>console.log(err))
    },[token,firmid])

    useEffect(()=>{
        // handleGetCashtrasaction(storeid).then((res)=>{setBody(res);console.log(res)}).catch((err)=>console.log(err))
    },[token,firmid])

    useEffect(()=>{
      GetCashAmount(token,firmid).then((res)=>{SetCashAmount(res?.data),console.log(res)}).catch((err)=>console.log(err))
  },[token,firmid])

  return (
    <div className='mr-5'>
    <div className='mt-5 '>
      <CardPrototype>
        <div className='text-[24px]'>
            Cash In Hand: <span className='text-green-600 font-semibold'>₹{cashamount[0]?.cashInHandBalance}</span>
        </div>
      </CardPrototype>
    </div>
    <div className='mt-5'>
     
      <div className="h-[77vh]">
        <div className={containerClasses}>
          <table className="w-full">
            {/* Header */}
            <thead
              className={` rounded-t-lg ${" bg-[#FFF1EC] border-b border-gray-300 "}`}
            >
              <tr className="">
                {header.map((header: string, index: number) => (
                  <th
                    key={index}
                    className="py-3 text-[14px]  text-gray-700 px-4 font-light text-center lg:px-1  uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Body */}
            <tbody>
              {body?.map((item: any, index: any) => (
                <tr
                // {console.log("item>>>>",item)}
                  key={index}
                  className={`font-light border-y  border-gray-200 ${
                    index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
                  }`}
                >
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    {item?.adjustmentType}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    {item?.name ? item?.name :" "}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    {item?.adjustmentDate}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    ₹{item?.amount}
                  </td>
                  <td className="text-sm text-gray-700 text-center  py-3 cursor-pointer ">
                  <BsThreeDotsVertical />
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
              of <span className="font-semibold text-gray-500 "></span>
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
      
    </div>
    </div>
  )
}