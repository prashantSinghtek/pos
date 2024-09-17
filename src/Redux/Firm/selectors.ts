import { RootState } from "@/types";


// Selector to get the parties list
export const selectPartiesList = (state: RootState) => state.parties.list;

