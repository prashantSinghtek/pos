import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { setTest } from './reducer';

interface Party {
  id: number;
  name: string;

}

function* fetchParties() {
  try {
    const response: AxiosResponse<Party[]> = yield call(axios.get, '/api/parties');


  } catch (error) {
    console.error('Error fetching parties data:', error);
  }
}

export function* setTestRequest() {
  try {
   console.log("saga Called");
   
    
  } catch (error: any) {
    console.log("saga Called Catch");
  }
}
export default function* partiesSaga(): Generator {
  yield takeEvery('parties/fetchParties', fetchParties);
  
  yield takeLatest(setTest, setTestRequest);

}
