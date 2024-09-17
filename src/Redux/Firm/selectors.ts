import { RootState } from "@/types";
import { initialState } from "./reducer";
import { createSelector } from "@reduxjs/toolkit";


const selectDomain = (state: RootState) => {
    if (state && state.parties) {

        return state.parties;
    
    } else {
      return initialState;
    }
  };

  export const selectPartiesList = createSelector(
    [selectDomain],
    (state) => state.list
  );

