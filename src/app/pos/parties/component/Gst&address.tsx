import Textarea from "@/app/Components/Textarea";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import * as Yup from "yup";
import { getState } from "@/controller/posauth";
import { selectPartyForm } from "@/Redux/Parties/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updatePartyForm } from "@/Redux/Parties/reducer";
import Select from "react-select";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { partiesFormInterface } from "@/Redux/Parties/types";

interface OptionType {
  value: string;
  label: string;
}
interface FormValues {
  gstType: string;
  state: string;
  email: string;
  billingAddress: string;
  shippingAddress: string;
  showenable: any;
}
export default function Gstaddress({ setShowButton }: any) {
  const [data, setData] = useState<any>([]);
  const [gsttype] = useState<any>([
    "unregistered/consumer",
    "registered business regular",
    "registered business composition",
  ]);

  const gsttypeoption = gsttype?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));

  const stateoption = data?.map((option: any) => ({
    value: option?.name.toUpperCase(),
    label: option?.name.toUpperCase(),
  }));

  const dispatch = useDispatch();
  const formState = useSelector(selectPartyForm);

  useEffect(() => {
    getState();
    return () => {};
  }, []);

  const handleChange = (field: string, value: any) => {
    dispatch(updatePartyForm({ key: field, value: value }));
  };

  const handleSelectChange = (field: string, option: OptionType | null) => {
    if (option) {
      dispatch(
        updatePartyForm({
          key: field,
          value: option.value,
        })
      );
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    billingAddress: Yup.string().required("Billing Address is required"),
    gstType: Yup.string().required("GST Type is required"),
  });

  return (
    <Formik
      initialValues={formState}
      validationSchema={validationSchema}
      onSubmit={(values: partiesFormInterface) => {
        handleChange("gstType", values.gstType);
        handleChange("state", values.state);
        handleChange("email", values.email);
        handleChange("billingAddress", values.billingAddress);
        handleChange("shippingAddress", values.shippingAddress);
        setShowButton(true);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="flex gap-5 my-5 w-full">
            <div className="w-[33%] flex flex-col space-y-2">
              <div className="text-[#808080]">GST Type</div>
              <Field name="gstType">
                {({ field, form }: any) => (
                  <Select
                    options={gsttypeoption}
                    placeholder=""
                    value={gsttypeoption?.find(
                      (opt: { value: string }) => opt.value === field.value
                    )}
                    onChange={(option) => {
                      // handleSelectChange("gstType", option as OptionType);
                      form.setFieldValue(
                        "gstType",
                        (option as OptionType)?.value
                      );
                    }}
                    className="outline-none font-medium font-optima text-primary text-sm"
                  />
                )}
              </Field>
              <ErrorMessage
                name="gstType"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-[33%] flex flex-col space-y-2">
              <div className="text-[#808080]">State</div>
              <Field name="state">
                {({ field }: any) => (
                  <Select
                    options={stateoption}
                    placeholder=""
                    value={stateoption?.find(
                      (opt: { value: string }) => opt.value === values.state
                    )}
                    onChange={(option) =>
                      handleSelectChange("state", option as OptionType)
                    }
                    className="outline-none font-medium font-optima text-primary text-sm"
                  />
                )}
              </Field>
            </div>
            <div className="w-[33%]">
              <Field name="email">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    type="email"
                    placeholder=""
                    label="Email"
                    className="text-gray-800 text-base w-[30%]"
                    istouched={undefined}
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div>
            <Field name="billingAddress">
              {({ field }: any) => (
                <Textarea
                  {...field}
                  placeholder=""
                  label="Billing Address"
                  className="text-gray-800 text-base w-[30%]"
                  istouched={undefined}
                />
              )}
            </Field>
            <ErrorMessage
              name="billingAddress"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div
            className="flex gap-[2px] items-center text-[#2D9CDB] my-3 cursor-pointer"
            onClick={() => setFieldValue("showenable", !values.showenable)}
          >
            <IoMdAdd />
            {values.showenable
              ? "Disable Shipping Address"
              : "Enable Shipping Address"}
          </div>
          {values.showenable && (
            <div className="mb-5">
              <Field name="shippingAddress">
                {({ field }: any) => (
                  <Textarea
                    {...field}
                    placeholder=""
                    label="Shipping Address"
                    className="text-gray-800 text-base w-[30%]"
                    istouched={undefined}
                  />
                )}
              </Field>
              <ErrorMessage
                name="shippingAddress"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-[#fda80c] rounded-lg px-5 py-2 text-white"
          >
            Save GST and Address
          </button>
        </Form>
      )}
    </Formik>
  );
}
