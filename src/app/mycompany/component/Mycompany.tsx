"use client";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { myCompany } from "@/controller/posauth";

const Mycompany = () => {
  const router = useRouter();
  const session = useSession();
  const token = ""
  const [data, setData] = useState<any>([]);
  const [selectedfirm, setselectedfirm] = useState();
console.log("datq",data)
  useEffect(() => {
    // Save selected store to local storage whenever it changes
    if (selectedfirm) {
      localStorage.setItem("selectedStore", selectedfirm);
    }
  }, [selectedfirm]);



  useEffect(() => {
   myCompany(token)
      .then((res) => {
        setData(res.data);
        console.log(res.data, "fjgfgdud");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token]);

  return (
    <div className="m-10">
      <div>Below are the companies that are created by you</div>
      <div className="mt-10 flex flex-col gap-4">
        {data?.map((item: any, index: any) => (
          <div
            key={index}
            className="bg-white flex justify-between border rounded-lg py-2 shadow-sm shadow-[#415059] border-[#C1DDED] items-center px-10"
          >
            <div>{item?.buisnessName?.toUpperCase()}</div>
            <div className="flex gap-4 items-center">
              <div
                className="border border-[#5ABCF4] px-3 py-1 bg-[#2D9CDB] text-white rounded-md cursor-pointer"
                onClick={() => {
                  setselectedfirm(item?.id);
                  router.push(`pos`);
                }}
              >
                Open
              </div>
              <div className="text-[#878A92]">
                <HiDotsVertical size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <div className="bg-orange-400 w-fit text-white py-1 px-3 rounded-md cursor-pointer">
          Add New Company
        </div>
      </div>
    </div>
  );
};

export default Mycompany;
