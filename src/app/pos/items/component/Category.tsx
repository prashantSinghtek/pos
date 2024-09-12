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

// import { PiMapPinAreaBold } from "react-icons/pi";

export default function Product() {
  const firmid = localStorage.getItem("selectedStore");
  const session = useSession();
  const [modalOpenFrom, setModalOpenFrom] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  console.log(session)
  const token = localStorage.getItem("authToken");
  console.log("dfvgbdefg", token)
  const auth = new pos_controller()
  const [selectedtab, setSelectedtab] = useState<any>();
  const [modalopen, setModalopen] = useState(false);
  const [category, setCategory] = useState()
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const [particularcategory,setParticularcategory] = useState<any>();

  const Router = useRouter();

  const submitForm = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);
      const res = await Addcategory(values.Categoryname, token, firmid)
      console.log("defv", res)
      resetForm();
      setModalopen(false)
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const Updateform = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);
      const res = await PutCategoryName(token, selectedtab,values.Categoryname)
      console.log("defv", res)
      resetForm();
      setModalopen(false)
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    Getcategory(token).then((res: any) => { setCategory(res.data) }).catch((err) => console.log("ctegory", err))
  }, [token])

  useEffect(() => {
    GetParticularCategory(token,selectedtab).then((res: any) => { setParticularcategory(res.data)}).catch((err) => console.log("ctegory", err))
  }, [token,selectedtab])

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

  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex mt-5 gap-5">
        <div className="w-[26%] rounded-lg overflow-hidden ">
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="flex justify-between px-3 pb-3 pt-1 gap-3 w-[100%] items-center">
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
                className=" bg-[#fda80c] text-sm text-white rounded-lg px-3 overflow-hidden gap-2 items-center mt-2 flex h-[45px]"
                title="Add Parties"
              >
                <div className="flex items-center" onClick={() => setModalopen(!modalopen)}>
                  <IoMdAdd size={25} />
                  Add Category
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[20px] flex justify-between">
              <div>Category</div>
              <div>Item</div>
            </div>
            <List
              listdata={category}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
              page={"categories"}
              setSelectedbank={setSelectedCategory}
              setModalopen={setModalopen}
              setModalOpenFrom={setModalOpenFrom}
            />
          </div>
        </div>
        <div className="w-[74%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex justify-between px-7 pb-5">
                <div>{particularcategory?.name}</div>
                <div
                  className={`bg-orange-500 rounded-full px-5 py-2 flex gap-3 text-white items-center`}
                  onClick={() => setAdjustitemmodalopen(!adjustitemmodalopen)}
                >
                  <HiAdjustmentsHorizontal size={25} />
                  Move To This Category
                </div>
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
            <Table headerData={header} />
          </div>
        </div>
      </div>

      <Modal isOpen={modalopen} onClose={() => setModalopen(false)}>
{/* {console.log(particularcategory)} */}
      {modalOpenFrom =="FromList" ?  <Formik initialValues={{ Categoryname: particularcategory?.name }} onSubmit={Updateform} validationSchema={""}>
          {({ handleChange, handleSubmit, values, errors, touched }: any) => {
            return (
              <>
                <div className="pb-3 border-b border-groove flex">Add Category</div>
                <div className="flex gap-5 my-5 w-full">
                  <div className="w-[25%]">
                    <TextInput
                      name="Categoryname"
                      type="text"
                      placeholder=""
                      label="Category Name"
                      value={values.Categoryname}
                      onChange={handleChange("Categoryname")}
                      onBlur={handleChange("Categoryname")}
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
        </Formik> :   <Formik initialValues={{ Categoryname: "" }} onSubmit={submitForm} validationSchema={""}>
          {({ handleChange, handleSubmit, values, errors, touched }: any) => {
            return (
              <>
                <div className="pb-3 border-b border-groove flex">Add Category</div>
                <div className="flex gap-5 my-5 w-full">
                  <div className="w-[25%]">
                    <TextInput
                      name="Categoryname"
                      type="text"
                      placeholder=""
                      label="Category Name"
                      value={values.Categoryname}
                      onChange={handleChange("Categoryname")}
                      onBlur={handleChange("Categoryname")}
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
        </Formik>}
      
      </Modal>

      <Modal
        isOpen={adjustitemmodalopen}
        onClose={() => setAdjustitemmodalopen(false)}
      >
        <>
          <div className="pb-2 flex">Stock Adjustment</div>
          <div className="flex justify-between my-5 border-b border-groove pb-3 ">
            <div className="flex flex-col">
              <div className="text-gray-600 text-sm">Item Name</div>
              <div className="text-gray-800 text-sm font-semibold">XYZ</div>
            </div>
          </div>
          <div className="flex gap-5 my-5 w-full">
            <div className="w-[25%]">
              <TextInput
                name="Qty"
                type="text"
                placeholder=""
                label="Total Qty"
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            <div className="w-[25%]">
              <TextInput
                name="Price"
                type="text"
                placeholder=""
                label="At Price"
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
            <div className="w-[25%]">
              <TextInput
                name="Details"
                type="text"
                placeholder=""
                label="Details"
                istouched={"Touch"}
                className="text-gray-800 text-base w-[30%]"
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}
