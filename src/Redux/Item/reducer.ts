// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types";
import { set } from "lodash";
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
  },
});

export const { updateServiceForm, updateProductForm ,addItem } = itemSlice.actions;
export default itemSlice.reducer; // Ensure that you're exporting the reducer
