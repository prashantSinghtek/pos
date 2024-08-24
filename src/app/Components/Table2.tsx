import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { CiFilter } from "react-icons/ci";
import { MdOutlineFilterAlt } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

interface Filters {
  [key: string]: string;
}

const Table2 = ({ headerData, bodyData, onPageChange, count }: any) => {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = bodyData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, bodyData?.length);
  const path = usePathname();
  const shouldShowBorder = !(path === "/pos");

  const headerRegex = (headerName: any) => new RegExp(`^${headerName}$`, "i");
  const containerClasses = `w-full my-5 ${shouldShowBorder
      ? "border border-gray-300 rounded-xl shadow-md "
      : "rounded-md"
    }  overflow-x-auto   pb-[10px] bg-white border border-gray-300 `;

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
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



  return (
    <div>
      <div className={`${containerClasses} w-full`} style={{
        overflowX: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}>
        <table className="w-full">
          {/* Header */}
          <thead
            className={`rounded-t-lg w-[100%] ${shouldShowBorder ? "bg-[#FFF1EC]" : " bg-[#FFF1EC] "
              }`}
          >
            <tr>
              {headerData.map((header: string, index: number) => (
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
                  {item.value1}
                </td>
                <td className="text-sm text-gray-700 text-center  py-1">
                  {item.value2}
                </td>
                <td className="text-sm text-gray-700 text-center py-1">
                  {item.value3}
                </td>
                <td className="text-sm text-gray-700 text-center py-1">
                  {item.value4}
                </td>
                <td className="text-sm text-gray-700 text-center py-1">
                  {item.value5}
                </td>
                <td className="text-sm text-gray-700 text-center py-1">
                  {item.value6}
                </td>
                <td className="text-sm text-gray-700 text-center py-1 ">
                  {item.value7}
                </td>
                <td className="text-sm text-gray-700 text-center py-1 ">
                  <HiDotsVertical />
                </td>

                {/* You can uncomment and modify this section to render data based on the header */}
                {/* {headerRegex("S.no.").test(header) ? (currentPage - 1) * 10 + index + 1 : 
          headerRegex("Created On").test(header) ? moment(item?.createdAt).format("DD-MM-YYYY") :
          headerRegex("Last Updated").test(header) ? moment(item?.updatedAt).format("DD-MM-YYYY") : ""} */}
                {/* {headerData.map((header: string, idx: number) => (
                  <td
                    key={idx}
                    className={`lg:px-6 text-sm text-gray-700 py-4 ${
                      header === "Created On" || header === "Last Updated"
                        ? "text-center"
                        : ""
                    }`}
                  >
                  </td>
                ))} */}
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
  );
};

export default Table2;
