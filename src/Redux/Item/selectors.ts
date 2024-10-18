import { RootState } from "@/types";

export const selectServiceForm = (state: RootState) => state.item.serviceForm

// Item

export const selectProductForm = (state: RootState) => state.item.itemProductForm
export const selectAddItemModel = (state: RootState) => state.item.addItemModel
export const selectItemList = (state: RootState) => state.item.itemList
export const selectTransactionList = (state: RootState) => state.item.transactionList
export const selectSearchItem = (state: RootState) => state.item.searchItem
export const selectSearch = (state: RootState) => state.item.search

// Category

export const selectCategoryForm = (state: RootState) => state.item.categoryForm
export const selectCategoryModel = (state: RootState) => state.item.categoryModel
export const selectCategoryList = (state: RootState) => state.item.categoryList
export const selectCategoryTransactionList = (state: RootState) => state.item.categoryTransactionList
export const selectSearchCategory = (state: RootState) => state.item.searchCategory
export const selectSearchCategoryTrasaction = (state: RootState) => state.item.searchCategoryTrasaction
