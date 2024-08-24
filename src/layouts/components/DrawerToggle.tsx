"use client";
import { useContext } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { LayoutContext } from "../context";

export default function DrawerToggle({ isDark = false }) {
  const { toggleDrawer, } = useContext(LayoutContext);
  return (
    <button
    title="toggle"
      className={`flex items-center  justify-center transition-all `}
      onClick={toggleDrawer}
    >
      <img src="/header.png" alt="" />
    </button>
  );
}
