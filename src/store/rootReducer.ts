// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import partiesReducer from '../Redux/Parties/reducer'; // Import your parties reducer
// Import other reducers as necessary

const rootReducer = combineReducers({
  parties: partiesReducer, // Add other reducers here
  // otherReducer: otherReducer,
});

export default rootReducer;
