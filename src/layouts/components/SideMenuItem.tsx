"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { LayoutContext } from "../context";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TMenu, TMenuGroup } from "@/constants/menu";

type TSideMenuItem = {
  menuGroup: TMenuGroup;
  currentPath:any

};

const SideMenuItem = ({ menuGroup,currentPath }: TSideMenuItem) => {

  const { isDrawerCollapsed } = useContext(LayoutContext);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
  const [menuitem,setMenuitem] = useState()
// console.log("isDrawerCollapsed",isDrawerCollapsed)
  const isMenuItemActive = (href:any) => {
    return currentPath === href;
  };

  const handleReportsClick = (event:any) => {
    event.stopPropagation();
    setShowReportsSubMenu(!showReportsSubMenu);
  };

  const renderMenuItems = (menu: TMenu, index: number, ) => {
    const Icon = menu.icon;
    const isActive = isMenuItemActive(menu.href);
    return (
      <div
        key={menu.id}
        className={`hover:bg-white hover:text-[#FF8900] transition-all rounded-md cursor-pointer line-clamp-1 mb-2 font-medium text-[17px] ${
          isActive ? "bg-white text-[#FF8900] border-l-2 border-[#FF8900]" : ""
        }`}
        title={menu.menuItem}
      >
        {menu.subMenu && menu.subMenu.length > 0 ? (
          <div
            onClick={handleReportsClick}
            className={`relative ${showReportsSubMenu ? "" : ""}`}
          >
            <div className="flex justify-between items-center pr-5">

            <div
              className={`space-x-1 items-center w-full 2xl:px-2 py-2 ${
                isDrawerCollapsed ? "justify-center":"flex"
              }`}
            >
              <Icon
                className={`${isDrawerCollapsed ? "text-xl" : "text-base"}`}
              />
              {!isDrawerCollapsed && <p>{menu.menuItem}</p>}
            </div>
            {
              !isDrawerCollapsed &&
              <div>

              {showReportsSubMenu ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
              </div>
            }
            </div>

            {showReportsSubMenu && (
              <ul className="p-2 mt-1 flex flex-col gap-1 px-2">
                {menu.subMenu.map((subItem:any, Index: any) => (
                  <li key={Index}>
                    <Link href={subItem.href}>
                      <div className={` p-2 rounded-md text-sm pl-7  py-1 ${menuitem == subItem.menuItem ?"hover:text-[#2D9CDB] ":"text-gray-400"}`} onMouseEnter={()=>setMenuitem(subItem.menuItem)}>
                        {subItem.menuItem}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <Link href={menu.href || "#"}>
            <div
              className={`flex space-x-1 items-center w-full 2xl:px-2 py-2 ${
                isDrawerCollapsed && "justify-center"
              }`}
            >
              <Icon
                className={`${isDrawerCollapsed ? "text-xl " : "text-base"}`}
              />
              {!isDrawerCollapsed && <p>{menu.menuItem}</p>}
            </div>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="mt-4">
        {menuGroup.showGroupTitle && (
          <span className="text-lg text-white tracking-wider font-bold pl-1 line-clamp-1">
            {menuGroup.title}
          </span>
        )}
        <ul
          className={`mb-2 `}
        >
          {menuGroup.menu.map((menu:any, index:any) => {
            return renderMenuItems(menu, index );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideMenuItem;

