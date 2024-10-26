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
import Modal from "./Modal";
import AddExpensesTable from "./Addexpensestable";

const validationSchema = Yup.object({
    ExpensesName: Yup.string().required("Required"),
    phonenumber: Yup.string().required("Required"),
    invoicenumber: Yup.number().required("Required"),
    invoicedate: Yup.date().required("Required"),
    paymenttype: Yup.string().required("Required"),
    roundoff: Yup.number().required("Required"),
    total: Yup.number().required("Required"),
    advanceamount: Yup.number().required("Required"),
    description: Yup.string().required("Required"),
});




export default function AddExpenses() {
    // console.log("product", product)
    const session = useSession();
    const token = ""
    const [modalopen, setModalopen] = useState(false);
    const [update, setupdate] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    console.log("selectedProducts", selectedProducts)
    const headers = [
        { key: "sno", label: "S.No", show: true },
        { key: "productname", label: "Product Name", show: true },
        { key: "quantity", label: "Quantity", show: true },
        { key: "unitprice", label: "Unit Price", show: true },
        { key: "amount", label: "Amount", show: true },
    ];

    const [Expenses, setExpenses] = useState<any>([]);
    const [Expensestype, setExpensestype] = useState<any>(["DIRECT EXPENSES", "INDIRECT EXPENSES"]);
    const [selectedExpensestype, setSelectedExpensestype] = useState<any>([]);
    const AddCategoryOption = (props: any) => (
        <components.Option {...props}>
            {props.data.label === 'ADD_CATEGORY' ? (
                <button className="text-orange-500" onClick={() => { props.selectOption(props.data); setModalopen(!modalopen) }}>Add Category</button>
            ) : (
                props.children
            )}
        </components.Option>
    );
    console.log("Expenses", Expenses)
    // useEffect(() => {
    //     GetExpensesCategory(token, firmid)
    //         .then((res) => { setExpenses(res?.data), setupdate(false) })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [token, firmid, update]);
    const allExpenses = Expenses?.map((option: any) => ({
        value: option?.expenseCategoryName?.toUpperCase(),
        label: option?.expenseCategoryName?.toUpperCase(),
        id: option?.id,
    }));
    const allExpensestype = Expensestype?.map((option: any) => ({
        value: option?.toUpperCase(),
        label: option?.toUpperCase(),
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
    const [paymenttype, setPaymenttype] = useState(["Cash", "Cheque"])
    const allpaymenttype = paymenttype?.map((option: any) => ({
        value: option.toUpperCase(),
        label: option.toUpperCase(),
    }));
    const handleChangedpaymenttype = (selectedOption: any) => {
        console.log("selected csssssswwwwwss--->>>", selectedOption);
        setSelectedPaymenttype(selectedOption.value);
    };
    const handleChangedExpensestype = (selectedOption: any) => {
        console.log("selected csssssswwwwwss--->>>", selectedOption);
        setSelectedExpensestype(selectedOption.value);
    };
    const [SelectedPaymenttype, setSelectedPaymenttype] = useState<any>()
    // console.log("SelectedPaymenttype", SelectedPaymenttype)
    const [SelectedExpenses, setSelectedExpenses] = useState<any>()
    console.log("SelectedExpenses",SelectedExpenses)
    const [selectedProduct, setSelectedProduct] = useState();
    // console.log("selectedProduct", selectedProduct)
    const [totalTax, setTotalTax] = useState();
    // console.log("totalTax", totalTax)
    const [discountAmount, setDiscountAmount] = useState();
    // console.log("discountAmount", discountAmount)
    const [totalAmount, setTotalAmount] = useState<any>();
    // console.log("totalAmount", totalAmount)
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
                expenseCategory: SelectedExpenses,
                expenseNumber: values.phonenumber,
                billDate: values.invoicedate,
                state: selectedstate,
                description: values.description,
                totalExpenseAmount: values.total,
                roundOff: values.roundoff ?? 0,
                totalItemAmount: totalAmount,
                totalQuantity: 1,
                items: selectedProducts,
                paymentType:[SelectedPaymenttype],
            }
            console.log(value)
            // const res = await AddExpensesWithoutGST(token, firmid, "withoutGST", value,SelectedExpenses)
            // console.log("AddsaleEstimate added", res)




        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    // useEffect(() => {
    //     State(token).then((res) => {
    //         setData(res?.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, [token]);
    const stateoption = data?.map((option: any) => ({
        value: option?.name.toUpperCase(),
        label: option?.name.toUpperCase(),
    }));
    const handleChangedstate = (selectedOption: any) => {
        setSelectedstate(selectedOption);
    };

    const submitForm = async (
        values: any,
        { setFieldError, setSubmitting, resetForm }: any
    ) => {
        console.log("Form values:", values);
        try {
            setSubmitting(true);
            // const res = await AddExpensesCategory(token, firmid, values.Categoryname, selectedExpensestype)
            // console.log("defv", res)
            resetForm();
            setupdate(true)
            setModalopen(false)
        } catch (err) {
            console.log("Error:", err);
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <>
            <Formik
                initialValues={{
                    ExpensesName: "",
                    phonenumber: "",
                    invoicedate: new Date().toISOString().split('T')[0],
                    paymenttype: "",
                    roundoff: "",
                    total: 0,
                    description: "",


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
                                        <div className="text-[#808080]">Expenses Category</div>
                                        <Select
                                            name="ExpensesName"
                                            options={[...allExpenses, { label: 'ADD_CATEGORY', value: 'ADD_CATEGORY' }]}
                                            value={allExpenses?.find((expense: any) => expense.id === SelectedExpenses)}
                                            onChange={handleChangedExpenses}
                                            styles={customStyles}
                                            className="w-full bg-white rounded-md outline-none font-medium font-optima text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                                            components={{ Option: AddCategoryOption }}
                                        />
                                    </div>
                                </div>
                                <div
                                    onClick={() => router.push("/pos/Expenses")}
                                    className="bg-[#faaa10] hover:text-[#faaa10] text-white rounded-lg px-3 border-2 border-[#E5C778] hover:bg-[#f7deb0] items-center mt-2 flex h-[45px] cursor-pointer"
                                    title="Add Expenses"
                                >
                                    <MdGroupAdd size={25} />
                                </div>
                            </div>

                            <div className="w-[23%] flex gap-2 items-end">
                                <div className="w-[70%]">
                                    <TextInput
                                        name="ExpensesNumber"
                                        type="tel"
                                        placeholder=""
                                        label="Expenses Number"
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
                                        name="Date"
                                        type="date"
                                        placeholder=""
                                        label="Date"
                                        value={values.invoicedate}
                                        onChange={handleChange("invoicedate")}
                                        onBlur={handleChange("invoicedate")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[100%]"
                                        min={new Date().toISOString().split('T')[0]}
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
                            <AddExpensesTable
                                setSelectedProduct={setSelectedProducts}
                                setTotalAmount={setTotalAmount}
                                headers={headers}
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
            <Modal isOpen={modalopen} onClose={() => setModalopen(false)}>
                <Formik initialValues={{ Categoryname: "" }} onSubmit={submitForm} validationSchema={""}>
                    {({ handleChange, handleSubmit, values, errors, touched }: any) => {
                        return (
                            <>
                                <div className="pb-3 border-b border-groove flex">Add Category</div>
                                <div className="flex flex-col gap-5 my-5 w-full">
                                    <div className="w-[25%]">
                                        <TextInput
                                            name="Categoryname"
                                            type="text"
                                            placeholder=""
                                            label="Category Name"
                                            value={values.Categoryname}
                                            onChange={handleChange("Categoryname")}
                                            onBlur={handleChange("Categoryname")}
                                            istouched={true}
                                            className="text-gray-800 text-base w-[30%]"
                                        />
                                    </div>
                                    <div className="w-[25%] flex flex-col space-y-2 ">
                                        <div className="text-[#808080]">Expensestype</div>
                                        <Select
                                            name="Expensestype"
                                            options={allExpensestype}
                                            value={selectedExpensestype?.value}
                                            onChange={handleChangedExpensestype}
                                            styles={customStyles}
                                            className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="bg-[#FF8900] w-fit rounded-lg px-5 text-white py-2"
                                    onClick={() => handleSubmit()}
                                >
                                    Save
                                </div>
                            </>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
}



