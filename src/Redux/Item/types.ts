export interface ServiceItem {
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

export interface CombinedInitialState {
  serviceForm: ServiceItem;
}
export const initialState: CombinedInitialState = {
  serviceForm: {
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
};
