// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice } from '@reduxjs/toolkit';

const partiesSlice = createSlice({
  name: 'parties',
  initialState: {
    list: [],
  },
  reducers: {
    setPartiesData: (state, action) => {
      state.list = action.payload;
    },
    setTest: (state) => {
     console.log("Redux Called");
     
    },
  },
});

export const { setPartiesData , setTest} = partiesSlice.actions;
export default partiesSlice.reducer; // Ensure that you're exporting the reducer
