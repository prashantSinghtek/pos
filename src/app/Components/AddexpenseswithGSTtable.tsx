import React, { useState, useEffect } from "react";

interface RowData {
  ExpensesName: string;
  quantity: string;
  unit: string;
  unitprice: string;
  tax: {
    percentage: any;
    amount: any;
  };
  discount: {
    percentage: any;
    amount: any;
  };
  amount: string;
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

const AddexpenseswithGSTtable = ({
  setSelectedproduct,
  setTotalamount,
  setTotaltax,
  setDiscountamount,
}: any) => {
  const [data, setData] = useState<RowData[]>([
    {
      ExpensesName: "",
      quantity: "0",
      unit: "",
      unitprice: "0",
      tax: { percentage: "0", amount: "0" },
      discount: { percentage: "0", amount: "0" },
      amount: "0",
    },
  ]);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const transformedItems = data.map((item) => ({
      itemName: item.ExpensesName,
      unit: item.unit,
      discountAmount: parseFloat(item.discount.amount) || 0.0,
      unitAmount: parseFloat(item.unitprice) || 0.0,
      itemAmount: parseFloat(item.amount) || 0.0,
      itemPricing: {
        taxAmount: parseFloat(item.tax.amount) || 0.0,
        quantity: parseInt(item.quantity) || 0,
      },
    }));

    setItems(transformedItems);
    setSelectedproduct(transformedItems);

    const totalTaxAmount = data.reduce(
      (sum, row) => sum + parseFloat(row.tax.amount || "0"),
      0
    );
    setTotaltax(totalTaxAmount);

    const totalDiscountAmount = data.reduce(
      (sum, row) => sum + parseFloat(row.discount.amount || "0"),
      0
    );
    setDiscountamount(totalDiscountAmount);

    const totalAmount = data.reduce(
      (sum, row) => sum + parseFloat(row.amount || "0"),
      0
    );
    setTotalamount(totalAmount);
  }, [data, setSelectedproduct, setTotalamount, setTotaltax, setDiscountamount]);

  const addRow = () => {
    setData((prevData) => [
      ...prevData,
      {
        ExpensesName: "",
        quantity: "0",
        unit: "",
        unitprice: "0",
        tax: { percentage: "0", amount: "0" },
        discount: { percentage: "0", amount: "0" },
        amount: "0",
      },
    ]);
  };

  const deleteRow = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, columnName: string, value: any) => {
    const newData = [...data];
    const row = newData[index];

    if (columnName in row) {
      (row as any)[columnName] = value;

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
      setData(newData);
    }
  };

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

  return (
    <div>
      <div className="flex justify-end mb-3 relative ">
        <div
          className="mt-2 w-fit border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F] hover:bg-[#FF6E3F] hover:text-white border-2 py-2 px-4 rounded"
          onClick={() => setShowhide(!showhide)}
        >
          Show/Hide
        </div>
        {showhide && (
          <div className="absolute top-14 right-0 mt-2 flex flex-col bg-white p-5 w-fit rounded-xl shadow-lg">
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
            <label className="inline-flex items-center">
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
            <label className="inline-flex items-center">
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
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Expenses Name
              </th>
            )}
            {showQuantity && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Quantity
              </th>
            )}
            {showUnit && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Unit
              </th>
            )}
            {showUnitPrice && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Unit Price
              </th>
            )}
            {showAmount && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Amount
              </th>
            )}
            {/* {showTax && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Tax
              </th>
            )} */}
            {showTaxPercentage && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Tax Percentage
              </th>
            )}
            {showTaxAmount && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Tax Amount
              </th>
            )}
            {showDiscount && (
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Discount
              </th>
            )}
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {showSno && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  {index + 1}
                </td>
              )}
              {showProductName && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  <input
                    type="text"
                    value={row.ExpensesName}
                    onChange={(e) =>
                      handleChange(index, "ExpensesName", e.target.value)
                    }
                    className="border-none focus:ring-0 focus:outline-none"
                  />
                </td>
              )}
              {showQuantity && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className="border-none w-[70px] focus:ring-0 focus:outline-none"
                  />
                </td>
              )}
              {showUnit && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  <input
                    type="text"
                    value={row.unit}
                    onChange={(e) =>
                      handleChange(index, "unit", e.target.value)
                    }
                    className="border-none w-[100px] focus:ring-0 focus:outline-none"
                  />
                </td>
              )}
              {showUnitPrice && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  <input
                    type="number"
                    value={row.unitprice}
                    onChange={(e) =>
                      handleChange(index, "unitprice", e.target.value)
                    }
                    className="border-none w-[100px] focus:ring-0 focus:outline-none"
                  />
                </td>
              )}
              {showAmount && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  {row.amount}
                </td>
              )}
              {showTax && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  <input
                    type="number"
                    value={row.tax.percentage}
                    onChange={(e) =>
                      handleChange(index, "tax", {
                        ...row.tax,
                        percentage: e.target.value,
                      })
                    }
                    className="border-none focus:ring-0 focus:outline-none"
                  />
                </td>
              )}
              {/* {showTaxPercentage && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  {row.tax.percentage}%
                </td>
              )} */}
              {showTaxAmount && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  {row.tax.amount}
                </td>
              )}
              {showDiscount && (
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border">
                  <input
                    type="number"
                    value={row.discount.percentage}
                    onChange={(e) =>
                      handleChange(index, "discount", {
                        ...row.discount,
                        percentage: e.target.value,
                      })
                    }
                    className="border-none focus:ring-0 focus:outline-none"
                  />
                </td>
              )}
              <td className="px-2 py-4 whitespace-nowrap text-sm font-medium border">
                <button
                  onClick={() => deleteRow(index)}
                  className="text-red-600 hover:text-red-900"
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
        onClick={addRow}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
      >
        Add Row
      </button>
    </div>
  );
};

export default AddexpenseswithGSTtable;
