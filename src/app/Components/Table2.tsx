import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineFilterAlt } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import {
  FiEdit,
  FiTrash,
  FiCopy,
  FiFile,
  FiImage,
  FiPrinter,
} from "react-icons/fi"; // react-icons for icons
import { useDispatch } from "react-redux";
import DeleteConfirmationModal from "./deleteConfirmationModel";
import { transactionInterface } from "@/Redux/Parties/types";
import {
  DeleteTransactionAction,
  getPartyTransaction,
} from "@/Redux/Parties/reducer";
interface Filters {
  [key: string]: string;
}

const Table2 = ({
  headerData,
  bodyData,
  onPageChange,
  count,
  selectParty,
}: any) => {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [textFilters, setTextFilters] = useState<Filters>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null); // Single open filter
  const [openDropdownRow, setOpenDropdownRow] = useState<number | null>(null); // Tracks the open row for the dropdown
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, bodyData?.length);

  const path = usePathname();
  const shouldShowBorder = !(path === "/pos");

  const containerClasses = `w-full my-5 ${shouldShowBorder
      ? "border border-gray-300 rounded-xl shadow-md"
      : "rounded-md"
    } pb-[10px] bg-white border border-gray-300`;

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const applyFilters = (data: any[]) => {
    if (!Object.keys(filters).length && !Object.keys(textFilters).length)
      return data;

    return data.filter((item) => {
      for (let key in filters) {
        const filterValue = filters[key];
        const textFilterValue = textFilters[key];

        if (
          filterValue &&
          !item[key]
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        ) {
          return false;
        }

        if (
          textFilterValue &&
          !item[key]
            ?.toString()
            .toLowerCase()
            .includes(textFilterValue.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
  };

  const toggleFilterCollapse = (header: string) => {
    setOpenFilter((prev) => (prev === header ? null : header));
  };

  const toggleDropdown = (rowIndex: any) => {
    setOpenDropdownRow((prev) => (prev === rowIndex ? null : rowIndex));
  };

  const [setselectedTransaction, setSetselectedTransaction] = useState(0);

  const dispatch = useDispatch();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const handleClose = () => setOpenDeleteModel(false);
  const deleteParty = () => {
    dispatch(
      DeleteTransactionAction({
        transactionId: setselectedTransaction,
        callback() {
          dispatch(
            getPartyTransaction({
              partieId: selectParty,
              search: "",
              callback() {
                setOpenDeleteModel(false);
                toggleDropdown(null);
              },
            })
          );
        },
      })
    );
  };

  const filtersOptions: { [key: string]: string[] } = {
    Type: [
      "sale",
      "sale (e-0invoice)",
      "purchase",
      "add adjustment",
      "reduce adjustment",
      "opening stock",
      "manufacture",
      "consumption",
      "delivery challan",
      "estimate",
      "credit note",
      "credit note (e-invoice)",
      "sale order",
      "purchase order",
      "debit note",
      "party to party (received)",
      "party to party (paid)",
      "sale (cancelled)",
    ],
    Bill_Number: ["cantains", "exact match"],
    Date: ["equal to", "greater than", "less than", "rang"],
    Total: ["equal to", "greater than", "less than"],
    Balance_Due: ["equal to", "greater than", "less than"],
  };

  const handleFilterChange = (columnName: string, value: string) => {
    setFilters({
      ...filters,
      [columnName]: value,
    });
  };
  const handleTextFilterChange = (columnName: string, value: string) => {
    setTextFilters({
      ...textFilters,
      [columnName]: value,
    });
  };
  return (
    <div className={containerClasses}>
      <table className="w-full table-fixed border-collapse">
        <thead
          className={`rounded-t-lg w-full ${shouldShowBorder ? "bg-[#FFF1EC]" : "bg-[#FFF1EC]"
            }`}
        >
          <tr>
            <th className="py-3 px-[11px] text-[13px] text-gray-800 text-center uppercase w-10 rounded-tl-[10px] rounded-br-[0] rounded-tr-[0] rounded-bl-[0] whitespace-nowrap	">
              S. No.
            </th>
            {headerData.map((header: string, index: number) => (
              <th
                key={index}
                className="py-3 text-[13px] text-gray-800 whitespace-nowrap text-center uppercase relative"
              >
                {header}
                {header.toLowerCase() !== "serial no" && (
                  <div className="absolute 2xl:right-5 lg:right-0 top-0 h-full flex items-center">
                    <button
                      className="focus:outline-none text-[#2D9CDB]"
                      onClick={() => toggleFilterCollapse(header)}
                    >
                      <MdOutlineFilterAlt size={20} />
                    </button>
                    {openFilter === header && (
                      <div
                        className="absolute top-full -left-12 mt-2 w-[150px] bg-white border border-gray-300 shadow-lg z-10"
                        style={{
                          display: "grid",
                        }}
                      >
                        {header.toLowerCase() === "date" ? (
                          <input
                            type="date"
                            className="w-full px-2 py-1 border-none focus:outline-none focus:ring-0 text-[10px]"
                            value={filters[header] || ""}
                            onChange={(e) =>
                              handleFilterChange(header, e.target.value)
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-full px-2 py-1 border-none focus:outline-none focus:ring-0 text-[11px]"
                            placeholder={`Search ${header}`}
                            value={textFilters[header] || ""}
                            onChange={(e) =>
                              handleTextFilterChange(header, e.target.value)
                            }
                          />
                        )}

                        <select
                          className="w-full px-2 py-1 border-none  focus:outline-none focus:border-none text-[11px] focus:ring-0"
                          value={filters[header] || ""}
                          onChange={(e) =>
                            handleFilterChange(header, e.target.value)
                          }
                        >
                          <option value="">Select...</option>
                          {filtersOptions[header.replace(" ", "_")]
                            ? filtersOptions[header.replace(" ", "_")].map(
                              (option: string, idx: number) => (
                                <option key={idx} value={option}>
                                  {option}
                                </option>
                              )
                            )
                            : Array.from(
                              new Set(
                                bodyData.map(
                                  (item: any) => item[header.toLowerCase()]
                                )
                              )
                            ).map((value: any, idx: any) => (
                              <option key={idx} value={value}>
                                {value}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </th>
            ))}
            {/* <th className="py-3 text-[13px] text-gray-800 text-center uppercase relative"></th> */}
          </tr>
        </thead>
        {bodyData.length ? (
          <tbody>
            {applyFilters(bodyData).map(
              (item: transactionInterface, index: number) => (
                <tr
                  key={index}
                  className={`font-light border-y border-gray-200 ${index % 2 === 1 ? "bg-gray-100" : ""
                    }`}
                >
                  <td className="text-sm text-gray-700 text-center py-1">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item.operationType}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item.billNumber}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item.dateOfTransaction}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item.totalAmount}
                  </td>
                  <td className="text-sm text-gray-700 text-center py-1">
                    {item.balanceDue}
                  </td>

                  <td className="text-center ">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => {
                          setSetselectedTransaction(item.id);
                          toggleDropdown(index);
                        }}
                        className="focus:outline-none"
                      >
                        <HiDotsVertical size={20} />
                      </button>
                      {openDropdownRow === index && (
                        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="py-1">
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <FiEdit className="mr-2 inline-block" /> Update
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => {
                                setOpenDeleteModel(true);
                              }}
                            >
                              <FiTrash className="mr-2 inline-block" /> Delete
                            </button>
                            {/* <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <FiCopy className="mr-2 inline-block" /> Duplicate
                          </button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <FiFile className="mr-2 inline-block" /> open PDF
                          </button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <FiImage className="mr-2 inline-block" />Preview
                          </button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <FiPrinter className="mr-2 inline-block" /> Print
                          </button> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={headerData.length + 1} className="text-center">
                No data available
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-center pt-4 px-3 text-center"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 ">
          Showing <span className="font-semibold">{itemStartIndex}</span> to{" "}
          <span className="font-semibold">{itemEndIndex}</span> of{" "}
          <span className="font-semibold">{count}</span> entries
        </span>
        <ul className="inline-flex -space-x-px pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={` ${currentPage === index + 1
                    ? "active-page-class"
                    : "inactive-page-class"
                  }`}
                onClick={() => onPageChanged(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <DeleteConfirmationModal
        open={openDeleteModel}
        handleClose={handleClose}
        handleConfirm={deleteParty}
      />
    </div>
  );
};
export default Table2;
