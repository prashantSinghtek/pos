import React, { useState, useEffect } from "react";

interface RowData {
  productname: string;
  quantity: string;
  unitprice: string;
  amount: string;
  sno?: number;
}

interface Props {
  setSelectedProduct: any
  setTotalAmount: (amount: number) => void;
  headers: { key: string; label: string; show: boolean }[];
}

const calculateAmounts = ({
  unitPrice,
  quantity,
}: {
  unitPrice: number;
  quantity: number;
}) => {
  const amount = unitPrice * quantity;
  return amount;
};

const AddExpensesTable: React.FC<Props> = ({ setSelectedProduct, setTotalAmount, headers }) => {
  const [data, setData] = useState<RowData[]>([
    {
      productname: "",
      quantity: "",
      unitprice: "",
      amount: "",
    },
  ]);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const transformedItems = data.map(item => ({
      itemName: item.productname,
      unitAmount: parseFloat(item.unitprice) || 0.0,
      itemAmount: parseFloat(item.amount) || 0.0,
      itemPricing: {
        quantity: parseInt(item.quantity) || 0,
      },
    }));

    setItems(transformedItems);
    setSelectedProduct(transformedItems);
  }, [data, setSelectedProduct]);

  const addRow = () => {
    setData(prevData => [
      ...prevData,
      {
        productname: "",
        quantity: "",
        unitprice: "",
        amount: "",
      },
    ]);
  };

  const deleteRow = (index: number) => {
    setData(prevData => prevData.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, columnName: string, value: string) => {
    const newData = [...data];
    const row = newData[index];
    (row as any)[columnName] = value;

    if (["quantity", "unitprice"].includes(columnName)) {
      const unitPrice = parseFloat(newData[index].unitprice || "0");
      const quantity = parseFloat(newData[index].quantity || "0");
      const totalAmount = calculateAmounts({ unitPrice, quantity });
      newData[index].amount = totalAmount.toFixed(2);
    }

    setData(newData);
  };

  useEffect(() => {
    setData(prevData =>
      prevData.map((row, index) => ({ ...row, sno: index + 1 }))
    );
  }, [data.length]);

  const totalAmount = data.reduce(
    (sum, row) => sum + parseFloat(row.amount || "0"),
    0
  );

  useEffect(() => {
    setTotalAmount(totalAmount);
  }, [totalAmount, setTotalAmount]);

  return (
    <div>
      <div className="flex justify-end mb-3 relative ">
        <div
          className="mt-2 w-fit  border-[#FF6E3F] bg-[#FEE8E1] text-[#FF6E3F] hover:bg-[#FF6E3F] hover:text-white border-2 py-2 px-4 rounded"
          onClick={addRow}
        >
          Add Row
        </div>
      </div>
      <table className="min-w-full divide-y rounded-lg overflow-hidden divide-gray-200 border-collapse border">
        <thead className="bg-[#FEE8E1]">
          <tr>
            {headers.map(
              header =>
                header.show && (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    {header.label}
                  </th>
                )
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
              {headers.map(
                header =>
                  header.show && (
                    <td key={header.key} className="whitespace-nowrap border">
                      <input
                        type={header.key === "quantity" ? "number" : "text"}
                        value={(row as any)[header.key]}
                        onChange={e =>
                          handleChange(index, header.key, e.target.value)
                        }
                        className="h-[51px] px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </td>
                  )
              )}
              <td className="whitespace-nowrap border">
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
              colSpan={headers.length + 1}
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border"
            >
              Total Amount: {totalAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AddExpensesTable;
