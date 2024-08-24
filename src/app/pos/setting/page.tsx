"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import Settingtabs from "@/app/Components/Settingtabs";
import React, { useState } from "react";
import Usermanagement from "./Component/Usermanagement";
import Transaction from "./Component/Transaction";
import Print from "./Component/Print";
import Taxesgst from "./Component/Taxes&gst";
import General from "./Component/General";
import Transactionmessage from "./Component/Transactionmessage";
import Party from "./Component/Party";
import Items from "./Component/Items";

export default function Page() {
  const [selectedtab, setSelectedtab] = useState(1);
  const data = [
    {
      id: 1,
      name: "General",
      children: <General />,
    },
    {
      id: 2,
      name: "Transaction",
      children: <Transaction />,
    },
    {
      id: 3,
      name: "Print",
      children: <Print />,
    },
    {
      id: 4,
      name: "Taxes & GST",
      children: <Taxesgst />,
    },
    {
      id: 8,
      name: "User Management",
      children: <Usermanagement />,
    },
    {
      id: 5,
      name: "Transaction Message",
      children: <Transactionmessage />,
    },
    {
      id: 6,
      name: "Party",
      children: <Party />,
    },
    {
      id: 7,
      name: "Items",
      children: <Items />,
    },
  ];
  const component: any = data.find((i) => {
    return i.id == selectedtab;
  });

  return (
    <div className="flex">
      <div className="w-fit bg-[#FFF3E5] h-[80vh] mt-5">
        <Settingtabs
          listdata={data}
          selectedtab={selectedtab}
          onselected={(id: number) => {
            setSelectedtab(id);
          }}
        />
      </div>
      <div className="lg:flex-1 w-screen lg:px-3 mt-5">
        {component.children}
      </div>
    </div>
  );
}
