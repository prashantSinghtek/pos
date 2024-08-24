import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function Button({ color, link, title }: any) {
  return (
    <Link href={link}>
      <div className={`${color} rounded-full px-5 py-2 flex gap-3 text-white items-center`}>
        <IoMdAdd />
        {title}
      </div>
    </Link>
  );
}
