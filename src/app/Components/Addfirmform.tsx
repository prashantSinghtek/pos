"use client";
import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import TextInput from "./Textinput";
import { IoMdAdd } from "react-icons/io";
import Textarea from "./Textarea";
import { Formik } from "formik";
import pos_controller from "@/controller/posauth";
import { useSession } from "next-auth/react";
import * as Yup from "yup";

export default function Addfirmform() {
  const [moreinformation, setMoreinformation] = useState(false);
  const [fieldValue, setFieldValue] = useState<File[]>([]);
  const [fieldValues, setFieldValues] = useState<File[]>([]);
  const [initialValues, setInitialValues] = useState({
    Businessname: "",
    Phonenumber: "",
    GSTIN: "",
    Email: "",
    BusinessType: "",
    BusinessCategory: "",
    PinCode: "",
    state: "",
    billingaddress: "",
    Signature: "",
    desc: "",
    logo: "",
  });
  
  const session = useSession();
  const token = session?.data?.user?.image;
  const auth = new pos_controller();
  const firmid = localStorage.getItem("selectedStore");

  useEffect(() => {
    auth
      .myCompany(token, firmid)
      .then((res) => {
        setInitialValues({
          Businessname: res.data?.buisnessName || "",
          Phonenumber: res.data?.phoneNumber || "",
          GSTIN: res.data?.gstNumber || "",
          Email: res.data?.email || "",
          BusinessType: res.data?.buisnessType || "",
          BusinessCategory: res.data?.buisnessCategory || "",
          PinCode: res.data?.pinCode || "",
          state: res.data?.state || "",
          billingaddress: res.data?.buisnessAddress || "",
          Signature: res.data?.signaturePath || "",
          desc: "",
          logo: res.data?.logoPath || "",
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, firmid]);

  const handleImageChange = (newFiles: FileList | null) => {
    if (newFiles) {
      setFieldValue(Array.from(newFiles));
    }
  };

  const handleImageChanges = (newFiles: FileList | null) => {
    if (newFiles) {
      setFieldValues(Array.from(newFiles));
    }
  };

  const validationSchema = Yup.object().shape({
    Businessname: Yup.string().required("Business name is required").max(100, "Business name cannot exceed 100 characters"),
    Phonenumber: Yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number is invalid"),
    GSTIN: Yup.string().required("GSTIN is required").matches(/^([0-9]{2})([A-Z]{5})([0-9]{4})([A-Z]{1})([1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})$/, "GSTIN is invalid"),
    Email: Yup.string().required("Email is required").email("Email is invalid"),
    BusinessType: Yup.string().required("Business type is required"),
    BusinessCategory: Yup.string().required("Business category is required"),
    PinCode: Yup.string().required("Pincode is required").matches(/^\d{6}$/, "Pincode is invalid"),
    state: Yup.string().required("State is required"),
    billingaddress: Yup.string().required("Billing address is required"),
    Signature: Yup.mixed().required("Signature is required"),
    desc: Yup.string().required("Description is required").max(500, "Description cannot exceed 500 characters"),
    logo: Yup.mixed().required("Logo is required"),
  });

  const handleFormSubmit = async (values: any, actions: any) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      actions.setSubmitting(true);
      const formData = new FormData();
      formData.append("businessName", values.Businessname);
      formData.append("phoneNumber", values.Phonenumber);
      formData.append("gstNumber", values.GSTIN);
      formData.append("email", values.Email);
      formData.append("businessType", values.BusinessType);
      formData.append("businessCategory", values.BusinessCategory);
      formData.append("pinCode", values.PinCode);
      formData.append("state", values.state);
      formData.append("businessAddress", values.billingaddress);
      formData.append("businessDescription", values.desc);
      fieldValue.forEach((file: File) => {
        formData.append("logoPath", file);
      });
      fieldValues.forEach((file: File) => {
        formData.append("signaturePath", file);
      });
      const res = await firmid ? auth.Updatefirm(formData, firmid, token) : auth.Addfirm(formData, token);
      actions.resetForm();
    } catch (err: any) {
      if (err.inner) {
        const validationErrors = err.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        actions.setErrors(validationErrors);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  // update firm 
  ;
  return (
    <div className="mx-10">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
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
        }) => (
          <>
            <div className="flex flex-col justify-center items-center text-[#FF7006]">
              <div className="bg-[#FEE8E1] text-[#FF7006] p-12 rounded-full text-center relative">
                <img
                  src={`http://192.168.100.215:5050${initialValues.logo}`}
                  alt=""
                />
                <label htmlFor="logoUpload" className="cursor-pointer">
                  <input
                    name="logo"
                    title="logo"
                    type="file"
                    id="logoUpload"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files)}
                  />
                  <FiUploadCloud size={40} />
                </label>
              </div>
              <div className="py-4">Add Logo</div>
            </div>
            <div className="py-5">Add Firm</div>
            <div className="flex w-[100%] mb-6 flex-wrap gap-5">
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="Businessname"
                    type="text"
                    placeholder=""
                    label="Business Name"
                    value={values.Businessname}
                    onChange={handleChange("Businessname")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%]"
                  />
                  {errors.Businessname && (
                    <p className="mt-2 text-red-600 text-sm">{errors.Businessname}</p>
                  )}
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="Phonenumber"
                    type="tel"
                    placeholder=""
                    label="Phone Number"
                    value={values.Phonenumber}
                    onChange={handleChange("Phonenumber")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%]"
                  />
                  {errors.Phonenumber && (
                    <p className="mt-2 text-red-600 text-sm">{errors.Phonenumber}</p>
                  )}
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="GSTIN"
                    type="text"
                    placeholder=""
                    label="GST IN"
                    value={values.GSTIN}
                    onChange={handleChange("GSTIN")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%]"
                  />
                  {errors.GSTIN && (
                    <p className="mt-2 text-red-600 text-sm">{errors.GSTIN}</p>
                  )}
                </div>
              </div>
              <div className="w-[30%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="Email"
                    type="email"
                    placeholder=""
                    label="Email"
                    value={values.Email}
                    onChange={handleChange("Email")}
                    istouched={"Touch"}
                    className="text-gray-800 text-base w-[100%]"
                  />
                  {errors.Email && (
                    <p className="mt-2 text-red-600 text-sm">{errors.Email}</p>
                  )}
                </div>
              </div>

              <div className={`w-[30%] flex gap-1 items-end ${moreinformation ? "hidden" : ""}`}>
                <div
                  className="px-3 flex gap-2 items-center py-2 text-center text-[#2D9CDB] cursor-pointer"
                  onClick={() => setMoreinformation(!moreinformation)}
                >
                  <IoMdAdd />
                  More Information
                </div>
              </div>
            </div>
            {moreinformation && (
              <div>
                <div className="py-5">Business Details</div>
                <div className="flex w-[100%] mb-6 flex-wrap gap-5">
                  <div className="w-[30%] flex gap-2 items-end">
                    <div className="w-[70%]">
                      <TextInput
                        name="BusinessType"
                        type="text"
                        placeholder=""
                        label="Business Type"
                        value={values.BusinessType}
                        onChange={handleChange("BusinessType")}
                        istouched={"Touch"}
                        className="text-gray-800 text-base w-[100%]"
                      />
                      {errors.BusinessType && (
                        <p className="mt-2 text-red-600 text-sm">{errors.BusinessType}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-[30%] flex gap-2 items-end">
                    <div className="w-[70%]">
                      <TextInput
                        name="BusinessCategory"
                        type="text"
                        placeholder=""
                        label="Business Category"
                        value={values.BusinessCategory}
                        onChange={handleChange("BusinessCategory")}
                        istouched={"Touch"}
                        className="text-gray-800 text-base w-[100%]"
                      />
                      {errors.BusinessCategory && (
                        <p className="mt-2 text-red-600 text-sm">{errors.BusinessCategory}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-[30%] flex gap-2 items-end">
                    <div className="w-[70%]">
                      <TextInput
                        name="PinCode"
                        type="text"
                        placeholder=""
                        label="PinCode"
                        istouched={"Touch"}
                        value={values.PinCode}
                        onChange={handleChange("PinCode")}
                        className="text-gray-800 text-base w-[100%]"
                      />
                      {errors.PinCode && (
                        <p className="mt-2 text-red-600 text-sm">{errors.PinCode}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-[30%] flex gap-2 items-end">
                    <div className="w-[70%]">
                      <TextInput
                        name="state"
                        type="text"
                        placeholder=""
                        label="state"
                        value={values.state}
                        onChange={handleChange("state")}
                        istouched={"Touch"}
                        className="text-gray-800 text-base w-[100%]"
                      />
                      {errors.Businessname && (
                        <p className="mt-2 text-red-600 text-sm">{errors.Businessname}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-[30%] flex gap-2 items-end">
                    <div className="w-[70%]">
                      <TextInput
                        name="billingaddress"
                        type="text"
                        placeholder=""
                        label="Billing Address"
                        value={values.billingaddress}
                        onChange={handleChange("billingaddress")}
                        istouched={"Touch"}
                        className="text-gray-800 text-base w-[100%]"
                      />
                      {errors.billingaddress && (
                        <p className="mt-2 text-red-600 text-sm">{errors.billingaddress}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-[30%] flex gap-2 items-end">
                    <div className="w-[70%] flex-col space-y-2">
                      <div className="text-gray-500">Add Signature</div>
                      <label htmlFor="fileInput" className="sr-only">
                        Choose File
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        name="Signature"
                        onChange={(e) => handleImageChanges(e.target.files)}
                        className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]"
                        aria-labelledby="fileInput"
                      />
                      {/* {errors.Businessname && (
                    <p className="mt-2 text-red-600 text-sm">{errors.Businessname}</p>
                  )} */}
                    </div>
                  </div>
                </div>
                <div>
                  <Textarea
                    name="desc"
                    type="desc"
                    placeholder=""
                    label="Business Description"
                    istouched={"Touch"}
                    value={values.desc}
                    onChange={handleChange("desc")}
                  />
                  {errors.desc && (
                    <p className="mt-2 text-red-600 text-sm">{errors.desc}</p>
                  )}
                </div>
              </div>
            )}
            {moreinformation &&
              <div className="flex justify-center cursor-pointer">
                <div
                  className="bg-[#FF8900] px-8 py-2 my-10 rounded-full text-lg text-white"
                  onClick={() => handleSubmit()}
                >
                  {firmid ? "Update" : "Save"}
                </div>
              </div>
            }
          </>

        )}
      </Formik>
    </div>
  );
}
