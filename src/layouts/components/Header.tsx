import { HiOutlineBell } from "react-icons/hi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import BrandSection from "./BrandSection";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const path = usePathname();
  const parts = path.split("/");

  const lastWords = parts.map((part) => {
    const subParts = part.split("/");
    return subParts[subParts.length - 1];
  });
console.log(session , "sessionHeader");

  const Pagehead = lastWords[lastWords.length - 1];
  const userName = session?.user?.firstName
    ? `${session.user.firstName} ${session.user.lastName}`
    : "Guest";

  const userRole = session?.user?.type || "User";

  return (
    <div>
      <header className="w-[100%] py-3 bg-opacity-20 flex shadow-sm shadow-gray-300 items-center z-50">
        <div className="w-[21%] ">
          <BrandSection />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="text-[22px] font-medium px-2">
            {Pagehead.toUpperCase() === "POS" ? "DASHBOARD" : Pagehead.toUpperCase()}
          </div>
          <div className="px-3 flex space-x-1">
            <div className="flex items-center gap-[6px]">
              <div className="border-2 border-[#CDC8C6] text-[#867E7C] p-2 rounded-full">
                <IoChatboxEllipsesOutline size={25} />
              </div>
              <div className="border-2 border-[#CDC8C6] text-[#867E7C] p-2 rounded-full">
                <HiOutlineBell size={25} />
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <img src="/Ellipse9.png" alt="User profile picture" />

                <div className="text-left mr-2">
                  <div className="text-[14px] text-primary font-bold capitalize">
                    {userName}
                  </div>
                  <div className="text-xs text-gray-500">{userRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
