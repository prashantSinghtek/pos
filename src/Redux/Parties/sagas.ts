import { takeEvery, call, put, takeLatest, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import { selectPartyForm } from "./selectors";
import { partiesFormInterface } from "./types";
import { addFirmParty, getPartyList } from "@/controller/posauth";
import { addParty, getParty, setPartyList } from "./reducer";

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
  if (!action.payload.firmId) {
    return;
  }
  try {
    const response: any = yield call(getPartyList, action.payload.firmId);
    console.log(response, "dffs");

    yield put(setPartyList(response.data));
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
export default function* partiesSaga(): Generator {
  yield takeLatest(addParty, addPartyRequest);
  yield takeLatest(getParty, getPartyRequest);
}
