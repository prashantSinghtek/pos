import { HiOutlineBell } from "react-icons/hi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import BrandSection from "./BrandSection";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "@/Redux/Firm/selectors";
import { useEffect } from "react";
import { setUserDetailForm } from "@/Redux/Firm/reducer";
import { myCompany } from "@/controller/posauth";
import { setFirmId } from "@/Redux/Parties/reducer";
import { MdGroupAdd } from "react-icons/md";
import Button from "@/app/Components/Button";

export default function Header() {
  const path = usePathname();
  const parts = path.split("/");
  const lastWords = parts.map((part) => {
    const subParts = part.split("/");
    return subParts[subParts.length - 1];
  });
  const Pagehead = lastWords[lastWords.length - 1];
  const userinfo = useSelector(selectUserInfo);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session && session.user) {
      dispatch(
        setUserDetailForm({
          FirstName: session.user.firstName,
          LastName: session.user.lastName,
          Email: session.user.email,
          PhoneNumber: session.user.id,
          Role: session.user.type,
        })
      );

      myCompany()
        .then((res) => {
          dispatch(setFirmId(res[0].id));
        })
        .catch((err) => {});
    }

    return () => {};
  }, [session?.user, session?.uToken]);
  return (
    <div>
      <header className="w-[100%] py-3 bg-opacity-20 flex shadow-sm shadow-gray-300 items-center z-50">
        
        <div className="w-[21%] ">
          <BrandSection />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="text-[22px] font-medium px-2">
            {Pagehead.toUpperCase() === "POS"
              ? "DASHBOARD"
              : Pagehead.toUpperCase()}
          </div>
          <div className="px-3 flex space-x-1">
          <div className="flex gap-3 pr-7">
          <Button color={"bg-blue-500"} title={"Add Sale"} link={"/addsale"} />
          <Button
            color={"bg-orange-500"}
            title={"Add Purchase"}
            link={"/addpurchase"}
          />
          <Button color={"bg-gray-400"} title={"Add More"} link={"/"} />
        </div>
            <div className="flex items-center gap-[12px]">
              <div className="border-2 border-[#CDC8C6] text-[#867E7C] p-2 rounded-full [box-shadow:2px_3px_22px_0px_#FF6E3F1C]">
               <div className="relative">
               <IoChatboxEllipsesOutline size={22} />
               <div className="absolute w-[8px] h-[8px] bg-[#FF6E3F] top-[0] right-[0] rounded-[50px] border-[1px] border-[solid] border-[#ffffff]"></div>
               </div>
              </div>
              <div className="border-2 border-[#CDC8C6] text-[#867E7C] p-2 rounded-full [box-shadow:2px_3px_22px_0px_#FF6E3F1C]">
              <div className="relative">
               <HiOutlineBell size={22} />
               <div className="absolute w-[8px] h-[8px] bg-[#FF6E3F] top-[0] right-[0] rounded-[50px] border-[1px] border-[solid] border-[#ffffff]"></div>
               </div>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <img src="/Ellipse9.png" alt="User profile picture" />

                <div className="text-left mr-2">
                  <div className="text-[17px] text-primary font-bold capitalize">
                    {userinfo?.FirstName} {userinfo?.LastName}
                  </div>
                  <div className="text-[14px] text-gray-500">{userinfo?.Email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
