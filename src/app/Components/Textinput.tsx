import { InputHTMLAttributes, ReactNode, useState } from "react";
interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  lefticon?: ReactNode;
  label: string;
  error?: string;
  istouched: any;
}
export default function TextInput(props: ITextInputProps) {
  return (
    <div>
      <div className="flex flex-col space-y-2 ">
        <label htmlFor={props.name} className="text-[#808080]">
          {props.label}
        </label>
        <div
          className={`${props.error ? "border-red-500" : "border-gray-400 "
            } border-gray-400  focus-within:outline-gray-200 flex items-center bg-white justify-between w-full px-1   border  rounded-md focus-within:outline focus-within:outline-2 `}
        >
          {props.lefticon && props.lefticon}
          <input
            {...props}
            id={props.name}
            className={`w-full border-none bg-white rounded-xl outline-none font-medium font-optima text-primary text-sm ${props.lefticon && "px-2"
              } py-3`}
          />
        </div>
        {props.error && props.istouched ? (
          <p className="text-red-500 text-sm">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
}