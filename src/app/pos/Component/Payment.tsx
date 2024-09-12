import { customStyles } from '@/app/Components/Customstyle';
import Textarea from '@/app/Components/Textarea';
import TextInput from '@/app/Components/Textinput';
import { addPaymentIn, getParty } from '@/controller/posauth';
import { Field, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import * as Yup from 'yup';

export default function Payment({ setOpen,defaultdata }: any) {
    const firmid = localStorage.getItem("selectedStore");
    if (!firmid) {
        throw new Error("Firm ID not found");
    }

    const session = useSession();
    const token = localStorage.getItem("authToken");
    const [parties, setParties] = useState<any[]>([]);
    const path = usePathname()
    useEffect(() => {
        if (token && firmid) {
            getParty(firmid)
                .then((res) => {
                    setParties(res?.data?.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [token, firmid]);

    const allparties = parties?.map((option: any) => ({
        value: option?.partyName?.toUpperCase(),
        label: option?.partyName?.toUpperCase(),
        id: option?.id,
    }));

    const [selectedParties, setSelectedParties] = useState<any>(null);
    const handleChangedParties = (selectedOption: any) => {
        setSelectedParties(selectedOption);
    };

    const paymentTypes = ["Cash", "Cheque"];
    const allpaymentTypes = paymentTypes?.map((option: any) => ({
        value: option.toUpperCase(),
        label: option.toUpperCase(),
    }));

    const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);
    const handleChangedPaymentType = (selectedOption: any) => {
        setSelectedPaymentType(selectedOption);
    };

    const [fieldValues, setFieldValues] = useState<File[]>([]);
    const handleImageChanges = (newFiles: FileList | null) => {
        if (newFiles) {
            setFieldValues(Array.from(newFiles));
        }
    };

    const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            console.log("Rfvxc")
            const formData = new FormData();
            formData.append("partiesName", selectedParties?.id);
            formData.append("receiptNumber", values.ReceiptNo);
            formData.append("date", values.date);
            formData.append("paymentType", selectedPaymentType?.value);
            {path != '/pos/purchase/paymentout' &&

                formData.append("receivedAmount", values.ReceivedAmount.toString());
            }
            {path ==  '/pos/purchase/paymentout' &&

                formData.append("paidAmount", values.ReceivedAmount.toString());
            }
            formData.append("amount", values.ReceivedAmount.toString());
            formData.append("description", values.description);
            formData.append("firmId", firmid);

            if (fieldValues.length > 0) {
                fieldValues.forEach((file: File) => {
                    formData.append("file", file);
                });
            }
            let res
            { path == '/pos/purchase/paymentout' ? res = await addPaymentIn(formData) : res = await addPaymentIn(formData); }

            setOpen(false)
            console.log(res);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        ReceiptNo: Yup.string().required('Receipt Number is required'),
        date: Yup.date().required('Date is required'),
        ReceivedAmount: Yup.number().required('Received Amount is required').positive('Amount must be positive'),
        description: Yup.string(),
        // RefNumber: Yup.string().when('selectedPaymentType', {
        //     is: (val: any) => val?.value === 'CHEQUE',
        //     then: Yup.string().required('Reference Number is required'),
        // }),
    });
console.log("defaultdata",defaultdata)
    return (
        <Formik
            initialValues={{
                partiesName: "",
                ReceiptNo: defaultdata?.receiptNumber,
                date: new Date().toISOString().split('T')[0],
                paymenttype: defaultdata?.paymentType[0],
                ReceivedAmount: defaultdata?.receivedAmount || 0,
                description: "",
                RefNumber: "",
            }}
            validationSchema={""}
            onSubmit={handleFormSubmit}
        >
            {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => (
                <form onSubmit={handleSubmit}>
                    <div className="flex w-[100%] flex-wrap gap-5">
                        <div className="w-[30%] flex gap-2 items-end">
                            <div className="w-[70%]">
                                <div className="w-[100%] flex flex-col space-y-2">
                                    <div className="text-[#808080]">Billing Name</div>
                                    <Select
                                        name="partiesName"
                                        options={allparties}
                                        value={selectedParties}
                                        onChange={handleChangedParties}
                                        styles={customStyles}
                                        className="w-full bg-white rounded-md outline-none font-medium font-optima text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-[30%] flex gap-2 items-end">
                            <div className="w-[70%]">
                                <TextInput
                                    name="ReceiptNo"
                                    type="text"
                                    placeholder=""
                                    label="Receipt Number"
                                    value={values.ReceiptNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[100%]"
                                />
                            </div>
                        </div>

                        <div className="w-[30%] flex gap-2 items-end">
                            <div className="w-[70%]">
                                <TextInput
                                    name="date"
                                    type="date"
                                    placeholder=""
                                    label="Date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[100%]"
                                />
                            </div>
                        </div>

                        <div className="w-[30%] flex gap-2 items-end">
                            <div className="w-[70%]">
                                <div className="w-[100%] flex flex-col space-y-2">
                                    <div className="text-[#808080]">Payment Type</div>
                                    <Select
                                        name="paymenttype"
                                        options={allpaymentTypes}
                                        value={selectedPaymentType}
                                        onChange={handleChangedPaymentType}
                                        styles={customStyles}
                                        className="w-full bg-white rounded-md outline-none font-medium font-optima text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {selectedPaymentType?.value === 'CHEQUE' && (
                            <div className="w-[30%] flex gap-2 items-end">
                                <div className="w-[70%]">
                                    <TextInput
                                        name="RefNumber"
                                        type="text"
                                        placeholder=""
                                        label="Ref Number"
                                        value={values.RefNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        istouched={true}
                                        className="text-gray-800 text-base w-[100%]"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="w-[30%] flex gap-2 items-end">
                            <div className="w-[70%]">
                                <TextInput
                                    name="ReceivedAmount"
                                    type="text"
                                    placeholder=""
                                    label="Received Amount"
                                    value={values.ReceivedAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[100%]"
                                />
                            </div>
                        </div>

                        <div className="w-[30%] flex gap-2 items-end">
                            <div className="w-[70%] flex-col space-y-2">
                                <div className="text-gray-500">Document</div>
                                <label htmlFor="fileInput" className="sr-only">
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    name="Signature"
                                    onChange={(e) => handleImageChanges(e.target.files)}
                                    className="border-dashed border-2 rounded-md px-3 py-2 text-center border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F]"
                                    aria-labelledby="fileInput"
                                />
                            </div>
                        </div>

                        <div className="w-full">
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

                        <div className="w-full">
                            <div className="flex justify-end px-10 my-10">
                                <div className="flex gap-5">
                                    <button
                                        type="button"
                                        className="border border-[#2F9DDB] text-[#2F9DDB] px-10 text-lg py-2 rounded-full"
                                    >
                                        Share
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#FF8900] px-10 text-lg py-2 text-white rounded-full"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}
