import TextInput from '@/app/Components/Textinput';
import pos_controller from '@/controller/posauth';
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React from 'react'




export default function StockReduce({ selectedproduct }: any) {

    if(!selectedproduct){
        throw Error("First Select the product")
    }
    console.log("selectedproduct", selectedproduct)
    const firmid = localStorage.getItem("selectedStore");
    if (!firmid) {
        throw Error("vfdbkn")
    }
    console.log("firmisdv", firmid)
    const session = useSession();
    const token = session?.data?.uToken;
    const auth = new pos_controller()
    const submitForm = async (
        values: any,
        { setFieldError, setSubmitting, resetForm }: any
    ) => {
        console.log("Form values:", values);
        try {
            setSubmitting(true);
            const res = await ItemStockAdjustment(values, token, selectedproduct.item.id, firmid, "reduce")
            console.log(res)
            resetForm();
        } catch (err) {
            console.log("Error:", err);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div>
            <Formik
                initialValues={{
                    Date: "",
                    qty: "",
                    price: "",
                    details: "",

                }}
                onSubmit={submitForm}
                validationSchema={""}
            >
                {({ handleChange, handleSubmit, values, errors, touched }: any) => {
                    return (
                        <>
                            <div className='border-b py-5 flex justify-between'>
                                <div className='flex flex-col space-y-2'>
                                    <div className='text-[#808080]'>Item Name</div>
                                    <div className='text-gray-800 text-[17px] font-semibold'>
                                        {selectedproduct?.item?.itemName}
                                    </div>

                                </div>
                                <div className="w-[30%]">
                                    <TextInput
                                        name="Date"
                                        type="date"
                                        placeholder=""
                                        label="Adjustment Date"
                                        value={values.Date}
                                        onChange={handleChange("Date")}
                                        onBlur={handleChange("Date")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[30%]"
                                    />
                                </div>

                            </div>
                            <div className='flex w-full justify-between py-5'>
                                <div className="w-[30%]">
                                    <TextInput
                                        name="qty"
                                        type="text"
                                        placeholder=""
                                        label="Total Qty"
                                        value={values.qty}
                                        onChange={handleChange("qty")}
                                        onBlur={handleChange("qty")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[30%]"
                                    />
                                </div>
                                <div className="w-[30%]">
                                    <TextInput
                                        name="price"
                                        type="text"
                                        placeholder=""
                                        label="At Price"
                                        value={values.price}
                                        onChange={handleChange("price")}
                                        onBlur={handleChange("price")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[30%]"
                                    />
                                </div>
                                <div className="w-[30%]">
                                    <TextInput
                                        name="details"
                                        type="text"
                                        placeholder=""
                                        label="Details"
                                        value={values.details}
                                        onChange={handleChange("details")}
                                        onBlur={handleChange("details")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[30%]"
                                    />
                                </div>

                            </div>
                            <div className='flex justify-center'>
                                <div
                                    className="bg-[#FF8900] rounded-full px-5 text-white py-2"
                                    onClick={() => handleSubmit()}
                                >
                                    Save
                                </div>
                            </div>
                        </>
                    );
                }}
            </Formik>

        </div>
    )
}
