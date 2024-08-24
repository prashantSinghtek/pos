/* eslint-disable react/jsx-key */
"use client";
import Modal from "@/app/Components/Modal";
import Tabs from "@/app/Components/Tabs";
import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { RiDropboxFill } from "react-icons/ri";
import Mycompany from "./component/Mycompany";

export default function Companysection() {
  const [companyopen, setCompanyopen] = useState(false);

  const heading = [
    {
      icon: <RiDropboxFill size={25} />,
      title: "Companies Shared With Me",
    },
    {
      icon: <IoSettings size={25} />,
      title: "My Company",
    },
  ];
  const content = ["sfgfg", <Mycompany />];
  return (
    <div className="">
      <div className="h-[80vh] w-[80vw] bg-[#FAFBFF] border m-auto mt-20 ">
        <div className=" ">
          <Tabs heading={heading} content={content} />
        </div>
      </div>

      {/* <Modal isOpen={companyopen} onClose={() => setCompanyopen(false)}>
        <>
          <div>Company List</div>
        </>
      </Modal> */}
    </div>
  );
}
