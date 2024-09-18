import TextInput from "@/app/Components/Textinput";
import React from "react";
import { Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectPartyForm } from "@/Redux/Parties/selectors";
import { updatePartyForm } from "@/Redux/Parties/reducer";
export default function Creditbalance() {
  const dispatch = useDispatch();
  const formState = useSelector(selectPartyForm);
  const handleChange = (field: string, value: any) => {
    dispatch(
      updatePartyForm({
        key: field,
        value: value,
      })
    );
  };
  const handleCheckboxChange = () => {
    handleChange("isChecked", !formState.isChecked);
  };
  return (
    <Formik
      initialValues={formState}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form Submitted", values);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit }) => (
        <>
          <div className="flex gap-5 my-5 w-full">
            <div className="w-[33%]">
              <TextInput
                name="openingBalance"
                type="text"
                placeholder=""
                label="Opening Balance"
                value={formState.openingBalance}
                onChange={(e) => handleChange("openingBalance", e.target.value)}
                className="text-gray-800 text-base w-[30%]"
                istouched={undefined}
              />
              <ErrorMessage
                name="openingBalance"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-[33%]">
              <TextInput
                name="asOfDate"
                type="date" // Set type to "date"
                placeholder=""
                label="As Of Date"
                value={formState.asOfDate} // Date value from Redux
                onChange={(e) => handleChange("asOfDate", e.target.value)} // Handle date change
                className="text-gray-800 text-base w-[30%]"
                istouched={undefined}
              />
              <ErrorMessage
                name="asOfDate"
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
                  formState.isChecked ? "text-[#808080]" : "text-[#fda80c]"
                }`}
              >
                No Limit
              </span>
              <label className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formState.isChecked}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                    id="creditlimit"
                  />
                  <div className="block h-8 w-16 rounded-full border border-[#808080] bg-white"></div>
                  <div
                    className={`dot bg-[#808080] absolute duration-100 top-1 h-6 w-6 rounded-full transition ${
                      formState.isChecked ? "right-1" : "left-1"
                    }`}
                  ></div>
                </div>
              </label>
              <span
                className={`${
                  formState.isChecked ? "text-[#fda80c]" : "text-[#808080]"
                }`}
              >
                Custom Limit
              </span>
            </div>
          </div>

          {formState.isChecked && (
            <div className="w-[33%] mb-5">
              <TextInput
                name="CreditLimit"
                type="text"
                placeholder="Enter Limit"
                value={formState.CreditLimit}
                onChange={(e) => handleChange("CreditLimit", e.target.value)}
                className="text-gray-800 text-base w-[30%]"
                label={""}
                istouched={undefined}
              />
            </div>
          )}
        </>
      )}
    </Formik>
  );
}
