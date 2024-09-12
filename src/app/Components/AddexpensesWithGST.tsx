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
import { components } from 'react-select';
import AddexpenseswithGSTtable from "./AddexpenseswithGSTtable";

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

const firmid = localStorage.getItem("selectedStore");

export default function AddexpensesWithGST({ product }: any) {
    console.log("product", product)
    const session = useSession();
    const token = localStorage.getItem("authToken");
    const auth = new pos_controller()
    useEffect(() => {
        Getparty(token, firmid)
            .then((res) => { console.log(">>>>>>>>>>>", res); setParties(res?.data?.data) })
            .catch((err) => {
                console.log(err);
            });
    }, [token, firmid]);
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
    const [modalopen, setModalopen] = useState(false);
    const [selectedstate, setSelectedstate] = useState<any>();
    const [data, setData] = useState<any>([]);
    const [touchedstate, setTouchedstate] = useState({ state: false })
    const [SelectedExpenses, setSelectedExpenses] = useState<any>()
    const [invoice, setInvoice] = useState<any>();
    const router = useRouter();
    const [roundOffValues, setRoundOffValues] = useState<any>("")
    const AddCategoryOption = (props: any) => (
        <components.Option {...props}>
            {props.data.label === 'ADD_CATEGORY' ? (
                <button className="text-orange-500" onClick={() => { props.selectOption(props.data); setModalopen(!modalopen) }}>Add Category</button>
            ) : (
                props.children
            )}
        </components.Option>
    );
    useEffect(() => {
        if (typeof totalAmount === 'number') {
            let decimalPart = totalAmount - Math.floor(totalAmount);
            let roundOffValue = decimalPart < 0.5 ? `-${decimalPart.toFixed(2)}` : `+${(1 - decimalPart).toFixed(2)}`;
            console.log(roundOffValue)
            setRoundOffValues(roundOffValue);
        }
    }, [totalAmount]);
    const [Expenses, setExpenses] = useState<any>([]);

    const [update, setupdate] = useState(false);
    useEffect(() => {
        GetExpensesCategory(token, firmid)
            .then((res) => { setExpenses(res?.data), setupdate(false) })
            .catch((err) => {
                console.log(err);
            });
    }, [token, firmid, update]);
    const allExpenses = Expenses?.map((option: any) => ({
        value: option?.expenseCategoryName?.toUpperCase(),
        label: option?.expenseCategoryName?.toUpperCase(),
        id: option?.id,
    }));
    const handleChangedExpenses = (selectedOption: any) => {
        if (selectedOption.label === 'ADD_CATEGORY') {
            // Handle adding new category here
            console.log('Add new category clicked');
            // You can open a modal or perform any action to add a new category
        } else {
            console.log('selected csssssswwwwwss--->>>', selectedOption);
            setSelectedExpenses(selectedOption.id);
        }
    };
    const handleFormSubmit = async (values: any, { setSubmitting,reset }: any) => {
        try {
            console.log("After createInvoiceItem");
            console.log("R");
            const value = {

                partiesName: SelectedParties,
                expenseCategory: SelectedExpenses,
                expenseNumber: values.ExpensesNumber,
                billDate: values.invoicedate,
                state: selectedstate.value,
                paymentType: [SelectedPaymenttype],
                amount: [values.total],
                shipping: values.Shipping,
                adjustment: values.AdjustmentPrice,
                roundOff: values.roundoff ?? 0,
                totalExpenseAmount: totalAmount + values.roundoff ?? 0,
                totalQuantity: 1,
                totalTax: totalTax,
                totalDiscount: discountAmount,
                totalItemAmount: totalAmount,
                description: values.description,
                items: selectedProduct,

            }
            console.log(value)
            const res = await AddExpensesWithoutGST(token, firmid, "withGST", value,SelectedExpenses)
            console.log("AddExpensesWithoutGST added", res)
            reset()
            // router.push(res)

            // res.setHeader('Content-Type', 'application/pdf');
            // await CreateInvoiceItem(values,SelectedParties,SelectedPaymenttype, storeid, firm, selectedProduct, totalTax, discountAmount, totalAmount)
            //   .then((res) => { setInvoice(res?.newInvoiceItem); router.push(`addsale/${res?.newInvoiceItem?.id}`) });


        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        State(token).then((res) => {
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
                    ExpensesCategory: "",
                    ExpensesNumber: "",
                    ExpensesName: "",
                    phonenumber: "",
                    Shipping: "",
                    AdjustmentPrice: "",
                    date: new Date().toISOString().split('T')[0],
                    paymenttype: "",
                    roundoff: "",
                    total: 0,
                    description: "",
                    RefNumber: "",


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
                                        <div className="text-[#808080]">Parties Name</div>
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
                                    <div className="w-[100%] flex flex-col space-y-2 ">
                                        <div className="text-[#808080]">Expenses Category</div>
                                        <Select
                                            name="ExpensesName"
                                            options={[...allExpenses, { label: 'ADD_CATEGORY', value: 'ADD_CATEGORY' }]}
                                            value={allExpenses.find((expense: any) => expense.id === SelectedExpenses)}
                                            onChange={handleChangedExpenses}
                                            styles={customStyles}
                                            className="w-full bg-white rounded-md outline-none font-medium font-optima text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                                            components={{ Option: AddCategoryOption }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-[23%] flex gap-2 items-end">
                                <div className="w-[70%]">
                                    <TextInput
                                        name="ExpensesNumber"
                                        type="number"
                                        placeholder=""
                                        label="Expenses Number"
                                        value={values.ExpensesNumber}
                                        onChange={handleChange("ExpensesNumber")}
                                        onBlur={handleChange("ExpensesNumber")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[100%]"
                                    />
                                </div>
                            </div>

                            <div className="w-[23%] flex gap-2 items-end">
                                <div className="w-[70%]">
                                    <TextInput
                                        name="date"
                                        type="date"
                                        placeholder=""
                                        label="Date"
                                        value={values.date}
                                        onChange={handleChange("Date")}
                                        onBlur={handleChange("Date")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[100%]"
                                        min={new Date().toISOString().split('T')[0]}
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
                            <AddexpenseswithGSTtable
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
                                        name="Shipping"
                                        type="number"
                                        placeholder=""
                                        label="Shipping"
                                        value={values.Shipping}
                                        onChange={handleChange("Shipping")}
                                        onBlur={handleChange("Shipping")}
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
                            <div className="w-[25%] flex gap-2 items-end">
                                <div className="w-[70%]">
                                    <TextInput
                                        name="AdjustmentPrice"
                                        type="number"
                                        placeholder=""
                                        label="Adjustment Price"
                                        value={values.AdjustmentPrice}
                                        onChange={handleChange("AdjustmentPrice")}
                                        onBlur={handleChange("AdjustmentPrice")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[100%]"
                                    />
                                </div>
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



