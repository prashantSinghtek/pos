export interface ServiceItem {
  id: string;
  serviceName: string; // Name of the service
  serviceHSN: string; // HSN code of the service
  serviceCode: string; // Service code
  categoryIds: string; // Category IDs
  unit: string; // Unit of measurement (e.g., Box)
  salePrice: number; // Sale price of the service
  salePriceTaxType: string; // Tax type for the sale price (e.g., withGST)
  discountOnSalePrice: number; // Discount on the sale price
  discountOnSalePriceType: string; // Discount type (e.g., Amount, Percentage)
  wholeSalePrice: number; // Wholesale price of the service
  wholeSalePriceTaxType: string; // Tax type for the wholesale price (e.g., withGST)
  wholeSaleQuantity: number; // Wholesale quantity
  tax: number; // Tax amount
  firmId: string; // Firm ID
  imagePath: File | string; // Image file or path
}

export interface ProductFormInterface {
  id: string;
  itemName: string;
  itemHsn: string;
  itemCode: string;
  unit: string;
  salePrice: string;
  discountOnSalePrice: string;
  wholeSalePrice: string;
  quantity: string;
  purchasePrice: string;
  tax: string;
  openingQuantity: string;
  atPrice: string;
  asOfDate: string;
  minStockToMaintain: string;
  location: string;
  firmId: string;
  discountOnSalePriceType: null;
  wholeSalePriceTaxType: null;
  salePriceType: null;
  purchasePriceTaxType: null;
  salePriceTaxType: string;
  categoryIds: string;
  path: File | null; // assuming it's a file type since an image is uploaded
  itemAmount: string;
  discountAmount: string;
}

export interface TransactionInterface {
  id: number;
  quantity: number;
  unitPrice: number;
  partyName: string;
  operationType: string;
  status: any;
  invoiceNumber: string;
  dateOfTransaction: any;
}

export interface CombinedInitialState {
  serviceForm: ServiceItem;
  itemProductForm: ProductFormInterface;
  addItemModel: boolean;
  itemList: Array<any>;
  searchItem: string;
  transactionList : Array<TransactionInterface>;
}

export const initialState: CombinedInitialState = {
  addItemModel: false,
  transactionList: [],
  searchItem :"",
  serviceForm: {
    id: "",
    serviceName: "",
    serviceHSN: "",
    serviceCode: "",
    categoryIds: "",
    unit: "",
    salePrice: 0,
    salePriceTaxType: "",
    discountOnSalePrice: 0,
    discountOnSalePriceType: "",
    wholeSalePrice: 0,
    wholeSalePriceTaxType: "",
    wholeSaleQuantity: 0,
    tax: 0,
    firmId: "",
    imagePath: "",
  },
  itemProductForm: {
    id: "",
    itemName: "",
    itemHsn: "",
    itemCode: "",
    unit: "",
    salePrice: "",
    discountOnSalePrice: "",
    wholeSalePrice: "",
    quantity: "",
    purchasePrice: "",
    tax: "",
    openingQuantity: "",
    atPrice: "",
    asOfDate: "",
    minStockToMaintain: "",
    location: "",
    firmId: "",
    discountOnSalePriceType: null, // discount on sale price
    wholeSalePriceTaxType: null, // whole sale
    salePriceType: null,
    purchasePriceTaxType: null, //below
    salePriceTaxType: "WITHOUT_GST",
    categoryIds: "",
    path: null,
    itemAmount: "500",
    discountAmount: "200",
  },
  itemList: [],
};
