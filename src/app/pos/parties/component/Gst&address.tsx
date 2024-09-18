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
interface OptionType {
  value: string;
  label: string;
}
export default function Gstaddress() {
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

  console.log(data, "dataState");

  const dispatch = useDispatch();
  const handleChange = (field: string, value: any) => {
    dispatch(
      updatePartyForm({
        key: field,
        value: value,
      })
    );
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
  useEffect(() => {
    getState();
    return () => {};
  }, []);

  const formState = useSelector(selectPartyForm);
  return (
    <div>
      <form>
        <div className="flex gap-5 my-5 w-full">
          <div className="w-[33%] flex flex-col space-y-2">
            <div className="text-[#808080]">GST Type</div>
            <Select
              options={gsttypeoption}
              placeholder=""
              value={gsttypeoption.find(
                (opt: { value: string }) => opt.value === formState.gstType
              )}
              onChange={(option) =>
                handleSelectChange("gstType", option as OptionType)
              }
              className="outline-none font-medium font-optima text-primary text-sm"
            />
          </div>
          <div className="w-[33%] flex flex-col space-y-2">
            <div className="text-[#808080]">State</div>
            <Select
              options={stateoption}
              placeholder=""
              value={stateoption?.find(
                (opt: { value: string }) => opt.value === formState.state
              )}
              onChange={(option) =>
                handleSelectChange("state", option as OptionType)
              }
              className="outline-none font-medium font-optima text-primary text-sm"
            />
          </div>
          <div className="w-[33%]">
            <TextInput
              name="email"
              type="email"
              value={formState.email}
              onChange={(e) => handleChange("email", e.target.value)}
              label="Email"
              className="text-gray-800 text-base w-[30%]"
              istouched={undefined}
            />
          </div>
        </div>
        <div>
          <Textarea
            name="billingAddress"
            value={formState.billingAddress}
            onChange={(e) => handleChange("billingAddress", e.target.value)}
            label="Billing Address"
            className="text-gray-800 text-base w-[30%]"
            istouched={undefined}
          />
        </div>
        <div
          className="flex gap-[2px] items-center text-[#2D9CDB] my-3 cursor-pointer"
          onClick={() => handleChange("showenable", !formState.showenable)}
        >
          <IoMdAdd />
          {formState.showenable
            ? "Disable Shipping Address"
            : "Enable Shipping Address"}
        </div>
        {formState.showenable && (
          <div className="mb-5">
            <Textarea
              name="shippingAddress"
              value={formState.shippingAddress}
              onChange={(e) => handleChange("shippingAddress", e.target.value)}
              label="Shipping Address"
              className="text-gray-800 text-base w-[30%]"
              istouched={undefined}
            />
          </div>
        )}
      </form>
    </div>
  );
}
