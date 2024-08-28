"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import TextInput from "@/app/Components/Textinput";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BASE_MAIN } from "@/app/config/Constant";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";


const validationSchema = Yup.object().shape({
  otp: Yup.string().required("OPT is required"),
});

interface schema {
  otp: string;
}

export default function Otppage() {
    const searchParams = useSearchParams()
    const search = searchParams.get('email')
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
const router = useRouter()

  const handleVisible = () => {
    setVisible(!visible);
  };



  const handleFormSubmit = async (
    values: schema,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      setLoading(true);
      let data = {
        email: search,
        otp: values.otp,
      };
      const res = await axios.post(
        `${BASE_MAIN}loginAPI/otpVerification`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("====response message===>>>", res);
      resetForm();
      router.push("/auth/pos/resetpassword")
    } catch (err: any) {
      console.log("error msgggg", err);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex bg-white">
        <div className="w-1/2">
          <img src="/loginpage.png" alt="" />
        </div>
        <div className="w-1/2 px-20">
          <div className="mt-14">
            <IoArrowBackCircleOutline
              color="grey"
              size={40}
              className="cursor-pointer"
            />
          </div>
          <Formik
            initialValues={{
                otp: "",
            
            }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >
            <Form className="flex items-center justify-center py-16">
              <div className="w-full rounded-xl p-5">
                <div>
                  <div className="text-3xl font-bold text-center">
                    OTP Verification<br />
                    <span className="text-lg font-thin text-gray-500"></span>
                  </div>
                  <div className="py-4">
                    <div className="text-gray-400 text-xs px-1">OTP</div>
                    <div>
                      <Field
                        name="otp"
                        type="otp"
                        placeholder="Enter OTP"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                      <ErrorMessage name="otp" component="div" className="text-xs text-red-500" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-10 py-2 w-fit font-semibold mt-8 mb-4 text-white text-center hover:bg-orange-600 bg-[#FF8900] cursor-pointer rounded-full"
                      disabled={loading}
                    >
                      {loading ? "Submitting" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
