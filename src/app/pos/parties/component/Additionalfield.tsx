import TextInput from "@/app/Components/Textinput";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectPartyForm } from "@/Redux/Parties/selectors";
import { setIsShowSaveButton, updatePartyForm } from "@/Redux/Parties/reducer";
import * as Yup from "yup";
import { partiesFormInterface } from "@/Redux/Parties/types";

export default function Additionalfield({ setShowButton }: any) {
  const dispatch = useDispatch();
  const formState = useSelector(selectPartyForm);

  // Ensure handleChange accepts keys of partiesFormInterface
  const handleChange = <K extends keyof partiesFormInterface>(field: K, value: partiesFormInterface[K]) => {
    dispatch(updatePartyForm({ key: field, value }));
  };

  const validationSchema = Yup.object({
    additionalFieldOne: Yup.string().required("Additional Field One is required"),
    additionalFieldTwo: Yup.string().required("Additional Field Two is required"),
    additionalFieldThree: Yup.string().required("Additional Field Three is required"),
    additionalfieldFour: Yup.string().required("Additional Field Four is required"),
    valueOne: Yup.boolean(),
    valueTwo: Yup.boolean(),
    valueThree: Yup.boolean(),
    valueFour: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={formState}
      validationSchema={validationSchema}
      onSubmit={(values: partiesFormInterface) => {
        // Update specific fields only
        handleChange("additionalFieldOne", values.additionalFieldOne);
        handleChange("additionalFieldTwo", values.additionalFieldTwo);
        handleChange("additionalFieldThree", values.additionalFieldThree);
        handleChange("additionalfieldFour", values.additionalfieldFour);
        handleChange("valueOne", values.valueOne);
        handleChange("valueTwo", values.valueTwo);
        handleChange("valueThree", values.valueThree);
        handleChange("valueFour", values.valueFour);

        // Optionally, you can perform other actions here, such as setting the show button state
        setShowButton(true);
      }}
    >
      {() => (
        <Form>
          {[{ field: "additionalFieldOne", value: "valueOne" },
            { field: "additionalFieldTwo", value: "valueTwo" },
            { field: "additionalFieldThree", value: "valueThree" },
            { field: "additionalfieldFour", value: "valueFour" }].map((item, index) => (
            <div key={index} className="my-4">
              {/* Text input */}
              <Field name={item.field}>
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    type="text"
                    placeholder=""
                    label={`Additional Field ${index + 1}`}
                    className="text-gray-800 text-base w-full"
                  />
                )}
              </Field>
              <ErrorMessage
                name={item.field}
                component="div"
                className="text-red-500 text-sm"
              />

              {/* Checkbox */}
              <div className="flex items-center gap-4 my-4">
                <label>{`Value ${index + 1}`}</label>
                <Field name={item.value}>
                  {({ field }: any) => (
                    <input
                      type="checkbox"
                      {...field}
                      checked={field.value}
                      onChange={(e) => handleChange(item.value as keyof partiesFormInterface, e.target.checked)}
                      className="w-[20px] h-[20px]"
                    />
                  )}
                </Field>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-[#fda80c] rounded-lg px-5 py-2 text-white"
          >
            Save Additional Fields
          </button>
        </Form>
      )}
    </Formik>
  );
}
