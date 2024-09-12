"use client";
import { useContext, useEffect, useState } from "react";
import DrawerToggle from "./DrawerToggle";
import { LayoutContext } from "../context";
import Image from "next/image";
import Modal from "@/app/Components/Modal";
import Addfirmform from "@/app/Components/Addfirmform";

import { useSession } from "next-auth/react";
import { myCompany } from "@/controller/posauth";

export default function BrandSection() {
  const { isDrawerCollapsed } = useContext(LayoutContext);
  const session = useSession();
  const token = localStorage.getItem("authToken");
  const [data, setData] = useState<any>([]);
  const firmid = localStorage.getItem("selectedStore");
  useEffect(() => {
    myCompany(firmid)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, firmid]);
  

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div
          className=" w-full  text-[25px] font-extrabold text-black tracking-tight flex items-center gap-2 px-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="w-full text-center">
          {data?.data?.buisnessName ?  data?.data?.buisnessName : 'POS' }
          </span>
        </div>

        <DrawerToggle />
      </div>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Addfirmform />
      </Modal>
    </>
  );
}
