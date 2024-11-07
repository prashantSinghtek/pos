import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteConfirmationModal from "./deleteConfirmationModel";
import { useDispatch, useSelector } from "react-redux";
import { deletePartyById, getParty } from "@/Redux/Parties/reducer";
import { selectFirmId } from "@/Redux/Parties/selectors";
import {
  deleteCategoryById,
  deleteItemById,
  deleteUnitById,
  getCategoryist,
  getItemList,
  getUnitList,
} from "@/Redux/Item/reducer";
import { getUnit } from "@/controller/posauth";

const List = ({ listdata, onselected, page, handleEdit }: any) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const handleClose = () => setOpenDeleteModel(false);
  const dispatch = useDispatch();
  const firmId = useSelector(selectFirmId);
  const deleteParty = () => {
    if (page == "parties") {
      dispatch(
        deletePartyById({
          partieId: selected,
          callback() {
            dispatch(
              getParty({
                firmId: firmId,
                callback() {
                  setOpenDeleteModel(false);
                },
              })
            );
          },
        })
      );
    } else if (page == "product") {
      dispatch(
        deleteItemById({
          itemId: selected,
          callback() {
            dispatch(
              getItemList({
                firmId: firmId,
                callback() {
                  setOpenDeleteModel(false);
                },
              })
            );
          },
        })
      );
    } else if (page == "categories") {
      dispatch(
        deleteCategoryById({
          itemId: selected,
          callback() {
            dispatch(
              getCategoryist({
                firmId: firmId,
                callback() {
                  setOpenDeleteModel(false);
                },
              })
            );
          },
        })
      );
    } else if (page == "unit") {
      dispatch( 
        deleteUnitById({
          itemId: selected,
          callback() {
            dispatch(
              getUnitList({
                callback() {},
              })
            );
          },
        })
      );
    }
  };

  console.log(listdata, page, "listdata");

  return (
    <>
      <div className="flex flex-col space-y-4 px-4 mt-3 h-[500px] overflow-y-scroll scrollbar-thin">
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
                    {page == "unit"
                      ? item?.shortName
                      : page == "product"
                      ? item?.itemPricing?.quantity
                      : ""}
                  </div>
                  <div className="relative">
                    <div
                      onClick={() => {
                        setSelected(item?.id);
                        setOpen(!open);
                      }}
                    >
                      <PiDotsThreeOutlineVerticalFill />
                    </div>
                    {open && item?.id == selected && (
                      <div className="absolute p-1 px-3 text-sm z-50 flex flex-col gap-1 bg-white shadow-lg border border-gray-500 rounded-xl top-4 right-0">
                        <div>View/Edit</div>
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
