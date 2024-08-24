import CardPrototype from "@/app/Components/CardPrototype";
import Table from "@/app/Components/Table";
import React from "react";
import { LuUploadCloud } from "react-icons/lu";

export default function Page() {
  const header = [
    "Item Name",
    "Item Code",
    "HSN",
    "Sale Price",
    "Purchase Sale",
    "Opening stock Qty.",
    "Minimum stock Qty.",
    "Item Location",
    "Tax Rate",
    "Tax Inclusive",
  ];
  const body = [
    {
      value1: "00000",
      value2: "gbfhdg",
      value3: "H001",
      value4: "₹500",
      value5: "₹500",
      value6: "01",
      value7: "01",
      value8: "gfdgfd",
      value9: "GST@18%",
      value10: "Inclusive",
    },
  ];
  
  return (
    <div>
      <div className="flex justify-between  items-end px-1 mt-5">
        <div>Import items from excel file</div>
        <div className="flex items-center gap-5">
          <span>or</span>
          <div className="flex gap-3 pr-7">
            <div
              className={`bg-orange-500 rounded-full px-5 py-2 flex gap-3 text-white items-center cursor-pointer`}
              //   onClick={() => console.log("gjd")}
            >
              Add Item From Our Database
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] mr-5 gap-5 my-5">
        <div className="w-[70%] h-[80vh]">
          <CardPrototype>
            <div>
              <div className="text-[20px] text-gray-800 font-semibold pt-2 pb-5">
                Steps To Import
              </div>
              <div className="text-gray-800 text-base my-2">Step 01.</div>
              <div className="text-gray-500 text-base mb-6">
                create an excel file with the following format.
              </div>
              <div
                className={`bg-orange-500 rounded-full w-fit px-5 py-2 flex gap-3 text-white items-center cursor-pointer mb-5`}
                //   onClick={() => console.log("gjd")}
              >
                Download Sample
              </div>
              <div>
                <Table headerData={header} bodyData={body} />
              </div>
              <div className="text-gray-800 text-base mt-9 mb-2">Step 02.</div>
              <div className="text-gray-500 text-base mb-6">
                upload the file (xlsx or xls)by clicking on the upload fil
                button below.
              </div>
              <div className="text-gray-800 text-base mt-7 mb-2">Step 03.</div>
              <div className="text-gray-500 text-base mb-6">
                verify the items from the & complete the import.
              </div>
            </div>
          </CardPrototype>
        </div>
        <div className="w-[30%] h-fit">
          <CardPrototype>
            <div className="text-[20px] text-gray-800 font-semibold pt-2 pb-5">
              Upload Your .xls/.xlsx(Excel Sheet)
            </div>
            <div className="border-dashed border-2 h-[250px] rounded-lg flex flex-col items-center justify-center w-full px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]">
              <LuUploadCloud size={40} />
              <div>Drag & drop files here or upload file</div>
            </div>
          </CardPrototype>
        </div>
      </div>
    </div>
  );
}
