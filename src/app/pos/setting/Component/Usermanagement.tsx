import Modal from "@/app/Components/Modal";
import Table from "@/app/Components/Table";
import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GiAstronautHelmet } from "react-icons/gi";
import { IoShieldSharp } from "react-icons/io5";
import Adduserform from "./Adduserform";
import ModuleForm from "./Moduleform";
import { useSession } from "next-auth/react";
import { getFirmUser } from "@/controller/posauth";


export default function Usermanagement() {
  const session = useSession();
  const token = ""
  // const body = [
  //   {
  //     value1: "prashant agarwal",
  //     value2: "928545256",
  //     value3: "prashantagarwal@gmail.com",
  //     value4: "Admin",
  //   },
  // ];
  const [body, setBody] = useState<any>([]);
  const [selecteduser, setSelecteduser] = useState<any>();
  console.log("selecteduser", selecteduser);
  const header = ["User Name", "Phone", "Email", "Role", "", "", ""];
  const [open, setOpen] = useState(false);
  const [moduleopen, setModuleopen] = useState(false);

  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = body?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(body.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, body?.length);

  const headerRegex = (headerName: any) => new RegExp(`^${headerName}$`, "i");
  const containerClasses = `w-full h-[100%] my-5 ${"border border-gray-300 rounded-xl shadow-md "}  overflow-x-auto   pb-[10px] bg-white border border-gray-300 `;

  const onPageChanged = (page: any) => {
    onPageChanged(page);
  };

  useEffect(() => {
   getFirmUser()
      .then((res: any) => {
        console.log("dfg", res);
        setBody(res.data);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, [token]);

  return (
    <div className="w-[100%] px-8">
      <div className="flex justify-between items-center px-5">
        <div className="text-xl">User Management</div>
        <div
          className="bg-[#fda80c] text-white rounded-full px-5 py-2"
          onClick={() => setOpen(!open)}
        >
          Add User
        </div>
      </div>
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
                    {item.firstName + " " + item.lastName}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    {item.mobile}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    {item.email}
                  </td>
                  <td className="text-sm text-gray-700 text-center px-2 py-3 ">
                    {item.userRole}
                  </td>
                  <td className="text-sm text-gray-700 text-center  py-3 cursor-pointer ">
                    <FaPencilAlt />
                  </td>
                  <td
                    className="text-sm text-gray-700 text-center  py-3 cursor-pointer "
                    onClick={() => {
                      setModuleopen(!moduleopen), setSelecteduser(item.id);
                    }}
                  >
                    <IoShieldSharp />
                  </td>
                  <td className="text-sm text-gray-700 text-center  py-3  cursor-pointer">
                    <GiAstronautHelmet />
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
                        ? "flex items-center justify-center px-3 h-10 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-[#FFF1EC] hover:text-gray-800  cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <>
          <div>Add user</div>
          <div>
            <Adduserform />
          </div>
        </>
      </Modal>
      <Modal isOpen={moduleopen} onClose={() => setModuleopen(false)}>
        <>
          <div>
            <ModuleForm />
          </div>
        </>
      </Modal>
    </div>
  );
}
