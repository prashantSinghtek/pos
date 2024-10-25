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
export const selectitemSelectedinCatgory = (state: RootState) => state.item.itemSelectedinCatgory


// unit 

export const selectUnitForm = (state: RootState) => state.item.unitForm
export const selectUnitList = (state: RootState) => state.item.unitList
export const selectUnitModel = (state: RootState) => state.item.unitModel
export const selectSearchunit = (state: RootState) => state.item.searchunit

// unit_Conversion

export const selectUnitConversionForm = (state: RootState) => state.item.unitConversionForm
export const selectUnitConversionList = (state: RootState) => state.item.unitConversionList
export const selectUnitConversionModel = (state: RootState) => state.item.unitConversionModel
export const selectSearchunitConversion = (state: RootState) => state.item.searchConversionUnit


