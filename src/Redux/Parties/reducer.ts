// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, partiesFormInterface } from "./types";
import { set } from "lodash";
const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    setIsShowSaveButton: (state, action: PayloadAction<boolean>) => {
      state.isShowSaveButton = action.payload;
    },
    setUserDetailForm: (state, action: PayloadAction<partiesFormInterface>) => {
      state.partiesForm = action.payload;
    },
    updatePartyForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `partiesForm.${action.payload.key}`, action.payload.value);
    },
    resetPartyForm: () => initialState,
    addParty: (
      state,
      action: PayloadAction<{
        firmId: any;
        callback: () => void;
      }>
    ) => {},
    getParty: (
      state,
      action: PayloadAction<{
        firmId: any;
        callback: () => void;
      }>
    ) => {},
    setPartyList: (
      state,
      action: PayloadAction<Array<partiesFormInterface>>
    ) => {
      state.partiesList = action.payload;
    },
  },
});

export const { setUserDetailForm  , updatePartyForm , addParty , getParty , setPartyList , setIsShowSaveButton} = partiesSlice.actions;
export default partiesSlice.reducer; // Ensure that you're exporting the reducer
