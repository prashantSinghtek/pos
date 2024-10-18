// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ProductFormInterface, TransactionInterface } from "./types";
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
    chnageAddItemModelState: (state ,  action: PayloadAction<boolean>) => {
      state.addItemModel = action.payload;
    },
    setProductFormData: (state ,  action: PayloadAction<ProductFormInterface>) => {
      state.itemProductForm = action.payload;
    },
    setItemList: (
      state,
      action: PayloadAction<Array<any>>
    ) => {
      state.itemList = action.payload;
    },
    setTransactionist: (
      state,
      action: PayloadAction<Array<TransactionInterface>>
    ) => {
      state.transactionList = action.payload;
    },
    setSearch: (
      state,
      action: PayloadAction<string>
    ) => {
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
    setSearchItemName: (
      state,
      action: PayloadAction<string>
    ) => {
      state.search = action.payload;
    },
  },
});

export const { updateServiceForm,setSearchItemName, setProductFormData, setSearch,setTransactionist, deleteItemById, updateProductForm ,addItem , getTransactionByItemId, chnageAddItemModelState , getItemList ,getItemById, setItemList} = itemSlice.actions;
export default itemSlice.reducer; // Ensure that you're exporting the reducer
