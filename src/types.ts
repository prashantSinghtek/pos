import partiesSlice from './Redux/Parties/reducer';
import firmSlice from './Redux/Firm/reducer';
import itemSlice from './Redux/Item/reducer';
// Define RootState interface
export interface RootState {
  parties: ReturnType<typeof partiesSlice>;
  user: ReturnType<typeof firmSlice>;
  item: ReturnType<typeof itemSlice>;
}
