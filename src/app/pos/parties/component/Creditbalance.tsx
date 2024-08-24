import TextInput from "@/app/Components/Textinput";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  openingbalance: Yup.number().required("Opening Balance is required"),
  creditlimit: Yup.number(),
});
export default function Creditbalance({ creditbalancevalue }: any) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <Formik
        initialValues={{
          openingbalance: "",
          date: "",
          CreditLimit: "",
          isChecked: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values:any, { setSubmitting }) => {
          creditbalancevalue(values);
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          handleSubmit,
          values,
          handleChange,
          touched,
          errors,
        }) => (
          <>
            <div className="flex gap-5 my-5 w-full">
              <div className="w-[33%]">
                <TextInput
                  name="openingbalance"
                  type="text"
                  placeholder=""
                  label="Opening Balance"
                  value={values.openingbalance}
                  onChange={handleChange("openingbalance")}
                  onBlur={handleChange("openingbalance")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
                <ErrorMessage
                  name="openingbalance"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-[33%]">
                <TextInput
                  name="date"
                  type="date"
                  placeholder=""
                  label="As Of Dates"
                  value={values.date}
                  onChange={handleChange("date")}
                  onBlur={handleChange("date")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-[#808080]">
              <label htmlFor="creditlimit" className="text-[#808080]">
                Credit Limit
              </label>
              <div className=" flex gap-2 items-center py-2">
                <span
                  className={`${
                    isChecked == true ? "text-[#808080]" : "text-[#fda80c]"
                  }`}
                >
                  No Limit
                </span>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                      id="creditlimit"
                    />
                    <div className="block h-8 w-16 rounded-full border border-[#808080] bg-white"></div>
                    <div
                      className={`dot bg-[#808080] absolute duration-100 top-1 h-6 w-6 rounded-full transition ${
                        isChecked == true ? "right-1" : "left-1"
                      }`}
                    ></div>
                  </div>
                </label>
                <span
                  className={`${
                    isChecked == true ? "text-[#fda80c]" : "text-[#808080]"
                  }`}
                >
                  Custom Limit
                </span>
              </div>
            </div>
            {isChecked && (
              <div className="w-[33%] mb-5">
                <TextInput
                  name="CreditLimit"
                  type="text"
                  placeholder="Enter Limit"
                  label=""
                  value={values.CreditLimit}
                  onChange={handleChange("CreditLimit")}
                  onBlur={handleChange("CreditLimit")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
            )}
            <div
              className="bg-[#fda80c] rounded-lg items-end px-5 w-fit text-white py-2"
              onClick={() => handleSubmit()}
            >
              Save Credit and Balance
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
