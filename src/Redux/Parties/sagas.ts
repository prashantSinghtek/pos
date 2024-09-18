import { takeEvery, call, put, takeLatest, select } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { selectPartyForm } from './selectors';
import { partiesFormInterface } from './types';
import { addFirmParty } from '@/controller/posauth';
import { addParty } from './reducer';

interface Party {
  id: number;
  name: string;

}

export function* addPartyRequest(action: {
  payload: { firmId: string; callback: any };
}): Generator<any, void, any> {
  const form: partiesFormInterface = yield select(selectPartyForm);
  
  try {
    const response: any = yield call(addFirmParty, form, action.payload.firmId);

    if (response && !response.data.status) {
      // Handle the unsuccessful response
      return;
    }

    // Call the callback after success, if provided
    if (action.payload.callback) {
      action.payload.callback();
    }

  } catch (error) {
    // Handle the error case
    console.error('Error updating firm party:', error);
  }
}
export default function* partiesSaga(): Generator {
  
  yield takeLatest(addParty, addPartyRequest);

}
