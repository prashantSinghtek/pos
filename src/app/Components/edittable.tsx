// import React, { useState, useEffect } from "react";

// interface Product {
//   name: string;
//   unit: string;
//   unitPrice: number;
//   taxPercentage: number;
//   discountPercentage: number;
// }

// interface RowData {
//   productname: string;
//   quantity: string;
//   productcode: string
//   unit: string;
//   unitprice: string;
//   tax: {
//     percentage: string;
//     amount: string;
//   };
//   discount: {
//     percentage: string;
//     amount: string;
//   };
//   amount: string;
//   sno?: number;
//   purchasePrice?: any
//   purchasePriceTaxType?: any
// }

// const calculateAmounts = ({
//   unitPrice,
//   quantity,
//   taxPercentage,
//   discountPercentage,
// }: any) => {
//   const amount = unitPrice * quantity;
//   const taxAmount = (amount * taxPercentage) / 100;
//   const discountAmount = (amount * discountPercentage) / 100;
//   const totalAmount = amount + taxAmount - discountAmount;
//   return { taxAmount, discountAmount, totalAmount };
// };

// const EditTable = ({ productList, setSelectedproduct, setTotalamount, setTotaltax, setDiscountamount,selecteditem }: any) => {
//   console.log("productList", selecteditem)


//   const [data, setData] = useState<RowData[]>([
//     {
//       productname: "",
//       quantity: "",
//       unit: "",
//       unitprice: "",
//       productcode: "",
//       tax: { percentage: "", amount: "" },
//       discount: { percentage: "", amount: "" },
//       amount: "",
//       purchasePrice: "",
//       purchasePriceTaxType: "",
//     },
//   ]);
//   const [items, setItems] = useState<any>([]);

//   // Use useEffect to update the items state whenever the data state changes
//   useEffect(() => {
//     const transformedItems = data.map(item => ({
//       itemName: item.productname,
//       unit: item.unit,
//       discountAmount: parseFloat(item.discount.amount) || 0.00,
//       unitAmount: parseFloat(item.unitprice) || 0.00,
//       itemAmount: parseFloat(item.amount) || 0.00,
//       itemPricing: {
//         purchasePrice: item.purchasePrice,
//         taxAmount: parseFloat(item.tax.amount) || 0.00,
//         purchasePriceTaxType: item.purchasePriceTaxType,
//         quantity: parseInt(item.quantity) || 0
//       }
//     }));

//     setItems(transformedItems);
//   }, [data]);
//   console.log("items", items)
//   setSelectedproduct(items)
//   const [showSno, setShowSno] = useState<boolean>(true);
//   const [showProductName, setShowProductName] = useState<boolean>(true);
//   const [showQuantity, setShowQuantity] = useState<boolean>(true);
//   const [showUnit, setShowUnit] = useState<boolean>(true);
//   const [showUnitPrice, setShowUnitPrice] = useState<boolean>(true);
//   const [showAmount, setShowAmount] = useState<boolean>(true);
//   const [showTax, setShowTax] = useState<boolean>(true);
//   const [showProductcode, setShowProductcode] = useState<boolean>(true);

//   const [showDiscount, setShowDiscount] = useState<boolean>(true);
//   const [showTaxPercentage, setShowTaxPercentage] = useState<boolean>(true);
//   const [showTaxAmount, setShowTaxAmount] = useState<boolean>(true);
//   const [showhide, setShowhide] = useState<boolean>(false);

//   const addRow = () => {
//     setData((prevData) => [
//       ...prevData,
//       {
//         productname: "",
//         quantity: "",
//         unit: "",
//         unitprice: "",
//         productcode: "",
//         tax: { percentage: "", amount: "" },
//         discount: { percentage: "", amount: "" },
//         amount: "",
//       },
//     ]);
//   };


//   const deleteRow = (index: number) => {
//     setData((prevData) => prevData.filter((_, i) => i !== index));
//   };



//   const handleChange = (index: number, columnName: string, value: string) => {
//     const newData = [...data];
//     const row = newData[index];
//     // newData[index][columnName] = value;


//     if (columnName in row) {
//       // Type assertion since columnName is a string
//       (row as any)[columnName] = value;

