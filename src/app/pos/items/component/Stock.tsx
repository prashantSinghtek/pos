import TextInput from "@/app/Components/Textinput";
import { Formik } from "formik";
import React from "react";

export default function Stock({setStockvalue}:any) {
  const submitForm = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);
      setStockvalue(values)
      resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        Openingqty: "",
        Atprice: "",
        date: "",
        minstock: "",
        Location: "",
      }}
      onSubmit={submitForm}
      validationSchema={""}
    >
      {({ handleChange, handleSubmit, values, errors, touched }: any) => {
        return (
          <div>
            <div className="flex flex-wrap gap-5 my-5 w-full">
              <div className="w-[30%]">
                <TextInput
                  name="Openingqty"
                  type="text"
                  placeholder=""
                  label="Opening Qauntity"
                  value={values.Openingqty}
                  onChange={handleChange("Openingqty")}
                  onBlur={handleChange("Openingqty")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="Atprice"
                  type="text"
                  placeholder=""
                  label="At Price"
                  value={values.Atprice}
                  onChange={handleChange("Atprice")}
                  onBlur={handleChange("Atprice")}
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="date"
                  type="date"
                  placeholder=""
                  label="As Of Date"
                  istouched={"Touch"}
                  value={values.date}
                  onChange={handleChange("date")}
                  onBlur={handleChange("date")}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="minstock"
                  type="text"
                  placeholder=""
                  label="Min Stock To Maintain"
                  istouched={"Touch"}
                  value={values.minstock}
                  onChange={handleChange("minstock")}
                  onBlur={handleChange("minstock")}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
              <div className="w-[30%]">
                <TextInput
                  name="Location"
                  type="text"
                  placeholder=""
                  label="Location"
                  istouched={"Touch"}
                  value={values.Location}
                  onChange={handleChange("Location")}
                  onBlur={handleChange("Location")}
                  className="text-gray-800 text-base w-[30%]"
                />
              </div>
            </div>
            <div
              className="bg-[#FF8900] my-5 w-fit rounded-lg px-5 text-white py-2"
              onClick={() => handleSubmit()}
            >
              Save
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

