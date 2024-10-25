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
  password: Yup.string()
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface schema {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function ResetpasswordPage() {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);


    const handleVisible = () => {
        setVisible(!visible);
    };
    const handleFormSubmit = async (
        values: schema,
        { setFieldError, setSubmitting,resetForm }: any
    ) => {
        try {
            setSubmitting(true);
            setLoading(true);
            let data = {
              email: values.email,
              password: values.password,
              confirmedPassword: values.confirmPassword,
            };
            const res = await axios.post(
              `${BASE_MAIN}loginAPI/resetPassword`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("====response message===>>>", res);
            resetForm();
           
          } catch (err: any) {
            console.log("error msgggg", err);
          } finally {
            setSubmitting(false);
            setLoading(false);
          }
    };
 

    return (
        <div className="w-screen h-screen">

            <div className='flex bg-white'>
                <div className='w-1/2'>

                    <img src="/loginpage.png" alt="" />

                </div>
                <div className="w-1/2 px-20">

                    <div className="mt-14"><IoArrowBackCircleOutline color="grey" size={40} className="cursor-pointer" /></div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            confirmPassword:"",
                        }}
                        onSubmit={handleFormSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }: any) => (
                            <div className="flex items-center justify-center py-16">
                                <div className="w-full rounded-xl  p-5">
                                    <div className="">

                                        <div className="text-3xl font-bold text-center">
                                            Reset Password <br />
                                            <span className="text-lg font-thin text-gray-500">

                                            </span>
                                        </div>

                                        <div className="py-4">
                                            <div className="text-gray-400 text-xs px-1">
                                                Email
                                            </div>
                                            <div>
                                                <TextInput
                                                    name="email"
                                                    type="email"
                                                    placeholder="jhondoe@gmail.com"
                                                    label=""
                                                    value={values.email}
                                                    onChange={handleChange("email")}
                                                    onBlur={handleChange("email")}
                                                    istouched={touched.email} className={undefined}                                                />
                                            </div>
                                            {errors?.email && touched?.email && (
                                                <p className="text-xs text-red-500">{errors.email}</p>
                                            )}

                                        </div>
                                        <div className="pb-4">

                                            <div className="text-gray-400 text-xs  px-1">
                                                New Password
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
                                                    } } className={undefined}                                                />
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
                                                <p className="text-xs text-red-500">{errors.password}</p>
                                            )}

                                        </div>
                                        <div className="pb-4">

                                            <div className="text-gray-400 text-xs  px-1">
                                                Confirm Password
                                            </div>
                                            <div className=" relative">
                                                <TextInput
                                                    name="confirmPassword"
                                                    type={visible ? "text" : "password"}
                                                    placeholder="*********"
                                                    label=""
                                                    value={values.confirmPassword}
                                                    onChange={handleChange("confirmPassword")}
                                                    onBlur={handleChange("confirmPassword")}
                                                    istouched={touched.confirmPassword}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            handleSubmit();
                                                        }
                                                    } } className={undefined}                                                />
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
                                            {errors?.confirmPassword && touched?.confirmPassword && (
                                                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
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
                                                    onClick={handleSubmit}
                                                >
                                                    <button type="submit">Submit</button>
                                                </div>
                                            </div>
                                        )}

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