
import BrandSection from "./BrandSection";
import SideMenu from "./SideMenu";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LayoutContext } from "../context";
import { signOut } from "next-auth/react";


export default function Sidebar() {
  const { isDrawerCollapsed } = useContext(LayoutContext); 
  const router = useRouter();
  let handleSignout = () => {
    
    signOut()
      .then(() => {
        window.location.pathname = '/'
      })
      .catch((error) => {
        // Handle any errors that occur during signout
        console.error("Error during signout:", error);
      });
  };
  return (
    <div
      
      className="h-full w-full border-r border-groove text-gray-500 p-2 flex flex-col"
    >
      
      <SideMenu />
      {/* <div>Footer</div> */}
      <div className="hover:bg-white hover:text-black  mx-2 cursor-pointer">
        <div
          className={`flex space-x-1 items-center w-full 2xl:px-2 py-2 ${
            isDrawerCollapsed && "justify-center"
          }`}
          onClick={() => {
            handleSignout()
          }}
        >
          <LiaSignOutAltSolid
            className={`${isDrawerCollapsed ? "text-xl text-gray-500" : "text-base text-gray-500"}`}
            size={25}
          />
          {!isDrawerCollapsed && <p className="text-gray-500">Logout</p>}
        </div>
      </div>
    </div>
  );
}

