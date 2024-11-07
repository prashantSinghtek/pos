import { customStyles } from '@/app/Components/Customstyle';
import TextInput from '@/app/Components/Textinput';
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Select from "react-select";

export default function BankToCash({ data,SetBankToCashTransfer }: any) {
    const [fieldValues, setFieldValues] = useState<File[]>([]);
    const handleImageChanges = (newFiles: FileList | null) => {
        if (newFiles) {
            setFieldValues(Array.from(newFiles));
        }
    };
    const [Selectedbank, setSelectedbank] = useState<any>()
    const session = useSession();
    const token = ""

    const allbank = data?.map((option: any) => ({
      value: option?.displayName?.toUpperCase(),
      label: option?.displayName?.toUpperCase(),
      id: option?.id,
    }));
    const handleChangedbank = (selectedOption: any) => {
      console.log("selected csssssswwwwwss--->>>", selectedOption);
      setSelectedbank(selectedOption.id);
    };

    
    
    return (
        <div>
            <Formik
                initialValues={{
                    From: "",
                    To: "Cash",
                    date: "",
                    Amount: "",
                    Discription: "",
                    image: "",
                }}
                validationSchema={""}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        // Handle form submission
                        console.log("Submitting form with values:", values);
                        const formData = new FormData();
                        formData.append("fromAccount", Selectedbank);
                        formData.append("toAccount", values.To);
                        formData.append("amount", values.Amount);
                        formData.append("adjustmentDate", values.date);
                        formData.append("description", values.Discription);
                        formData.append("bankAccountId", Selectedbank);
                        formData.append("firmId",  "");
                        fieldValues.forEach((file: File) => {
                            formData.append("file", file);
                        });

                        // const response = await AddBankToCash(token , formData)
                        SetBankToCashTransfer(false)
                        // toast.success("Bank Created.")
                        // console.log(response);
                    } catch (error) {
                        console.error("Error submitting form:", error);
                        // toast.error("Error In Creating the Bank.")
                      
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
                        <div className="flex flex-wrap gap-5 my-5 w-full">

                            {/* <div className="w-[45%]">
                                <TextInput
                                    name="Accountdisplayname"
                                    type="text"
                                    placeholder=""
                                    label="From"
                                    value={values.From}
                                    onChange={handleChange("Accountdisplayname")}
                                    onBlur={handleChange("Accountdisplayname")}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[30%]"
                                />
                            </div> */}
                            <div className="w-[45%]">
                                <div className="w-[100%] flex flex-col space-y-2 ">
                                    <div className="text-[#808080]">From</div>
                                    <Select
                                        name="Accountdisplayname"
                                        options={allbank}
                                        value={Selectedbank?.value}
                                        onChange={handleChangedbank}
                                        styles={customStyles}
                                        className="w-full  bg-white  rounded-md outline-none font-medium font-optima  text-primary text-sm focus-within:outline-gray-200 focus-within:outline focus-within:outline-2"
                                    />
                                </div>
                            </div>
                            <div className="w-[45%]">
                                <TextInput
                                    name="To"
                                    type="text"
                                    placeholder=""
                                    label="To"
                                    value={values.To}
                                    // onChange={handleChange("To")}
                                    // onBlur={handleChange("To")}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[30%]"
                                />
                            </div>
                            <div className="w-[45%]">
                                <TextInput
                                    name="Amount"
                                    type="number"
                                    placeholder=""
                                    label="Amount"
                                    value={values.Amount}
                                    onChange={handleChange("Amount")}
                                    onBlur={handleChange("Amount")}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[30%]"
                                />
                            </div>
                            <div className="w-[45%]">
                                <TextInput
                                    name="date"
                                    type="date"
                                    placeholder=""
                                    label="Date"
                                    value={values.date}
                                    onChange={handleChange("date")}
                                    onBlur={handleChange("date")}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[30%]"
                                />
                            </div>

                            <div className="w-[45%]">
                                <TextInput
                                    name="Discription"
                                    type="text"
                                    placeholder=""
                                    label="Discription"
                                    value={values.Discription}
                                    onChange={handleChange("Discription")}
                                    onBlur={handleChange("Discription")}
                                    istouched={true}
                                    className="text-gray-800 text-base w-[30%]"
                                />
                            </div>
                            <div className="w-[30%] flex gap-2 items-end">
                                <div className="w-[70%] flex-col space-y-2">
                                    <div className="text-gray-500">Add Signature</div>
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
                        </div>





                        <div
                            className="bg-[#FF8900] rounded-lg mt-5 items-end px-5 w-fit text-white py-2"
                            onClick={() => handleSubmit()}
                        >
                            Save
                        </div>
                    </>
                )}
            </Formik>
        </div>
    )
}
