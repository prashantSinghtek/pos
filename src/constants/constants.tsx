export class Constants {
  static X_API_KEY = "X API Key";
  static firm = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Firm/firm`;
  static Getunit = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/getSelectunit`;
  static GetCategoryByFirm = `${process.env.NEXT_PUBLIC_BASE_MAIN}category/get/by`;
  static AddItem = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/save`;
  static updatefirm = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Firm/firm`;
  static firmUser = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/StaffData/staffRole`;
  static AddfirmParty = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Party/add`;
  static GetPartyTransaction = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/party-transactions/party/`;
  static GetfirmParty = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Party/getPartiesLists?firmId=`;
  static GetPartyDetail = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Party/getPartyDashboard?firmId=`;
  static Getpartiesbyfirm = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Party/get/by/id?partyId=`;
  static state = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/dropdown/State`;
  static unit = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/dropdown/ProductUnit`;
  static Service = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/item/service/`;
  static category = `${process.env.NEXT_PUBLIC_BASE_MAIN}category/`;
  static getproduct = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/itemByFirm/`;
  static saleCredit = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-credit/save?firmId=`;
  static saleCash = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-cash/save?firmId=`;
  static GetParticularsaleCash = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-cash/byId/`;
  static DeleteParticularsaleCash = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-cash/delete/`;
  static saleCashupdate = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-cash/update/`;
  static sale = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-cash/cash-credit/all/`;
  static GetSale = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-cash/sales-credit/all?firmId=`;
  static saleEstimate = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/estimate/save?firmId=`;
  static getEstimate = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/estimate/all/by/firmId?firmId=`;
  static Estimate = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/estimate/`;
  static SaleOrder = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/SalesOrder/save?firmId=`;
  static getSaleOrder = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/SalesOrder/sale?firmId=`;
  static deliveryChallan = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/delivery-challan/`;
  static paymentin = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/payment-in/`;
  static paymentout = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/PaymentOut/`;
  static purchase = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Purchase/`;
  static getpurchaseorder = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/purchaseOrder/`;
  static getpurchasereturn = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/DebitNote/`;
  static purchaseReturn = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/DebitNote/`;
  static SaleReturn = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-Credit-Note/`;
  static Expenses = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/expense/`;
  static purchaseOrder = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/purchaseOrder/`;
  static cash = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/cash-in-hand/transaction/`;
  static bankaccount = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/bank/`;
  static getSalereturn = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/sales-Credit-Note/sale?firmId=`;
  static banktocash = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/BankToCashTransfer/`;
  static cashtobank = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/CashToBankTransfer/`;
  static banktobank = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/BankToBankTrasfer/`;
  static adjusmentbank = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/BankAdjustmentEntry/`;
  static partyTransaction = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/party-transactions/`;
  static DeleteParty = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Party/deleteParties?partyId=`;
  static UpdateParty = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Party/update/`;
  static DeleteTransaction = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/party-transactions/`;
  static itemDelete = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/`;
  static ItemWiseTrasaction = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/item/transaction/summary/`;
  static CategoryDelete = `${process.env.NEXT_PUBLIC_BASE_MAIN}category/delete/`;
  static GetCategoryByID = `${process.env.NEXT_PUBLIC_BASE_MAIN}category/get/`;
  static CategoryItemList = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/getItemWithCategory/`;
  static moveToThiscategory = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/moveToThiscategory?firmId=`;
  static unitConversion = `${process.env.NEXT_PUBLIC_BASE_MAIN}api/Item/saveSelectUnit/`;
}
