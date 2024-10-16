'use client';

import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import TextInput from "@/app/Components/Textinput";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetailForm } from "@/Redux/Firm/reducer";
import { useRouter } from 'next/navigation';

interface schema {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };
  const handleFormSubmit = async (
    values: schema,
    { setFieldError, setSubmitting }: any
  ) => {
    setSubmitting(true);
    try {
      const result = await signIn("login", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setFieldError("email", result?.error);
        toast.error(result.error);
      } else {
        const session = await getSession();
        if (session && session.user) {
          console.log(session.user, "session.user");
          dispatch(
            setUserDetailForm({
              FirstName: session.user.firstName,
              LastName: session.user.lastName,
              Email: session.user.email,
              PhoneNumber: session.user.id,
              Role: session.user.type,
            })
          );
        } 
        toast.success("Logged in successfully!");
        router.push("/pos");
      
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  // window.location.href = "/pos";
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
              password: "",
            }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, values, errors, touched }: any) => (
              <div className="flex items-center justify-center py-16">
                <div className="w-full rounded-xl  p-5">
                  <div className="">
                    <div className="text-3xl font-bold text-center">
                      Log In <br />
                      <span className="text-lg font-thin text-gray-500"></span>
                    </div>

                    <div className="py-4">
                      <div className="text-gray-400 text-xs px-1">
                        Email/Username
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
                          istouched={touched.email} className={undefined}                        />
                      </div>
                      {errors?.email && touched?.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                      <div className="text-gray-400 text-xs px- mt-5">
                        Password
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
                          } } className={undefined}                        />
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

                    <div className="flex justify-end  text-sm underline text-gray-400 hover:text-[#FF8900]">
                      <div className="cursor-pointer">
                        <Link href={"/auth/pos/forgetpassword"}>
                          <>Forgot password?</>
                        </Link>
                      </div>
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
                          <button type="submit">Log In</button>
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
                      If You Don't Have an Account?
                      <span className="text-sm text-blue-500 underline font-semibold hover:text-[#FF8900]">
                        <Link href={"/auth/pos/signup"}>
                          <>Sign Up</></Link>
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
