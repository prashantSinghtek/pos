import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteConfirmationModal from "./deleteConfirmationModel";

const List = ({
  listdata,
  onselected,
  page,
  setSelectedbank,
  setModalopen,
  setModalOpenFrom,
}: any) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [openDeleteModel, setOpenDeleteModel] = useState(false)
  const handleClose = () => setOpenDeleteModel(false);
  const deleteParty = () => {
    
    setOpenDeleteModel(false)
  };
  return (
    <>
      <div className="flex flex-col space-y-4 px-4 mt-3">
        {listdata?.length > 0 && (
          <ul className="list-disc list-inside space-y-3 ">
            {listdata?.map((item: any, itemIndex: number) => (
              <li
                key={itemIndex}
                className="flex items-center justify-between py-2 space-x-4 mb-3 cursor-pointer border-b-2 border-gray-100"
                onClick={() => onselected(item?.id)}
              >
                <div>
                  <div className="text-[18px] font-thin text-[#737373]">
                    {page == "unit"
                      ? item?.name
                      : page == "categories"
                      ? item?.name
                      : page == "product"
                      ? item?.itemName
                      : page == "Expenses"
                      ? item?.expenseCategoryName
                      : page == "bank"
                      ? item?.displayName
                      : page == "service"
                      ? item?.serviceName
                      : item?.partyName}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className=" font-thin text-[18px] text-[#737373]">
                    {page == "unit" ? item?.shortName : item?.openingBalance}
                  </div>
                  <div className="relative">
                    <div
                      onClick={() => {
                        setOpen(!open);
                        setSelected(item?.id);
                      }}
                    >
                      <PiDotsThreeOutlineVerticalFill />
                    </div>
                    {open && item?.id == selected && (
                      <div className="absolute p-1 px-3 text-sm z-50 flex flex-col gap-1 bg-white shadow-lg border border-gray-500 rounded-xl top-4 right-0">
                        <div
                          onClick={() => {
                            setSelectedbank(item?.id);
                            setModalopen(true);
                            setModalOpenFrom("FromList");
                          }}
                        >
                          View/Edit
                        </div>
                        <div
                          onClick={() => {
                            setOpenDeleteModel(true);
                          }}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <DeleteConfirmationModal
        open={openDeleteModel}
        handleClose={handleClose}
        handleConfirm={deleteParty}
      />
    </>
  );
};

export default List;
