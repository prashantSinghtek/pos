/* eslint-disable react/jsx-key */
import Tabs from '@/app/Components/Tabs'
import React from 'react'
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';
import { RiDropboxFill } from 'react-icons/ri';
import { TbCategory } from 'react-icons/tb';
import Saleorder from './component/Saleorder';
import Onlineorder from './component/Onlineorder';

export default function page() {

    const heading = [
        {
            icon:<RiDropboxFill size={25} />,
            title:"SALE ORDERS",
        },
        {
            icon:<IoSettings size={25} />,
            title:"ONLINE ORDERS",
        },
         
      ];

      const content = [

        <Saleorder/>,
        <Onlineorder/>,
       
      ];
  return (
    <div>
       <Tabs heading={heading} content={content}  />
    </div>
  )
}
