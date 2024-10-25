"use client"
import React, { useContext, useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import TextInput from "./Textinput";
import Textarea from "./Textarea";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
  import Select from "react-select";
import { customStyles } from "./Customstyle";

import Table from "./Addsaletable";
import PaymentType from "./PaymentType";
import { addSaleCredit,  getState } from "@/controller/posauth";

const validationSchema = Yup.object({
  partiesName: Yup.string().required("Required"),
  phonenumber: Yup.string().required("Required"),
  invoicenumber: Yup.number().required("Required"),
  invoicedate: Yup.date().required("Required"),
  paymenttype: Yup.string().required("Required"),
  roundoff: Yup.number().required("Required"),
  total: Yup.number().required("Required"),
  advanceamount: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
});


export default function AddCreditSale({ product }: any) {
  console.log("product", product)
  const session = useSession();
  const token = localStorage.getItem("authToken");

  const [parties, setParties] = useState<any>([]);
  const allparties = parties?.map((option: any) => ({
    value: option?.partyName?.toUpperCase(),
    label: option?.partyName?.toUpperCase(),
    id: option?.id,
  }));
  const handleChangedParties = (selectedOption: any) => {
    console.log("selected csssssswwwwwss--->>>", selectedOption);
    setSelectedParties(selectedOption.id);
  };
  const [paymenttype, setPaymenttype] = useState(["Cash", "Cheque"])
  const allpaymenttype = paymenttype?.map((option: any) => ({
    value: option.toUpperCase(),
    label: option.toUpperCase(),
  }));
  const handleChangedpaymenttype = (selectedOption: any) => {
    console.log("selected csssssswwwwwss--->>>", selectedOption);
    setSelectedPaymenttype(selectedOption.value);
  };
  const [SelectedPaymenttype, setSelectedPaymenttype] = useState<any>()
  console.log("SelectedPaymenttype", SelectedPaymenttype)
  const [SelectedParties, setSelectedParties] = useState<any>()
  const [selectedProduct, setSelectedProduct] = useState();
  console.log("selectedProduct", selectedProduct)
  const [totalTax, setTotalTax] = useState();
  console.log("totalTax", totalTax)
  const [discountAmount, setDiscountAmount] = useState();
  console.log("discountAmount", discountAmount)
  const [totalAmount, setTotalAmount] = useState<any>();
  console.log("totalAmount", totalAmount)
  const [selectedstate, setSelectedstate] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [touchedstate, setTouchedstate] = useState({ state: false })

  const [invoice, setInvoice] = useState<any>();
  const router = useRouter();
  const [roundOffValues, setRoundOffValues] = useState<any>("")

  useEffect(() => {
    if (typeof totalAmount === 'number') {
      let decimalPart = totalAmount - Math.floor(totalAmount);
      let roundOffValue = decimalPart < 0.5 ? `-${decimalPart.toFixed(2)}` : `+${(1 - decimalPart).toFixed(2)}`;
      console.log(roundOffValue)
      setRoundOffValues(roundOffValue);
    }
  }, [totalAmount]);

  const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log("After createInvoiceItem");
      console.log("R");
      const value = {
        partiesName: SelectedParties,
        phoneNumber: values.phonenumber,
        invoiceNumber: values.invoicenumber,
        billingAddress: values.BillingAddress,
        invoiceDate: values.invoicedate,
        state: selectedstate.value,
        paymentType: [SelectedPaymenttype],
        amount: [values.advanceamount],
        roundOff: values.roundoff,
        totalInvoiceAmount: values.total,
        receivedAmount: values.advanceamount,
        referenceNumber: values.RefNumber,
        description: values.description,
        remainingBalance: values.total - values.advanceamount,
        totalAmount: totalAmount,
        totalTax: totalTax,
        totalDiscount: discountAmount,
        totalQuantity: 1,
        items: selectedProduct
      }
      console.log(value)
      const res = await addSaleCredit( "", value)
      console.log("sale added", res)
      router.push(res)
      // await CreateInvoiceItem(values,SelectedParties,SelectedPaymenttype, storeid, firm, selectedProduct, totalTax, discountAmount, totalAmount)
      //   .then((res) => { setInvoice(res?.newInvoiceItem); router.push(`addsale/${res?.newInvoiceItem?.id}`) });


    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getState().then((res) => {
      setData(res?.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [token]);
  const stateoption = data?.map((option: any) => ({
    value: option?.name.toUpperCase(),
    label: option?.name.toUpperCase(),
  }));
  const handleChangedstate = (selectedOption: any) => {
    setSelectedstate(selectedOption);
  };



  return (
    <>
      <Formik
        initialValues={{
          partiesName: "",
          phonenumber: "",
          invoicenumber: "",
          invoicedate: new Date().toISOString().split('T')[0],
          paymenttype: "",
          roundoff: "",
          total: 0,
          advanceamount: 0,
          description: "",
          RefNumber: "",
          BillingAddress: "",
        }}
        validationSchema={""}
        onSubmit={handleFormSubmit}
      >
        {({ values, isSubmitting, handleSubmit, handleChange, touched }) => (
          <div className="">
            <div className="flex w-[100%] flex-wrap gap-5">
              <div className="w-[23%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <div className="w-[100%] flex flex-col space-y-2 ">
                    <div className="text-[#808080]">Billing Name</div>
                    <Select
                      name="partiesName"
                      options={allparties}
                      value={SelectedParties?.value}
                      onChange={handleChangedParties}
                      styles={customStyles}
                      className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                    />
                  </div>
                </div>
                <div
                  onClick={() => router.push("/pos/parties")}
                  className="bg-[#faaa10] hover:text-[#faaa10] text-white rounded-lg px-3 border-2 border-[#E5C778] hover:bg-[#f7deb0] items-center mt-2 flex h-[45px] cursor-pointer"
                  title="Add Parties"
                >
                  <MdGroupAdd size={25} />
                </div>
              </div>

              <div className="w-[23%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="phonenumber"
                    type="tel"
                    placeholder=""
                    label="Phone Number"
                    value={values.phonenumber}
                    onChange={handleChange("phonenumber")}
                    onBlur={handleChange("phonenumber")}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                  />
                </div>
              </div>

              <div className="w-[23%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="invoicenumber"
                    type="number"
                    placeholder=""
                    label="Invoice Number"
                    value={values.invoicenumber}
                    onChange={handleChange("invoicenumber")}
                    onBlur={handleChange("invoicenumber")}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                  />
                </div>
              </div>

              <div className="w-[23%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="invoicedate"
                    type="date"
                    placeholder=""
                    label="Invoice Date"
                    value={values.invoicedate}
                    onChange={handleChange("invoicedate")}
                    onBlur={handleChange("invoicedate")}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="w-[23%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="BillingAddress"
                    type="text"
                    placeholder=""
                    label="Billing Address"
                    value={values.BillingAddress}
                    onChange={handleChange("BillingAddress")}
                    onBlur={handleChange("BillingAddress")}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                  />
                </div>
              </div>
              <div className="w-[23%]  ">
                <div className="w-[70%] flex-col space-y-2">

                  <div className="text-[#808080]">
                    State
                  </div>
                  <Select
                    options={stateoption}
                    placeholder={""}
                    value={selectedstate}
                    onChange={handleChangedstate}
                    onBlur={() => setTouchedstate({ ...touchedstate, state: true })}
                    styles={customStyles}
                    className="  outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                  />
                </div>

              </div>
              <div className="w-[21%] flex-col  space-y-2 ">
                <div className="text-gray-500">Image</div>
                <div className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]">
                  Choose File
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Table
                productList={product}
                setTotalamount={setTotalAmount}
                setDiscountamount={setDiscountAmount}
                setSelectedproduct={setSelectedProduct}
                setTotaltax={setTotalTax}
              />
            </div>

            <div className="flex w-[100%] flex-wrap gap-10 my-5">

              <div className="w-[25%] flex gap-2 items-end">
                <div className="w-[70%]">

                  <div className="w-[100%] flex flex-col space-y-2 ">
                    <div className="text-[#808080]">Payment Type</div>
                    <Select
                      name="paymenttype"
                      options={allpaymenttype}
                      value={SelectedPaymenttype?.value}
                      onChange={handleChangedpaymenttype}
                      styles={customStyles}
                      className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                    />
                  </div>
                </div>
              </div>

              <div className="w-[15%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="roundoff"
                    type="number"
                    placeholder=""
                    label="Round Off"
                    value={roundOffValues}
                    onChange={(e) => console.log(e.target.value)}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                  />
                </div>
              </div>

              <div className="w-[25%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="total"
                    type="number"
                    placeholder=""
                    label="Total"
                    value={values.total}
                    onChange={handleChange("total")}
                    onBlur={handleChange("total")}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                  />
                </div>
              </div>

              <div className="w-[25%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <TextInput
                    name="advanceamount"
                    type="number"
                    placeholder=""
                    label="Advance Amount"
                    value={values.advanceamount}
                    onChange={handleChange("advanceamount")}
                    onBlur={handleChange("advanceamount")}
                    istouched={true}
                    className="text-gray-800 text-base w-[100%]"
                  />
                </div>
              </div>
              {SelectedPaymenttype == 'CHEQUE' &&
                <div className="w-[25%] flex gap-2 items-end">
                  <div className="w-[70%]">
                    <TextInput
                      name="RefNumber"
                      type="text"
                      placeholder=""
                      label="Ref Number"
                      value={values.RefNumber}
                      onChange={handleChange("RefNumber")}
                      onBlur={handleChange("RefNumber")}
                      istouched={true}
                      className="text-gray-800 text-base w-[100%]"
                    />
                  </div>
                </div>
              }
            </div>

            <div className="w-[50%] flex gap-2 items-end">
                <div className="w-[70%]">
                  <PaymentType />
                </div>
              </div>

            <div className="w-[21%] flex-col my-5 space-y-2 ">
              <div className="text-gray-500">Add Document</div>
              <div className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]">
                Choose File
              </div>
            </div>

            <div>
              <Field
                name="description"
                render={({ field }: any) => (
                  <Textarea
                    {...field}
                    placeholder="Description"
                    label="Description"
                    className="text-gray-800 text-base w-[100%]"
                  />
                )}
              />
            </div>

            <div className="flex justify-end px-10 my-10">
              <div className="flex gap-5">
                <div

                  className="border border-[#2F9DDB] text-[#2F9DDB] px-10 text-lg py-2 rounded-full"
                >
                  Share
                </div>
                <div

                  onClick={() => handleSubmit()}
                  className="bg-[#FF8900] px-10 text-lg py-2 text-white rounded-full"
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}



