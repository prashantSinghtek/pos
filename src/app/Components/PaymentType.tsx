import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { customStyles } from './Customstyle';
import Select from "react-select";

export default function PaymentType() {

    const [showfield, setShowfield] = useState(false);
    const [SelectedPaymenttype, setSelectedPaymenttype] = useState<any>()
    const [paymenttype, setPaymenttype] = useState(["Cash", "Cheque"])

    const handleChangedpaymenttype = (selectedOption: any) => {
        console.log("selected csssssswwwwwss--->>>", selectedOption);
        setSelectedPaymenttype(selectedOption.value);
    };

    const allpaymenttype = paymenttype?.map((option: any) => ({
        value: option.toUpperCase(),
        label: option.toUpperCase(),
    }));


    return (
        <div
            className="p-3 flex items-center text-[#2D9CDB] cursor-pointer"
            onClick={() => setShowfield(!showfield)}
        >
            {showfield ? <FiMinus /> : <IoMdAdd />}
            {showfield ? "Hide Payment Type" : "Add Payment Type"}

            {showfield &&
                <>
                    <div className='bg-white h-auto w-[50%] '>
                        <div>
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
                </>
            }
        </div>
    )
}
