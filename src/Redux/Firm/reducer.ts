// Redux/Parties/reducer.ts (or partiesSlice.ts)
import { createSlice } from '@reduxjs/toolkit';
export const initialState: any = {
  list: [],
}
const firmSlice = createSlice({
  name: 'firm',
  initialState,
  reducers: {
    setFirmData: (state, action) => {
      state.list = action.payload;
    },

  },
});

export const { setFirmData } = firmSlice.actions;
export default firmSlice.reducer; // Ensure that you're exporting the reducer
