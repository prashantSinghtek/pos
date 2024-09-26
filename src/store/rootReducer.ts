// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import partiesReducer from '../Redux/Parties/reducer'; // Import your parties reducer
import firmReducer from '../Redux/Firm/reducer'; // Import your parties reducer
import itemReducer from '../Redux/Item/reducer'; // Import your parties reducer
// Import other reducers as necessary

const rootReducer = combineReducers({
  parties: partiesReducer, // Add other reducers here
  firm : firmReducer,
  item : itemReducer
});

export default rootReducer;
