// store/sagas/index.ts
import partiesSaga from '@/Redux/Parties/sagas';
import { all } from 'redux-saga/effects';


export function* rootSaga() {
  yield all([
    partiesSaga(), // Add your parties saga here
  ]);
}
