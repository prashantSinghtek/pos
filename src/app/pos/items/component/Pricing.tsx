import TextInput from "@/app/Components/Textinput";
import { Formik } from "formik";
import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import Select from "react-select";

export default function Pricing({setPricevalue}:any) {
  const [gst, setGst] = useState<any>(["Without GST", "With GST"]);
  const [selectedgstOption, setSelectedgstOptions] = useState<any>();
  console.log("selectedgstOption",selectedgstOption)
  const [selecteddiscountgstOption, setSelectedDiscountgstOptions] = useState<any>();
  const [selectedpurchasegstOption, setSelectedPurchasegstOptions] = useState<any>();
  
  const [touchedgst, setTouchedgst] = useState({ state: false });
  const [discount, setDiscount] = useState<any>(["Percentage", "Amount"]);
  const [selecteddiscountOption, setSelecteddiscountOptions] = useState<any>();
  const [toucheddiscount, setToucheddiscount] = useState({ state: false });
  const [showfield, setShowfield] = useState(false);

  const stateOptions = gst?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));
  const handleChangedgst = (selectedOption: any) => {
    setSelectedgstOptions(selectedOption);
  };
  const handleChangedDiscountgst = (selectedOption: any) => {
    setSelectedDiscountgstOptions(selectedOption);
  };
  const handleChangedPurchasegst = (selectedOption: any) => {
    setSelectedPurchasegstOptions(selectedOption);
  };


  const statediscount = discount?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));
  const handleChangeddiscount = (selectedOption: any) => {
    setSelecteddiscountOptions(selectedOption);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "46px", // Set your desired height here
      minHeight: "46px", // Ensure the minimum height is the same as the height
      fontSize: "0.875rem", // Equivalent to text-sm
      fontWeight: "500", // Equivalent to font-medium
      // borderRadius: "0.375rem", // Equivalent to rounded-md
      backgroundColor: "#E1F2FB", // Equivalent to bg-white
      outline: "none", // Equivalent to outline-none
      // Note: focus-within styles cannot be directly applied to the control
    }),
    // Additional styles for the dropdown menu
    // menu: (provided: any) => ({
    //   ...provided,
    //   borderRadius: "0.375rem", // Equivalent to rounded-md
    // }),
  };
  const submitForm = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);
      const value ={
        saleprice: values.salePrice,
        discountprice: values.discountPrice,
        wholesaleprice: values.WholeSalePrice,
        quantity:values.Quantity,
        tax:values.Tax,
        purchaseprice:values.Purchaseprice,
        salepricewithgst: selectedgstOption?.value,
        wholesalepricewithgst: selecteddiscountgstOption?.value,
        purchasepricewithgst: selectedpurchasegstOption?.value,
        dicounttype:selecteddiscountOption?.value,
      }
      console.log(value)
      setPricevalue(value)



      resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Formik initialValues={{ salePrice: "", discountPrice: "", WholeSalePrice: "", Quantity: "",Tax:"",Purchaseprice:"" }} onSubmit={submitForm} validationSchema={""}>
        {({ handleChange, handleSubmit, values, errors, touched }: any) => {
          return (
            <>
              <div className="my-3">Sale price</div>
              <div className="flex">
                <div className="w-[60%]">
                  <div className="w-[70%]  flex items-end">
                    <TextInput
                      name="salePrice"
                      type="text"
                      placeholder=""
                      label="Sale Price"
                      istouched={"Touch"}
                      value={values.salePrice}
                      onChange={handleChange("salePrice")}
                      onBlur={handleChange("salePrice")}
                      className="text-gray-800 text-base w-[30%]"
                    />
                    <Select
                      options={stateOptions}
                      placeholder={"with GST"}
                      value={selectedgstOption}
                      onChange={handleChangedgst}
                      onBlur={() =>
                        setTouchedgst({ ...touchedgst, state: true })
                      }
                      styles={customStyles}
                      className="w-[30%]  bg-[#E1F2FB]  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                    />
                  </div>
                </div>
                <div className="w-[60%]">
                  <div className="w-[70%]  flex items-end">
                    <TextInput
                      name="discountPrice"
                      type="text"
                      placeholder=""
                      label="Discount On Sale Price"
                      istouched={"Touch"}
                      value={values.discountPrice}
                      onChange={handleChange("discountPrice")}
                      onBlur={handleChange("discountPrice")}
                      className="text-gray-800 text-base w-[30%]"
                    />
                    <Select
                      options={statediscount}
                      placeholder={"Percentage"}
                      value={selecteddiscountOption}
                      onChange={handleChangeddiscount}
                      onBlur={() =>
                        setToucheddiscount({ ...toucheddiscount, state: true })
                      }
                      styles={customStyles}
                      className="w-[30%]  bg-[#E1F2FB]  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                    />
                  </div>
                </div>
              </div>
              <div
                className="py-3 flex gap-[2px] items-center text-[#2D9CDB] cursor-pointer"
                onClick={() => setShowfield(!showfield)}
              >
                {showfield ? <FiMinus /> : <IoMdAdd />}
                {showfield ? "Hide Wholeale Price" : "Add Wholeale Price"}
              </div>
              {showfield && (
                <>
                  <div className="my-3">Whole Sale Price</div>
                  <div className="flex">
                    <div className="w-[60%]">
                      <div className="w-[70%]  flex items-end">
                        <TextInput
                          name="WholeSalePrice"
                          type="text"
                          placeholder=""
                          label="Whole Sale Price"
                          istouched={"Touch"}
                          value={values.WholeSalePrice}
                          onChange={handleChange("WholeSalePrice")}
                          onBlur={handleChange("WholeSalePrice")}
                          className="text-gray-800 text-base w-[30%]"
                        />
                        <Select
                          options={stateOptions}
                          placeholder={"with GST"}
                          value={selecteddiscountgstOption}
                          onChange={handleChangedDiscountgst}
                          onBlur={() =>
                            setTouchedgst({ ...touchedgst, state: true })
                          }
                          styles={customStyles}
                          className="w-[30%]  bg-[#E1F2FB]  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                        />
                      </div>
                    </div>
                    <div className="w-[60%]">
                      <div className="w-[70%]  flex items-end">
                        <TextInput
                          name="Quantity"
                          type="text"
                          placeholder=""
                          label="Quantity"
                          istouched={"Touch"}
                          value={values.Quantity}
                          onChange={handleChange("Quantity")}
                          onBlur={handleChange("Quantity")}
                          className="text-gray-800 text-base w-[30%]"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div>
                <>
                  <div className="my-3">Purchase Price</div>
                  <div className="flex">
                    <div className="w-[60%]">
                      <div className="w-[70%]  flex items-end">
                        <TextInput
                          name="Purchaseprice"
                          type="text"
                          placeholder=""
                          label="purchase Price"
                          istouched={true}
                          value={values.Purchaseprice}
                          onChange={handleChange("Purchaseprice")}
                          onBlur={handleChange("Purchaseprice")}
                          className="text-gray-800 text-base w-[30%]"
                        />
                        <Select
                          options={stateOptions}
                          placeholder={"with GST"}
                          value={selectedpurchasegstOption}
                          onChange={handleChangedPurchasegst}
                          onBlur={() =>
                            setTouchedgst({ ...touchedgst, state: true })
                          }
                          styles={customStyles}
                          className="w-[30%]  bg-[#E1F2FB]  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                        />
                      </div>
                    </div>
                    <div className="w-[60%]">
                      <div className="w-[70%]  flex items-end">
                        <TextInput
                          name="Tax"
                          type="text"
                          placeholder=""
                          label="Tax"
                          value={values.Tax}
                          onChange={handleChange("Tax")}
                          onBlur={handleChange("Tax")}
                          istouched={true}
                          className="text-gray-800 text-base w-[30%]"
                        />
                      </div>
                    </div>
                  </div>
                </>
              </div>
              <div
                className="bg-[#FF8900] my-5 w-fit rounded-lg px-5 text-white py-2"
                onClick={() => handleSubmit()}
              >
                Save
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
