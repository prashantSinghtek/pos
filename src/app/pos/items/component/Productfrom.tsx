import Tabs from "@/app/Components/Tabs";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { RiDropboxFill } from "react-icons/ri";
import Pricing from "./Pricing";
import Stock from "./Stock";
import { customStyles } from "@/app/Components/Customstyle";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { useDispatch, useSelector } from "react-redux";
import { selectProductForm } from "@/Redux/Item/selectors";
import { getCategoryByFirm, getUnit, myCompany } from "@/controller/posauth";
import { addItem, updateProductForm } from "@/Redux/Item/reducer";

export default function ProductForm() {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [unit, setUnit] = useState<any>([]);
  const [categoryIds, setCategory] = useState<any>([]);
  const [fieldValue, setFieldValue] = useState<any>([]);

  const handleImageChange = (newFiles: FileList | null) => {
    if (newFiles) {
      setFieldValue(Array.from(newFiles));
    }
  };

  const allCategory = categoryIds?.map((option: any) => ({
    value: option.id,
    label: option.name.toUpperCase(),
    id: option.id,
  }));

  const allUnits = unit?.map((option: any) => ({
    value: option.id,
    label: option.unit.toUpperCase(),
    id: option.id,
  }));

  // Generates random number and sets it in Formik form values
  const generateRandomNumber = (formikSetFieldValue: any) => {
    const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
    formikSetFieldValue("itemCode", randomNum.toString());
  };

  const [firmId, setFirmId] = useState("");

  useEffect(() => {
    myCompany()
      .then((res) => {
        setFirmId(res[0].id);
      })
      .catch((err: any) => {});
  }, []);

  const heading = [
    {
      icon: <RiDropboxFill size={25} />,
      title: "PRICING",
    },
    {
      icon: <IoSettings size={25} />,
      title: "STOCK",
    },
  ];

  const dispatch = useDispatch();

  const submitForm = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      Object.entries(values).forEach(([key, value]) => {
        dispatch(updateProductForm({ key: key, value: value }));
      });
      dispatch(
        addItem({
          callback() {},
        })
      );
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  const content = [<Pricing />, <Stock />];

  const formData = useSelector(selectProductForm);

  useEffect(() => {
    getUnit(firmId)
      .then((res) => {
        setUnit(res.data);
      })
      .catch((err) => {});

    getCategoryByFirm(firmId)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {});

    dispatch(updateProductForm({ key: "firmId", value: firmId }));
  }, [firmId]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
    itemHsn: Yup.string().required("Item HSN is required"),
    itemCode: Yup.string().required("Item Code is required"),
    categoryIds: Yup.number().required("Category is required"),
    unit: Yup.string().required("Unit is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          itemName: formData.itemName || "",
          itemHsn: formData.itemHsn || "",
          itemCode: formData.itemCode || "",
          categoryIds: formData.categoryIds, // Add initial value for categoryIds
          unit: formData.unit, // Add initial value for unit
        }}
        onSubmit={submitForm}
        validationSchema={validationSchema} // Use validation schema
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }: any) => (
          <>
            <div className="py-3 border-b border-groove flex justify-between items-center">
              <div>Add Product</div>
              <div
                className="bg-[#FF8900] rounded-lg px-5 text-white py-2"
                onClick={() => handleSubmit()}
              >
                Save
              </div>
            </div>

            <div className="flex items-end gap-5 my-5 w-full">
              <div className="w-[30%]">
                <TextInput
                  name="itemName"
                  type="text"
                  label="Item Name"
                  value={values.itemName}
                  error={errors.itemName}
                  onChange={handleChange("itemName")}
                  istouched={touched.itemName}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>

              <div className="w-[30%]">
                <TextInput
                  name="itemHsn"
                  type="text"
                  label="Item HSN"
                  value={values.itemHsn}
                  error={errors.itemHsn}
                  onChange={handleChange("itemHsn")}
                  istouched={touched.itemHsn}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>

              <div className="w-[25%] flex flex-col space-y-2 ">
                <div className="text-[#808080]">Unit</div>
                <Select
                  name="unit"
                  options={allUnits}
                  value={selectedUnit}
                  onChange={(selectedOption) => {
                    setSelectedUnit(selectedOption);
                    setFieldValue("unit", selectedOption?.value); // Set the Formik value
                  }}
                  styles={customStyles}
                  className="w-full bg-white rounded-md outline-none font-medium text-primary text-sm"
                />
                {errors.unit && touched.unit && (
                  <div className="text-red-500">{errors.unit}</div>
                )}
              </div>
            </div>

            <div className="flex items-end gap-5 my-5 w-full">
              <div className="w-[30%] flex flex-col space-y-2 ">
                <div className="text-[#808080]">Category</div>
                <Select
                  name="categoryIds"
                  options={allCategory}
                  value={selectedCategory}
                  onChange={(selectedOption) => {
                    setSelectedCategory(selectedOption);
                    setFieldValue("categoryIds", selectedOption?.value); // Set the Formik value
                  }}
                  styles={customStyles}
                  className="w-full bg-white rounded-md outline-none font-medium text-primary text-sm"
                />
                {errors.categoryIds && touched.categoryIds && (
                  <div className="text-red-500">{errors.categoryIds}</div>
                )}
              </div>

              <div className="w-[30%]">
                <TextInput
                  name="itemCode"
                  type="text"
                  label="Item Code"
                  value={values.itemCode}
                  error={errors.itemCode}
                  onChange={handleChange("itemCode")}
                  istouched={touched.itemCode}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>

              <div
                className="px-5 h-[40px] text-xs border border-gray-300 bg-[#E1F2FB] text-gray-500 rounded-lg flex justify-center items-center cursor-pointer"
                onClick={() => generateRandomNumber(setFieldValue)}
              >
                Assign code
              </div>
            </div>

            <div className="flex items-end gap-5 my-5 w-full">
              <div className="w-[20%] flex-col space-y-2 ">
                <div>Image</div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => {
                    handleImageChange(e.target.files);
                    setFieldValue("path", e.target.files);
                  }}
                  className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]"
                />
              </div>
            </div>
            <div className="py-3 border-t border-groove">
              <Tabs heading={heading} content={content} />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
