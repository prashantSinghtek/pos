// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  categoryFormInterface,
  initialState,
  ProductFormInterface,
  TransactionInterface,
  unitConversionFormInterface,
} from "./types";
import { get, set } from "lodash";
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    updateServiceForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `serviceForm.${action.payload.key}`, action.payload.value);
    },
    updateProductForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `itemProductForm.${action.payload.key}`, action.payload.value);
    },
    addItem: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},
    chnageAddItemModelState: (state, action: PayloadAction<boolean>) => {
      state.addItemModel = action.payload;
    },
    setProductFormData: (
      state,
      action: PayloadAction<ProductFormInterface>
    ) => {
      state.itemProductForm = action.payload;
    },
    setItemList: (state, action: PayloadAction<Array<any>>) => {
      state.itemList = action.payload;
    },
    setTransactionist: (
      state,
      action: PayloadAction<Array<TransactionInterface>>
    ) => {
      state.transactionList = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchItem = action.payload;
    },
    getItemList: (
      state,
      action: PayloadAction<{
        firmId: any;
        callback: () => void;
      }>
    ) => {},
    deleteItemById: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},
    getItemById: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},
    getTransactionByItemId: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},
    setSearchItemName: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    // Category

    updateCategoryForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `categoryForm.${action.payload.key}`, action.payload.value);
    },
    addCategory: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},
    changeAddCategoryModelState: (state, action: PayloadAction<boolean>) => {
      state.categoryModel = action.payload;
    },
    setitemSelectedinCatgory: (state, action: PayloadAction<number[]>) => {
      state.itemSelectedinCatgory = action.payload;
    },
    setCategoryFormData: (
      state,
      action: PayloadAction<categoryFormInterface>
    ) => {
      state.categoryForm = action.payload;
    },
    setCategoryist: (state, action: PayloadAction<Array<any>>) => {
      state.categoryList = action.payload;
    },
    setCategoryTransactionist: (
      state,
      action: PayloadAction<Array<TransactionInterface>>
    ) => {
      state.categoryTransactionList = action.payload;
    },
    setCategoryTransactionSearch: (state, action: PayloadAction<string>) => {
      state.searchCategoryTrasaction = action.payload;
    },
    getCategoryist: (
      state,
      action: PayloadAction<{
        firmId: any;
        callback: () => void;
      }>
    ) => {},
    deleteCategoryById: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},
    getCategoryById: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},
    getCategoryTransactionById: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},
    setSearchCategoryName: (state, action: PayloadAction<string>) => {
      state.searchCategory = action.payload;
    },

    markToTheCategory: (
      state,
      action: PayloadAction<{
        categoryId: any;
        callback: () => void;
      }>
    ) => {},

    // unit 

    updateUnitForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `unitForm.${action.payload.key}`, action.payload.value);
    },
    addUnit: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},
    changeUnitModelState: (state, action: PayloadAction<boolean>) => {
      state.unitModel = action.payload;
    },
    setUnitFormData: (
      state,
      action: PayloadAction<categoryFormInterface>
    ) => {
      state.categoryForm = action.payload;
    },
    setUnitist: (state, action: PayloadAction<Array<any>>) => {
      state.unitList = action.payload;
    },
    getUnitList: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},

    setSearchUnit: (state, action: PayloadAction<string>) => {
      state.searchunit = action.payload;
    },
    deleteUnitById: (
      state,
      action: PayloadAction<{
        itemId: any;
        callback: () => void;
      }>
    ) => {},

    // unit_Conversion

    setSearchUnitConversion: (state, action: PayloadAction<string>) => {
      state.searchConversionUnit = action.payload;
    },
    updateUnitConversionForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `unitConversionForm.${action.payload.key}`, action.payload.value);
    },
    addUnitConversion: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},
    changeUnitConversionModelState: (state, action: PayloadAction<boolean>) => {
      state.unitConversionModel = action.payload;
    },
    setUnitConversionFormData: (
      state,
      action: PayloadAction<unitConversionFormInterface>
    ) => {
      state.unitConversionForm = action.payload;
    },
    setUnitConversionist: (state, action: PayloadAction<Array<any>>) => {
      state.unitConversionList = action.payload;
    },
    getUnitConversionList: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},

  },
});

export const {
  updateServiceForm,
  setSearchItemName,
  setProductFormData,
  setSearch,
  setTransactionist,
  deleteItemById,
  updateProductForm,
  addItem,
  getTransactionByItemId,
  chnageAddItemModelState,
  getItemList,
  getItemById,
  setItemList,

  // Category

  updateCategoryForm , 
  addCategory , 
  changeAddCategoryModelState ,
  setCategoryFormData ,
  setCategoryist ,
  setCategoryTransactionist ,
  setCategoryTransactionSearch ,
  getCategoryist ,
  deleteCategoryById ,
  getCategoryById ,
  getCategoryTransactionById ,
  setSearchCategoryName ,
  setitemSelectedinCatgory,
  markToTheCategory,

  // unitt 
  updateUnitForm,
  addUnit ,
  changeUnitModelState ,
  setUnitFormData ,
  setUnitist ,
  getUnitList,
  setSearchUnit,
  deleteUnitById,

  updateUnitConversionForm,
  addUnitConversion,
  changeUnitConversionModelState

} = itemSlice.actions;
export default itemSlice.reducer; // Ensure that you're exporting the reducer
