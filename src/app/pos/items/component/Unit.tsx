"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { MdGroupAdd, MdOutlineEmail } from "react-icons/md";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { RiFileExcel2Line, RiPagesLine } from "react-icons/ri";
import { IoMdAdd, IoMdCard } from "react-icons/io";
import { PiMapPinBold } from "react-icons/pi";
import Modal from "@/app/Components/Modal";
import Button from "@/app/Components/Button";
import Partiescard from "../../parties/component/partiescard";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Productfrom from "./Productfrom";
import Serviceform from "./Serviceform";
import { useRouter } from "next/navigation";
import { Formik } from "formik";

import { useSession } from "next-auth/react";
import Select from "react-select";
import { customStyles } from "@/app/Components/Customstyle";
import { addUnits, getUnits } from "@/controller/posauth";
// import { PiMapPinAreaBold } from "react-icons/pi";

export default function Unit() {
  const [selectedtab, setSelectedtab] = useState(1);
  const [modalopen, setModalopen] = useState(false);
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const [unit, setUnit] = useState();
  const session = useSession();
  const token = localStorage.getItem("authToken");
  const Router = useRouter();
  const [Selectedbank, setSelectedbank] = useState<any>();
  useEffect(() => {
    getUnits()
      .then((res) => setUnit(res))
      .catch((err) => console.log(err, "unit error"));
  }, [token]);

  const submitForm = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);
      const value = {
        name: values.Unitname,
        shortName: values.shortname,
      };
      const res = await addUnits(value);
      console.log(">>>>", res);
      resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };
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

  const header = ["Conversion"];

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const allbank = data?.map((option: any) => ({
    value: option?.displayName?.toUpperCase(),
    label: option?.displayName?.toUpperCase(),
    id: option?.id,
  }));
  const handleChangedbank = (selectedOption: any) => {
    console.log("selected csssssswwwwwss--->>>", selectedOption);
    setSelectedbank(selectedOption.id);
  };

  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex  mt-5 gap-5">
        <div className="w-[26%] rounded-lg overflow-hidden ">
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="flex justify-between px-3 pb-3 pt-1  gap-3 w-[100%] items-center">
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
                className=" bg-[#fda80c] text-white text-sm rounded-lg px-3 overflow-hidden gap-2 items-center mt-2 flex h-[45px]"
                title="Add Parties"
              >
                <div
                  className="flex items-center"
                  onClick={() => setModalopen(!modalopen)}
                >
                  <IoMdAdd size={25} />
                  Add Unit
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[16px] flex justify-between">
              <div>Full Name</div>
              <div>Short Name</div>
            </div>
            <List
              listdata={unit}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
              page={"unit"}
            />
          </div>
        </div>
        <div className="w-[74%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex justify-between px-7 pb-5">
                <div>Name</div>
                <div
                  className={`bg-orange-500 rounded-full px-5 py-2 flex gap-3 text-white items-center`}
                  onClick={() => setAdjustitemmodalopen(!adjustitemmodalopen)}
                >
                  <HiAdjustmentsHorizontal size={25} />
                  Add Conversion
                </div>
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="text-[25px]">Units</div>
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
        <Formik
          initialValues={{ Unitname: "", shortname: "" }}
          onSubmit={submitForm}
          validationSchema={""}
        >
          {({ handleChange, handleSubmit, values, errors, touched }: any) => {
            return (
              <>
                <div className="pb-3 border-b border-groove flex">
                  Add Units
                </div>
                <div className="flex gap-5  my-5 w-full">
                  <div className="w-[25%]">
                    <TextInput
                      name="Unitname"
                      type="text"
                      placeholder=""
                      label="Unit Name"
                      value={values.Unitname}
                      onChange={handleChange("Unitname")}
                      onBlur={handleChange("Unitname")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[25%]">
                    <TextInput
                      name="shortname"
                      type="text"
                      placeholder=""
                      label="Short Name"
                      value={values.shortname}
                      onChange={handleChange("shortname")}
                      onBlur={handleChange("shortname")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                </div>
                <div
                  className="bg-[#FF8900] w-fit rounded-lg px-5 text-white py-2"
                  onClick={() => handleSubmit()}
                >
                  Save
                </div>
              </>
            );
          }}
        </Formik>
      </Modal>
      <Modal
        isOpen={adjustitemmodalopen}
        onClose={() => setAdjustitemmodalopen(false)}
      >
        <>
          <div className="flex mb-[20px]">
            <p className="text-[#1F1F1F] text-[20px] font-semibold">
              Add Conversation
            </p>
          </div>
          {/* <div className="flex flex-wrap gap-5 my-5 w-full"> */}



          {/* <div className="w-[5%]">
              <TextInput
                name="Price"
                type="number"
                placeholder=""
                label="Rate"
                istouched={"Touch"}
                className="text-gray-800 text-base"
              />
            </div> */}
          {/* <div className="w-[10%]">

              <div className="text-[#808080] text-[16px] ">Rate</div>
              <input className="[box-shadow:2px_3px_18px_0px_#AAB4B914] border border-[#D0D2D6] rounded-[6px] px-3 py-[6px]">
              </input>
              <div className="flex items-center">
                <Select
                    name="Accountdisplayname"
                    options={allbank}
                    value={Selectedbank?.value}
                    onChange={handleChangedbank}
                    styles={customStyles}
                    className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
              </div>
            </div> */}
          {/* <div className="w-[25%]">
              <div className="w-[100%] flex">
                <div className="text-[#808080]">Secondary unit</div>
                <select

                  className="[box-shadow:2px_3px_18px_0px_#AAB4B914] border border-[#D0D2D6] rounded-[6px]">
                  <option value="someOption">Some option</option>
                  <option value="otherOption">Other option</option>
                </select>
                <Select
                  name="Accountdisplayname"
                  options={allbank}
                  value={Selectedbank?.value}
                  onChange={handleChangedbank}
                  styles={customStyles}
                  className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                />
              </div>
            </div> */}
          {/* </div> */}
          <div className="flex gap-5 items-end">
            <div className="w-[25%]">
              <div className="w-[100%] flex flex-col space-y-2">
                <div className="text-[#808080] ">Base unit</div>
                <select
                  className="[box-shadow:2px_3px_18px_0px_#AAB4B914] border border-[#D0D2D6] rounded-[6px]">
                  <option value="someOption">Some option</option>
                  <option value="otherOption">Other option</option>
                </select>
              </div>
            </div>
            <div className="w-[2%] items-center flex mt-[16px]">
              <div className="text-xl font-bold text-black ml-4">=</div>
            </div>
            <div className="w-[5%]">
              <input className="[box-shadow:2px_3px_18px_0px_#AAB4B914] border border-[#D0D2D6] rounded-[6px] px-2 py-2 max-w-[50px] min-w-[50px]">
              </input>
            </div>
            <div className="w-[25%]">
              <div className="w-[100%] flex flex-col space-y-2">
                <div className="text-[#808080] ">Secondary Unit</div>
                <select

                  className="[box-shadow:2px_3px_18px_0px_#AAB4B914] border border-[#D0D2D6] rounded-[6px]">
                  <option value="someOption">Some option</option>
                  <option value="otherOption">Other option</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 justify-start mt-[60px]">
            <div>
              <button className="text-[18px] font-medium rounded-full border border-[#2F9DDB] text-[#2F9DDB] border-2 max-w-[166px] min-w-[166px] py-[15px]">
                Save & New
              </button>
            </div>
            <div>
              <button className="text-[18px] text-[#FF8900] font-medium  rounded-full bg-[#FF8900] border border-[#FF8900] text-white max-w-[166px] min-w-[166px] py-[15px]">
                Save
              </button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}
