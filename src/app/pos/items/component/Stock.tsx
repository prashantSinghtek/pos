import TextInput from "@/app/Components/Textinput";
import { updateProductForm } from "@/Redux/Item/reducer";
import { selectProductForm } from "@/Redux/Item/selectors";
import { Formik } from "formik";
import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"; // Import Yup for validation

export default function Stock() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    openingQuantity: Yup.number().required("Opening Quantity is required"),
    atPrice: Yup.number().required("At Price is required"),
    asOfDate: Yup.date().required("As Of Date is required"),
    minStockToMaintain: Yup.number().required(
      "Min Stock To Maintain is required"
    ),
    location: Yup.string().required("Location is required"),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitForm = async (values: any) => {
    console.log("Form values:", values);
    try {
      setIsSubmitting(true);
      Object.entries(values).forEach(([key, value]) => {
        dispatch(updateProductForm({ key: key, value: value }));
      });
      // resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formData = useSelector(selectProductForm);

  return (
    <Formik
      initialValues={{
        openingQuantity: formData.openingQuantity,
        atPrice: formData.atPrice,
        asOfDate: formData.asOfDate,
        minStockToMaintain: formData.minStockToMaintain,
        location: formData.location,
      }}
      onSubmit={submitForm}
      validationSchema={validationSchema} // Pass the validation schema here
    >
      {({ handleChange, handleSubmit, values, errors, touched }: any) => {
        return (
          <div>
            <div className="flex flex-wrap gap-5 my-5 w-full">
              <div className="w-[30%]">
                <TextInput
                  name="openingQuantity"
                  type="text"
                  placeholder=""
                  label="Opening Quantity"
                  value={values.openingQuantity}
                  onChange={handleChange("openingQuantity")}
                  onBlur={handleChange("openingQuantity")}
                  istouched={touched.openingQuantity}
                  error={errors.openingQuantity}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="atPrice"
                  type="text"
                  placeholder=""
                  label="At Price"
                  value={values.atPrice}
                  onChange={handleChange("atPrice")}
                  onBlur={handleChange("atPrice")}
                  istouched={touched.atPrice}
                  error={errors.atPrice}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="asOfDate"
                  type="date"
                  placeholder=""
                  label="As Of Date"
                  istouched={touched.asOfDate}
                  value={values.asOfDate}
                  onChange={handleChange("asOfDate")}
                  onBlur={handleChange("asOfDate")}
                  error={errors.asOfDate}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="minStockToMaintain"
                  type="text"
                  placeholder=""
                  label="Min Stock To Maintain"
                  istouched={touched.minStockToMaintain}
                  value={values.minStockToMaintain}
                  onChange={handleChange("minStockToMaintain")}
                  onBlur={handleChange("minStockToMaintain")}
                  error={errors.minStockToMaintain}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="location"
                  type="text"
                  placeholder=""
                  label="Location"
                  istouched={touched.location}
                  value={values.location}
                  onChange={handleChange("location")}
                  onBlur={handleChange("location")}
                  error={errors.location}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
            </div>

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
        );
      }}
    </Formik>
  );
}
