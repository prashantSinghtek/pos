"use client";
import {  useEffect, useState } from "react";
import DrawerToggle from "./DrawerToggle";
import Modal from "@/app/Components/Modal";
import Addfirmform from "@/app/Components/Addfirmform";
import { myCompany } from "@/controller/posauth";

export default function BrandSection() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    myCompany()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div
          className=" w-full  text-[25px] font-extrabold text-black tracking-tight flex items-center gap-2 px-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="w-full text-center">
          {data?.length > 0 ? data[0].buisnessName ?  data[0].buisnessName  : 'POS' : 'POS' }
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
