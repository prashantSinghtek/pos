import { BiPurchaseTag } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { GiExpense } from "react-icons/gi";
import { HiTemplate } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { LiaSellsy, LiaStoreSolid } from "react-icons/lia";
import {
  MdGroupAdd,
  MdOutlineDashboardCustomize,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { TbCloudComputing, TbReportAnalytics, TbSitemap } from "react-icons/tb";

export type TSubMenu = {
  menuItem: string;
  href: string;
  id?: number;
};

export type TMenu = {
  menuItem: string;
  href?: string;
  subMenu: TSubMenu[];
  id: number;
  icon: React.ComponentType<any>; // IconType or any other type for icons
};

export type TMenuGroup = {
  title: string;
  menu: TMenu[];
  showGroupTitle: boolean;
};

export type TAdminGroup = {
  title: string;
  menu: TMenu[];
  showGroupTitle: boolean;
};

const Menu: TMenuGroup[] = [
  {
    title: "Dashboard",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Dashboard",
        id: 0,
        href: "/pos",
        subMenu: [],
        icon: MdOutlineDashboardCustomize,
      },
    ],
  },
  {
    title: "Parties",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Parties",
        id: 0,
        href: "/pos/parties",
        subMenu: [],
        icon: MdGroupAdd,
      },
    ],
  },
  {
    title: "Items",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Items",
        id: 0,
        href: "/pos/items",
        subMenu: [],
        icon: TbSitemap,
      },
    ],
  },
  {
    title: "Sales",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Sales",
        icon: LiaSellsy,
        id: 1,
        subMenu: [
          {
            menuItem: "Sale Invoices",
            href: "/pos/sales/saleinvoice",
          },
          {
            menuItem: "Estimate/Quotation",
            href: "/pos/sales/estimate",
          },
          {
            menuItem: "Payment In",
            href: "/pos/sales/paymentin",
          },
          {
            menuItem: "Sale Order",
            href: "/pos/sales/saleorder",
          },
          {
            menuItem: "Delivery Challan",
            href: "/pos/sales/deliverychallan",
          },

          {
            menuItem: "Sale Return/Dr. Note",
            href: "/pos/sales/salesreturn",
          },
        ],
      },
    ],
  },
  {
    title: "Purchase",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Purchase",
        icon: BiPurchaseTag,
        id: 1,
        subMenu: [
          {
            menuItem: "Purchase Bill",
            href: "/pos/purchase/purchasebill",
          },
          {
            menuItem: "Payment Out",
            href: "/pos/purchase/paymentout",
          },
          {
            menuItem: "Purchase Order",
            href: "/pos/purchase/purchaseorder",
          },
          {
            menuItem: "Purchase Return/Dr.Note",
            href: "/pos/purchase/purchasereturn",
          },
        ],
      },
    ],
  },
  {
    title: "Quick Billing",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Quick Billing",
        id: 0,
        href: "/quickbilling",
        subMenu: [],
        icon: RiBillLine,
      },
    ],
  },
  {
    title: "Expenses",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Expenses",
        id: 0,
        href: "/pos/expenses",
        subMenu: [],
        icon: GiExpense,
      },
    ],
  },
  {
    title: "Cash & Bank",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Cash & Bank",
        icon: BsBank,
        id: 1,
        subMenu: [
          {
            menuItem: "Bank Accounts",
            href: "/pos/cash&bank/bankaccount",
          },
          {
            menuItem: "Cash In Hand",
            href: "/pos/cash&bank/cashinhand",
          },
          {
            menuItem: "Cheques",
            href: "/pos/cash&bank/cheques",
          },
        ],
      },
    ],
  },
  {
    title: "Utilities",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Utilities",
        icon: TbCloudComputing,
        id: 1,
        subMenu: [
          {
            menuItem: "Generate Barcode",
            href: "/pos/utilities/generatebarcode",
          },
        ],
      },
    ],
  },
  {
    title: "Reports",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Reports",
        id: 0,
        href: "/pos/reports",
        subMenu: [],
        icon: TbReportAnalytics,
      },
    ],
  },
  {
    title: "Setting",
    showGroupTitle: false,
    menu: [
      {
        menuItem: "Setting",
        id: 0,
        href: "/pos/setting",
        subMenu: [],
        icon: FiSettings,
      },
    ],
  },
];

export { Menu };
