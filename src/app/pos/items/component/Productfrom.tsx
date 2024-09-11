/* eslint-disable react/jsx-key */
import Tabs from "@/app/Components/Tabs";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { RiDropboxFill } from "react-icons/ri";
import Pricing from "./Pricing";
import Stock from "./Stock";
import Modal from "@/app/Components/Modal";
import { customStyles } from "@/app/Components/Customstyle";
import Select from "react-select";
import { Formik } from "formik";
import { useSession } from "next-auth/react";




interface CustomFile {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  content: ArrayBuffer;
}

export default function Productfrom({setProductupdate,selectedproduct}:any) {
  const [pricevalue, setPricevalue] = useState<any>();
  const [stockvalue, setStockvalue] = useState<any>();
  const [productcodevalue, setProductcodevalue] = useState("");
  const [selectedunit, setSelectedUnit] = useState<any>([ selectedproduct?.item?.unit]);
  const [selectedcategory, setSelectedcategory] = useState<any>([]);
  const [unit, setUnit] = useState<any>([]);
  const [category, setCategory] = useState([])
  const firmid = localStorage.getItem("selectedStore");
  if (!firmid) {
    throw Error("vfdbkn")
  }
  console.log("firmisdv", firmid)
  const [fieldValue, setFieldValue] = useState<any>([]);
  const session = useSession();
  const token = session?.data?.uToken;
  const auth = new pos_controller()
  useEffect(() => {
    GetUnits(token).
      then((res) => setUnit(res)).catch((err) => console.log(err, "unit error"))
  }, [token])

  useEffect(() => {
    Getcategory(token).then((res) => { console.log("category", res); setCategory(res.data) }).catch((err) => console.log("ctegory", err))
  }, [token])


  // const handleImageChange = (newFiles: FileList | null) => {
  //   if (newFiles) {
  //     const filesArray = Array.from(newFiles).map(async (file) => ({
  //       name: file.name,
  //       type: file.type,
  //       size: file.size,
  //       lastModified: file.lastModified,
  //       content: await file.arrayBuffer(),
  //     }));
  //     Promise.all(filesArray).then(setFieldValue);
  //   }
  // };
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
    value: option.name.toUpperCase(),
    label: option.name.toUpperCase(),
    id: option.id,
  }));
  function generateRandomNumber() {
    const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
    setProductcodevalue(randomNum.toString());
    console.log(randomNum);
  }
  const handleChangedunit = (selectedOption: any) => {
    console.log("selectedOption", selectedOption);
    setSelectedUnit(selectedOption.value);
  };
  const handleChangedCategory = (selectedOption: any) => {
    console.log("selectedOption", selectedOption);
    setSelectedcategory(selectedOption.id);
  };

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
  console.log("pricevalue", pricevalue)
  console.log("stockvalue", stockvalue)
  
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
      formData.append("itemCode", productcodevalue);
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
      formData.append("firmId", firmid);
      formData.append("discountOnSalePriceType", pricevalue.dicounttype);
      formData.append("wholeSalePriceTaxType", pricevalue.wholesalepricewithgst);
      formData.append("salePriceTaxType", pricevalue.salepricewithgst);
      formData.append("purchasePriceTaxType", pricevalue.purchasepricewithgst);
      formData.append("openingQuantity", stockvalue.Openingqty);
      formData.append("atPrice", stockvalue.Atprice);
      formData.append("asOfDate", stockvalue.date);
      formData.append("minStockToMaintain", stockvalue.minstock);
      formData.append("location", stockvalue.Location);

      console.log(">>>>>>>>>>", formData)
      const res = await AddItems(formData, token)
      console.log("res_additem", res)
      setProductupdate(true)

      resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };
  console.log("selectedproduct",selectedproduct)
  const content = [<Pricing setPricevalue={setPricevalue} />, <Stock setStockvalue={setStockvalue} />];
  return (
    <div>
      <>
        <Formik
          initialValues={{
            itemname: selectedproduct?.item?.itemName || " ",
            Hsn: selectedproduct?.item?.itemHsn || " ",
            itemcode: productcodevalue ||  selectedproduct?.item?.itemCode,
            category: "",
          }}
          onSubmit={submitForm}
          validationSchema={""}
        >
          {({ handleChange, handleSubmit, values, errors, touched }: any) => {

            return (
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
                      placeholder=""
                      label="Item Name"
                      value={values.itemname}
                      onChange={handleChange("itemname")}
                      onBlur={handleChange("itemname")}
                      istouched={"Touch"}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      name="Hsn"
                      type="text"
                      placeholder=""
                      label="Item HSN"
                      value={values.Hsn}
                      onChange={handleChange("Hsn")}
                      onBlur={handleChange("Hsn")}
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
                      className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
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
                      className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      name="itemcode"
                      type="text"
                      placeholder=""
                      label="Item Code"
                      value={productcodevalue ?? values.itemcode}
                      onChange={(e) => { setProductcodevalue(e.target.value) }}
                      onBlur={handleChange("category")}
                      istouched={"Touch"}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div
                    className="px-5 h-[40px] text-xs border border-gray-300 bg-[#E1F2FB] text-gray-500 rounded-lg flex justify-center items-center cursor-pointer"
                    onClick={generateRandomNumber}
                  >
                    Assign code
                  </div>

                </div>
                <div className="flex items-end gap-5 my-5 w-full">
                  <div className="w-[20%] flex-col space-y-2 ">
                    <div>Image</div>
                    <input
                      title="d"
                      type="file"
                      id="fileInput"
                      name="Signature"
                      onChange={(e) => handleImageChange(e.target.files)}
                      className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]"
                      aria-labelledby="fileInput"
                    />
                  </div>
                </div>
                <Tabs heading={heading} content={content} />


              </>

            );
          }}
        </Formik>
      </>
    </div>
  );
}
