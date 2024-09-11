import TextInput from "@/app/Components/Textinput";
import { addFirmUser } from "@/controller/posauth";

import { Formik } from "formik";
import { useSession } from "next-auth/react";
import React from "react";

export default function Adduserform() {
  const session = useSession();
  const token = session?.data?.uToken;
  const handleFormSubmit = async (values: any, actions: any) => {
    console.log("values>>>>>>>>>>>>>>>>>", values);
    try {
      actions.setSubmitting(true);
      const value = {
        firstName: values.FirstName,
        lastName: values.LastName,
        email: values.Email,
        mobile: values.phoneNumber,
        password: values.Password,
        confirmedPassword: values.ConfirmPassword,
        userRole: values.UserRole,
      };
      const res = await addFirmUser(value);
      console.log("res..........", res);
      actions.resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          FirstName: "",
          LastName: "",
          Email: "",
          phoneNumber: "",
          Password: "",
          ConfirmPassword: "",
          UserRole: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }: any) => (
          <>
            <div className="flex w-[100%] mb-6 flex-wrap gap-5 ">
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="FirstName"
                    type="text"
                    placeholder=""
                    label="First Name"
                    value={values?.FirstName}
                    onChange={handleChange("FirstName")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="LastName"
                    type="text"
                    placeholder=""
                    label="Last Name"
                    value={values?.LastName}
                    onChange={handleChange("LastName")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="Email"
                    type="email"
                    placeholder=""
                    label="Email"
                    value={values?.Email}
                    onChange={handleChange("Email")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="phoneNumber"
                    type="tel"
                    placeholder=""
                    label="phone Number"
                    value={values?.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="Password"
                    type="Password"
                    placeholder=""
                    label="Password"
                    value={values?.Password}
                    onChange={handleChange("Password")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="ConfirmPassword"
                    type="Password"
                    placeholder=""
                    label="ConfirmPassword"
                    value={values?.ConfirmPassword}
                    onChange={handleChange("ConfirmPassword")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="UserRole"
                    type="text"
                    placeholder=""
                    label="UserRole"
                    value={values?.UserRole}
                    onChange={handleChange("UserRole")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%] "
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="bg-[#FF8900] px-8 py-2 my-10 rounded-full text-lg text-white "
                onClick={handleSubmit}
              >
                Save
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
