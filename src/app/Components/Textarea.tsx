import { InputHTMLAttributes } from "react";

interface ITextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  defaultRows?: number;
  label: string;
  error?: string;
  istouched: any;
}
export default function Textarea(props: ITextareaProps) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="text-[#808080]"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <textarea
          {...props}
          id={props.name}
          rows={props.defaultRows ? props.defaultRows : 5}
          className="border-gray-400  focus-within:outline-blue-400 flex items-center justify-between w-full px-2 bg-white border  rounded-md focus-within:outline focus-within:outline-2 "
          // className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {props.error && props.istouched ? (
        <p className="text-red-500">{props.error}</p>
      ) : null}
    </div>
  );
}
