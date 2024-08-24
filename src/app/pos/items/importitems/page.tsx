"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Modal from "@/app/Components/Modal";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { VscCloudUpload } from "react-icons/vsc";

export default function Page() {
  const [selectedtab, setSelectedtab] = useState(1);
  const [modalopen, setModalopen] = useState(false);
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const router = useRouter();
  const data = [
    {
      id: 1,
      name: "All",
      amount: 1234,
    },
    {
      id: 1,
      name: "prashant",
      amount: 1234,
    },
    {
      id: 1,
      name: "rahul",
      amount: 1234,
    },
  ];

  const header = ["Item Name", "Sale Price"];
  return (
    <div>
      <div className="flex justify-between  items-end px-1 mt-5">
        <div>Select Item for Import</div>
        <div className="flex items-center gap-5">
          <span>or</span>
          <div className="flex gap-3 pr-7">
            <div
              className={`bg-orange-500 rounded-full px-5 py-2 flex gap-3 text-white items-center cursor-pointer`}
              onClick={() => {
                router.push("importitems/importfromexcelfile");
              }}
            >
              <VscCloudUpload size={25} />
              Upload From An Excel File
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex w-screen mt-5 gap-5">
        <div className="w-[20%] rounded-lg overflow-hidden ">
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="flex justify-between px-3 pb-5 pt-2 gap-3 w-[100%] items-center">
              <div className="w-[31%]">
                <TextInput
                  name="search"
                  type="text"
                  placeholder="Search By"
                  label=""
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-full"
                />
              </div>
              <div
                className="  text-[#2D9CDB]  px-3 gap-2 items-center mt-2 flex h-[45px]"
                title="Add Parties"
                onClick={() => setModalopen(!modalopen)}
              >
                <MdOutlineFilterAlt size={25} />
                Filter by Industry
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[20px] flex justify-between">
              <div>Category</div>
            </div>
            <List
              listdata={data}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
            />
          </div>
        </div>
        <div className="w-[60%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex flex-wrap gap-5 ">
                <div className="w-fit border border-[#CEE5F2] px-5 py-2 rounded-full shadow-md shadow-[#2D9CDB]">
                  RPG life Sciences Ltd
                </div>
                <div
                  className={`bg-[#DBF2FF] rounded-full px-5 py-2 flex gap-3 text-[#2D9CDB] border border-[#C0E2F4] items-center cursor-pointer`}
                  onClick={() => setAdjustitemmodalopen(!adjustitemmodalopen)}
                >
                  View More
                </div>
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="text-[25px]">Select item to import</div>
            <div className="w-[300px]">
              <TextInput
                name="search"
                type="text"
                placeholder="Search By"
                label=""
                istouched={"Touch"}
                className="text-gray-800 text-base w-full"
              />
            </div>
          </div>

          <div>
            <Table headerData={header} />
          </div>
        </div>
      </div>
      <Modal isOpen={modalopen} onClose={() => setModalopen(false)}>
        <>filter</>
      </Modal>
      <Modal
        isOpen={adjustitemmodalopen}
        onClose={() => setAdjustitemmodalopen(false)}
      >
        <>view more</>
      </Modal>
    </div>
  );
}
