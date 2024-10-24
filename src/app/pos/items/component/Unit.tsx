"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdCard } from "react-icons/io";
import Modal from "@/app/Components/Modal";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Formik } from "formik";
import Select from "react-select";
import { customStyles } from "@/app/Components/Customstyle";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchunit, selectUnitForm, selectUnitList, selectUnitModel } from "@/Redux/Item/selectors";
import * as Yup from "yup"; // Import Yup for validation
import {
  addUnit,
  changeUnitModelState,
  getUnitList,
  setSearchUnit,
  updateUnitForm,
} from "@/Redux/Item/reducer";

export default function Unit() {
  const [modalopen, setModalopen] = useState(false);
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const [unit, setUnit] = useState();

  const [Selectedbank, setSelectedbank] = useState<any>();
  const dispatch = useDispatch();
  const submitForm = async (values: any, { resetForm }: any) => {
    Object.entries(values).forEach(([key, value]) => {
      dispatch(updateUnitForm({ key: key, value: value }));
    });
    try {
      dispatch(
        addUnit({
          callback() {
            resetForm();
          },
        })
      );
    } catch (err) {
      console.log("Error:", err);
    } finally {
    }
  };

  useEffect(() => {
    dispatch(getUnitList({
      callback() {
          
      },
    }));
    return () => {};
  }, []);

  const header = ["Conversion"];

  const handleChangedbank = (selectedOption: any) => {
    console.log("selected csssssswwwwwss--->>>", selectedOption);
    setSelectedbank(selectedOption.id);
  };

  const formData = useSelector(selectUnitForm);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    shortName: Yup.string().required("Short Name is required"),
  });
  const unitAddModel = useSelector(selectUnitModel);
  const list = useSelector(selectUnitList)
  const search = useSelector(selectSearchunit)

  useEffect(() => {
    dispatch(getUnitList({
      callback() {
          
      },
    }));
    return () => {};
  }, [search]);
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
                  value={search}
                  placeholder="Search By"
                  label="Search Unit"
                  onChange={(e) => {dispatch(setSearchUnit(e.target.value))}}
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
                  onClick={() => dispatch(changeUnitModelState(true))}
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
              listdata={list}
              onselected={(id: number) => {
                // setSelectedtab(id);
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
      <Modal
        isOpen={unitAddModel}
        onClose={() => dispatch(changeUnitModelState(false))}
      >
        <Formik
          initialValues={{ name: formData.name, shortName: formData.shortName }}
          onSubmit={submitForm}
          validationSchema={validationSchema} // Add validation schema here
        >
          {({ handleChange, handleSubmit, values, errors, touched }: any) => {
            return (
              <>
                <div className="pb-3 border-b border-groove flex">
                  Add Units
                </div>
                <div className="flex gap-5  my-5 w-full">
                  <div className="w-[30%]">
                    <TextInput
                      name="name"
                      type="text"
                      label="Name"
                      value={values.name}
                      error={errors.name}
                      onChange={handleChange("name")}
                      istouched={touched.name}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      name="shortName"
                      type="text"
                      label="Short Name"
                      value={values.shortName}
                      error={errors.shortName}
                      onChange={handleChange("shortName")}
                      istouched={touched.shortName}
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
          <div className="flex gap-5 items-end">
            <div className="w-[25%]">
              <div className="w-[100%] flex flex-col space-y-2">
                <div className="text-[#808080] ">Base unit</div>
                <Select
                  name="Accountdisplayname"
                  options={[{}, {}, {}]}
                  value={Selectedbank?.value}
                  onChange={handleChangedbank}
                  styles={customStyles}
                  className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                />
              </div>
            </div>
            <div className="w-[2%] items-center flex mt-[16px]">
              <div className="text-xl font-bold text-black ml-4">=</div>
            </div>
            <div className="w-[5%]">
              <input className="[box-shadow:2px_3px_18px_0px_#AAB4B914] border border-[#D0D2D6] rounded-[6px] px-2 py-2 max-w-[50px] min-w-[50px]"></input>
            </div>
            <div className="w-[25%]">
              <div className="w-[100%] flex flex-col space-y-2">
                <div className="text-[#808080] ">Secondary Unit</div>
                <Select
                  name="Accountdisplayname"
                  options={[{}, {}, {}, {}]}
                  value={Selectedbank?.value}
                  onChange={handleChangedbank}
                  styles={customStyles}
                  className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                />
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
