import { Constants } from "@/constants/constants";
import axios from "@/utils/axios";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
const apiRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  values?: any,
  responseType?: "blob"
) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const { data } = await axios({
      method,
      url,
      data: values,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: responseType || "json",
    });
    if (responseType === "blob") {
      const aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(data);
      aTag.download = "filename.pdf"; // You can set a dynamic filename here if needed
      document.body.appendChild(aTag);
      aTag.click();
      document.body.removeChild(aTag);
      return URL.createObjectURL(data);
    }
    if (!data && !data.data.status) {
      return;
    }
    return data;
  } catch (error: any) {
    if (error?.response.status == 401) {
      sessionStorage.clear();
      localStorage.clear();
      signOut()
        .then(() => {
          window.location.pathname = "/";
        })
        .catch((error) => {
          console.error("Error during signout:", error);
        });
      return;
    }
    toast.error(error?.response?.data?.message);
  }
};

export const addParty = (values: any) =>
  apiRequest("post", Constants.firm, values);

export const addFirm = (values: any) =>
  apiRequest("post", Constants.firm, values);

export const updateFirm = (values: any, id: any) =>
  apiRequest("put", `${Constants.firm}/${id}`, values);

export const addFirmUser = (values: any) =>
  apiRequest("post", Constants.firmUser, values);
export const myCompany = (id?: any) => {
  const url = id ? `${Constants.firm}/${id}` : Constants.firm;
  return apiRequest("get", url);
};
export const getUnit = (id?: any) => {
  const url =  `${Constants.Getunit}?firmId=${id}`;
  return apiRequest("get", url);
};


export const getCategoryByFirm = (id?: any) => {
  const url =  `${Constants.GetCategoryByFirm}/${id}`;
  return apiRequest("get", url);
};

export const addFirmParty = (values: any, id: any) => {
  const url = `${Constants.AddfirmParty}?firmId=${id}`;
  return apiRequest("post", url, values);
};

export const addItem = (values: any,) => {
  const url = `${Constants.AddItem}`;
  return apiRequest("post", url, values);
};

export const getState = () => {
  return apiRequest("get", Constants.state);
};

export const getPartyList = (firmid: any) => {
  const url = `${Constants.GetfirmParty}${firmid}`;
  return apiRequest("get", url);
};

export const getFirmUser = () => {
  return apiRequest("get", Constants.firmUser);
};

export const getPartiesByID = (id: any) => {
  const url = `${Constants.Getpartiesbyfirm}${id}`;
  return apiRequest("get", url);
};

export const addUnits = (values: any) => {
  return apiRequest("post", Constants.unit, values);
};

export const getUnits = () => {
  return apiRequest("get", Constants.unit);
};

export const getProducts = (firmid: any) => {
  const url = `${Constants.getproduct}${firmid}`;
  return apiRequest("get", url);
};
export const addCategory = (categoryName: any, firmId: any) => {
  const url = `${Constants.category}add?categoryName=${categoryName}&firmId=${firmId}`;
  return apiRequest("post", url);
};

export const getCategory = () => {
  return apiRequest("get", `${Constants.category}get/all`);
};

export const getParticularCategory = (id: any) => {
  return apiRequest("get", `${Constants.category}get/${id}`);
};

export const getParticularCategoryById = (id: any) => {
  return apiRequest("get", `${Constants.category}get/all${id}`);
};

export const addSaleCredit = (id: any, values: any) => {
  return apiRequest("post", `${Constants.saleCredit}${id}`, values, "blob");
};

export const addSaleOrder = (id: any, values: any) => {
  return apiRequest("post", `${Constants.SaleOrder}${id}`, values, "blob");
};

export const getSaleOrder = (id: any) => {
  return apiRequest("get", `${Constants.getSaleOrder}${id}`);
};

export const addSaleCash = (id: any, values: any) => {
  return apiRequest("post", `${Constants.saleCash}${id}`, values, "blob");
};

export const getSale = (id: any) => {
  return apiRequest("get", `${Constants.sale}${id}`);
};

export const addSaleEstimate = (id: any, values: any) => {
  return apiRequest("post", `${Constants.saleEstimate}${id}`, values, "blob");
};

export const addPurchaseOrder = (id: any, values: any) => {
  return apiRequest(
    "post",
    `${Constants.purchaseOrder}savepurchaseOrder?firmId=${id}`,
    values
  );
};

export const getEstimate = (id: any) => {
  return apiRequest("get", `${Constants.getEstimate}${id}`);
};

export const getParticularEstimate = (id: any) => {
  return apiRequest("get", `${Constants.Estimate}${id}`);
};

export const getParticularSaleCash = (id: any) => {
  return apiRequest("get", `${Constants.GetParticularsaleCash}${id}`);
};

export const deleteParticularSaleCash = (id: any) => {
  return apiRequest("delete", `${Constants.DeleteParticularsaleCash}${id}`);
};

export const addDeliveryChallan = (id: any, values: any) => {
  return apiRequest("post", `${Constants.deliveryChallan}save/${id}`, values);
};

export const getDeliveryChallans = () => {
  return apiRequest("get", `${Constants.deliveryChallan}all`);
};

export const getParticularDeliveryChallan = (id: any) => {
  return apiRequest("get", `${Constants.deliveryChallan}${id}`);
};

export const addPaymentIn = (values: any) => {
  return apiRequest(
    "post",
    `${Constants.paymentin}details/add`,
    values,
    "blob"
  );
};

export const getPaymentIn = () => {
  return apiRequest("get", `${Constants.paymentin}all`);
};

