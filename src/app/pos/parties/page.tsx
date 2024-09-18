/* eslint-disable react/jsx-key */
"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import Partiescard from "./component/partiescard";
import { MdGroupAdd, MdOutlineEmail } from "react-icons/md";
import { IoPersonOutline, IoPersonSharp, IoSettings } from "react-icons/io5";
import { RiDropboxFill, RiPagesLine } from "react-icons/ri";
import { IoMdCard } from "react-icons/io";
import { PiMapPinBold } from "react-icons/pi";
import Modal from "@/app/Components/Modal";
import Button from "@/app/Components/Button";
import Tabs from "@/app/Components/Tabs";
import { TbCategory } from "react-icons/tb";
import Gstaddress from "./component/Gst&address";
import Creditbalance from "./component/Creditbalance";
import Additionalfield from "./component/Additionalfield";
import Table2 from "@/app/Components/Table2";
import {
  addFirmParty,
  getPartiesByID,
  getPartyTransaction,
  myCompany,
} from "@/controller/posauth";
import { useDispatch, useSelector } from "react-redux";
import { addParty, getParty, updatePartyForm } from "@/Redux/Parties/reducer";
import { selectPartiesList, selectPartyForm } from "@/Redux/Parties/selectors";
import { useSession } from "next-auth/react";