//       if (columnName === "productname") {
//         const product = productList?.find((p: any) => p.itemName === value);
//         if (product) {
//           console.log("product", product)
//           const quantity = 1;
//           const unitPrice = parseFloat(product?.itemPricing?.salePrice || "0");
//           const taxPercentage = parseFloat(product?.itemPricing?.taxAmount || "0");
//           const discountPercentage =
//             product?.itemPricing?.discountOnSalePriceType === "PERCENTAGE"
//               ? parseFloat(product?.itemPricing?.discountOnSalePrice || "0")
//               : (parseFloat(product?.itemPricing?.discountOnSalePrice || "0") / unitPrice) *
//               100;
//           const { taxAmount, discountAmount, totalAmount } = calculateAmounts({
//             unitPrice,
//             quantity,
//             taxPercentage,
//             discountPercentage,
//           });
//           newData[index] = {
//             productname: product.itemName,
//             quantity: quantity.toString(),
//             unit: product.unit,
//             productcode: product.itemCode,
//             unitprice: unitPrice.toString(),
//             tax: {
//               percentage: taxPercentage.toString(),
//               amount: taxAmount.toFixed(2),
//             },
//             discount: {
//               percentage: discountPercentage.toString(),
//               amount: discountAmount.toFixed(2),
//             },
//             amount: totalAmount.toFixed(2),
//             purchasePrice: product.itemPricing.purchasePrice,
//             purchasePriceTaxType: product.itemPricing.purchasePriceTaxType,

//           };
//           addRow()
//         }
//       } else if (
//         [
//           "quantity",
//           "unitprice",
//           "tax.percentage",
//           "discount.percentage",
//         ].includes(columnName)
//       ) {
//         const unitPrice = parseFloat(newData[index].unitprice || "0");
//         const quantity = parseFloat(newData[index].quantity || "0");
//         const taxPercentage = parseFloat(newData[index].tax.percentage || "0");
//         const discountPercentage = parseFloat(
//           newData[index].discount.percentage || "0"
//         );
//         const { taxAmount, discountAmount, totalAmount } = calculateAmounts({
//           unitPrice,
//           quantity,
//           taxPercentage,
//           discountPercentage,
//         });
//         newData[index].tax.amount = taxAmount.toFixed(2);
//         newData[index].discount.amount = discountAmount.toFixed(2);
//         newData[index].amount = totalAmount.toFixed(2);
//         if (columnName === "quantity" && quantity > 0) {
//           addRow();
//         }
//       }
//       addRow()
//       setData(newData);
//     }

//   };

//   useEffect(() => {
//     setData((prevData) =>
//       prevData.map((row, index) => ({ ...row, sno: index + 1 }))
//     );
//   }, [data.length]);

//   const totalTaxAmount = data.reduce(
//     (sum, row) => sum + parseFloat(row.tax.amount || "0"),
//     0
//   );
//   setTotaltax(totalTaxAmount)
//   const totalDiscountAmount = data.reduce(
//     (sum, row) => sum + parseFloat(row.discount.amount || "0"),
//     0
//   );
//   setDiscountamount(totalDiscountAmount)
//   const totalAmount = data.reduce(
//     (sum, row) => sum + parseFloat(row.amount || "0"),
//     0
//   );
//   setTotalamount(totalAmount)

//   return (
//     <div>
//       <div className="flex justify-end mb-3 relative ">
//         <div
//           className="mt-2 w-fit  border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F] hover:bg-[#FF6E3F] hover:text-white border-2 py-2 px-4 rounded"
//           onClick={() => setShowhide(!showhide)}
//         >
//           Show/Hide
//         </div>
//         {showhide && (
//           <div className=" absolute top-14  right-0 mt-2 flex flex-col bg-white p-5 w-fit rounded-xl shadow-lg">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 className="form-checkbox text-[#FF6E3F]"
//                 checked={showSno}
//                 onChange={() => setShowSno(!showSno)}
//               />
//               <span className="ml-2 text-gray-700">Show S.No</span>
//             </label>
//             {/* Repeat similar labels and inputs for other columns */}
//             <label className=" inline-flex items-center">
//               <input
//                 type="checkbox"
//                 className="form-checkbox text-[#FF6E3F]"
//                 checked={showTax}
//                 onChange={() => setShowTax(!showTax)}
//               />
//               <span className="ml-2 text-gray-700">Show Tax</span>
//             </label>

