
import { AppAssets } from "@/constants/assets";
import Image from "next/image";
import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function ProfileBadge() {
  const [open, setOpen] = useState(false);

  // console.log('data',data)
  return (
    <>
      <div className="flex items-center">
      <div className="text-right mr-1">
        <div className="text-[14px] text-primary font-bold capitalize">
          {/* {data?.first_name + ' ' + data?.last_name} */}

        </div>
        <div className="text-xs text-gray-500 -mt-1"></div>
      </div>
        <div className="relative bg-secondary rounded-full">
          <div className="flex gap-3">
            <CiBellOn size={25} />
            <div
              onClick={() => {
                setOpen(!open);
              }}
            >
              <HiOutlineUserCircle size={25} />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
