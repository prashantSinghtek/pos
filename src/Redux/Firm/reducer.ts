// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FirmFormInterface,
  initialState,
  UserDetailFormInterface,
} from "./types";
const firmSlice = createSlice({
  name: "firm",
  initialState,
  reducers: {
    setFirmForm: (state, action: PayloadAction<FirmFormInterface>) => {
      state.firmForm = action.payload;
    },

    setUserDetailForm: (
      state,
      action: PayloadAction<UserDetailFormInterface>
    ) => {    
      state.userDetailForm = action.payload;
    },
    clearFirmForm: (state) => {
      state.firmForm = initialState.firmForm;
    },

    clearUserDetailForm: (state) => {
      state.userDetailForm = initialState.userDetailForm;
    },
  },
});

export const {
  setFirmForm,
  setUserDetailForm,
  clearFirmForm,
  clearUserDetailForm,
} = firmSlice.actions;
export default firmSlice.reducer; // Ensure that you're exporting the reducer