export default function Page() {
  const token = localStorage.getItem("authToken");
  const [selectedtab, setSelectedtab] = useState<any>();
  const [partyTransaction, setPartyTrasaction] = useState([]);
  const session = useSession();
  console.log(session, "session");

  const [modalopen, setModalopen] = useState(false);
  const [partydata, setPartydata] = useState([]);
  const [open] = useState(false);
  const [particularParty, setParticularParty] = useState<any>();
  useEffect(() => {
    getPartyTransaction(selectedtab)
      .then((res) => {
        setPartyTrasaction(res);
        console.log("-->>>", res);
      })
      .catch((err) => {
        console.log(">>>>", err);
      });
  }, [token, selectedtab]);

  const headerData = ["Type", "Number", "Date", "Total", "Balance", " "];
  const bodyData = partyTransaction?.map((item: any) => {
    return {
      value1: item?.type,
      value2: item?.number,
      value3: item?.date,
      value4: item?.total,
      value5: item?.balance,
    };
  });

  const heading = [
    {
      icon: <RiDropboxFill size={25} />,
      title: "GST & Address",
    },
    {
      icon: <IoSettings size={25} />,
      title: "Credit & Balance",
    },
    {
      icon: <TbCategory size={25} />,
      title: "Additional Fields",
    },
  ];

  const onPageChange = (page: any) => {};

  // useEffect(() => {
  //   getParty(firmid)
  //     .then((res: any) => {
  //       setPartydata(res.data?.data);
  //       console.log(res, "dffs");
  //     })
  //     .catch((err) => console.log(err));
  // }, [token, firmid, open]);

  useEffect(() => {
    getPartiesByID(selectedtab)
      .then((res: any) => {
        setParticularParty(res?.data?.data);
        console.log(">>>>>>>>>>partiesp", res);
      })
      .catch((err) => console.log(err));
  }, [token, selectedtab]);

  const count = bodyData?.length;
  const isFullScreen = true;
  const content = [<Gstaddress />, <Creditbalance />, <Additionalfield />];

  const dispatch = useDispatch();

  const handleChange = (field: string, value: string) => {
    dispatch(
      updatePartyForm({
        key: field,
        value: value,
      })
    );
  };

  const formData = useSelector(selectPartyForm);
  const [firmId, setFirmId] = useState("");
  useEffect(() => {
    myCompany()
      .then((res) => {
        setFirmId(res[0].id);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleSubmit = () => {
    dispatch(
      addParty({
        firmId: firmId,
        callback() {},
      })
    );
  };
  useEffect(() => {
    dispatch(
      getParty({
        firmId: firmId,
        callback() {},
      })
    );
    return () => {};
  }, [firmId]);
  const list = useSelector(selectPartiesList)
  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5">
        <div className="flex gap-3 w-[50%] items-center">
          <div className="w-[35%]">
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
            className=" bg-[#fda80c] rounded-lg px-3 items-center mt-2 flex h-[45px]"
            title="Add Parties"
          >
            <MdGroupAdd
              color="white"
              size={25}
              onClick={() => setModalopen(!modalopen)}
            />
          </div>
        </div>
        <div className="flex gap-3 pr-7">
          <Button color={"bg-blue-500"} title={"Add Sale"} link={"/addsale"} />
          <Button
            color={"bg-orange-500"}
            title={"Add Purchase"}
            link={"/addpurchase"}
          />
          <Button color={"bg-gray-400"} title={"Add More"} link={"/"} />
        </div>
      </div>
      <div className="flex  mt-5 gap-5 mr-5">
        <div className="w-[26%] rounded-lg overflow-hidden ">
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="bg-gray-100 px-4 py-4 text-[16px] flex justify-between">
              <div>Party</div>
              <div>Amount</div>
            </div>
            <List
              listdata={list}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
            />
          </div>
        </div>
        <div className="w-[74%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex flex-wrap  ">
                <Partiescard
                  icon={<IoPersonOutline />}
                  title={"Name"}
                  value={
                    particularParty?.partyName
                      ? particularParty?.partyName
                      : "NA"
                  }
                />
                <Partiescard
                  icon={<RiPagesLine />}
                  title={"GSTIN"}
                  value={
                    particularParty?.gstNumber
                      ? particularParty?.gstNumber
                      : "NA"
                  }
                />
                <Partiescard
                  icon={<IoMdCard />}
                  title={"No Credit Limit set"}
                  value={
                    particularParty?.creditLimit
                      ? particularParty?.creditLimit
                      : "NA"
                  }
                />
                <Partiescard
                  icon={<PiMapPinBold />}
                  title={"Address"}
                  value={
                    particularParty?.billingAddress
                      ? particularParty?.billingAddress
                      : "NA"
                  }
                />
                <Partiescard
                  icon={<MdOutlineEmail />}
                  title={"Email"}
                  value={particularParty?.email ? particularParty?.email : "NA"}
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
                placeholder="Search By"
                label=""
                istouched={"Touch"}
                className="text-gray-800 text-base w-full"
              />
            </div>
          </div>

          <div>
            <Table2
              headerData={headerData}
              bodyData={bodyData}
              onPageChange={onPageChange}
              count={count}
              isFullScreen={isFullScreen}
            />
            {/* <Table headerData={header} bodyData={dummyData} /> */}
          </div>
        </div>
      </div>
      <Modal isOpen={modalopen} onClose={() => setModalopen(false)}>
        <>
          <div className="flex justify-between mt-5 pb-3 border-b border-groove">
            <div className="">Add Parties</div>
            <div
              className="bg-[#fda80c] rounded-lg px-5 text-white py-2"
              onClick={handleSubmit}
            >
              Save
            </div>
          </div>
          <div className="flex gap-5 my-5 w-full">
            <div className="w-[33%]">
              <TextInput
                name="partyName"
                type="text"
                placeholder=""
                label="Party Name"
                istouched="Touch"
                value={formData.partyName}
                onChange={(e) => handleChange("partyName", e.target.value)}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            <div className="w-[33%]">
              <TextInput
                name="gstNumber"
                type="text"
                placeholder=""
                label="GSTIN"
                istouched="Touch"
                value={formData.gstNumber}
                onChange={(e) => handleChange("gstNumber", e.target.value)}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            <div className="w-[33%]">
              <TextInput
                name="phoneNum"
                type="tel"
                placeholder=""
                label="Phone Number"
                istouched="Touch"
                value={formData.phoneNum}
                onChange={(e) => handleChange("phoneNum", e.target.value)}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
          </div>
          <Tabs heading={heading} content={content} />
        </>
      </Modal>
    </>
  );
}
