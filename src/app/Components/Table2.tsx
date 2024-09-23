import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineFilterAlt } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { transactionInterface } from "@/Redux/Parties/types";

interface Filters {
  [key: string]: string;
}

const Table2 = ({ headerData, bodyData, onPageChange, count }: any) => {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [textFilters, setTextFilters] = useState<Filters>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null); // Single open filter

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, bodyData?.length);
  const path = usePathname();
  const shouldShowBorder = !(path === "/pos");

  const headerRegex = (headerName: any) => new RegExp(`^${headerName}$`, "i");
  const containerClasses = `w-full my-5 ${
    shouldShowBorder
      ? "border border-gray-300 rounded-xl shadow-md"
      : "rounded-md"
  } overflow-x-auto pb-[10px] bg-white border border-gray-300`;

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  // Handles filter change for dropdowns and date input
  const handleFilterChange = (columnName: string, value: string) => {
    setFilters({
      ...filters,
      [columnName]: value,
    });
  };

  // Handles filter change for text inputs
  const handleTextFilterChange = (columnName: string, value: string) => {
    setTextFilters({
      ...textFilters,
      [columnName]: value,
    });
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
    // If the current header is already open, close it. Otherwise, set it as open
    setOpenFilter((prev) => (prev === header ? null : header));
  };

  const filtersOptions: { [key: string]: string[] } = {
    type: [
      "sale",
      "sale (e-invoice)",
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
    number: ["cantains", "exact match"],
    date: ["equal to", "greater than", "less than", "rang"],
    total: ["equal to", "greater than", "less than"],
    balance: ["equal to", "greater than", "less than"],
  };

  return (
    <div>
      <div
        className={containerClasses}
        style={{
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        <table
          className="w-full "
          style={{
            minHeight: "200px",
          }}
        >
          <thead
            className={`rounded-t-lg w-[100%] ${
              shouldShowBorder ? "bg-[#FFF1EC]" : " bg-[#FFF1EC]"
            }`}
          >
            <tr>
              <th className="py-3 text-[13px] text-gray-800  whitespace-nowrap text-center  uppercase relative w-10">
                S. No.
              </th>
              {headerData.map((header: string, index: number) => (
                <th
                  key={index}
                  className="py-3 text-[13px] text-gray-800  whitespace-nowrap text-center  uppercase relative"
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
                            {filtersOptions[header.toLowerCase()]
                              ? filtersOptions[header.toLowerCase()].map(
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
              <th className="py-3 text-[13px] text-gray-800  whitespace-nowrap text-center  uppercase relative ">
                Action
              </th>
            </tr>
          </thead>
          {/* const headerData = ["Type", "Number", "Date", "Total", "Balance"]; */}
          {bodyData.length ? (
            <tbody className="w-full">
              {applyFilters(bodyData)?.map(
                (item: transactionInterface, index: any) => (
                  <tr
                    key={index}
                    className={`font-light border-y border-gray-200 ${
                      index % 2 === 1 ? "bg-gray-100 rounded-full" : ""
                    }`}
                  >
                    <td className="text-sm text-gray-700 text-center py-1">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-700 text-center py-1">
                      {item.type}
                    </td>
                    <td className="text-sm text-gray-700 text-center py-1">
                      {item.number}
                    </td>

                    <td className="text-sm text-gray-700 text-center py-1">
                      {item.date}
                    </td>

                    <td className="text-sm text-gray-700 text-center py-1">
                      {item.total}
                    </td>
                    <td className="text-sm text-gray-700 text-center py-1">
                      {item.balance}
                    </td>
                    <td className="text-sm text-gray-700 text-center py-1">
                      <HiDotsVertical />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          ) : (
            <tbody className="w-full"> </tbody>
          )}
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-3"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500">
            Showing <span className="font-semibold">{itemStartIndex}</span> to{" "}
            <span className="font-semibold">{itemEndIndex}</span> of{" "}
            <span className="font-semibold">{count}</span> entries
          </span>
          <ul className="inline-flex -space-x-px pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={` ${
                    currentPage === index + 1
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
      </div>
    </div>
  );
};

export default Table2;
