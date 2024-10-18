"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { RiFileExcel2Line, RiPagesLine } from "react-icons/ri";
import { IoMdAdd, IoMdCard } from "react-icons/io";
import Modal from "@/app/Components/Modal";
import Partiescard from "../../parties/component/partiescard";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Productfrom from "./Productfrom";
import Serviceform from "./Serviceform";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Stockadd from "./Stockadd";
import StockReduce from "./StockReduce";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddItemModel,
  selectItemList,
  selectProductForm,
  selectSearch,
  selectSearchItem,
  selectTransactionList,
} from "@/Redux/Item/selectors";
import {
  chnageAddItemModelState,
  getItemById,
  getItemList,
  getTransactionByItemId,
  setSearch,
  setSearchItemName,
} from "@/Redux/Item/reducer";
import { selectFirmId } from "@/Redux/Parties/selectors";
// import { PiMapPinAreaBold } from "react-icons/pi";

export default function Product() {
  const [selectedproduct, setSelectedProduct] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpenFrom, setModalOpenFrom] = useState("");
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const Router = useRouter();
  const [tabs, setTabs] = useState([{ id: 1, isChecked: false }]);
  const [activeTab, setActiveTab] = useState<any>(1);
  const handleCheckboxChanged = (tabId: any) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId ? { ...tab, isChecked: !tab.isChecked } : tab
      )
    );
  };

  const header = [
    "Type",
    "Invoice No.",
    "Item ",
    "Date",
    "Qty",
    "Price/Unit",
    "Status",
  ];

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const addItemModel = useSelector(selectAddItemModel);
  const dispatch = useDispatch();
  const searchName = useSelector(selectSearch);
  const firmId = useSelector(selectFirmId);
  useEffect(() => {
    if (!firmId) {
      return;
    }
    dispatch(
      getItemList({
        firmId: firmId,
        callback() {},
      })
    );

    return () => {};
  }, [firmId]);

  useEffect(() => {
    dispatch(
      getItemList({
        firmId: firmId,
        callback() {},
      })
    );

    return () => {};
  }, [searchName]);

  const list = useSelector(selectItemList);
  const [setselectedId, setSetselectedId] = useState("");
  const handleEdit = (Id: any) => {
    setSetselectedId(Id);
    dispatch(
      getItemById({
        itemId: Id,
        callback() {},
      })
    );
    dispatch(
      getTransactionByItemId({
        itemId: Id,
        callback() {},
      })
    );
  };
  const search = useSelector(selectSearchItem);
  useEffect(() => {
    if (!setselectedId) {
      return;
    }
    dispatch(
      getTransactionByItemId({
        itemId: setselectedId,
        callback() {},
      })
    );
    return () => {};
  }, [search]);

  const transactionList = useSelector(selectTransactionList);
  const data = useSelector(selectProductForm);
  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex flex-wrap lg:flex-nowrap mt-5 gap-5">
        <div
          className="sm:w-screen lg:w-[25%] rounded-lg h-[80vh] overflow-auto "
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            scrollbarColor: "transparent transparent",
          }}
        >
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="flex justify-between px-3 pb-3 pt-1 gap-3 w-[100%] items-center">
              <div className="w-[31%]">
                <TextInput
                  name="search"
                  type="text"
                  placeholder="Search By"
                  value={searchName}
                  label=""
                  onChange={(e) => {
                    dispatch(setSearchItemName(e.target.value));
                  }}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-full"
                />
              </div>
              <div
                className=" bg-[#fda80c] text-sm text-white rounded-lg pl-1 pr-[1px] overflow-hidden gap-1 items-center mt-2 flex h-[45px]"
                title="Add Parties"
              >
                <div
                  className="flex  items-center"
                  onClick={() => {
                    dispatch(chnageAddItemModelState(true));
                  }}
                >
                  <IoMdAdd size={25} />
                  Add Item
                </div>
                <div
                  className="border-l bg-[#E9A315] py-[14px] px-[10px] cursor-pointer"
                  onClick={() => {
                    Router.push("items/importitems");
                  }}
                >
                  <RiFileExcel2Line />
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[16px] flex justify-between">
              <div>Item Name</div>
              <div>Quantity</div>
            </div>
            <List
              listdata={list}
              onselected={(id: number) => {
                handleEdit(id);
              }}
              page={"product"}
            />
          </div>
        </div>
        <div className="sm:w-screen lg:w-[75%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex justify-between px-7 pb-5">
                <div>{selectedproduct?.item?.itemName}</div>
                <div>
                  <div className="flex gap-3 pr-7">
                    <div
                      className={`bg-orange-500 rounded-full px-5 py-2 flex gap-3 text-white items-center`}
                      onClick={() =>
                        setAdjustitemmodalopen(!adjustitemmodalopen)
                      }
                    >
                      <HiAdjustmentsHorizontal size={25} />
                      Adjust Item
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap  ">
                <Partiescard
                  icon={<IoPersonOutline />}
                  title={"Sale Price"}
                  value={data.salePrice || "NA"}
                />
                <Partiescard
                  icon={<RiPagesLine />}
                  title={"Stock Quntity"}
                  value={data.quantity || "NA"}
                />
                <Partiescard
                  icon={<IoMdCard />}
                  title={"Stock Value"}
                  value={Number(data.salePrice) * Number(data.quantity) || "NA"}
                />
                <Partiescard
                  icon={<MdOutlineEmail />}
                  title={"Purchase Price"}
                  value={data.purchasePrice || "NA"}
                />
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="text-[25px]">Transaction</div>
            <div className="w-[300px]">
              <TextInput
                name="search"
                type="text"
                value={search}
                placeholder="Search By"
                label=""
                istouched={"Touch"}
                className="text-gray-800 text-base w-full"
                onChange={(e) => {
                  dispatch(setSearch(e.target.value));
                }}
              />
            </div>
          </div>

          <div>
            <Table headerData={header} bodyData={transactionList} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={addItemModel}
        onClose={() => {
          dispatch(chnageAddItemModelState(false));
        }}
      >
        {modalOpenFrom == "FromList" ? (
          <>
            <Productfrom />
          </>
        ) : (
          <>
            <Productfrom />
          </>
        )}
      </Modal>
      <Modal
        isOpen={adjustitemmodalopen}
        onClose={() => setAdjustitemmodalopen(false)}
      >
        <>
          <div className="flex items-center gap-4">
            <div className=" flex text-[16px]">Stock Adjustment</div>
            <div className="rounded-b-md">
              {tabs.map((tab) =>
                activeTab === tab.id ? (
                  <div
                    key={tab.id}
                    className=" text-[13px] text-gray-800  flex items-end gap-5"
                  >
                    <div className="flex gap-2 items-center">
                      <span
                        className={`${
                          tab.isChecked ? "text-[#808080]" : "text-[#2D9CDB]"
                        }`}
                      >
                        Add Stock
                      </span>
                      <label className="flex cursor-pointer select-none items-center">
                        <div className="relative">
                          <input
                            title="check"
                            type="checkbox"
                            checked={tab.isChecked}
                            onChange={() => handleCheckboxChanged(tab.id)}
                            className="sr-only"
                            id={`creditlimit-${tab.id}`}
                          />
                          <div className="block h-8 w-16 rounded-full border border-[#2D9CDB] bg-white"></div>
                          <div
                            className={`dot bg-[#2D9CDB] absolute duration-100 top-1 h-6 w-6 rounded-full transition ${
                              tab.isChecked ? "right-1" : "left-1"
                            }`}
                          ></div>
                        </div>
                      </label>
                      <span
                        className={`${
                          tab.isChecked ? "text-[#2D9CDB]" : "text-[#808080]"
                        }`}
                      >
                        Reduce Stock
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          <div className="mt-5">
            {tabs.map((tab) =>
              activeTab === tab.id ? (
                <div key={tab.id}>
                  {tab.isChecked ? (
                    <StockReduce selectedproduct={selectedproduct} />
                  ) : (
                    <Stockadd selectedproduct={selectedproduct} />
                  )}
                </div>
              ) : null
            )}
          </div>
        </>
      </Modal>
    </>
  );
}
