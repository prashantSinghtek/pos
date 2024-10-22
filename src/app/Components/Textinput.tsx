import { InputHTMLAttributes, ReactNode } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  lefticon?: ReactNode;
  label: string;
  error?: string;
  istouched?: any;
  className: any;
}

export default function TextInput(props: ITextInputProps) {
  return (
    <div>
      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor={props.name} className="text-[#808080]">
          {props.label}
        </label>
        <div
          className={`${
            props.error ? "border-red-500" : "border-[#D0D2D6]"
          } flex items-center bg-white justify-between px-1 border rounded-md ${
            props.lefticon && "pl-2"
          }`}
        >
          {props.lefticon && props.lefticon}
          <input
            {...props}
            id={props.name}
            className={`w-full focus:outline-none border-none bg-white outline-none font-medium text-sm py-3 ${props.lefticon && "px-2"} ${
              props.className
            }`}
          />
        </div>
        {props.error && props.istouched ? (
          <p className="text-red-500 text-sm">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
}
