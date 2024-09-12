"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import TextInput from "@/app/Components/Textinput";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import axios from "axios";
import { BASE_MAIN } from "@/app/config/Constant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

interface Schema {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  confirmpassword: string;
}

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleFormSubmit = async (
    values: Schema,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      setLoading(true);
      const data = {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        mobile: values.phonenumber,
        password: values.password,
        confirmedPassword: values.confirmpassword,
      };
      const res: any = await axios.post(
        `${BASE_MAIN}loginAPI/createUser`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push(
          `/auth/pos/otpVerification?email=${values.email}&firstname=${values.firstname}&lastname=${values.lastname}&phonenumber=${values.phonenumber}&password=${values.password}&confirmpassword=${values.confirmpassword}`
        );
        // resetForm();
      } else { 
        toast.error("Failed to create user, please try again.");
      }
    } catch (err: any) {
      toast.error("An error occurred during sign-up. Please try again.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen">
      <div className="flex bg-white">
        <div className="w-1/2 h-full">
          <img
            src="/singup.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 px-20">
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              phonenumber: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }: any) => (
              <div className="flex items-center justify-center py-10">
                <div className="w-full rounded-xl p-5">
                  <div className="text-3xl font-bold text-center">Sign Up</div>

                  <div className="py-4 flex gap-5 w-full">
                    <div className="w-[50%]">
                      <div className="text-gray-400 text-xs px-1">
                        First Name
                      </div>
                      <TextInput
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        value={values.firstname}
                        onChange={handleChange("firstname")}
                        onBlur={handleChange("firstname")}
                        istouched={touched.firstname}
                        label={""}
                      />
                      {errors.firstname && touched.firstname && (
                        <p className="text-xs text-red-500">
                          {errors.firstname}
                        </p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <div className="text-gray-400 text-xs px-1">
                        Last Name
                      </div>
                      <TextInput
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                        value={values.lastname}
                        onChange={handleChange("lastname")}
                        onBlur={handleChange("lastname")}
                        istouched={touched.lastname}
                        label={""}
                      />
                      {errors.lastname && touched.lastname && (
                        <p className="text-xs text-red-500">
                          {errors.lastname}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pb-4">
                    <div className="text-gray-400 text-xs px-1">Email</div>
                    <TextInput
                      name="email"
                      type="email"
                      placeholder="john.doe@gmail.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleChange("email")}
                      istouched={touched.email}
                      label={""}
                    />
                    {errors.email && touched.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="pb-4">
                    <div className="text-gray-400 text-xs px-1">
                      Phone Number
                    </div>
                    <TextInput
                      name="phonenumber"
                      type="tel"
                      placeholder="Phone Number"
                      value={values.phonenumber}
                      onChange={handleChange("phonenumber")}
                      onBlur={handleChange("phonenumber")}
                      istouched={touched.phonenumber}
                      label={""}
                    />
                    {errors.phonenumber && touched.phonenumber && (
                      <p className="text-xs text-red-500">
                        {errors.phonenumber}
                      </p>
                    )}
                  </div>

                  <div className="pb-4">
                    <div className="text-gray-400 text-xs px-1">
                      Create Password
                    </div>
                    <TextInput
                      name="password"
                      type={visible ? "text" : "password"}
                      placeholder="*********"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleChange("password")}
                      istouched={touched.password}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      label={""}
                    />
                    <div
                      className="absolute right-3 top-5 cursor-pointer"
                      onClick={handleVisible}
                    >
                      {visible ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="pb-4">
                    <div className="text-gray-400 text-xs px-1">
                      Confirm Password
                    </div>
                    <TextInput
                      name="confirmpassword"
                      type={visible ? "text" : "password"}
                      placeholder="*********"
                      value={values.confirmpassword}
                      onChange={handleChange("confirmpassword")}
                      onBlur={handleChange("confirmpassword")}
                      istouched={touched.confirmpassword}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      label={""}
                    />
                    <div
                      className="absolute right-3 top-5 cursor-pointer"
                      onClick={handleVisible}
                    >
                      {visible ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </div>
                    {errors.confirmpassword && touched.confirmpassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmpassword}
                      </p>
                    )}
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 text-center">{error}</p>
                  )}

                  {loading ? (
                    <div className="bg-slate-700 mt-8 mb-4 rounded-xl h-10 flex justify-center items-center animate-pulse">
                      Submitting
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-10 py-2 w-fit font-semibold mt-8 mb-4 text-white text-center bg-[#FF8900] rounded-full hover:bg-orange-600 cursor-pointer"
                        onClick={() => handleSubmit()}
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </button>
                    </div>
                  )}

                  <div className="flex gap-5 justify-center items-center">
                    <div className="w-1/4 h-[2px] bg-gray-300"></div>
                    <div className="text-sm text-gray-400">or Log in with</div>
                    <div className="w-1/4 h-[2px] bg-gray-300"></div>
                  </div>
                  <div className="flex justify-center pt-5 pb-3">
                    <AiFillGooglePlusCircle size={30} />
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                    Already have an account?
                    <span className="text-sm text-blue-500 underline font-semibold hover:text-[#FF8900]">
                      <Link href={"/auth/pos"}>Log In</Link>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
