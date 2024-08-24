import CardPrototype from '@/app/Components/CardPrototype'
import React from 'react'

export default function Dashboardcard({image,title,number}:any) {
  return (
    <div className='w-[25%]'>
      <CardPrototype>
        <div className='flex gap-2 flex-col items-center justify-center'>
            <img src={image} alt="" />
            <div className='text-base text-gray-500'>{title}</div>
            <div className='text-base font-bold text-gray-700'>{number}</div>


        </div>
      </CardPrototype>
    </div>
  )
}
