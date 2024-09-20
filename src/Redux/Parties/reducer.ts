// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialState,
  partiesFormInterface,
  transactionInterface,
} from "./types";
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
    setPartiesDashboardData: (state, action: PayloadAction<partiesFormInterface>) => {
      state.partyDashboardData = action.payload;
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
    getPartyTransaction: (
      state,
      action: PayloadAction<{
        partieId: any;
        firmId: any;
        callback: () => void;
      }>
    ) => {},
    getPartyDetail: (
      state,
      action: PayloadAction<{
        partieId: any;
        callback: () => void;
      }>
    ) => {},
    deletePartyById: (
      state,
      action: PayloadAction<{
        partieId: any;
        callback: () => void;
      }>
    ) => {},
    setPartyList: (
      state,
      action: PayloadAction<Array<partiesFormInterface>>
    ) => {
      state.partiesList = action.payload;
    },
    setTrasactionList: (
      state,
      action: PayloadAction<Array<transactionInterface>>
    ) => {
      state.transactionList = action.payload;
    },
    setFirmId: (state, action: PayloadAction<string>) => {
      state.firmId = action.payload;
    },
    
  },
});

export const {
  setUserDetailForm,
  updatePartyForm,
  addParty,
  getParty,
  setPartyList,
  setIsShowSaveButton,
  getPartyTransaction,
  setTrasactionList,
  getPartyDetail,
  setPartiesDashboardData,
  deletePartyById,
  setFirmId
} = partiesSlice.actions;
export default partiesSlice.reducer; // Ensure that you're exporting the reducer
