import { BASE_MAIN } from "@/app/config/Constant";

export class Constants {
  static X_API_KEY = "X API Key";
  static firm = `${BASE_MAIN}api/Firm/firm`;
  
  static Getunit = `${BASE_MAIN}api/Item/getSelectunit`;
  static GetCategoryByFirm = `${BASE_MAIN}category/get/by`;
  static AddItem = `${BASE_MAIN}api/Item/save`;

  static updatefirm = `${BASE_MAIN}api/Firm/firm`;
  static firmUser = `${BASE_MAIN}api/StaffData/staffRole`;
  static AddfirmParty = `${BASE_MAIN}api/Party/add`;
  static GetPartyTransaction = `${BASE_MAIN}api/party-transactions/party/`;
  static GetfirmParty = `${BASE_MAIN}api/Party/getPartiesLists?firmId=`;
  static GetPartyDetail = `${BASE_MAIN}api/Party/getPartyDashboard?firmId=`;
  static Getpartiesbyfirm = `${BASE_MAIN}api/Party/get/by/id?partyId=`;
  static state = `${BASE_MAIN}api/dropdown/State`;
  static unit = `${BASE_MAIN}api/dropdown/ProductUnit`;
  static item = `${BASE_MAIN}api/Item/`;
  static Service = `${BASE_MAIN}api/item/service/`;
  static category = `${BASE_MAIN}category/`;
  static getproduct = `${BASE_MAIN}api/Item/itemByFirm/`;
  static saleCredit = `${BASE_MAIN}api/sales-credit/save?firmId=`;
  static saleCash = `${BASE_MAIN}api/sales-cash/save?firmId=`;
  static GetParticularsaleCash = `${BASE_MAIN}api/sales-cash/byId/`;
  static DeleteParticularsaleCash = `${BASE_MAIN}api/sales-cash/delete/`;
  static saleCashupdate = `${BASE_MAIN}api/sales-cash/update/`;
  static sale = `${BASE_MAIN}api/sales-cash/cash-credit/all/`;
  static GetSale = `${BASE_MAIN}api/sales-cash/sales-credit/all?firmId=`;
  static saleEstimate = `${BASE_MAIN}api/estimate/save?firmId=`;
  static getEstimate = `${BASE_MAIN}api/estimate/all/by/firmId?firmId=`;
  static Estimate = `${BASE_MAIN}api/estimate/`;
  static SaleOrder = `${BASE_MAIN}api/SalesOrder/save?firmId=`;
  static getSaleOrder = `${BASE_MAIN}api/SalesOrder/sale?firmId=`;
  static deliveryChallan = `${BASE_MAIN}api/delivery-challan/`;
  static paymentin = `${BASE_MAIN}api/payment-in/`;
  static paymentout = `${BASE_MAIN}api/PaymentOut/`;
  static purchase = `${BASE_MAIN}api/Purchase/`;
  static getpurchaseorder = `${BASE_MAIN}api/purchaseOrder/`;
  static getpurchasereturn = `${BASE_MAIN}api/DebitNote/`;
  static purchaseReturn = `${BASE_MAIN}api/DebitNote/`;
  static SaleReturn = `${BASE_MAIN}api/sales-Credit-Note/`;
  static Expenses = `${BASE_MAIN}api/expense/`;
  static purchaseOrder = `${BASE_MAIN}api/purchaseOrder/`;
  static cash = `${BASE_MAIN}api/cash-in-hand/transaction/`;
  static bankaccount = `${BASE_MAIN}api/bank/`;
  static getSalereturn = `${BASE_MAIN}api/sales-Credit-Note/sale?firmId=`;
  static banktocash = `${BASE_MAIN}api/BankToCashTransfer/`;
  static cashtobank = `${BASE_MAIN}api/CashToBankTransfer/`;
  static banktobank = `${BASE_MAIN}api/BankToBankTrasfer/`;
  static adjusmentbank = `${BASE_MAIN}api/BankAdjustmentEntry/`;
  static partyTransaction = `${BASE_MAIN}api/party-transactions/`;
  static DeleteParty = `${BASE_MAIN}api/Party/deleteParties?partyId=`;
  static UpdateParty = `${BASE_MAIN}api/Party/update/`;
  static DeleteTransaction = `${BASE_MAIN}api/party-transactions/`;
}
