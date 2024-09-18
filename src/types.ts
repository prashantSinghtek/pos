import partiesSlice from './Redux/Parties/reducer';
import firmSlice from './Redux/Firm/reducer';
// Define RootState interface
export interface RootState {
  parties: ReturnType<typeof partiesSlice>;
  user: ReturnType<typeof firmSlice>;
}
