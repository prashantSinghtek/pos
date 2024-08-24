import { Constants } from "@/constants/constants";
import axios from "@/utils/axios";

export default class pos_controller {
  private header = {
    headers: {
      Authorization: "",
    },
  };

  constructor(token?: string) {
    this.header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  Addfirm = async (values: any, token: any) => {
    try {
      const { data } = await axios.post(Constants.firm, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  //update firm

  Updatefirm = async (values: any, id: any, token: any) => {
    try {
      const { data } = await axios.put(`${Constants.firm + "/" + id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  AddFirmUser = async (values: any, token: any) => {
    try {
      const { data } = await axios.post(Constants.firmUser, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  myCompany = async (token: any, id?: any) => {
    try {
      let data;
      if (id) {
        data = await axios.get(`${Constants.firm + "/" + id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        data = await axios.get(Constants.firm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddfirmParty = async (values: any, token: any, id: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.AddfirmParty}?firmId=${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  State = async (token: any) => {
    try {
      const data = await axios.get(`${Constants.state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  Getparty = async (token: any, firmid: any) => {
    try {
      const data = await axios.get(`${Constants.GetfirmParty + firmid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  Getfirmuser = async (token: any) => {
    try {
      const data = await axios.get(`${Constants.firmUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetpartiesbyID = async (token: any, id: any) => {
    try {
      const data = await axios.get(`${Constants.Getpartiesbyfirm + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  AddUnits = async (values: any, token: any) => {
    try {
      const { data } = await axios.post(`${Constants.unit}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetUnits = async (token: any) => {
    try {
      const { data } = await axios.get(`${Constants.unit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetProducts = async (token: any, firmid: any) => {
    try {
      const { data } = await axios.get(`${Constants.getproduct + firmid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  AddItems = async (values: any, token: any) => {
    try {
      const { data } = await axios.post(`${Constants.item + "save"}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  ItemStockAdjustment = async (
    values: any,
    token: any,
    itemid: any,
    firmid: any,
    stockAdjustmentType: any
  ) => {
    try {
      const { data } = await axios.post(
        `${Constants.item +
        itemid +
        "/stock/adjustment/" +
        stockAdjustmentType +
        "/firm/" +
        firmid +
        "?adjustmentQuantity=" +
        values.qty +
        "&stockAdjustmentDetails=" +
        values.details +
        "&atPrice=" +
        values.price
        }`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetParticularItems = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.item + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  Addcategory = async (categoryName: any, token: any, firmId: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.category +
        "add?categoryName=" +
        categoryName +
        "&firmId=" +
        firmId
        }`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  Getcategory = async (token: any) => {
    try {
      const { data } = await axios.get(`${Constants.category + "get/all"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetParticularCategory = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.category + "get/" + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetParticularcategory = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.category + "get/all" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  AddsaleCredit = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.saleCredit + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      console.log(data);
      let aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // Specify the filename here
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      document.body.removeChild(aTag); // Clean up

      return URL.createObjectURL(data);
    } catch (error: any) {
      throw error;
    }
  };
  AddsaleOrder = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(`${Constants.SaleOrder + id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
      console.log(data);
      let aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // Specify the filename here
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      document.body.removeChild(aTag); // Clean up

      return URL.createObjectURL(data);
    } catch (error: any) {
      throw error;
    }
  };

  GetSaleOrder = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.getSaleOrder + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddsaleCash = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(`${Constants.saleCash + id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
      console.log(data);
      let aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // Specify the filename here
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      document.body.removeChild(aTag); // Clean up

      return URL.createObjectURL(data);
    } catch (error: any) {
      throw error;
    }
  };

  GetSale = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.sale + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddsaleEstimate = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.saleEstimate + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      let aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // Specify the filename here
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      document.body.removeChild(aTag); // Clean up

      return URL.createObjectURL(data);
    } catch (error: any) {
      throw error;
    }
  };

  AddpurchaseOrder = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.purchaseOrder + "savepurchaseOrder?firmId=" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetEstimate = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.getEstimate + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetParticularEstimate = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.Estimate + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetParticularsaleCash = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.GetParticularsaleCash + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  DeleteParticularsaleCash = async (token: any, id: any) => {
    try {
      const { data } = await axios.delete(
        `${Constants.DeleteParticularsaleCash + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddDeliveryChallan = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.deliveryChallan + "save/" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  deliveryChallan = async (token: any) => {
    try {
      const { data } = await axios.get(`${Constants.deliveryChallan + "all"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  particulardeliveryChallan = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.deliveryChallan + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  // GetSale = async (token: any, id: any) => {
  //   try {
  //     const { data } = await axios.get(`${Constants.GetSale + id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // console.log("data", data);
  //     return data;
  //   } catch (error: any) {
  //     throw error;
  //   }
  // };

  AddPaymentIn = async (values: any, token: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.paymentin + "details/add"}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      let aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // Specify the filename here
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      document.body.removeChild(aTag); // Clean up

      return URL.createObjectURL(data);
      // console.log("data", data);
    } catch (error: any) {
      throw error;
    }
  };

  GetPaymentIn = async (token: any) => {
    try {
      const { data } = await axios.get(`${Constants.paymentin + "all"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetParticularPaymentIn = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.paymentin + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetSaleReturn = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.getSalereturn + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetPaymentOut = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.paymentout + "getPaymentOutLists?firmId=" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddPurchase = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.purchase + "savePurchase?firmId=" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddpurchaseReturn = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.purchaseReturn + "save?firmId=" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetpurchaseBill = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.purchase + "getPurchaseListsByFirm?firmId=" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetpurchaseOrder = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.getpurchaseorder + "getPurchaseLists?firmId=" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetpurchaseReturn = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.getpurchasereturn + "getDebitLists?firmId=" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  // GetSaleReturn = async (token: any, id: any) => {
  //   try {
  //     const { data } = await axios.get(`${Constants.getpurchasereturn + "getDebitLists?firmId=" + id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // console.log("data", data);
  //     return data;
  //   } catch (error: any) {
  //     throw error;
  //   }
  // };

  AddSaleReturn = async (token: any, id: any, values: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.SaleReturn + "save?firmId=" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      console.log(data);
      let aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // Specify the filename here
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      document.body.removeChild(aTag); // Clean up

      return URL.createObjectURL(data);
    } catch (error: any) {
      throw error;
    }
  };

  GetExpensesCategory = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.Expenses + "all/expense-category-with-type?firmId=" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddExpensesCategory = async (token: any, id: any, name: any, type: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.Expenses +
        "create/expense-category-with-type?firmId=" +
        id +
        "&expenseCategory=" +
        name +
        "&expenseType=" +
        type
        }`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddExpensesWithoutGST = async (
    token: any,
    id: any,
    type: any,
    values: any,
    categoryId: any
  ) => {
    // console.log("token",token)
    try {
      const { data } = await axios.post(
        `${Constants.Expenses +
        "create/firm/" +
        id +
        "?expenseType=" +
        type +
        "&categoryId=" +
        categoryId
        }`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  getcash = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(`${Constants.cash + "all/firm/" + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetCashAmount = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.cash + "amount/firm/" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddBankAccount = async (token: any, id: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.post(
        `${Constants.bankaccount + "addBankAccount?firmId=" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetBankAccount = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.bankaccount + "getByFirm/" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetBankAccountbyid = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.bankaccount + "byId/" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddBankToCash = async (token: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.post(
        `${Constants.banktocash + "save"}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddCashToBank = async (token: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.post(
        `${Constants.cashtobank + "save"}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddBankToBank = async (token: any, fromid: any, toid: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.post(
        `${Constants.banktobank + "save/" + fromid + "/" + toid}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddAdjusmentBank = async (token: any, id: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.post(
        `${Constants.adjusmentbank + "save/" + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  PutBankAccount = async (token: any, id: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.put(
        `${Constants.bankaccount + id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  PutCategoryName = async (token: any, id: any, values: any) => {
    // console.log("token",token)
    try {
      const { data } = await axios.put(
        `${Constants.category + "update/" + id + "?categoryName=" + values}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  // GetPartyTranaction = async (token: any, id: any) => {
  //   try {
  //     const { data } = await axios.get(`${Constants.GetPartyTransaction + id}`, {

  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // console.log("data", data);
  //     return data;
  //   } catch (error: any) {
  //     throw error;
  //   }
  // };

  GetExpensesTranaction = async (token: any, categoryid: any, firmid: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.Expenses + "category/" + categoryid + "/firm/" + firmid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetItemBySearch = async (token: any, searchTerm: any, firmid: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.item +
        "search?searchTerm=" +
        searchTerm +
        "&firmId=" +
        firmid
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  AddService = async (values: any, token: any) => {
    try {
      const { data } = await axios.post(
        `${Constants.Service + "save"}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetService = async (id: any, token: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.Service + "itemServiceByFirm/" + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  getParticularService = async (id: any, token: any) => {
    try {
      const { data } = await axios.get(`${Constants.Service + id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  getpartyTransaction = async (token: any, id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.GetPartyTransaction + id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  getpartyTransactionbySearch = async (token: any, searchTerm: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.partyTransaction + "search?searchTerm=" + searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
}
