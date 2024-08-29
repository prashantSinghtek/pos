"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Select from "react-select";
import { IoMdAdd } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import CardPrototype from "@/app/Components/CardPrototype";
import Modal from "@/app/Components/Modal";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import Payment from "../../Component/Payment";
import pos_controller from "@/controller/posauth";
import { customStyles } from "@/app/Components/Customstyle";
import CustomDatePicker from "@/app/Components/CustomDatePicker";
import Selector from "@/app/Components/Selector";
export default function Page() {
  const [open, setOpen] = useState(false);
  const auth = new pos_controller();
  const session = useSession();
  const token = session?.data?.user?.image;

  const firmid = localStorage.getItem("selectedStore");
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
    auth
      .GetPaymentOut(token,firmid)
      .then((res) => {
        setData(res);
        console.log(res)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, open,firmid]);

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
  ];
  const [date, setDate] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
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

  const handleChangedAllFirm = (selectedOption:any) => {
    setSelectedAllFirmOptions(selectedOption);
  };

  const statePaymentOptions = paymentOptions.map((option) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));

  const handleChangedPayment = (selectedOption:any) => {
    setSelectedPaymentOptions(selectedOption);
  };

  const [selectedOption, setSelectedOption] = useState<string>("All Firms");
  const [selectedOptionFirm, setSelectedOptionFirm] = useState<string>("All Firms");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    "All Purchase invoice",
    "this month",
    "last month",
    "this quarter",
    "this year",
    "custom"
  ];

  const optionsFirm = [
    "All Purchase invoice",
    "this month",
    "last month",
    "this quarter",
    "this year",
    "custom"
  ];
  // Wrapper function to ensure type safety for single select
  const handleSingleSelectChange = (selected: string | string[]) => {
    if (typeof selected === "string") {
      setSelectedOption(selected);
    }
  };
  const handleFirmSelectChange = (selected: string | string[]) => {
    if (typeof selected === "string") {
      setSelectedOptionFirm(selected);
    }
  };
  // Wrapper function to ensure type safety for multi-select
  const handleMultiSelectChange = (selected: string | string[]) => {
    if (Array.isArray(selected)) {
      setSelectedOptions(selected);
    }
  };
  return (
    <div className="mr-5">
      <div className="mt-5">
        <CardPrototype>
          <>
          <div className="flex gap-5 items-start w-[70%]">
              <div className="w-full  text-[20px]  font-bold">
                <Selector
                  options={options}
                  selectedOptions={selectedOption}
                  onChange={handleSingleSelectChange}
                  placeholder="Select a filter"
                />
                {/* <Selector
        options={options}
        selectedOptions={selectedOptions}
        onChange={handleMultiSelectChange}
        multiSelect={true}
        placeholder="Select multiple firms"
      /> */}
              </div>
              <div className="rounded-md text-gray-800 bg-gray-200 px-5 py-2">
                Between
              </div>
              <div className="w-[100%]  text-[20px] ">
                <CustomDatePicker
                  selectedDate={date}
                  onDateChange={(date: any) => setDate(date)}
                  className=""
                />
              </div>
              <div className="w-full  text-[20px] ">
                <CustomDatePicker
                  selectedDate={dateEnd}
                  onDateChange={(date: any) => setDateEnd(date)}
                  className=""
                />
              </div>
              <div className="w-full  text-[20px]  font-bold">
                <Selector
                  options={optionsFirm}
                  selectedOptions={selectedOptionFirm}
                  onChange={handleFirmSelectChange}
                  placeholder="Select a firm"
                />
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
              Add Payment Out
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
                {currentDisplayedData.map((item:any, index:any) => (
                  <tr
                    key={index}
                    className={`font-light border-y border-gray-200 ${
                      index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
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
                      print
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
          <div className="mb-5">Payment-Out</div>
          <div>
            <Payment setOpen={setOpen} />
          </div>
        </>
      </Modal>
    </div>
  );
}
