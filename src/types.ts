import partiesSlice from './Redux/Parties/reducer';

// Define RootState interface
export interface RootState {
  parties: ReturnType<typeof partiesSlice>;
  // Add other states here as needed
}
