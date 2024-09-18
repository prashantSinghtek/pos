import TextInput from "@/app/Components/Textinput";
import { updatePartyForm } from "@/Redux/Parties/reducer";
import { selectPartyForm } from "@/Redux/Parties/selectors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Additionalfield() {
  const dispatch = useDispatch();
  const formState = useSelector(selectPartyForm);

  const handleChange = (field: string, value: any) => {
    dispatch(updatePartyForm({ key: field, value }));
  };

  return (
    <>
      {[
        { field: "additionalFieldOne", value: "valueOne" },
        { field: "additionalFieldTwo", value: "valueTwo" },
        { field: "additionalFieldThree", value: "valueThree" },
        { field: "additionalfieldFour", value: "valueFour" },
      ].map((item, index) => (
        <div key={index} className="my-4">
          {/* Text input */}
          <TextInput
            name={item.field}
            type="text"
            placeholder=""
            label={`Additional Field ${index + 1}`}
            value={formState[item.field as keyof typeof formState]}
            onChange={(e) => handleChange(item.field, e.target.value)}
            className="text-gray-800 text-base w-full"
            istouched={undefined}
          />

          {/* Checkbox */}
          <div className="flex items-center gap-4 my-4">
            <label>{`Value ${index + 1}`}</label>
            <input
              type="checkbox"
              checked={
                formState[item.value as keyof typeof formState] as boolean
              }
              onChange={(e) => handleChange(item.value, e.target.checked)}
              className="w-[20px] h-[20px]"
            />
          </div>
        </div>
      ))}
    </>
  );
}
