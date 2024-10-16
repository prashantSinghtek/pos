import { RootState } from "@/types";

export const selectServiceForm = (state: RootState) => state.item.serviceForm
export const selectProductForm = (state: RootState) => state.item.itemProductForm
export const selectAddItemModel = (state: RootState) => state.item.addItemModel
export const selectItemList = (state: RootState) => state.item.itemList
export const selectTransactionList = (state: RootState) => state.item.transactionList
export const selectSearchItem = (state: RootState) => state.item.searchItem

