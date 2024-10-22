"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { RiFileExcel2Line, RiPagesLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Modal from "@/app/Components/Modal";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import {
  selectCategoryForm,
  selectCategoryList,
  selectCategoryModel,
  selectCategoryTransactionList,
  selectSearchCategory,
  selectSearchCategoryTrasaction,
} from "@/Redux/Item/selectors";
import { FiLoader } from "react-icons/fi";
import {
  addCategory,
  changeAddCategoryModelState,
  getCategoryById,
  getCategoryist,
  getCategoryTransactionById,
  setCategoryTransactionSearch,
  setSearchCategoryName,
  updateCategoryForm,
} from "@/Redux/Item/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectFirmId } from "@/Redux/Parties/selectors";
import { IoSearchOutline } from "react-icons/io5";

export default function Product() {
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const header = [
    "Item Name",
    "Item HSN",
    "Purchase Price ",
    "Sale Price",
    "Whole Sale Price",
    "Quantity",
    // "Opening Quantity",
  ];
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

  const dispatch = useDispatch();
  const searchName = useSelector(selectSearchCategory);
  const firmId = useSelector(selectFirmId);
  useEffect(() => {
    if (!firmId) {
      return;
    }
    dispatch(
      getCategoryist({
        firmId: firmId,
        callback() {},
      })
    );

    return () => {};
  }, [firmId]);

  useEffect(() => {
    dispatch(
      getCategoryist({
        firmId: firmId,
        callback() {},
      })
    );

    return () => {};
  }, [searchName]);

  const list = useSelector(selectCategoryList);
  const [setselectedId, setSetselectedId] = useState("");
  const handleEdit = (Id: any) => {
    setSetselectedId(Id);
    dispatch(
      getCategoryById({
        itemId: Id,
        callback() {},
      })
    );
    dispatch(
      getCategoryTransactionById({
        itemId: Id,
        callback() {},
      })
    );
  };
  const search = useSelector(selectSearchCategoryTrasaction);
  useEffect(() => {
    if (!setselectedId) {
      return;
    }
    dispatch(
      getCategoryTransactionById({
        itemId: setselectedId,
        callback() {},
      })
    );
    return () => {};
  }, [search]);

  const transactionList = useSelector(selectCategoryTransactionList);

  const form = useSelector(selectCategoryForm);
  const modelCategory = useSelector(selectCategoryModel);
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
                    dispatch(setSearchCategoryName(e.target.value));
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
                    dispatch(changeAddCategoryModelState(true));
                  }}
                >
                  <IoMdAdd size={25} />
                  Add Category
                </div>
                <div
                  className="border-l bg-[#E9A315] py-[14px] px-[10px] cursor-pointer"
                  // onClick={() => {
                  //   Router.push("items/importitems");
                  // }}
                >
                  <RiFileExcel2Line />
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[16px] flex justify-between">
              <div>Category Name</div>
              <div>Item</div>
            </div>
            <List
              listdata={list}
              onselected={(id: number) => {
                handleEdit(id);
              }}
              page={"categories"}
            />
          </div>
        </div>
        <div className="sm:w-screen lg:w-[75%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex justify-between px-7 pb-5">
                <div>{form.categoryName}</div>
                <div>
                  <div className="flex gap-3 pr-7">
                    <div
                      className={`bg-orange-500 rounded-full px-5 py-2 flex gap-3 text-white items-center`}
                      onClick={() =>
                        setAdjustitemmodalopen(!adjustitemmodalopen)
                      }
                    >
                      <HiAdjustmentsHorizontal size={25} />
                      Move To This Category
                    </div>
                  </div>
                </div>
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="text-[25px]">ITEM</div>
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
                  dispatch(setCategoryTransactionSearch(e.target.value));
                }}
              />
            </div>
          </div>

          <div>
            <Table
              headerData={header}
              bodyData={transactionList}
              page={"categories"}
            />
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
          {/* // Move to this Category form design  */}

          <div className="">
            <p className="text-[#1F1F1F] text-[20px] font-semibold">
              Select Items
            </p>
            <div className="mt-[18px] relative">
              <input className="border border-[#D0D2D6] rounded-[6px] min-h-[46px] ps-[40px] w-[100%]"></input>
              <IoSearchOutline className="absolute top-[30%] left-[10px] text-[24px]" />
            </div>
            <div className="mt-[20px] min-h-[350px] h-[350px] overflow-auto">
              <table className="w-[100%]">
                <tr className="bg-[#E7E7E7] sticky top-0">
                  <th className="text-[16px] p-[10px] text-[#1F1F1F] font-semibold text-start capitalize">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1"
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#1F1F1F] font-semibold text-end capitalize">
                    Quantity
                  </th>
                </tr>
                <tr className="">
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-start capitalize">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1"
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-end capitalize">
                    Quantity
                  </th>
                </tr>
                <tr className="">
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-start capitalize">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1"
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-end capitalize">
                    Quantity
                  </th>
                </tr>
                <tr className="">
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-start capitalize">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1 capitalize"
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-end capitalize">
                    Quantity
                  </th>
                </tr>
                <tr className="">
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-start">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1 capitalize"
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-end capitalize">
                    Quantity
                  </th>
                </tr>
                <tr className="">
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-start capitalize">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1 "
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-end capitalize">
                    Quantity
                  </th>
                </tr>
                <tr className="">
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-start capitalize">
                    <input
                      className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1"
                      type="checkbox"
                    />
                    item name
                  </th>
                  <th className="text-[16px] p-[10px] text-[#737373] font-medium text-end capitalize">
                    Quantity
                  </th>
                </tr>
              </table>
            </div>
            <div className="mx-auto mt-[20px] text-center">
              <button className="bg-[#FF8900] rounded-[30px] text-[18px] font-medium text-white px-[30px] py-[15px]">
                Mark To This Category
              </button>
            </div>
            <div className="mx-auto text-center mt-[15px]">
              <p className="text-[#737373] text-[15px]">
                <span>
                  <input
                    className="h-[16px] w-[16px] rounded mr-[10px] border-[#93B4C7] border-1"
                    type="checkbox"
                  />
                </span>
                Remove existing category for selected items
              </p>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}
