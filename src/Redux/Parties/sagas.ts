import {
  takeEvery,
  call,
  put,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import { selectPartyForm } from "./selectors";
import { partiesFormInterface } from "./types";
import {
  addFirmParty,
  deletePartyByIdAPI,
  getPartyDetailAPI,
  getPartyList,
  getPartyTransactionApi,
  getPartyTransactionBySearch,
} from "@/controller/posauth";
import {
  addParty,
  deletePartyById,
  getParty,
  getPartyDetail,
  getPartyTransaction,
  setPartiesDashboardData,
  setPartyList,
  setTrasactionList,
} from "./reducer";

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
      return;
    }
    if (action.payload.callback) {
      action.payload.callback();
    }
  } catch (error) {
    console.error("Error updating firm party:", error);
  }
}
export function* getPartyRequest(action: {
  payload: { firmId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.firmId.length === 0) {
    return;
  }
  yield delay(1000);
    const response: any = yield call(getPartyList, action.payload.firmId);
    yield put(setPartyList(response.data));
    if (action.payload.callback) {
      action.payload.callback();
    }
}
export function* getPartyTransactionRequest(action: {
  payload: { partieId: string; firmId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.firmId.length === 0) {
    return;
  }
  yield delay(1000);
    const response: any = yield call(
      getPartyTransactionApi,
      action.payload.partieId,
      action.payload.firmId
    );
    yield put(setTrasactionList(response.data.resultedData));
    console.log(response, "response");
    if (action.payload.callback) {
      action.payload.callback();
    }
}
export function* getPartyDetailRequest(action: {
  payload: { partieId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.partieId.length === 0) {
    return;
  }
  yield delay(1000);
  const response: any = yield call(getPartyDetailAPI, action.payload.partieId);
  yield put(setPartiesDashboardData(response.data));
  if (action.payload.callback) {
    action.payload.callback();
  }
}
export function* deletePartyByIdRequest(action: {
  payload: { partieId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.partieId.length === 0) {
    return;
  }
  yield delay(1000);
  yield call(deletePartyByIdAPI, action.payload.partieId);
  if (action.payload.callback) {
    action.payload.callback();
  }
}
export default function* partiesSaga(): Generator {
  yield takeLatest(addParty, addPartyRequest);
  yield takeLatest(getParty, getPartyRequest);
  yield takeLatest(getPartyTransaction, getPartyTransactionRequest);
  yield takeLatest(getPartyDetail, getPartyDetailRequest);
  yield takeLatest(deletePartyById, deletePartyByIdRequest);
  
}
