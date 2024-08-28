"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import TextInput from "@/app/Components/Textinput";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios, { AxiosError } from "axios";
import { BASE_MAIN } from "@/app/config/Constant";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

interface FormValues {
  email: string;
}

export default function ForgetpasswordPage() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();
  const handleVisible = () => {
    setVisible(!visible);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      setLoading(true);
      const data = {
        email: values.email,
      };
      const res = await axios.post(
        `${BASE_MAIN}loginAPI/forgotPassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        resetForm();
        router.push(
          `/auth/pos/otp?${createQueryString("email", values.email)}`
        );
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
              email: "",
            }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >
            <Form className="flex items-center justify-center py-16">
              <div className="w-full rounded-xl p-5">
                <div>
                  <div className="text-3xl font-bold text-center">
                    Forget Password <br />
                    <span className="text-lg font-thin text-gray-500"></span>
                  </div>
                  <div className="py-4">
                    <div className="text-gray-400 text-xs px-1">Email</div>
                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="jhondoe@gmail.com"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-xs text-red-500"
                      />
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
