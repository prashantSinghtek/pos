// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialState,
} from "./types";
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
  
  },
});

export const {

} = itemSlice.actions;
export default itemSlice.reducer; // Ensure that you're exporting the reducer
