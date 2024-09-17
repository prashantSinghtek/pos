  import Textarea from "@/app/Components/Textarea";
  import TextInput from "@/app/Components/Textinput";
  import React, { useEffect, useState } from "react";
  import { IoMdAdd } from "react-icons/io";
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import Select from "react-select";

  import { useSession } from "next-auth/react";
  import { getState } from "@/controller/posauth";

  const validationSchema = Yup.object().shape({
    Gsttype: Yup.string(),
    State: Yup.string(),
    Email: Yup.string().email("Email is not valid"),
    Billingaddress: Yup.string(),
  });

  export default function Gstaddress({ Gstaddressvalues }: any) {
    const [showenable, setShowenable] = useState(false);
    const session = useSession();
    const token = localStorage.getItem("authToken");
    const [selectedstate, setSelectedstate] = useState<any>();
    const [data, setData] = useState<any>([]);
    const [touchedstate, setTouchedstate] = useState({ state: false })
    const [selectedgsttype, setSelectedgsttype] = useState<any>();
    const [gsttype, setGsttype] = useState<any>(["unregistered/consumer", "registered business regular", "registered business composition"]);
    const [touchedgsttype, setTouchedgsttype] = useState({ state: false })
    const gsttypeoption = gsttype?.map((option: any) => ({
      value: option.toUpperCase(),
      label: option.toUpperCase(),
    }));

    const stateoption = data?.map((option: any) => ({
      value: option?.name.toUpperCase(),
      label: option?.name.toUpperCase(),
    }));

    const handleChangedgsttype = (selectedOption: any) => {
      setSelectedgsttype(selectedOption);
    };

    const handleChangedstate = (selectedOption: any) => {
      setSelectedstate(selectedOption);
    };

    const customStyles = {
      control: (provided: any) => ({
        ...provided,
        height: "46px", // Set your desired height here
        minHeight: "46px", // Ensure the minimum height is the same as the height
        fontSize: "0.875rem", // Equivalent to text-sm
        fontWeight: "500", // Equivalent to font-medium
        outline: "none", // Equivalent to outline-none
      }),
    };

    useEffect(() => {
      getState().then((res) => {
        setData(res?.data);
      }).catch((err) => {
        console.log(err);
      });
    }, [token]);

    return (
      <div>
        <Formik
          initialValues={{
            Gsttype: "",
            State: "",
            Email: "",
            Billingaddress: "",
            Shippingaddress: "",
            showenable: showenable,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const value = {
              Gsttype: selectedgsttype?.value,
              State: selectedstate?.value,
              email: values?.Email,
              Billingaddress: values?.Billingaddress,
              Shippingaddress: values?.Shippingaddress,
            };
            Gstaddressvalues(value);
            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form>
              <div className="flex gap-5 my-5 w-full">
                <div className="w-[33%] flex flex-col space-y-2">
                  <div className="text-[#808080]">
                    GST Type
                  </div>
                  <Select
                    options={gsttypeoption}
                    placeholder={""}
                    value={selectedgsttype}
                    onChange={handleChangedgsttype}
                    onBlur={() => setTouchedgsttype({ ...touchedgsttype, state: true })}
                    styles={customStyles}
                    className="  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
                  {errors.Gsttype && touched.Gsttype && <div>{errors.Gsttype}</div>}
                </div>
                <div className="w-[33%] flex flex-col space-y-2">
                  <div className="text-[#808080]">
                    State
                  </div>
                  <Select
                    options={stateoption}
                    placeholder={""}
                    value={selectedstate}
                    onChange={handleChangedstate}
                    onBlur={() => setTouchedstate({ ...touchedstate, state: true })}
                    styles={customStyles}
                    className="  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
                  {errors.State && touched.State && <div>{errors.State}</div>}
                </div>
                <div className="w-[33%]">
                  <Field
                    name="Email"
                    type="email"
                    placeholder=""
                    as={TextInput}
                    label="Email"
                    className="text-gray-800 text-base w-[30%]"
                  />
                  <ErrorMessage name="Email" component="div" />
                </div>
              </div>
              <div>
                <Field
                  name="Billingaddress"
                  type="text"
                  placeholder=""
                  as={Textarea}
                  label="Billing Address"
                  className="text-gray-800 text-base w-[30%]"
                />
                <ErrorMessage name="Billingaddress" component="div" />
              </div>
              <div
                className="flex gap-[2px] items-center text-[#2D9CDB] my-3 cursor-pointer"
                onClick={() => setShowenable(!showenable)}
              >
                <IoMdAdd />
                {showenable ? "Disable Shipping Address" : "Enable Shipping Address"}
              </div>
              {showenable && (
                <div className="mb-5">
                  <Field
                    name="Shippingaddress"
                    type="text"
                    placeholder=""
                    as={Textarea}
                    label="Shipping Address"
                    className="text-gray-800 text-base w-[30%]"
                  />
                </div>
              )}
              <button
                type="submit"
                className="bg-[#fda80c] rounded-lg items-end px-5 w-fit text-white py-2"
                disabled={isSubmitting}
              >
                Save GST and Address
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