//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 className="form-checkbox text-[#FF6E3F]"
//                 checked={showTaxPercentage}
//                 onChange={() => setShowTaxPercentage(!showTaxPercentage)}
//               />
//               <span className="ml-2 text-gray-700">Show Tax Percentage</span>
//             </label>
//             <label className=" inline-flex items-center">
//               <input
//                 type="checkbox"
//                 className="form-checkbox text-[#FF6E3F]"
//                 checked={showTaxAmount}
//                 onChange={() => setShowTaxAmount(!showTaxAmount)}
//               />
//               <span className="ml-2 text-gray-700">Show Tax Amount</span>
//             </label>
//           </div>
//         )}
//       </div>
//       <table className="min-w-full divide-y rounded-lg overflow-hidden divide-gray-200 border-collapse border">
//         <thead className="bg-[#FEE8E1]">
//           <tr>
//             {showSno && (
//               <th
//                 scope="col"
//                 className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
//               >
//                 S.No
//               </th>
//             )}
//             {showProductName && (
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//               >
//                 Product Name
//               </th>
//             )}
//             {showProductcode && (
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//               >
//                 Product Code
//               </th>
//             )}
//             {showQuantity && (
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//               >
//                 Quantity
//               </th>
//             )}
//             {showUnit && (
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//               >
//                 Unit
//               </th>
//             )}

