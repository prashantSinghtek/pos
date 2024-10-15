import TextInput from "@/app/Components/Textinput";
import { selectProductForm } from "@/Redux/Item/selectors";
import { Formik } from "formik";
import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// Assuming you have an action to save form data in Redux

export default function Pricing() {
  const dispatch = useDispatch();
  
  const productForm = useSelector(selectProductForm);

  const [gst, setGst] = useState<any>(["Select","Without GST", "With GST"]);
  const [selectedgstOption, setSelectedgstOptions] = useState<any>(null);
  const [selecteddiscountgstOption, setSelectedDiscountgstOptions] = useState<any>(null);
  const [selectedpurchasegstOption, setSelectedPurchasegstOptions] = useState<any>(null);

  const [touchedgst, setTouchedgst] = useState({ state: false });
  const [discount, setDiscount] = useState<any>(["Select","Percentage", "Amount"]);
  const [selecteddiscountOption, setSelecteddiscountOptions] = useState<any>(null);
  const [toucheddiscount, setToucheddiscount] = useState({ state: false });
  const [showfield, setShowfield] = useState(false);

  const stateOptions = gst?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));
  
  const handleChangedgst = (selectedOption: any) => setSelectedgstOptions(selectedOption);
  const handleChangedDiscountgst = (selectedOption: any) => setSelectedDiscountgstOptions(selectedOption);
  const handleChangedPurchasegst = (selectedOption: any) => setSelectedPurchasegstOptions(selectedOption);
  const statediscount = discount?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));
  const handleChangeddiscount = (selectedOption: any) => setSelecteddiscountOptions(selectedOption);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "46px",
      minHeight: "46px",
      fontSize: "0.875rem",
      fontWeight: "500",
      backgroundColor: "#E1F2FB",
      outline: "none",
    }),
  };

  // Submit function
  const submitForm = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true);

      const updatedValues = {
        ...values,
        salePriceType: selectedgstOption?.value,
        wholeSalePriceTaxType: selecteddiscountgstOption?.value,
        purchasePriceTaxType: selectedpurchasegstOption?.value,
        discountOnSalePriceType: selecteddiscountOption?.value,
      };

      // Dispatch the form data to Redux action
      // dispatch(saveProductForm(updatedValues));

      console.log("Submitted form data:", updatedValues);

      // resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          salePrice: productForm.salePrice || "",
          discountPrice: productForm.discountOnSalePrice || "",
          WholeSalePrice: productForm.wholeSalePrice || "",
          Quantity: productForm.quantity || "",
          Tax: productForm.tax || "",
          Purchaseprice: productForm.purchasePrice || "",
        }}
        onSubmit={submitForm}
        validationSchema={null} // Define your validation schema if needed
      >
        {({ handleChange, handleSubmit, values }: any) => (
          <>
            <div className="flex space-x-2 w-full mt-4">
              {/* First Row */}
              <div className="w-full">
                <div className="w-full flex items-end">
                  <TextInput
                    name="salePrice"
                    type="text"
                    label="Sale Price"
                    value={values.salePrice}
                    onChange={handleChange("salePrice")}
                    className="text-gray-800 text-base w-[85%]" istouched={undefined}                  />
                  <Select
                    options={stateOptions}
                    placeholder={"Select"}
                    value={selectedgstOption}
                    onChange={handleChangedgst}
                    styles={customStyles}
                    className="w-[20%] ml-4 bg-[#E1F2FB]"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="w-full">
                <div className="w-full flex items-end">
                  <TextInput
                    name="discountPrice"
                    type="text"
                    label="Discount On Sale Price"
                    value={values.discountPrice}
                    onChange={handleChange("discountPrice")}
                    className="text-gray-800 text-base w-[85%]" istouched={undefined}                  />
                  <Select
                    options={statediscount}
                    placeholder={"Select"}
                    value={selecteddiscountOption}
                    onChange={handleChangeddiscount}
                    styles={customStyles}
                    className="w-[20%] ml-4 bg-[#E1F2FB]"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Wholesale Price */}
            <div
              className="py-3 flex gap-[2px] items-center text-[#2D9CDB] cursor-pointer"
              onClick={() => setShowfield(!showfield)}
            >
              {showfield ? <FiMinus /> : <IoMdAdd />}
              {showfield ? "Hide Wholesale Price" : "Add Wholesale Price"}
            </div>
            
            {/* Show Wholesale Price Fields */}
            {showfield && (
              <div className="flex space-x-4 w-full">
                <div className="w-full flex items-end">
                  <TextInput
                    name="WholeSalePrice"
                    type="text"
                    label="Whole Sale Price"
                    value={values.WholeSalePrice}
                    onChange={handleChange("WholeSalePrice")}
                    className="text-gray-800 text-base w-[70%]" istouched={undefined}                  />
                  <Select
                    options={stateOptions}
                    placeholder={"Select"}
                    value={selecteddiscountgstOption}
                    onChange={handleChangedDiscountgst}
                    styles={customStyles}
                    className="w-[30%] ml-4 bg-[#E1F2FB]"
                  />
                </div>

                {/* Quantity Row */}
                <div className="w-full">
                  <TextInput
                    name="Quantity"
                    type="text"
                    label="Quantity"
                    value={values.Quantity}
                    onChange={handleChange("Quantity")}
                    className="text-gray-800 text-base w-[100%]" istouched={undefined}                  />
                </div>
              </div>
            )}

            {/* Purchase Price and Tax */}
            <div className="flex space-x-4 w-full">
              <div className="w-full flex items-end">
                <TextInput
                  name="Purchaseprice"
                  type="text"
                  label="Purchase Price"
                  value={values.Purchaseprice}
                  onChange={handleChange("Purchaseprice")}
                  className="text-gray-800 text-base w-[70%]" istouched={undefined}                />
                <Select
                  options={stateOptions}
                  placeholder={"Select"}
                  value={selectedpurchasegstOption}
                  onChange={handleChangedPurchasegst}
                  styles={customStyles}
                  className="w-[30%] ml-4 bg-[#E1F2FB]"
                />
              </div>

              {/* Tax Row */}
              <div className="w-full">
                <TextInput
                  name="Tax"
                  type="text"
                  label="Tax"
                  value={values.Tax}
                  onChange={handleChange("Tax")}
                  className="text-gray-800 text-base w-[100%]" istouched={undefined}                />
              </div>
            </div>

            {/* Submit Button */}
            <div
              className="bg-[#FF8900] my-5 w-fit rounded-lg px-5 text-white py-2"
              onClick={handleSubmit}
            >
              Save
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
