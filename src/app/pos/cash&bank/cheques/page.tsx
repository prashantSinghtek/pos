import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>
    <div className="flex justify-center mt-20">
      {/* <Image src={"/public/chequesreen.png"} alt="chequesreen" width={500} height={500} /> */}
      <img src="/chequesreen.png" alt="" className='w-[500px] h-[500px]'/>
    </div>
    <div className="flex flex-col items-center gap-2 justify-center mt-10">
      
      <div className="text-gray-600  text-lg">
      Payment received through cheque for your invoices will be shown here.
      </div>
      
      
    </div>
  </div>
  )
}
