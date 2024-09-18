import { RootState } from "@/store";


// Selector to get the parties list
export const selectPartiesList = (state: RootState) => state.parties.partiesList;
export const selectPartyForm = (state: RootState) => state.parties.partiesForm;

