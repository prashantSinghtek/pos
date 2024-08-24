"use client";
import { ReactNode, useContext } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LayoutContextProvider, { LayoutContext } from "./context";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Companysection from "./components/Companysection";

function Main({ children }: { children: ReactNode }) {
  const { isDrawerCollapsed } = useContext(LayoutContext);
  const pathName = usePathname();

  return (
    <>
      {/* {isDrawerCollapsed && (
        <div className="bg-white text-orange-500 block md:hidden fixed top-0 left-0 rounded-lg">
          <DrawerToggle />
        </div>
      )} */}
      <div className="w-full bg-[#F2EFEBBF] h-auto">
        <Companysection />
      </div>
      <div className="bg-white z-50  shadow-lg">
        <Header />
      </div>
      <div className="flex w-full h-auto  justify-between overflow-hidden">
        <div
          className={`${
            isDrawerCollapsed
              ? "opacity-0 w-[0%] md:opacity-100 md:w-[5%]"
              : "opacity-1 w-full md:w-[17%]"
          } transition-all h-auto  bg-white shadow-md  `}
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            scrollbarColor: "transparent transparent",
          }}
        >
          <Sidebar />
        </div>
        <main
          className={`${
            isDrawerCollapsed
              ? "w-full  md:w[95%] md:px-2"
              : "opacity-10 md:opacity-100 w-0 md:w-[82%] md:px-0 "
          } transition-all px-4 md:py-1 overflow-y-scroll scrollbar-hide relative`}
        >
          <AnimatePresence mode="wait" initial={true}>
            <motion.div className="relative">
              <motion.div
                key={pathName}
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <LayoutContextProvider>
      <Main>{children}</Main>
    </LayoutContextProvider>
  );
}
