// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types";
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
    setItemList: (
      state,
      action: PayloadAction<Array<any>>
    ) => {
      state.itemList = action.payload;
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
  },
});

export const { updateServiceForm, deleteItemById, updateProductForm ,addItem , chnageAddItemModelState , getItemList ,getItemById, setItemList} = itemSlice.actions;
export default itemSlice.reducer; // Ensure that you're exporting the reducer
