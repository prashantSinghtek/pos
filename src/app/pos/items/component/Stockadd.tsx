import TextInput from '@/app/Components/Textinput';
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Stockadd() {

    const submitForm = async (
        values: any,
        { setFieldError, setSubmitting, resetForm }: any
    ) => {
        console.log("Form values:", values);
        try {
            setSubmitting(true);
            // const res = await ItemStockAdjustment(values, token, selectedproduct.item.id, firmid, "add")
            // console.log(res)
            // resetForm();
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
                            <div className='border-b pt-[30px] pb-[20px] flex justify-between'>
                                <div className='flex flex-col space-y-2'>
                                    <div className='text-[#808080] text-[16px] font-medium'>Item Name</div>
                                    <div className='text-[#1F1F1F] mt-[10px] text-[16px] font-semibold'>
                                        ToothPaste
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
                                        className="text-gray-800 text-base w-[30%] focus:outline-none"
                                    />
                                </div>

                            </div>
                            <div className='flex w-full items-end justify-between py-5'>
                                <div className="w-[20%]">
                                    <TextInput
                                        name="qty"
                                        type="text"
                                        placeholder=""
                                        label="Total Qty"
                                        value={values.qty}
                                        onChange={handleChange("qty")}
                                        onBlur={handleChange("qty")}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[30%] focus:outline-none"
                                    />
                                </div>
                                <div className='w-[10%]'>
                                    <select className='border-[#D0D2D6] border p-[11px] rounded-[6px] w-[100%]'>
                                        <option value="someOption">Pac
                                        </option>
                                        <option value="otherOption">Pcs</option>
                                    </select>
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
                                        className="text-gray-800 text-base w-[30%] focus:outline-none"
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
                                        className="text-gray-800 text-base w-[30%] focus:outline-none"
                                    />
                                </div>

                            </div>
                            <div className='flex justify-center mt-[40px]'>
                                <div
                                    className="bg-[#FF8900] cursor-pointer rounded-full px-[60px] text-[16px] text-white py-[15px]"
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
