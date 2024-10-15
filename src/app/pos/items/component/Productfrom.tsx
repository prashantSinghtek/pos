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
import { useSelector } from "react-redux";
import { selectProductForm } from "@/Redux/Item/selectors";
import { getCategoryByFirm, getUnit, myCompany } from "@/controller/posauth";

export default function ProductForm() {
  const [pricevalue, setPricevalue] = useState<any>();
  const [stockvalue, setStockvalue] = useState<any>();
  const [selectedunit, setSelectedUnit] = useState<any>([]);
  const [selectedcategory, setSelectedcategory] = useState<any>([]);
  const [unit, setUnit] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [fieldValue, setFieldValue] = useState<any>([]);

  const firmid = localStorage.getItem("selectedStore");
  console.log("firmisdv", firmid);

  const handleImageChange = (newFiles: FileList | null) => {
    if (newFiles) {
      setFieldValue(Array.from(newFiles));
    }
  };

  const allcategory = category?.map((option: any) => ({
    value: option.name.toUpperCase(),
    label: option.name.toUpperCase(),
    id: option.id,
  }));

  const allunits = unit?.map((option: any) => ({
    value: option.id,
    label: option.unit.toUpperCase(),
    id: option.id,
  }));

  // Generates random number and sets it in Formik form values
  const generateRandomNumber = (formikSetFieldValue: any) => {
    const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
    formikSetFieldValue("itemcode", randomNum.toString());
    console.log("Generated item code:", randomNum);
  };

  const handleChangedunit = (selectedOption: any) => {
    setSelectedUnit(selectedOption.value);
  };

  const handleChangedCategory = (selectedOption: any) => {
    setSelectedcategory(selectedOption.id);
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

  const submitForm = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);
      // const fieldValuePlain = fieldValue.map((file) => ({
      //   name: file.name,
      //   type: file.type,
      //   size: file.size,
      //   lastModified: file.lastModified,
      //   content: Array.from(new Uint8Array(file.content)), // Convert ArrayBuffer to Array
      // }));

      const formData = new FormData();
      formData.append("itemName", values.itemname);
      formData.append("itemHsn", values.Hsn);
      formData.append("categoryIds", selectedcategory);
      formData.append("itemCode", values.itemcode);

      fieldValue.forEach((file: any, index: any) => {
        formData.append(`path`, file);
      });

      formData.append("unit", selectedunit);
      formData.append("salePrice", pricevalue.saleprice);
      formData.append("discountOnSalePrice", pricevalue.discountprice);
      formData.append("wholeSalePrice", pricevalue.wholesaleprice);
      formData.append("Quantity", pricevalue.quantity);
      formData.append("purchasePrice", pricevalue.purchaseprice);
      formData.append("tax", pricevalue.tax);
      formData.append("discountOnSalePriceType", pricevalue.dicounttype);
      formData.append(
        "wholeSalePriceTaxType",
        pricevalue.wholesalepricewithgst
      );
      formData.append("salePriceTaxType", pricevalue.salepricewithgst);
      formData.append("purchasePriceTaxType", pricevalue.purchasepricewithgst);
      formData.append("openingQuantity", stockvalue.Openingqty);
      formData.append("atPrice", stockvalue.Atprice);
      formData.append("asOfDate", stockvalue.date);
      formData.append("minStockToMaintain", stockvalue.minstock);
      formData.append("location", stockvalue.Location);

      console.log("FormData:", formData);
      resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const content = [
    <Pricing />,
    <Stock setStockvalue={setStockvalue} />,
  ];

  const formData = useSelector(selectProductForm);
  useEffect(() => {
    getUnit(firmId)
      .then((res) => {
        console.log(res.data, "resgetUnit");
        setUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      getCategoryByFirm(firmId)
      .then((res) => {
        console.log(res, "getCategoryByFirmRes");
        // setUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [firmId]);
  return (
    <div>
      <Formik
        initialValues={{
          itemname: formData.itemName || "",
          Hsn: formData.itemHsn || "",
          itemcode: formData.itemCode || "",
          category: formData.categoryIds || "",
        }}
        onSubmit={submitForm}
        validationSchema={""} // Add your validation schema here
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
                  name="itemname"
                  type="text"
                  label="Item Name"
                  value={values.itemname}
                  onChange={handleChange("itemname")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>

              <div className="w-[30%]">
                <TextInput
                  name="Hsn"
                  type="text"
                  label="Item HSN"
                  value={values.Hsn}
                  onChange={handleChange("Hsn")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>

              <div className="w-[25%] flex flex-col space-y-2 ">
                <div className="text-[#808080]">Unit</div>
                <Select
                  name="unit"
                  options={allunits}
                  value={selectedunit?.value}
                  onChange={handleChangedunit}
                  styles={customStyles}
                  className="w-full bg-white rounded-md outline-none font-medium text-primary text-sm"
                />
              </div>
            </div>

            <div className="flex items-end gap-5 my-5 w-full">
              <div className="w-[30%] flex flex-col space-y-2 ">
                <div className="text-[#808080]">Category</div>
                <Select
                  name="Category"
                  options={allcategory}
                  value={selectedcategory?.value}
                  onChange={handleChangedCategory}
                  styles={customStyles}
                  className="w-full bg-white rounded-md outline-none font-medium text-primary text-sm"
                />
              </div>

              <div className="w-[30%]">
                <TextInput
                  name="itemcode"
                  type="text"
                  label="Item Code"
                  value={values.itemcode}
                  onChange={handleChange("itemcode")}
                  istouched={"Touch"}
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
                  name="Signature"
                  onChange={(e) => handleImageChange(e.target.files)}
                  className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]"
                />
              </div>
            </div>

            <Tabs heading={heading} content={content} />
          </>
        )}
      </Formik>
    </div>
  );
}
