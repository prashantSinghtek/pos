import React from "react";

export default function Settingtabs({ listdata, onselected ,selectedtab}: any) {
  return (
    <div className="flex flex-col space-y-4 mt-3">
      <ul className="list-disc list-inside space-y-3 ">
        {listdata?.map((item: any, itemIndex: number) => (
          <li
            key={itemIndex}
            className={`flex items-center justify-between py-2 space-x-4 mb-3 px-10 cursor-pointer border-b-2  border-gray-100 ${selectedtab == item?.id ? "bg-[#D5F0FF] text-[#2D9CDB]":""}` }
            onClick={() => onselected(item?.id)}
          >
            <div>
              <div className={`text-[18px] font-thin  ${selectedtab == item?.id ? "text-[#2D9CDB]":"text-[#737373]"} `}>
                {item?.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
