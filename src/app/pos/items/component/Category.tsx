"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "@/app/Components/Modal";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import * as Yup from "yup"; // Import Yup for validation
import {
  selectCategoryForm,
  selectCategoryModel,
} from "@/Redux/Item/selectors";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";
import {
  addCategory,
  changeAddCategoryModelState,
  updateCategoryForm,
} from "@/Redux/Item/reducer";
export default function Product() {
  const [selectedtab, setSelectedtab] = useState<any>();
  const [category, setCategory] = useState();
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const [particularcategory, setParticularcategory] = useState<any>();

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitForm = async (values: any, { resetForm }: any) => {
    try {
      setIsSubmitting(true);
      dispatch(
        updateCategoryForm({ key: "categoryName", value: values.categoryName })
      );
      dispatch(
        addCategory({
          callback() {
            setIsSubmitting(false);
            dispatch(changeAddCategoryModelState(false));
          },
        })
      );
      resetForm();
      dispatch(changeAddCategoryModelState(false));
    } catch (err) {
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
      dispatch(changeAddCategoryModelState(false));
    }
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
  const form = useSelector(selectCategoryForm);
  const modelCategory = useSelector(selectCategoryModel);

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
                <div
                  className="flex items-center"
                  onClick={() => {
                    dispatch(changeAddCategoryModelState(true));
                  }}
                >
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

      <Modal
        isOpen={modelCategory}
        onClose={() => {
          dispatch(changeAddCategoryModelState(false));
        }}
      >
        <Formik
          initialValues={{ categoryName: form?.categoryName || "" }} // Ensure fallback
          validationSchema={Yup.object({
            categoryName: Yup.string().required("Category Name is required"),
          })}
          onSubmit={submitForm}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }: any) => {
            return (
              <>
                <div className="pb-3 border-b border-groove flex">
                  Add Category
                </div>
                <div className="flex gap-5 my-5 w-full">
                  <div className="w-[100%]">
                    <TextInput
                      name="categoryName"
                      type="text"
                      placeholder="Category Name"
                      label="Category Name"
                      value={values.categoryName}
                      onChange={handleChange("categoryName")}
                      onBlur={handleBlur("categoryName")}
                      istouched={touched.categoryName?.toString()} // Convert boolean to string
                      className="text-gray-800 text-base w-full"
                      error={
                        errors.categoryName && touched.categoryName
                          ? errors.categoryName
                          : ""
                      }
                    />
                  </div>
                </div>

                <button
                  className="bg-[#FF8900] my-5 w-fit rounded-lg px-5 text-white py-2 flex items-center justify-center"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FiLoader className="animate-spin mr-2" />
                  ) : (
                    "Submit"
                  )}
                </button>
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
