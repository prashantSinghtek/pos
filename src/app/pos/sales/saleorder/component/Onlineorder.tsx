"use client"
import Modal from "@/app/Components/Modal";
import Image from "next/image";
import React, { useState } from "react";

export default function Onlineorder() {
    const [open,setOpen] = useState(false)
  return (
    <div>
      <div className="flex justify-center mt-20">
        <Image src={"/onlineorder.png"} alt="" width={500} height={500} layout="responsive"  />
      </div>
      <div className="flex flex-col items-center gap-2 justify-center mt-10">
        <div className="text-gray-800 font-semibold text-lg">
          No Online Orders
        </div>
        <div className="text-gray-600  text-lg">
          Create your online store to get orders online
        </div>
        <div className="bg-[#FF8900] px-5 py-2 rounded-full text-white mt-3" onClick={()=>setOpen(!open)}>
            Share Store
        </div>
        <Modal isOpen={open} onClose={()=>{setOpen(false)}}>
            <>
            <div>
                Preview & Share
            </div>
            <div>
                
            </div>
            
            </>
        </Modal>
      </div>
    </div>
  );
}
