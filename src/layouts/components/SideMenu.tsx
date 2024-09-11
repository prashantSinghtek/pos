import React from "react";
import { Menu } from "@/constants/menu";
import SideMenuItem from "./SideMenuItem";
import { usePathname } from "next/navigation";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LayoutContext } from "../context";
import { signOut } from "next-auth/react";
export default function SideMenu() {
  const path = usePathname();
  const { isDrawerCollapsed } = useContext(LayoutContext);
  const router = useRouter();
  let handleSignout = () => {
    signOut()
      .then(() => {
        window.location.pathname = "/";
      })
      .catch((error) => {
        // Handle any errors that occur during signout
        console.error("Error during signout:", error);
      });
  };
  return (
    <div className="leftSidebar flex-1 text-sm font-medium px-2 py-2">
      <div>
        {Menu.map((menuGroup: any, index: any) => {
          return (
            <SideMenuItem
              key={index}
              menuGroup={menuGroup}
              currentPath={path}
            />
          );
        })}
        <div className="hover:bg-white hover:text-[#FF8900] transition-all rounded-md cursor-pointer line-clamp-1 mb-2 font-medium text-[17px] ">
          <div
            className={`flex space-x-1 items-center w-full 2xl:px-2 py-2 ${
              isDrawerCollapsed && "justify-center"
            }`}
            onClick={() => {
              handleSignout();
            }}
          >
            <LiaSignOutAltSolid
              className={`${
                isDrawerCollapsed
                  ? "text-xl "
                  : "text-base "
              }`}
              size={25}
            />
            {!isDrawerCollapsed && <p>Logout</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
