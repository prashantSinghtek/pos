"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiFileExcel2Line, RiPagesLine } from "react-icons/ri";
import Partiescard from "../parties/component/partiescard";
import { IoPersonOutline } from "react-icons/io5";
import Table from "@/app/Components/Table";
import Link from "next/link";
import { useSession } from "next-auth/react";
import pos_controller from "@/controller/posauth";

export default function Page() {
  const [selectedtab, setSelectedtab] = useState(1);
  const firmid = localStorage.getItem("selectedStore");
  const session = useSession();
  const token = session?.data?.user?.image;
  const [ExpensesTranaction, setExpensesTranaction] = useState([]);
  const auth = new pos_controller();
  const [Expenses, setExpenses] = useState<any>([]);
  const data = [
    {
      id: 1,
      name: "All",
      amount: 1234,
    },
    {
      id: 1,
      name: "prashant",
      amount: 1234,
    },
    {
      id: 1,
      name: "rahul",
      amount: 1234,
    },
  ];

  useEffect(() => {
    auth
      .GetExpensesTranaction(token, selectedtab, firmid)
      .then((res) => {
        console.log(res);
        setExpensesTranaction(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, selectedtab, firmid]);

  const bodyData = ExpensesTranaction.map((item: any) => {
    console.log(item);
    return {
      value1: item?.billDate,
      value2: item?.expenseNumber,
      value3: item?.partiesName || " ",
      value4: item?.paymentType[0],
      value5: item?.totalExpenseAmount,
      value6: item?.totalExpenseAmount,
    };
  });

  const header = [
    "Date",
    "Expenses No.",
    "Party Name",
    "Payment Type",
    "Amount",
    "Balance",
    " ",
  ];

  useEffect(() => {
    auth
      .GetExpensesCategory(token, firmid)
      .then((res) => {
        setExpenses(res?.data);
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, firmid]);

  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex mt-5 gap-5">
        <div className="w-[25%] rounded-lg overflow-hidden ">
          <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm w-full h-full overflow-x-hidden">
            <div className="flex justify-between px-3 pb-5 pt-2 gap-3 w-[100%] items-center">
              <div className="w-[31%]">
                <TextInput
                  name="search"
                  type="text"
                  placeholder="Search By"
                  label=""
                  istouched={"Touch"}
                  className="text-gray-800 text-base w-full"
                />
              </div>
              <Link href={"/addexpenses"}>
                <div
                  className=" bg-[#fda80c] text-white rounded-lg px-3 gap-2 items-center mt-2 flex h-[45px]"
                  title="Add Parties"
                >
                  <IoMdAdd size={25} />
                  Add Expenses
                </div>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[16px] flex justify-between">
              <div>Category</div>
              <div>Amount</div>
            </div>
            <List
              listdata={Expenses}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
              page="Expenses"
            />
          </div>
        </div>
        <div className="w-[75%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex flex-wrap items-center justify-between ">
                <div className="flex flex-col gap-1">
                  <div className="text-gray-800 text-xl">Publishing</div>
                  <div className="text-[#737373] text-lg">Direct Expense</div>
                </div>
                <Partiescard
                  icon={<IoPersonOutline />}
                  title={"Total"}
                  value={"₹ 0.00"}
                />
                <Partiescard
                  icon={<RiPagesLine />}
                  title={"Balance"}
                  value={"22"}
                />
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="w-[300px]">
              <TextInput
                name="search"
                type="text"
                placeholder="Search By"
                label=""
                istouched={"Touch"}
                className="text-gray-800 text-base w-full"
              />
            </div>
          </div>

          <div>
            <Table headerData={header} bodyData={bodyData} />
          </div>
        </div>
      </div>
    </>
  );
}
