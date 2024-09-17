import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';





export function* setTestRequest() {
  try {
   console.log("saga Called");
   
    
  } catch (error: any) {
    console.log("saga Called Catch");
  }
}
export default function* firmSaga(): Generator {

  // yield takeLatest(, setTestRequest);

}
