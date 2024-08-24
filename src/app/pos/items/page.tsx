/* eslint-disable react/jsx-key */
import Tabs from '@/app/Components/Tabs'
import React from 'react'
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';
import { RiDropboxFill } from 'react-icons/ri';
import { TbCategory } from 'react-icons/tb';
import Product from './component/Product';
import Service from './component/Service';
import Category from './component/Category';
import Unit from './component/Unit';

export default function page() {

    const heading = [
        {
            icon:<RiDropboxFill size={25} />,
            title:"PRODUCT",
        },
        {
            icon:<IoSettings size={25} />,
            title:"SERVICE",
        },
        {
            icon:<TbCategory size={25} />,
            title:"CATEGORY",
        },
        {
            icon:<AiOutlineDeploymentUnit size={25} />,
            title:"UNITS",
        }       
      ];

      const content = [
      
       <Product />,
        <Service/>,
        <Category/>,
        <Unit/>,
       
      ];
  return (
    <div>
       <Tabs heading={heading} content={content}  />
    </div>
  )
}
