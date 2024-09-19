import { RootState } from "@/store";


// Selector to get the parties list
export const selectPartiesList = (state: RootState) => state.parties.partiesList;
export const selectPartyForm = (state: RootState) => state.parties.partiesForm;
export const selectIsShowSaveButton = (state: RootState) => state.parties.isShowSaveButton;
export const selectTransactionList = (state: RootState) => state.parties.transactionList;
export const selectPartyDashboardData = (state: RootState) => state.parties.partyDashboardData;