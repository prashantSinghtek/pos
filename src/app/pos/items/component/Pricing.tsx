import TextInput from "@/app/Components/Textinput";
import { updateProductForm } from "@/Redux/Item/reducer";
import { selectProductForm } from "@/Redux/Item/selectors";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";

// Define a type for select options
interface SelectOption {
  value: string;
  label: string;
}

// Assuming you have an action to save form data in Redux

export default function Pricing() {
  const dispatch = useDispatch();
  const productForm = useSelector(selectProductForm);

  const [gst] = useState<SelectOption[]>([
    { value: "SELECT", label: "Select" },
    { value: "WITHOUT_GST", label: "Without GST" },
    { value: "WITH_GST", label: "With GST" },
  ]);

  const [selectedgstOption, setSelectedgstOptions] =
    useState<SelectOption | null>(null);
  const [selecteddiscountgstOption, setSelectedDiscountgstOptions] =
    useState<SelectOption | null>(null);
  const [selectedpurchasegstOption, setSelectedPurchasegstOptions] =
    useState<SelectOption | null>(null);
  const [discount] = useState<SelectOption[]>([
    { value: "SELECT", label: "Select" },
    { value: "PERCENTAGE", label: "Percentage" },
    { value: "AMOUNT", label: "Amount" },
  ]);
  const [selecteddiscountOption, setSelecteddiscountOptions] =
    useState<SelectOption | null>(null);
  const [toucheddiscount, setToucheddiscount] = useState({ state: false });
  const [showfield, setShowfield] = useState(false);

  const handleChangedPurchasegst = (selectedOption: SelectOption | null) =>
    setSelectedPurchasegstOptions(selectedOption);

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
  type SelectOption = {
    label: string;
    value: string;
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    salePrice: Yup.string().required("Please fill in the Sale Price"),
    discountOnSalePrice: Yup.string().required(
      "Please fill in the Discount Price"
    ),
    wholeSalePrice: Yup.string().when("showfield", (showfield, schema) => {
      return showfield
        ? schema.required("Please fill in the Wholesale Price")
        : schema.notRequired(); // Fallback when the condition is false
    }),

    quantity: Yup.string().when("showfield", (showfield, schema) => {
      return showfield
        ? schema.required("Please fill in the quantity")
        : schema.notRequired(); // Fallback when the condition is false
    }),
    purchasePrice: Yup.string().required("Please fill in the Purchase Price"),
    tax: Yup.string().required("Please fill in the tax"),
    salePriceType: Yup.mixed<any>()
      .nullable()
      .test(
        "is-valid-salePriceType",
        "Please select something",
        (value: SelectOption | null | undefined) =>
          value !== undefined && value !== null && value.value !== "SELECT"
      ),

    discountOnSalePriceType: Yup.mixed<any>()
      .nullable()
      .test(
        "is-valid-salePriceType",
        "Please select something",
        (value: SelectOption | null | undefined) =>
          value !== undefined && value !== null && value.value !== "SELECT"
      ),

    wholeSalePriceTaxType: Yup.mixed<any>()
      .nullable()
      .test(
        "is-valid-salePriceType",
        "Please select something",
        (value: SelectOption | null | undefined) =>
          value !== undefined && value !== null && value.value !== "SELECT"
      ),
    purchasePriceTaxType: Yup.mixed<any>()
      .nullable()
      .test(
        "is-valid-salePriceType",
        "Please select something",
        (value: SelectOption | null | undefined) =>
          value !== undefined && value !== null && value.value !== "SELECT"
      ),
  });

  // Submit function
  // Submit function
  const submitForm = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true);
      await validationSchema.validate(values, { abortEarly: false });

      const updatedValues = {
        ...values,
        salePriceType: selectedgstOption?.value || null,
        wholeSalePriceTaxType: selecteddiscountgstOption?.value || null,
        purchasePriceTaxType: selectedpurchasegstOption?.value || null,
        discountOnSalePriceType: selecteddiscountOption?.value || null,
      };

      Object.entries(updatedValues).forEach(([key, value]) => {
        dispatch(updateProductForm({ key: key, value: value }));
      });
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
          discountOnSalePrice: productForm.discountOnSalePrice || "",
          wholeSalePrice: productForm.wholeSalePrice || "",
          quantity: productForm.quantity || "",
          tax: productForm.tax || "",
          purchasePrice: productForm.purchasePrice || "",
          salePriceType: productForm.salePriceType || null,
          discountOnSalePriceType: productForm.discountOnSalePriceType || null,
          wholeSalePriceTaxType: productForm.wholeSalePriceTaxType || null,
          purchasePriceTaxType: productForm.purchasePriceTaxType || null,
        }}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                    className="text-gray-800 text-base w-[85%]"
                    istouched={touched.salePrice}
                  />
                  <Field name="salePriceType">
                    {({ field, form }: any) => (
                      <Select
                        options={gst}
                        placeholder={"Select"}
                        value={selectedgstOption}
                        onChange={(selectedOption) => {
                          setSelectedgstOptions(selectedOption);
                          form.setFieldValue(field.name, selectedOption); // Update Formik value
                        }}
                        styles={customStyles}
                        className="w-[50%] ml-4 bg-[#E1F2FB]"
                      />
                    )}
                  </Field>
                </div>
                {touched.salePrice && errors.salePrice && (
                  <div className="text-red-500">{errors.salePrice}</div>
                )}
                {errors.salePriceType && touched.salePriceType && (
                  <div className="text-red-500">{errors.salePriceType}</div>
                )}
              </div>

              {/* Second Row */}
              <div className="w-full">
                <div className="w-full flex items-end">
                  <TextInput
                    name="discountOnSalePrice"
                    type="text"
                    label="Discount On Sale Price"
                    value={values.discountOnSalePrice}
                    onChange={handleChange("discountOnSalePrice")}
                    className="text-gray-800 text-base w-[85%]"
                    istouched={touched.discountOnSalePrice}
                  />

                  <Field name="discountOnSalePriceType">
                    {({ field, form }: any) => (
                      <Select
                        options={discount}
                        placeholder={"Select"}
                        value={selecteddiscountOption}
                        onChange={(selectedOption) => {
                          setSelecteddiscountOptions(selectedOption);
                          form.setFieldValue(field.name, selectedOption); // Update Formik value
                        }}
                        styles={customStyles}
                        className="w-[50%] ml-4 bg-[#E1F2FB]"
                      />
                    )}
                  </Field>
                </div>

                {touched.discountOnSalePrice && errors.discountOnSalePrice && (
                  <div className="text-red-500">
                    {errors.discountOnSalePrice}
                  </div>
                )}
                {errors.discountOnSalePriceType &&
                  touched.discountOnSalePriceType && (
                    <div className="text-red-500">
                      {errors.discountOnSalePriceType}
                    </div>
                  )}
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
                <div>
                  <div className="w-full flex items-end">
                    <TextInput
                      name="wholeSalePrice"
                      type="text"
                      label="Whole Sale Price"
                      value={values.wholeSalePrice}
                      onChange={handleChange("wholeSalePrice")}
                      className="text-gray-800 text-base w-[70%]"
                      istouched={touched.wholeSalePrice}
                    />
                    <Field name="wholeSalePriceTaxType">
                      {({ field, form }: any) => (
                        <Select
                          options={gst}
                          placeholder={"Select"}
                          value={selecteddiscountgstOption}
                          onChange={(selectedOption) => {
                            setSelectedDiscountgstOptions(selectedOption);
                            form.setFieldValue(field.name, selectedOption); // Update Formik value
                          }}
                          styles={customStyles}
                          className="w-[50%] ml-4 bg-[#E1F2FB]"
                        />
                      )}
                    </Field>
                  </div>
                  {touched.wholeSalePrice && errors.wholeSalePrice && (
                    <div className="text-red-500">{errors.wholeSalePrice}</div>
                  )}

                  {errors.wholeSalePriceTaxType &&
                    touched.wholeSalePriceTaxType && (
                      <div className="text-red-500">
                        {errors.wholeSalePriceTaxType}
                      </div>
                    )}
                </div>

                <div>
                  <TextInput
                    name="quantity"
                    type="text"
                    label="quantity"
                    value={values.quantity}
                    onChange={handleChange("quantity")}
                    className="text-gray-800 text-base w-[70%]"
                    istouched={touched.quantity}
                  />
                  {touched.quantity && errors.quantity && (
                    <div className="text-red-500">{errors.quantity}</div>
                  )}
                </div>
              </div>
            )}

            {/* Other Fields */}
            <div className="w-[45%] mt-4">
              <TextInput
                name="tax"
                type="text"
                label="tax"
                value={values.tax}
                onChange={handleChange("tax")}
                className="text-gray-800 text-base"
                istouched={touched.tax}
              />
              {touched.tax && errors.tax && (
                <div className="text-red-500">{errors.tax}</div>
              )}
            </div>

            <div className="w-full mt-4">
              <div className="w-full flex items-end">
                <TextInput
                  name="purchasePrice"
                  type="text"
                  label="Purchase Price"
                  value={values.purchasePrice}
                  onChange={handleChange("purchasePrice")}
                  className="text-gray-800 text-base w-[80%]"
                  istouched={touched.purchasePrice}
                />

                <Field name="purchasePriceTaxType">
                  {({ field, form }: any) => (
                    <Select
                      options={gst}
                      placeholder={"Select"}
                      value={selectedpurchasegstOption}
                      onChange={(selectedOption) => {
                        setSelectedPurchasegstOptions(selectedOption);
                        form.setFieldValue(field.name, selectedOption); // Update Formik value
                      }}
                      styles={customStyles}
                      className="w-[25%] ml-4 bg-[#E1F2FB]"
                    />
                  )}
                </Field>
              </div>
              {touched.purchasePrice && errors.purchasePrice && (
                <div className="text-red-500">{errors.purchasePrice}</div>
              )}
              {errors.purchasePriceTaxType && touched.purchasePriceTaxType && (
                <div className="text-red-500">
                  {errors.purchasePriceTaxType}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="w-full mt-4">
              <button
                className="text-white bg-blue-500 px-6 py-2 rounded"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
