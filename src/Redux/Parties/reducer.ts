// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, partiesFormInterface } from "./types";
import { set } from "lodash";
const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
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
    ) => {}
  },
});

export const { setUserDetailForm  , updatePartyForm , addParty} = partiesSlice.actions;
export default partiesSlice.reducer; // Ensure that you're exporting the reducer
