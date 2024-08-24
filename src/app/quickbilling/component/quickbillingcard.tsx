import React from "react";

export default function Quickbillingcard({ title,titleclick }: any) {
  return (
    // <div className='border border-[#2D9CDB] text-[#85898B] bg-white rounded-lg px-5 py-2 w-fit' onKeyUp={(e:any) => console.log("eee",e)}>
    //   {title}
    // </div>
    <div
      className="border border-[#2D9CDB] text-[#85898B] bg-white rounded-lg px-5 py-2 w-fit "
      onClick={(e)=>titleclick(title)}
     
    >
      {title}
    </div>
  );
}
