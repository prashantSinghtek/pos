// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialState,
} from "./types";
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
  
  },
});

export const {

} = itemSlice.actions;
export default itemSlice.reducer; // Ensure that you're exporting the reducer
