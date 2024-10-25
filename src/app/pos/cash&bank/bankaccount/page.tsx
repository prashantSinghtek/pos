"use client";
import CardPrototype from "@/app/Components/CardPrototype";
import List from "@/app/Components/List";
import Table from "@/app/Components/Table";
import TextInput from "@/app/Components/Textinput";
import React, { useEffect, useState } from "react";
import { MdGroupAdd, MdOutlineEmail } from "react-icons/md";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { RiBankLine, RiFileExcel2Line, RiPagesLine } from "react-icons/ri";
import { IoMdAdd, IoMdCard, IoMdCash } from "react-icons/io";
import { PiMapPinBold } from "react-icons/pi";
import Modal from "@/app/Components/Modal";
import Button from "@/app/Components/Button";
import Partiescard from "../../parties/component/partiescard";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { BsBank } from "react-icons/bs";
import Checkbox from "@/app/Components/Checkbox";
import { useSession } from "next-auth/react";

import BankToCash from "./Component/BankToCash";
import CashToBank from "./Component/CashToBank";
import BankToBank from "./Component/BankToBank";
import Adjustmentbank from "./Component/Adjustmentbank";
// import { PiMapPinAreaBold } from "react-icons/pi";

export default function Product() {
  const [selectedtab, setSelectedtab] = useState<any>();
  const [selectedbank, setSelectedbank] = useState<any>();
  const [modalopen, setModalopen] = useState(false);    
  const [modalOpenFrom, setModalOpenFrom] = useState("");
  const [adjustitemmodalopen, setAdjustitemmodalopen] = useState(false);
  const [depositwithdraw, setDepositwithdraw] = useState(false);
  const [BankToCashTransfer, SetBankToCashTransfer] = useState(false)
  const [CashToBankTransfer, SetCashToBankTransfer] = useState(false)
  const [BankToBankTransfer, SetBankToBankTransfer] = useState(false)
  const [AdjusmentBankEntry, SetAdjusmentBankEntry] = useState(false)
  const Router = useRouter();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const session = useSession();
  const token = ""
  const [data, setData] = useState([]);
  const [data1, setData1] = useState<any>();


  const header = ["Type", "Name", "Date", "Amount", ""];

  const [isChecked, setIsChecked] = useState(false);



  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCheck = (isChecked: boolean, title: string) => {
    setCheckedItems((prevState) => {
      if (isChecked) {
        return [...prevState, title];
      } else {
        return prevState.filter((item) => item !== title);
      }
    });
  };

  // useEffect(() => {
  //   GetBankAccount(token, firmid)
  //     .then((res) => {
  //       setData(res.data)
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [token, firmid])


  // useEffect(() => {
  //   GetBankAccountbyid(token, selectedtab)
  //     .then((res) => {
  //       setData1(res.data)
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [token, selectedtab])
  
  


  return (
    <>
      <div className="flex justify-between items-center px-1 mt-5"></div>
      <div className="flex w-screen mt-5 gap-5">
        <div className="w-[20%] rounded-lg overflow-hidden ">
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
              <div
                className=" bg-[#fda80c] text-white rounded-lg px-3 overflow-hidden gap-2 items-center mt-2 flex h-[45px]"
                title="Add Bank"
              >
                <div className="flex" onClick={() => setModalopen(!modalopen)}>
                  <IoMdAdd size={25} />
                  Add Bank
                </div>
                {/* <div className="border-l bg-[#E9A315] py-[14px] px-[10px] cursor-pointer" onClick={()=>{
                  Router.push("items/importitems")
                }}>
                  <RiFileExcel2Line />
                </div> */}
              </div>
            </div>
            <div className="bg-gray-100 rounded-t-2xl px-4 py-4 text-[16px] flex justify-between">
              <div>Account Name</div>
              <div>Amount</div>
            </div>
            <List
              listdata={data}
              onselected={(id: number) => {
                setSelectedtab(id);
              }}
              page="bank"
              setSelectedbank={setSelectedbank}
              setModalopen={setModalopen}
              setModalOpenFrom={setModalOpenFrom}

            />
          </div>
        </div>
        <div className="w-[60%] flex-col gap-5">
          <div>
            <CardPrototype>
              <div className="flex justify-end px-7 pb-5">
                <div>
                  <div className="flex gap-3 pr-7 relative">
                    <div
                      className={`bg-[#FF8900] rounded-full px-5 py-2 flex gap-3 text-white items-center cursor-pointer`}
                      onClick={() => setDepositwithdraw(!depositwithdraw)}
                    >
                      Deposit/Withdraw
                      <HiAdjustmentsHorizontal size={25} />
                    </div>
                    {depositwithdraw && (
                      <div className="bg-white rounded-xl flex flex-col gap-2 px-3 py-5 shadow-lg absolute top-11 right-6 border border-[#CAD5E4] drop-shadow-lg shadow-[#7B85A1]">
                        <div className="flex gap-2 items-center text-[13px] hover:text-blue-500 " onClick={() => SetBankToCashTransfer(!BankToCashTransfer)}>
                          <div className="border border-[#FED8BC] h-[35px] w-[35px] flex items-center justify-center rounded-full bg-[#FFE7D6] text-[#FF7006]">
                            <RiBankLine size={18} />
                          </div>
                          Bank To Cash Transfer
                        </div>
                        <div className="flex gap-2 items-center text-[13px] hover:text-blue-500" onClick={() => SetCashToBankTransfer(!CashToBankTransfer)}>
                          <div className="border border-[#FED8BC] h-[35px] w-[35px] flex items-center justify-center rounded-full bg-[#FFE7D6] text-[#FF7006]">
                            <IoMdCash size={18} />
                          </div>
                          Cash to Bank Transfer
                        </div>
                        <div className="flex gap-2 items-center text-[13px] hover:text-blue-500" onClick={()=> SetBankToBankTransfer(!BankToBankTransfer)}>
                          <div className="border border-[#FED8BC] h-[35px] w-[35px] flex items-center justify-center rounded-full bg-[#FFE7D6] text-[#FF7006]">
                            <BsBank size={18} />
                          </div>
                          Bank to Bank Transfer
                        </div>
                        <div className="flex gap-2 items-center text-[13px] hover:text-blue-500" onClick={()=> SetAdjusmentBankEntry(!AdjusmentBankEntry)}>
                          <div className="border border-[#FED8BC] h-[35px] w-[35px] flex items-center justify-center rounded-full bg-[#FFE7D6] text-[#FF7006]">
                            <HiAdjustmentsHorizontal size={18} />
                          </div>
                          Adjust to Bank Transfer
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* {console.log("data1",data1)} */}
              <div className="flex flex-wrap  ">
                <Partiescard
                  icon={<IoPersonOutline />}
                  title={"Bank Name"}
                  value={data1?.bankName}
                />
                <Partiescard
                  icon={<RiPagesLine />}
                  title={"Account Number"}
                  value={data1?.accountNumber}
                />
                <Partiescard
                  icon={<IoMdCard />}
                  title={"IFSC Code"}
                  value={data1?.ifscCode}
                />
                <Partiescard
                  icon={<MdOutlineEmail />}
                  title={"UPI ID"}
                  value={data1?.upiId || " "} 
                />
              </div>
            </CardPrototype>
          </div>

          <div className="flex justify-between w-full items-center px-3 my-3">
            <div className="text-[25px]">Transaction</div>
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
            <Table headerData={header} />
          </div>
        </div>
      </div>
      <Modal isOpen={modalopen} onClose={() => setModalopen(false)}>
        <>
          <div className="border-b text-[20px] border-gray-300 pb-4 text-gray-800">
            Add Bank Account

          </div>

          {modalOpenFrom =="FromList" ? 
           <Formik
            initialValues={{
              Accountdisplayname: data1?.displayName || " ",
              openingBalance: data1!.openingBalance || " ",
              date: data1?.asOfDate || " ",
              AccountNumber: data1?.accountNumber || " ",
              Ifsccode: data1?.ifscCode || " ",
              UPIID: data1?.upiId || " ",
              Bankname: data1?.bankName || " ",
              Accountholdername: data1?.accountHolderName || " ",
            }}
            validationSchema={""}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Handle form submission
                console.log("Submitting form with values:", values);
                const value = {
                  "displayName": values.Accountdisplayname,
                  "openingBalance": values.openingBalance,
                  "asOfDate": values.date,
                  "accountNumber": values.AccountNumber,
                  "ifscCode": values.Ifsccode,
                  "bankName": values.Bankname,
                  "accountHolderName": values.Accountholdername,

                }
                // const res = await PutBankAccount(token, firmid, value);
                // console.log(">>>>>>>>", res)
                setModalopen(false)
                // toast.success("Bank Created.")
              } catch (error) {
                console.error("Error submitting form:", error);
                // toast.error("Error In Creating the Bank.")
                // Optionally, set some error state here to show an error message in the UI
              } finally {
                setSubmitting(false);
              }
            }}

          >
            {({
              isSubmitting,
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
            }) => (
              <>
                <div className="flex gap-5 my-5 w-full">

                  <div className="w-[33%]">
                    <TextInput
                      name="Accountdisplayname"
                      type="text"
                      placeholder=""
                      label="Account Display Name"
                      value={values.Accountdisplayname}
                      onChange={handleChange("Accountdisplayname")}
                      onBlur={handleChange("Accountdisplayname")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[33%]">
                    <TextInput
                      name="openingBalance"
                      type="text"
                      placeholder=""
                      label="openingBalance"
                      value={values.openingBalance}
                      onChange={handleChange("openingBalance")}
                      onBlur={handleChange("openingBalance")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[33%]">
                    <TextInput
                      name="date"
                      type="date"
                      placeholder=""
                      label="date"
                      value={values.date}
                      onChange={handleChange("date")}
                      onBlur={handleChange("date")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                </div>
                <div className="border border-gray-300 rounded-md w-[100%] px-4 py-3">

                  <div className="flex flex-col gap-4">
                    <Checkbox title="Print UPI QR Code on Invoices" onCheck={handleCheck} />
                    <Checkbox title="Print bank details on invoices" onCheck={handleCheck} />
                  </div>

                  {checkedItems.includes("Print UPI QR Code on Invoices") &&
                    <>
                      <div className="flex flex-wrap gap-5 my-5 w-[100%]">

                        <div className="w-[30%]">
                          <TextInput
                            name="AccountNumber"
                            type="text"
                            placeholder=""
                            label="Account Number"
                            value={values.AccountNumber}
                            onChange={handleChange("AccountNumber")}
                            onBlur={handleChange("AccountNumber")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        <div className="w-[30%]">
                          <TextInput
                            name="Ifsccode"
                            type="text"
                            placeholder=""
                            label="IFSC Code"
                            value={values.Ifsccode}
                            onChange={handleChange("Ifsccode")}
                            onBlur={handleChange("Ifsccode")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        <div className="w-[30%]">
                          <TextInput
                            name="UPIID"
                            type="text"
                            placeholder=""
                            label="UPI ID for QR Code"
                            value={values.UPIID}
                            onChange={handleChange("UPIID")}
                            onBlur={handleChange("UPIID")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        <div className="w-[30%]">
                          <TextInput
                            name="Bankname"
                            type="text"
                            placeholder=""
                            label="Bank Name"
                            value={values.Bankname}
                            onChange={handleChange("Bankname")}
                            onBlur={handleChange("Bankname")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        {checkedItems.includes("Print bank details on invoices") &&
                          <div className="w-[30%]">
                            <TextInput
                              name="Accountholdername"
                              type="text"
                              placeholder=""
                              label="Account Holder Name"
                              value={values.Accountholdername}
                              onChange={handleChange("Accountholdername")}
                              onBlur={handleChange("Accountholdername")}
                              istouched={true}
                              className="text-gray-800 text-base w-[30%]"
                            />
                          </div>
                        }
                      </div>

                    </>
                  }

                </div>




                <div
                  className="bg-[#FF8900] rounded-lg mt-5 items-end px-5 w-fit text-white py-2"
                  onClick={() => handleSubmit()}
                >
                  Save
                </div>
              </>
            )}
          </Formik> : 
           <Formik
            initialValues={{
              Accountdisplayname: "",
              openingBalance: "",
              date: "",
              AccountNumber: "",
              Ifsccode: "",
              UPIID: "",
              Bankname: "",
              Accountholdername: "",
            }}
            validationSchema={""}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Handle form submission
                console.log("Submitting form with values:", values);
                const value = {
                  "displayName": values.Accountdisplayname,
                  "openingBalance": values.openingBalance,
                  "asOfDate": values.date,
                  "accountNumber": values.AccountNumber,
                  "ifscCode": values.Ifsccode,
                  "bankName": values.Bankname,
                  "accountHolderName": values.Accountholdername,

                }
                // const res = await AddBankAccount(token, firmid, value);
                // console.log(">>>>>>>>", res)
                setModalopen(false)
                // toast.success("Bank Created.")
              } catch (error) {
                console.error("Error submitting form:", error);
                // toast.error("Error In Creating the Bank.")
                // Optionally, set some error state here to show an error message in the UI
              } finally {
                setSubmitting(false);
              }
            }}

          >
            {({
              isSubmitting,
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
            }) => (
              <>
                <div className="flex gap-5 my-5 w-full">

                  <div className="w-[33%]">
                    <TextInput
                      name="Accountdisplayname"
                      type="text"
                      placeholder=""
                      label="Account Display Name"
                      value={values.Accountdisplayname}
                      onChange={handleChange("Accountdisplayname")}
                      onBlur={handleChange("Accountdisplayname")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[33%]">
                    <TextInput
                      name="openingBalance"
                      type="text"
                      placeholder=""
                      label="openingBalance"
                      value={values.openingBalance}
                      onChange={handleChange("openingBalance")}
                      onBlur={handleChange("openingBalance")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                  <div className="w-[33%]">
                    <TextInput
                      name="date"
                      type="date"
                      placeholder=""
                      label="date"
                      value={values.date}
                      onChange={handleChange("date")}
                      onBlur={handleChange("date")}
                      istouched={true}
                      className="text-gray-800 text-base w-[30%]"
                    />
                  </div>
                </div>
                <div className="border border-gray-300 rounded-md w-[100%] px-4 py-3">

                  <div className="flex flex-col gap-4">
                    <Checkbox title="Print UPI QR Code on Invoices" onCheck={handleCheck} />
                    <Checkbox title="Print bank details on invoices" onCheck={handleCheck} />
                  </div>

                  {checkedItems.includes("Print UPI QR Code on Invoices") &&
                    <>
                      <div className="flex flex-wrap gap-5 my-5 w-[100%]">

                        <div className="w-[30%]">
                          <TextInput
                            name="AccountNumber"
                            type="text"
                            placeholder=""
                            label="Account Number"
                            value={values.AccountNumber}
                            onChange={handleChange("AccountNumber")}
                            onBlur={handleChange("AccountNumber")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        <div className="w-[30%]">
                          <TextInput
                            name="Ifsccode"
                            type="text"
                            placeholder=""
                            label="IFSC Code"
                            value={values.Ifsccode}
                            onChange={handleChange("Ifsccode")}
                            onBlur={handleChange("Ifsccode")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        <div className="w-[30%]">
                          <TextInput
                            name="UPIID"
                            type="text"
                            placeholder=""
                            label="UPI ID for QR Code"
                            value={values.UPIID}
                            onChange={handleChange("UPIID")}
                            onBlur={handleChange("UPIID")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        <div className="w-[30%]">
                          <TextInput
                            name="Bankname"
                            type="text"
                            placeholder=""
                            label="Bank Name"
                            value={values.Bankname}
                            onChange={handleChange("Bankname")}
                            onBlur={handleChange("Bankname")}
                            istouched={true}
                            className="text-gray-800 text-base w-[30%]"
                          />
                        </div>
                        {checkedItems.includes("Print bank details on invoices") &&
                          <div className="w-[30%]">
                            <TextInput
                              name="Accountholdername"
                              type="text"
                              placeholder=""
                              label="Account Holder Name"
                              value={values.Accountholdername}
                              onChange={handleChange("Accountholdername")}
                              onBlur={handleChange("Accountholdername")}
                              istouched={true}
                              className="text-gray-800 text-base w-[30%]"
                            />
                          </div>
                        }
                      </div>

                    </>
                  }

                </div>




                <div
                  className="bg-[#FF8900] rounded-lg mt-5 items-end px-5 w-fit text-white py-2"
                  onClick={() => handleSubmit()}
                >
                  Save
                </div>
              </>
            )}
          </Formik>}
          

        </>
      </Modal>
      <Modal
        isOpen={BankToCashTransfer}
        onClose={() => SetBankToCashTransfer(false)}
        type="BankTransfer"
      >
        <>
          <div className="pb-2 flex">Bank To Cash Transfer</div>
          <BankToCash data={data} SetBankToCashTransfer={SetBankToCashTransfer} />
        </>
      </Modal>

      <Modal
        isOpen={CashToBankTransfer}
        onClose={() => SetCashToBankTransfer(false)}
        type="BankTransfer"
      >
        <>
          <div className="pb-2 flex">Cash To Bank Transfer</div>
          <CashToBank data={data} SetCashToBankTransfer={SetCashToBankTransfer}/>
        </>
      </Modal>
      <Modal
        isOpen={BankToBankTransfer}
        onClose={() => SetBankToBankTransfer(false)}
        type="BankTransfer"
      >
        <>
          <div className="pb-2 flex">Bank To Bank Transfer</div>
          <BankToBank data={data} SetBankToBankTransfer={SetBankToBankTransfer}/>
        </>
      </Modal>
      <Modal
        isOpen={AdjusmentBankEntry}
        onClose={() => SetAdjusmentBankEntry(false)}
        type="BankTransfer"
      >
        <>
          <div className="pb-2 flex">Adjust to Bank Transfer</div>
          <Adjustmentbank data={data} SetAdjusmentBankEntry={SetAdjusmentBankEntry}/>
        </>
      </Modal>

    </>
  );
}
