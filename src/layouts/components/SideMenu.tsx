
import React from 'react';
import {Menu} from "@/constants/menu";
import SideMenuItem from "./SideMenuItem";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const path = usePathname();


 
 


  return (
    <div className="leftSidebar flex-1 text-sm font-medium px-2 py-2">
      <div>
        {Menu.map((menuGroup:any, index:any) => {
          // console.log(currentMenu)
        return  (
          <SideMenuItem
            key={index}

            menuGroup={menuGroup}
            currentPath={path}
          />
        )
        })}
      </div>
    </div>
  );
}
