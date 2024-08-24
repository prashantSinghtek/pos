"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import TextInput from "@/app/Components/Textinput";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_MAIN } from "@/app/config/Constant";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phonenumber: Yup.string().required("Phone number is required"),
});

interface schema {
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

  const [errors, setError] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleFormSubmit = async (
    values: schema,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("avleeeee====>>>>", values);
    try {
      setSubmitting(true);
      setLoading(true);
      let data = {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        mobile: values.phonenumber,
        password: values.password,
        confirmedPassword: values.confirmpassword,
      };
      console.log("data", data);
      const res = await axios.post(`${BASE_MAIN}loginAPI/createUser`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("====response message===>>>", res);
      resetForm();
    } catch (err: any) {
      console.log("error msgggg", err);
      setError(true);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const words = `sign in to continue!`;

  return (
    <div className="w-screen ">
      <div className="flex bg-white">
        <div className="w-1/2 h-full">
          <img src="/singup.png" alt="" className="h-full" />
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
            validationSchema={""}
          >
            {({ handleChange, handleSubmit, values, errors, touched }: any) => (
              <div className="flex items-center justify-center py-10">
                <div className="w-full rounded-xl  p-5">
                  <div className="">
                    <div className="text-3xl font-bold text-center">
                      Sign Up <br />
                      <span className="text-lg font-thin text-gray-500"></span>
                    </div>

                    <div className="py-4 flex gap-5 w-full">
                      <div className="w-[50%]">
                        <div className="text-gray-400 text-xs px-1">
                          First Name
                        </div>
                        <div className="w-[100%]">
                          <TextInput
                            name="firstname"
                            type="text"
                            placeholder="First Name"
                            label=""
                            value={values.firstname}
                            onChange={handleChange("firstname")}
                            onBlur={handleChange("firstname")}
                            istouched={touched.firstname}
                          />
                        </div>
                        {errors?.firstname && touched?.firstname && (
                          <p className="text-xs text-red-500">
                            {errors.firstname}
                          </p>
                        )}
                      </div>
                      <div className="w-[50%]">
                        <div className="text-gray-400 text-xs  px-1">
                          Last Name
                        </div>
                        <div className=" relative w-[100%]">
                          <TextInput
                            name="lastname"
                            type="text"
                            placeholder="Last Name"
                            label=""
                            value={values.lastname}
                            onChange={handleChange("lastname")}
                            onBlur={handleChange("lastname")}
                            istouched={touched.lastname}
                          />
                        </div>
                        {errors?.lastname && touched?.lastname && (
                          <p className="text-xs text-red-500">
                            {errors.lastname}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="pb-4">
                      <div className="text-gray-400 text-xs  px-1">Email</div>
                      <div className=" relative">
                        <TextInput
                          name="email"
                          type="email"
                          placeholder="jhon.deo@gmail.com"
                          label=""
                          value={values.email}
                          onChange={handleChange("email")}
                          onBlur={handleChange("email")}
                          istouched={touched.email}
                        />
                      </div>
                      {errors?.email && touched?.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-gray-400 text-xs  px-1">
                        Phone Number
                      </div>
                      <div className=" relative">
                        <TextInput
                          name="phonenumber"
                          type="tel"
                          placeholder="phone number"
                          label=""
                          value={values.phonenumber}
                          onChange={handleChange("phonenumber")}
                          onBlur={handleChange("phonenumber")}
                          istouched={touched.phonenumber}
                        />
                      </div>
                      {errors?.phonenumber && touched?.phonenumber && (
                        <p className="text-xs text-red-500">
                          {errors.phonenumber}
                        </p>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-gray-400 text-xs  px-1">
                        Create Password
                      </div>
                      <div className=" relative">
                        <TextInput
                          name="password"
                          type={visible ? "text" : "password"}
                          placeholder="*********"
                          label=""
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
                      </div>
                      {errors?.password && touched?.password && (
                        <p className="text-xs text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-gray-400 text-xs  px-1">
                        Confirm Password
                      </div>
                      <div className=" relative">
                        <TextInput
                          name="confirmpassword"
                          type={visible ? "text" : "password"}
                          placeholder="*********"
                          label=""
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
                      </div>
                      {errors?.confirmpassword && touched?.confirmpassword && (
                        <p className="text-xs text-red-500">
                          {errors.confirmpassword}
                        </p>
                      )}
                    </div>

                    {loading ? (
                      <div className="bg-slate-700 mt-8 mb-4 rounded-xl h-10 w-86 flex justify-center items-center animate-pulse">
                        Submitting
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div
                          className="px-10 py-2 w-fit font-semibold  mt-8 mb-4  text-white text-center hover:bg-orange-600 bg-[#FF8900] cursor-pointer rounded-full"
                          onClick={() => handleSubmit()}
                        >
                          <button type="submit">Sign Up</button>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-5 justify-center items-center">
                      <div className="w-1/4 h-[2px]  bg-gray-300"></div>
                      <div className="text-sm text-gray-400">
                        or Log in with
                      </div>
                      <div className="w-1/4 h-[2px]  bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center pt-5 pb-3">
                      <AiFillGooglePlusCircle size={30} />
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                      Already have an account ?
                      <span className="text-sm text-blue-500 underline font-semibold hover:text-[#FF8900]">
                        <Link href={"/auth/pos"}>
                          <>Log In</>
                        </Link>
                      </span>
                    </div>
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
