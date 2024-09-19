import TextInput from "@/app/Components/Textinput";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectPartyForm } from "@/Redux/Parties/selectors";
import { updatePartyForm } from "@/Redux/Parties/reducer";
import * as Yup from "yup";
import { partiesFormInterface } from "@/Redux/Parties/types";

export default function Creditbalance({ setShowButton }: any) {
  const dispatch = useDispatch();
  const formState = useSelector(selectPartyForm);

  const handleChange = <K extends keyof partiesFormInterface>(
    field: K,
    value: partiesFormInterface[K]
  ) => {
    dispatch(updatePartyForm({ key: field, value }));
  };

  const handleCheckboxChange = () => {
    handleChange("isChecked", !formState.isChecked);
  };

  const validationSchema = Yup.object({
    openingBalance: Yup.number()
      .transform((value, originalValue) =>
        originalValue ? parseFloat(originalValue) : value
      )
      .typeError("Opening Balance must be a number")
      .required("Opening Balance is required"),
    asOfDate: Yup.string().required("As Of Date is required"),
    CreditLimit: Yup.number().when("isChecked", (isChecked, schema) => {
      return isChecked
        ? schema
            .transform((value, originalValue) =>
              originalValue ? parseFloat(originalValue) : value
            )
            .typeError("Opening Balance must be a number")
            .required("Opening Balance is required")
        : schema;
    }),
  });

  return (
    <Formik
      initialValues={formState}
      validationSchema={validationSchema}
      onSubmit={(values: partiesFormInterface) => {
        handleChange("openingBalance", values.openingBalance);
        handleChange("asOfDate", values.asOfDate);
        handleChange("isChecked", values.isChecked);
        handleChange("CreditLimit", values.CreditLimit);
        setShowButton(true);
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit}>
          <div className="flex gap-5 my-5 w-full">
            <div className="w-[33%]">
              <Field name="openingBalance">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    type="text"
                    placeholder=""
                    label="Opening Balance"
                    className="text-gray-800 text-base w-[30%]"
                  />
                )}
              </Field>
              <ErrorMessage
                name="openingBalance"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-[33%]">
              <Field name="asOfDate">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    type="date"
                    placeholder=""
                    label="As Of Date"
                    className="text-gray-800 text-base w-[30%]"
                  />
                )}
              </Field>
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
            <div className="flex gap-2 items-center py-2">
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
              <Field name="CreditLimit">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    type="text"
                    placeholder="Enter Limit"
                    className="text-gray-800 text-base w-[30%]"
                    label=""
                  />
                )}
              </Field>
              <ErrorMessage
                name="CreditLimit"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-[#fda80c] rounded-lg px-5 py-2 text-white"
          >
            Save Credit and Balance
          </button>
        </Form>
      )}
    </Formik>
  );
}
