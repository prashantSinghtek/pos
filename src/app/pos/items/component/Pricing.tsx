import TextInput from "@/app/Components/Textinput";
import { updateProductForm } from "@/Redux/Item/reducer";
import { selectProductForm } from "@/Redux/Item/selectors";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";
import { FiLoader } from "react-icons/fi"; // Import a loader icon

// Define a type for select options
interface SelectOption {
  value: string;
  label: string;
}

export default function Pricing() {
  const dispatch = useDispatch();
  const productForm = useSelector(selectProductForm);

  const [gst] = useState<SelectOption[]>([
    { value: "SELECT", label: "Select" },
    { value: "WITHOUT_GST", label: "Without GST" },
    { value: "WITH_GST", label: "With GST" },
  ]);

  const [discount] = useState<SelectOption[]>([
    { value: "SELECT", label: "Select" },
    { value: "PERCENTAGE", label: "Percentage" },
    { value: "AMOUNT", label: "Amount" },
  ]);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitForm = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setIsSubmitting(true);
      await validationSchema.validate(values, { abortEarly: false });

      const updatedValues = {
        ...values,
      };

      Object.entries(updatedValues).forEach(([key, value]) => {
        dispatch(updateProductForm({ key: key, value: value }));
      });
      setIsSubmitting(false);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          salePrice: productForm.salePrice,
          discountOnSalePrice: productForm.discountOnSalePrice,
          wholeSalePrice: productForm.wholeSalePrice,
          quantity: productForm.quantity,
          tax: productForm.tax,
          purchasePrice: productForm.purchasePrice,
          salePriceType: productForm.salePriceType,
          discountOnSalePriceType: productForm.discountOnSalePriceType,
          wholeSalePriceTaxType: productForm.wholeSalePriceTaxType,
          purchasePriceTaxType: productForm.purchasePriceTaxType,
        }}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <div className="flex space-x-2 w-full mt-4 items-end">
              <div className="w-full">
                <TextInput
                  name="salePrice"
                  type="text"
                  label="Sale Price"
                  value={values.salePrice}
                  onChange={handleChange("salePrice")}
                  className="text-gray-800 text-base w-full"
                  istouched={touched.salePrice}
                />
                {touched.salePrice && errors.salePrice && (
                  <div className="text-red-500">{errors.salePrice}</div>
                )}
              </div>

              <div className="w-full">
                <Field name="salePriceType">
                  {({ field, form }: any) => (
                    <Select
                      options={gst}
                      placeholder={"Select"}
                      value={values.salePriceType}
                      onChange={(selectedOption) => {
                        form.setFieldValue(field.name, selectedOption); // Update Formik value
                      }}
                      styles={customStyles}
                      className="w-[100%] bg-[#E1F2FB]"
                    />
                  )}
                </Field>
                {errors.salePriceType && touched.salePriceType && (
                  <div className="text-red-500">{errors.salePriceType}</div>
                )}
              </div>
              <div className="w-full">
                <TextInput
                  name="discountOnSalePrice"
                  type="text"
                  label="Discount On Sale Price"
                  value={values.discountOnSalePrice}
                  onChange={handleChange("discountOnSalePrice")}
                  className="text-gray-800 text-base w-full"
                  istouched={touched.discountOnSalePrice}
                />
                {touched.discountOnSalePrice && errors.discountOnSalePrice && (
                  <div className="text-red-500">
                    {errors.discountOnSalePrice}
                  </div>
                )}
              </div>
              <div className="w-full">
                <Field name="discountOnSalePriceType">
                  {({ field, form }: any) => (
                    <Select
                      options={discount}
                      placeholder={"Select"}
                      value={values.discountOnSalePriceType}
                      onChange={(selectedOption) => {
                        form.setFieldValue(field.name, selectedOption); // Update Formik value
                      }}
                      styles={customStyles}
                      className="w-[100%] bg-[#E1F2FB]"
                    />
                  )}
                </Field>
                {errors.discountOnSalePriceType &&
                  touched.discountOnSalePriceType && (
                    <div className="text-red-500">
                      {errors.discountOnSalePriceType}
                    </div>
                  )}
              </div>
            </div>

            <div className="flex space-x-2 w-full mt-6 items-end">
              <div className="w-full">
                <TextInput
                  name="wholeSalePrice"
                  type="text"
                  label="Whole Sale Price"
                  value={values.wholeSalePrice}
                  onChange={handleChange("wholeSalePrice")}
                  className="text-gray-800 text-base w-[100%]"
                  istouched={touched.wholeSalePrice}
                />

                {touched.wholeSalePrice && errors.wholeSalePrice && (
                  <div className="text-red-500">{errors.wholeSalePrice}</div>
                )}
              </div>
              <div className="w-full ml-2 mr-2">
                <Field name="wholeSalePriceTaxType">
                  {({ field, form }: any) => (
                    <Select
                      options={gst}
                      placeholder={"Select"}
                      value={values.wholeSalePriceTaxType}
                      onChange={(selectedOption) => {
                        form.setFieldValue(field.name, selectedOption); // Update Formik value
                      }}
                      styles={customStyles}
                      className="w-[100%] bg-[#E1F2FB]"
                    />
                  )}
                </Field>
                {errors.wholeSalePriceTaxType &&
                  touched.wholeSalePriceTaxType && (
                    <div className="text-red-500">
                      {errors.wholeSalePriceTaxType}
                    </div>
                  )}
              </div>

              <div className="w-full">
                <TextInput
                  name="quantity"
                  type="text"
                  label="quantity"
                  value={values.quantity}
                  onChange={handleChange("quantity")}
                  className="text-gray-800 text-base w-[100%]"
                  istouched={touched.quantity}
                />
                {touched.quantity && errors.quantity && (
                  <div className="text-red-500">{errors.quantity}</div>
                )}
              </div>
            </div>

            <div className="flex space-x-2 w-full mt-6 items-end">
              <div className="w-full">
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
              <div className="w-full">
                <TextInput
                  name="purchasePrice"
                  type="text"
                  label="Purchase Price"
                  value={values.purchasePrice}
                  onChange={handleChange("purchasePrice")}
                  className="text-gray-800 text-base w-full"
                  istouched={touched.purchasePrice}
                />
                {touched.purchasePrice && errors.purchasePrice && (
                  <div className="text-red-500">{errors.purchasePrice}</div>
                )}
              </div>

              <div className="w-full">
                <Field name="purchasePriceTaxType">
                  {({ field, form }: any) => (
                    <Select
                      options={gst}
                      placeholder={"Select"}
                      value={values.purchasePriceTaxType}
                      onChange={(selectedOption) => {
                        form.setFieldValue(field.name, selectedOption); // Update Formik value
                      }}
                      styles={customStyles}
                      className="w-[100%] bg-[#E1F2FB]"
                    />
                  )}
                </Field>

                {errors.purchasePriceTaxType &&
                  touched.purchasePriceTaxType && (
                    <div className="text-red-500">
                      {errors.purchasePriceTaxType}
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full mt-4">
              <button
                className="bg-[#FF8900] my-5 w-fit rounded-lg px-5 text-white py-2 flex items-center justify-center"
                onClick={() => handleSubmit()}
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? (
                  <FiLoader className="animate-spin mr-2" /> // Loader icon
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