export const getParticularPaymentIn = (id: any) => {
  return apiRequest("get", `${Constants.paymentin}${id}`);
};

export const getSaleReturn = (id: any) => {
  return apiRequest("get", `${Constants.getSalereturn}${id}`);
};

export const getPaymentOut = (id: any) => {
  return apiRequest(
    "get",
    `${Constants.paymentout}getPaymentOutLists?firmId=${id}`
  );
};

export const addPurchase = (id: any, values: any) => {
  return apiRequest(
    "post",
    `${Constants.purchase}savePurchase?firmId=${id}`,
    values
  );
};

export const addPurchaseReturn = (id: any, values: any) => {
  return apiRequest(
    "post",
    `${Constants.purchaseReturn}save?firmId=${id}`,
    values
  );
};

export const getPurchaseBill = (id: any) => {
  return apiRequest(
    "get",
    `${Constants.purchase}getPurchaseListsByFirm?firmId=${id}`
  );
};

export const getPurchaseOrder = (id: any) => {
  return apiRequest(
    "get",
    `${Constants.getpurchaseorder}getPurchaseLists?firmId=${id}`
  );
};

export const getPurchaseReturn = (id: any) => {
  return apiRequest(
    "get",
    `${Constants.getpurchasereturn}getDebitLists?firmId=${id}`
  );
};
export const addSaleReturn = (id: any, values: any) => {
  return apiRequest(
    "post",
    `${Constants.SaleReturn}save?firmId=${id}`,
    values,
    "blob"
  );
};

export const getExpensesCategory = (id: any) => {
  return apiRequest(
    "get",
    `${Constants.Expenses}all/expense-category-with-type?firmId=${id}`
  );
};

export const addExpensesCategory = (id: any, name: any, type: any) => {
  return apiRequest(
    "post",
    `${Constants.Expenses}create/expense-category-with-type?firmId=${id}&expenseCategory=${name}&expenseType=${type}`
  );
};

export const addExpensesWithoutGST = (
  id: any,
  type: any,
  values: any,
  categoryId: any
) => {
  return apiRequest(
    "post",
    `${Constants.Expenses}create/firm/${id}?expenseType=${type}&categoryId=${categoryId}`,
    values
  );
};

export const getCash = (id: any) => {
  return apiRequest("get", `${Constants.cash}all/firm/${id}`);
};

export const getCashAmount = (id: any) => {
  return apiRequest("get", `${Constants.cash}amount/firm/${id}`);
};

export const addBankAccount = (id: any, values: any) => {
  return apiRequest(
    "post",
    `${Constants.bankaccount}addBankAccount?firmId=${id}`,
    values
  );
};

export const getBankAccount = (id: any) => {
  return apiRequest("get", `${Constants.bankaccount}getByFirm/${id}`);
};

export const getBankAccountById = (id: any) => {
  return apiRequest("get", `${Constants.bankaccount}byId/${id}`);
};

export const addBankToCash = (values: any) => {
  return apiRequest("post", `${Constants.banktocash}save`, values);
};

export const addCashToBank = (values: any) => {
  return apiRequest("post", `${Constants.cashtobank}save`, values);
};

export const addBankToBank = (fromid: any, toid: any, values: any) => {
  return apiRequest(
    "post",
    `${Constants.banktobank}save/${fromid}/${toid}`,
    values
  );
};

export const addAdjustmentBank = (id: any, values: any) => {
  return apiRequest("post", `${Constants.adjusmentbank}save/${id}`, values);
};

export const putBankAccount = (id: any, values: any) => {
  return apiRequest("put", `${Constants.bankaccount}${id}`, values);
};

export const putCategoryName = (id: any, values: any) => {
  return apiRequest(
    "put",
    `${Constants.category}update/${id}?categoryName=${values}`
  );
};

export const getExpensesTransaction = (categoryid: any, firmid: any) => {
  return apiRequest(
    "get",
    `${Constants.Expenses}category/${categoryid}/firm/${firmid}`
  );
};

export const addService = (values: any) => {
  return apiRequest("post", `${Constants.Service}save`, values);
};

export const getService = (id: any) => {
  return apiRequest("get", `${Constants.Service}itemServiceByFirm/${id}`);
};

export const getParticularService = (id: any) => {
  return apiRequest("get", `${Constants.Service}${id}`);
};

export const getPartyDetailAPI = (id: any) => {
  return apiRequest("get", `${Constants.Getpartiesbyfirm}${id}`);
};

export const getPartyTransactionApi = (partieId: any, search: any) => {
  return apiRequest(
    "get",
    `${Constants.GetPartyTransaction}${partieId}/search?searchTerm=${search}`
  );
};

export const getPartyTransactionBySearch = (searchTerm: any) => {
  return apiRequest(
    "get",
    `${Constants.partyTransaction}search?searchTerm=${searchTerm}`
  );
};
export const updatePartyAPI = (partieId: any, id: any, values: any) => {
  return apiRequest("put", `${Constants.UpdateParty}${partieId}`, values);
};

export const deletePartyByIdAPI = (id: any) => {
  return apiRequest("delete", `${Constants.DeleteParty}${id}`);
};


export const DeleteTransaction = (id: any) => {
  return apiRequest("delete", `${Constants.DeleteTransaction}${id}`);
};
export const DeleteItem = (id: any) => {
  return apiRequest("delete", `${Constants.itemDelete}${id}`);
};

export const GetItem = (id: any) => {
  return apiRequest("get", `${Constants.itemDelete}${id}`);
};