//             {showTax && (
//               <>
//                 {showTaxPercentage && (
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//                   >
//                     Tax Percentage
//                   </th>
//                 )}
//                 {showTaxAmount && (
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//                   >
//                     Tax Amount
//                   </th>
//                 )}
//               </>
//             )}
//             {showDiscount && (
//               <>
//                 {showTaxPercentage && (
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//                   >
//                     Discount Percentage
//                   </th>
//                 )}
//                 {showTaxAmount && (
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//                   >
//                     Discount Amount
//                   </th>
//                 )}
//               </>
//             )}
//             {showAmount && (
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//               >
//                 Amount
//               </th>
//             )}
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
//             >
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {data.map((row, index) => (
//             <tr key={index} className="h-[100%]">
//               {showSno && (
//                 <td className="h-[100%] whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={row.sno}
//                     readOnly
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showProductName && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     list="productList"
//                     value={row.productname}
//                     onChange={(e) =>
//                       handleChange(index, "productname", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                   <datalist id="productList">
//                     {productList?.map((product: any, i: any) => (
//                       <option key={i} value={product?.itemName} />
//                     ))}
//                   </datalist>
//                 </td>
//               )}
//               {showProductcode && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="number"
//                     value={row.productcode}
//                     onChange={(e) =>
//                       handleChange(index, "productcode", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showQuantity && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="number"
//                     value={row.quantity}
//                     onChange={(e) =>
//                       handleChange(index, "quantity", e.target.value)
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') {

//                         addRow();

//                       }
//                     }}
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showUnit && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={row.unit}
//                     onChange={(e) =>
//                       handleChange(index, "unit", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}

//               {showTaxPercentage && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={`${row.tax.percentage}%`}
//                     onChange={(e) =>
//                       handleChange(index, "tax.percentage", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showTaxAmount && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={row.tax.amount}
//                     onChange={(e) =>
//                       handleChange(index, "tax.amount", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showTaxPercentage && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={`${row.discount.percentage}%`}
//                     onChange={(e) =>
//                       handleChange(index, "discount.percentage", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showTaxAmount && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={row.discount.amount}
//                     onChange={(e) =>
//                       handleChange(index, "discount.amount", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               {showAmount && (
//                 <td className=" whitespace-nowrap border">
//                   <input
//                     type="text"
//                     value={row.amount}
//                     onChange={(e) =>
//                       handleChange(index, "amount", e.target.value)
//                     }
//                     className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
//                   />
//                 </td>
//               )}
//               <td className=" whitespace-nowrap border">
//                 <button
//                   onClick={() => deleteRow(index)}

//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot className="bg-gray-50">
//           <tr>
//             <td
//               colSpan={12}
//               className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
//             >
//               Total Tax Amount: {totalTaxAmount.toFixed(2)}
//             </td>
//           </tr>
//           <tr>
//             <td
//               colSpan={12}
//               className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
//             >
//               Total Discount Amount: {totalDiscountAmount.toFixed(2)}
//             </td>
//           </tr>
//           <tr>
//             <td
//               colSpan={12}
//               className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
//             >
//               Total Amount: {totalAmount.toFixed(2)}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//       <button
//         className="mt-2 border-[#57BAF2] rounded-lg bg-[#3ca7e4] text-white hover:bg-[#c7e3f3] hover:text-[#3ca7e4] border-2 py-2 px-4"
//         onClick={addRow}
//       >
//         Add Row
//       </button>
//     </div>
//   );
// };

// export default EditTable;
import React, { useState, useEffect } from "react";

interface Product {
    name: string;
    unit: string;
    unitPrice: number;
    taxPercentage: number;
    discountPercentage: number;
}

interface RowData {
    productname: string;
    quantity: string;
    productcode: string;
    unit: string;
    unitprice: string;
    tax: {
        percentage: string;
        amount: string;
    };
    discount: {
        percentage: string;
        amount: string;
    };
    amount: string;
    sno?: number;
    purchasePrice?: any;
    purchasePriceTaxType?: any;
}

const calculateAmounts = ({
    unitPrice,
    quantity,
    taxPercentage,
    discountPercentage,
}: any) => {
    const amount = unitPrice * quantity;
    const taxAmount = (amount * taxPercentage) / 100;
    const discountAmount = (amount * discountPercentage) / 100;
    const totalAmount = amount + taxAmount - discountAmount;
    return { taxAmount, discountAmount, totalAmount };
};

const EditTable = ({
    productList,
    setSelectedproduct,
    setTotalamount,
    setTotaltax,
    setDiscountamount,
    selecteditem,
}: any) => {
    console.log("selecteditem", selecteditem);
    const [data, setData] = useState<RowData[]>([]);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        if (selecteditem) {
            const initialData = selecteditem.map((item: any) => ({
                productname: item.itemName,
                quantity: item.itemPricing.quantity.toString(),
                productcode: item.itemCode || "",
                unit: item.unit,
                unitprice: item.itemPricing.salePrice || "0",
                tax: {
                    percentage: item.itemPricing.taxAmount.toString(),
                    amount: (
                        (item.itemPricing.taxAmount / 100) * item.itemPricing.salePrice
                    ).toFixed(2),
                },
                discount: {
                    percentage:
                        item.itemPricing.discountOnSalePriceType === "PERCENTAGE"
                            ? item.itemPricing.discountOnSalePrice.toString()
                            : (
                                (item.itemPricing.discountOnSalePrice /
                                    item.itemPricing.salePrice) *
                                100
                            ).toString(),
                    amount: item.itemPricing.discountOnSalePrice || "0",
                },
                amount: item.itemAmount.toString(),
                purchasePrice: item.itemPricing.purchasePrice,
                purchasePriceTaxType: item.itemPricing.purchasePriceTaxType,
            }));
            setData(initialData);
        }
    }, [selecteditem]);

    useEffect(() => {
        const transformedItems = data.map((item) => ({
            itemName: item.productname,
            unit: item.unit,
            discountAmount: parseFloat(item.discount.amount) || 0.0,
            unitAmount: parseFloat(item.unitprice) || 0.0,
            itemAmount: parseFloat(item.amount) || 0.0,
            itemPricing: {
                purchasePrice: item.purchasePrice,
                taxAmount: parseFloat(item.tax.amount) || 0.0,
                purchasePriceTaxType: item.purchasePriceTaxType,
                quantity: parseInt(item.quantity) || 0,
            },
        }));

        setItems(transformedItems);
    }, [data]);

    useEffect(() => {
        setSelectedproduct(items);
    }, [items]);

    const [showSno, setShowSno] = useState<boolean>(true);
    const [showProductName, setShowProductName] = useState<boolean>(true);
    const [showQuantity, setShowQuantity] = useState<boolean>(true);
    const [showUnit, setShowUnit] = useState<boolean>(true);
    const [showUnitPrice, setShowUnitPrice] = useState<boolean>(true);
    const [showAmount, setShowAmount] = useState<boolean>(true);
    const [showTax, setShowTax] = useState<boolean>(true);
    const [showProductcode, setShowProductcode] = useState<boolean>(true);
    const [showDiscount, setShowDiscount] = useState<boolean>(true);
    const [showTaxPercentage, setShowTaxPercentage] = useState<boolean>(true);
    const [showTaxAmount, setShowTaxAmount] = useState<boolean>(true);
    const [showhide, setShowhide] = useState<boolean>(false);

    const addRow = () => {
        setData((prevData) => [
            ...prevData,
            {
                productname: "",
                quantity: "",
                unit: "",
                unitprice: "",
                productcode: "",
                tax: { percentage: "", amount: "" },
                discount: { percentage: "", amount: "" },
                amount: "",
            },
        ]);
    };

    const deleteRow = (index: number) => {
        setData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, columnName: string, value: string) => {
        const newData = [...data];
        const row = newData[index];

        if (columnName in row) {
            (row as any)[columnName] = value;

            if (columnName === "productname") {
                const product = productList?.find((p: any) => p.itemName === value);
                if (product) {
                    const quantity = 1;
                    const unitPrice = parseFloat(product?.itemPricing?.salePrice || "0");
                    const taxPercentage = parseFloat(product?.itemPricing?.taxAmount || "0");
                    const discountPercentage =
                        product?.itemPricing?.discountOnSalePriceType === "PERCENTAGE"
                            ? parseFloat(product?.itemPricing?.discountOnSalePrice || "0")
                            : (parseFloat(product?.itemPricing?.discountOnSalePrice || "0") / unitPrice) * 100;
                    const { taxAmount, discountAmount, totalAmount } = calculateAmounts({
                        unitPrice,
                        quantity,
                        taxPercentage,
                        discountPercentage,
                    });
                    newData[index] = {
                        productname: product.itemName,
                        quantity: quantity.toString(),
                        unit: product.unit,
                        productcode: product.itemCode,
                        unitprice: unitPrice.toString(),
                        tax: {
                            percentage: taxPercentage.toString(),
                            amount: taxAmount.toFixed(2),
                        },
                        discount: {
                            percentage: discountPercentage.toString(),
                            amount: discountAmount.toFixed(2),
                        },
                        amount: totalAmount.toFixed(2),
                        purchasePrice: product.itemPricing.purchasePrice,
                        purchasePriceTaxType: product.itemPricing.purchasePriceTaxType,
                    };
                }
            } else if (["quantity", "unitprice", "tax.percentage", "discount.percentage"].includes(columnName)) {
                const unitPrice = parseFloat(newData[index].unitprice || "0");
                const quantity = parseFloat(newData[index].quantity || "0");
                const taxPercentage = parseFloat(newData[index].tax.percentage || "0");
                const discountPercentage = parseFloat(newData[index].discount.percentage || "0");
                const { taxAmount, discountAmount, totalAmount } = calculateAmounts({
                    unitPrice,
                    quantity,
                    taxPercentage,
                    discountPercentage,
                });
                newData[index].tax.amount = taxAmount.toFixed(2);
                newData[index].discount.amount = discountAmount.toFixed(2);
                newData[index].amount = totalAmount.toFixed(2);
                if (columnName === "quantity" && quantity > 0) {
                    addRow();
                }
            }
            setData(newData);
        }
    };

    useEffect(() => {
        setData((prevData) =>
            prevData.map((row, index) => ({ ...row, sno: index + 1 }))
        );
    }, [data.length]);

    const totalTaxAmount = data.reduce(
        (sum, row) => sum + parseFloat(row.tax.amount || "0"),
        0
    );
    useEffect(() => setTotaltax(totalTaxAmount), [totalTaxAmount]);

    const totalDiscountAmount = data.reduce(
        (sum, row) => sum + parseFloat(row.discount.amount || "0"),
        0
    );
    useEffect(() => setDiscountamount(totalDiscountAmount), [totalDiscountAmount]);

    const totalAmount = data.reduce(
        (sum, row) => sum + parseFloat(row.amount || "0"),
        0
    );
    useEffect(() => setTotalamount(totalAmount), [totalAmount]);

    return (
        <div>
            <div className="flex justify-end mb-3 relative ">
                <div
                    className="mt-2 w-fit  border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F] hover:bg-[#FF6E3F] hover:text-white border-2 py-2 px-4 rounded"
                    onClick={() => setShowhide(!showhide)}
                >
                    Show/Hide
                </div>
                {showhide && (
                    <div className="absolute right-0 top-full mt-2 py-2 w-fit bg-white border border-gray-200 rounded shadow-xl z-20">
                        <div className="flex flex-wrap">
                            {[
                                ["S No", showSno, setShowSno],
                                ["Product Name", showProductName, setShowProductName],
                                ["Product code", showProductcode, setShowProductcode],
                                ["Quantity", showQuantity, setShowQuantity],
                                ["Unit", showUnit, setShowUnit],
                                ["Unit Price", showUnitPrice, setShowUnitPrice],
                                ["Tax Percentage", showTaxPercentage, setShowTaxPercentage],
                                ["Tax Amount", showTaxAmount, setShowTaxAmount],
                                ["Discount", showDiscount, setShowDiscount],
                                ["Amount", showAmount, setShowAmount],
                            ].map(([label, value, setValue], index) => (
                                <div key={index} className="flex items-center mx-4">
                                    <input
                                        className="mr-1"
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => setValue(!value)}
                                    />
                                    <label>{label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y rounded-lg overflow-hidden divide-gray-200 border-collapse border">
                    <thead className="bg-[#FEE8E1]">
                        <tr>
                            {showSno && <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">S No</th>}
                            {showProductName && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Product Name</th>
                            )}
                            {showProductcode && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Product Code</th>
                            )}
                            {showQuantity && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Quantity</th>
                            )}
                            {showUnit && <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Unit</th>}
                            {showUnitPrice && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Unit Price</th>
                            )}
                            {showTaxPercentage && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Tax Percentage</th>
                            )}
                            {showTaxAmount && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Tax Amount</th>
                            )}
                            {showDiscount && (
                                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Discount</th>
                            )}
                            {showAmount && <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Amount</th>}
                            <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index}>
                                {showSno && <td className="whitespace-nowrap border">{row.sno}</td>}
                                {showProductName && (
                                    <td className="whitespace-nowrap border">
                                        <select
                                            value={row.productname}
                                            onChange={(e) =>
                                                handleChange(index, "productname", e.target.value)
                                            }
                                            className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        >
                                            <option value="">Select Product</option>
                                            {productList?.map((product: any, productIndex: any) => (
                                                <option key={productIndex} value={product.itemName}>
                                                    {product.itemName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                )}
                                {showProductcode && (
                                    <td className="whitespace-nowrap border">{row.productcode}</td>
                                )}
                                {showQuantity && (
                                    <td className="whitespace-nowrap border">
                                        <input
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) =>
                                                handleChange(index, "quantity", e.target.value)
                                            }
                                            className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        />
                                    </td>
                                )}
                                {showUnit && (
                                    <td className="whitespace-nowrap border">
                                        <input
                                            type="text"
                                            value={row.unit}
                                            onChange={(e) =>
                                                handleChange(index, "unit", e.target.value)
                                            }
                                            className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        />
                                    </td>
                                )}
                                {showUnitPrice && (
                                    <td className="whitespace-nowrap border">
                                        <input
                                            type="number"
                                            value={row.unitprice}
                                            onChange={(e) =>
                                                handleChange(index, "unitprice", e.target.value)
                                            }
                                            className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        />
                                    </td>
                                )}
                                {showTaxPercentage && (
                                    <td className="whitespace-nowrap border">
                                        <input
                                            type="number"
                                            value={row.tax.percentage}
                                            onChange={(e) =>
                                                handleChange(index, "tax.percentage", e.target.value)
                                            }
                                            className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        />
                                    </td>
                                )}
                                {showTaxAmount && (
                                    <td className="whitespace-nowrap border">{row.tax.amount}</td>
                                )}
                                {showDiscount && (
                                    <td className="whitespace-nowrap border">
                                        <input
                                            type="number"
                                            value={row.discount.percentage}
                                            onChange={(e) =>
                                                handleChange(index, "discount.percentage", e.target.value)
                                            }
                                            className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        />
                                    </td>
                                )}
                                {showAmount && (
                                    <td className="whitespace-nowrap border">{row.amount}</td>
                                )}
                                <td className="whitespace-nowrap border">
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => deleteRow(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td
                                colSpan={12}
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
                            >
                                Total Tax Amount: {totalTaxAmount.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={12}
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
                            >
                                Total Discount Amount: {totalDiscountAmount.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={12}
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
                            >
                                Total Amount: {totalAmount.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <button
                    className="mt-2 border-[#57BAF2] rounded-lg bg-[#3ca7e4] text-white hover:bg-[#c7e3f3] hover:text-[#3ca7e4] border-2 py-2 px-4"
                    onClick={addRow}
                >
                    Add Row
                </button>
            </div>
        </div>
    );
};

export default EditTable;

