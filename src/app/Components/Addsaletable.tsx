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
  productcode: string
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
  purchasePrice?: any
  purchasePriceTaxType?: any
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

const Table = ({ productList, setSelectedproduct, setTotalamount, setTotaltax, setDiscountamount }: any) => {
  console.log("productList", productList)
  // id: 1
  // itemCode: "7627458504"
  // itemHsn: "23454354"
  // itemName: "chocolate"
  // itemPricing: null
  // itemStock: 
  // asOfDate:"2024-06-06"
  // atPrice: "150"
  // id: 1
  // location: "jaipur"
  // minStockToMaintain: "2"
  // openingQuantity: "12"
  // const [datas, setDatas] = useState<any>([
  //   {
  //     productname: "",
  //     unit: "",
  //     itemPricing: {

  //       quantity: "",
  //       unitprice: "",
  //       productcode: "",
  //       tax: { percentage: "", amount: "" },
  //       discount: { percentage: "", amount: "" },
  //       amount: "",
  //     }
  //   },
  // ]);

  const [data, setData] = useState<RowData[]>([
    {
      productname: "",
      quantity: "",
      unit: "",
      unitprice: "",
      productcode: "",
      tax: { percentage: "", amount: "" },
      discount: { percentage: "", amount: "" },
      amount: "",
      purchasePrice: "",
      purchasePriceTaxType: "",
    },
  ]);
  const [items, setItems] = useState<any>([]);

  // Use useEffect to update the items state whenever the data state changes
  useEffect(() => {
    const transformedItems = data.map(item => ({
      itemName: item.productname,
      unit: item.unit,
      discountAmount: parseFloat(item.discount.amount) || 0.00,
      unitAmount: parseFloat(item.unitprice) || 0.00,
      itemAmount: parseFloat(item.amount) || 0.00,
      itemPricing: {
        purchasePrice: item.purchasePrice,
        taxAmount: parseFloat(item.tax.amount) || 0.00,
        purchasePriceTaxType: item.purchasePriceTaxType,
        quantity: parseInt(item.quantity) || 0
      }
    }));

    setItems(transformedItems);
  }, [data]);
  console.log("items", items)
  setSelectedproduct(items)
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

  // const handleChange = (index: number, columnName: string, value: string) => {
  //   const newData = [...data];
  //   const row = newData[index];

  //   // Type guard to ensure columnName is a valid property of RowData
  //   if (columnName in row) {
  //     // Type assertion since columnName is a string
  //     (row as any)[columnName] = value;

  //     // Rest of your logic...
  //     if (columnName === "productname") {
  //       const product = productList?.find((p: any) => p.productname === value);
  //       if (product) {
  //         const quantity = 1;
  //         const unitPrice = parseFloat(product.saleprice || "0");
  //         const taxPercentage = parseFloat(product.tax || "0");
  //         const discountPercentage =
  //           product.discount_on_sale_price_type === "PERCENTAGE"
  //             ? parseFloat(product.discount_on_sale_price || "0")
  //             : (parseFloat(product.discount_on_sale_price || "0") / unitPrice) *
  //               100;
  //         const { taxAmount, discountAmount, totalAmount } = calculateAmounts({
  //           unitPrice,
  //           quantity,
  //           taxPercentage,
  //           discountPercentage,
  //         });
  //         newData[index] = {
  //           productname: product.productname,
  //           quantity: quantity.toString(),
  //           unit: product.unit,
  //           unitprice: unitPrice.toString(),
  //           tax: {
  //             percentage: taxPercentage.toString(),
  //             amount: taxAmount.toFixed(2),
  //           },
  //           discount: {
  //             percentage: discountPercentage.toString(),
  //             amount: discountAmount.toFixed(2),
  //           },
  //           amount: totalAmount.toFixed(2),
  //         };
  //       }
  //     } else if (
  //       [
  //         "quantity",
  //         "unitprice",
  //         "tax.percentage",
  //         "discount.percentage",
  //       ].includes(columnName)
  //     ) {
  //       const unitPrice = parseFloat(newData[index].unitprice || "0");
  //       const quantity = parseFloat(newData[index].quantity || "0");
  //       const taxPercentage = parseFloat(
  //         newData[index].tax.percentage || "0"
  //       );
  //       const discountPercentage = parseFloat(
  //         newData[index].discount.percentage || "0"
  //       );
  //       const { taxAmount, discountAmount, totalAmount } = calculateAmounts({
  //         unitPrice,
  //         quantity,
  //         taxPercentage,
  //         discountPercentage,
  //       });
  //       newData[index].tax.amount = taxAmount.toFixed(2);
  //       newData[index].discount.amount = discountAmount.toFixed(2);
  //       newData[index].amount = totalAmount.toFixed(2);
  //     }

  //     setData(newData);
  //   }
  // };

  const handleChange = (index: number, columnName: string, value: string) => {
    const newData = [...data];
    const row = newData[index];
    // newData[index][columnName] = value;


    if (columnName in row) {
      // Type assertion since columnName is a string
      (row as any)[columnName] = value;

      if (columnName === "productname") {
        const product = productList?.find((p: any) => p.itemName === value);
        if (product) {
          console.log("product", product)
          const quantity = 1;
          const unitPrice = parseFloat(product?.itemPricing?.salePrice || "0");
          const taxPercentage = parseFloat(product?.itemPricing?.taxAmount || "0");
          const discountPercentage =
            product?.itemPricing?.discountOnSalePriceType === "PERCENTAGE"
              ? parseFloat(product?.itemPricing?.discountOnSalePrice || "0")
              : (parseFloat(product?.itemPricing?.discountOnSalePrice || "0") / unitPrice) *
              100;
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
          addRow()
        }
      } else if (
        [
          "quantity",
          "unitprice",
          "tax.percentage",
          "discount.percentage",
        ].includes(columnName)
      ) {
        const unitPrice = parseFloat(newData[index].unitprice || "0");
        const quantity = parseFloat(newData[index].quantity || "0");
        const taxPercentage = parseFloat(newData[index].tax.percentage || "0");
        const discountPercentage = parseFloat(
          newData[index].discount.percentage || "0"
        );
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
      addRow()
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
  setTotaltax(totalTaxAmount)
  const totalDiscountAmount = data.reduce(
    (sum, row) => sum + parseFloat(row.discount.amount || "0"),
    0
  );
  setDiscountamount(totalDiscountAmount)
  const totalAmount = data.reduce(
    (sum, row) => sum + parseFloat(row.amount || "0"),
    0
  );
  setTotalamount(totalAmount)

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
          <div className=" absolute top-14  right-0 mt-2 flex flex-col bg-white p-5 w-fit rounded-xl shadow-lg">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-[#FF6E3F]"
                checked={showSno}
                onChange={() => setShowSno(!showSno)}
              />
              <span className="ml-2 text-gray-700">Show S.No</span>
            </label>
            {/* Repeat similar labels and inputs for other columns */}
            <label className=" inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-[#FF6E3F]"
                checked={showTax}
                onChange={() => setShowTax(!showTax)}
              />
              <span className="ml-2 text-gray-700">Show Tax</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-[#FF6E3F]"
                checked={showTaxPercentage}
                onChange={() => setShowTaxPercentage(!showTaxPercentage)}
              />
              <span className="ml-2 text-gray-700">Show Tax Percentage</span>
            </label>
            <label className=" inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-[#FF6E3F]"
                checked={showTaxAmount}
                onChange={() => setShowTaxAmount(!showTaxAmount)}
              />
              <span className="ml-2 text-gray-700">Show Tax Amount</span>
            </label>
          </div>
        )}
      </div>
      <table className="min-w-full divide-y rounded-lg overflow-hidden divide-gray-200 border-collapse border">
        <thead className="bg-[#FEE8E1]">
          <tr>
            {showSno && (
              <th
                scope="col"
                className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                S.No
              </th>
            )}
            {showProductName && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Product Name
              </th>
            )}
            {showProductcode && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Product Code
              </th>
            )}
            {showQuantity && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Quantity
              </th>
            )}
            {showUnit && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Unit
              </th>
            )}

            {showTax && (
              <>
                {showTaxPercentage && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Tax Percentage
                  </th>
                )}
                {showTaxAmount && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Tax Amount
                  </th>
                )}
              </>
            )}
            {showDiscount && (
              <>
                {showTaxPercentage && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Discount Percentage
                  </th>
                )}
                {showTaxAmount && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Discount Amount
                  </th>
                )}
              </>
            )}
            {showAmount && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Amount
              </th>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="h-[100%]">
              {showSno && (
                <td className="h-[100%] whitespace-nowrap border">
                  <input
                    type="text"
                    value={row.sno}
                    readOnly
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showProductName && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="text"
                    list="productList"
                    value={row.productname}
                    onChange={(e) =>
                      handleChange(index, "productname", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                  <datalist id="productList">
                    {productList?.map((product: any, i: any) => (
                      <option key={i} value={product?.itemName} />
                    ))}
                  </datalist>
                </td>
              )}
              {showProductcode && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="number"
                    value={row.productcode}
                    onChange={(e) =>
                      handleChange(index, "productcode", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showQuantity && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {

                        addRow();

                      }
                    }}
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showUnit && (
                <td className=" whitespace-nowrap border">
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

              {showTaxPercentage && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="text"
                    value={`${row.tax.percentage}%`}
                    onChange={(e) =>
                      handleChange(index, "tax.percentage", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showTaxAmount && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="text"
                    value={row.tax.amount}
                    onChange={(e) =>
                      handleChange(index, "tax.amount", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showTaxPercentage && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="text"
                    value={`${row.discount.percentage}%`}
                    onChange={(e) =>
                      handleChange(index, "discount.percentage", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showTaxAmount && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="text"
                    value={row.discount.amount}
                    onChange={(e) =>
                      handleChange(index, "discount.amount", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              {showAmount && (
                <td className=" whitespace-nowrap border">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                    className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </td>
              )}
              <td className=" whitespace-nowrap border">
                <button
                  onClick={() => deleteRow(index)}

                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
  );
};

export default Table;
