import { takeEvery, call, put, takeLatest, select, delay } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { addItem, chnageAddItemModelState, deleteItemById, getItemById, getItemList, getTransactionByItemId, setItemList, setSearch, setTransactionist } from "./reducer";
import { selectProductForm, selectSearchItem } from "./selectors";
import { ProductFormInterface } from "./types";
import { addItem as addItemAPI, DeleteItem, GetItem, getProducts, GetTrasactionItem } from "@/controller/posauth";
import toast from "react-hot-toast";

export function* addItemRequest(action: {
  payload: { callback: any };
}): Generator<any, void, any> {
  const form: ProductFormInterface = yield select(selectProductForm);
  const formData = new FormData();

  // Append each field to formData
  Object.keys(form).forEach((key) => {
    const fieldValue = form[key as keyof ProductFormInterface];

    // Handle file fields
    if (key === "path") {
      const fileList = form[key as keyof ProductFormInterface];
      if (fileList instanceof FileList) {
        // Convert FileList to an array and append each file to formData
        Array.from(fileList).forEach((file: File) => {
          formData.append("path", file);
        });
      } else if (fileList instanceof File) {
        // In case it's a single file
        formData.append("path", fileList);
      }
    }
    // Handle fields with "value" and "label"
    else if (
      typeof fieldValue === "object" &&
      fieldValue !== null &&
      "value" in fieldValue &&
      "label" in fieldValue
    ) {
      formData.append(key, String(fieldValue.value)); // Append only the 'value'
    }
    // Handle other fields
    else {
      formData.append(key, String(fieldValue));
    }
  });

  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  try {
    const response: any = yield call(addItemAPI, formData);
    debugger;
    if (!response || response== undefined || response.status != 200) {
      toast.error(response?.message || "Something went wrong");
      return;
    }

    yield put(chnageAddItemModelState(false));
    toast.success(response?.message);
    action.payload.callback();
  } catch (error) {
    console.error("Error updating item:", error);
  }
}


// 
export function* getItemListRequest(action: {
  payload: { firmId: string; callback: any };
}): Generator<any, void, any> {
  console.log(action.payload.firmId, "firmId");
  if (action.payload.firmId.length === 0) {
    return;
  }
  yield delay(1000);
  const response: any = yield call(getProducts, action.payload.firmId);
  console.log(response, "response");
  
  yield put(setItemList(response.data));
  if (action.payload.callback) {
    action.payload.callback();
  }
}
export function* deleteItemByIdRequest(action: {
  payload: { itemId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.itemId.length === 0) {
    return;
  }
  yield delay(1000);
  yield call(DeleteItem, action.payload.itemId);
  if (action.payload.callback) {
    action.payload.callback();
  }
}

export function* getItemByIdRequest(action: {
  payload: { itemId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.itemId.length === 0) {
    return;
  }
  yield delay(1000);
  const response: any = yield call(GetItem, action.payload.itemId);
  console.log(response , "response");
  
  if (action.payload.callback) {
    action.payload.callback();
  }
}

export function* getTransactionByItemIdRequest(action: {
  payload: { itemId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.itemId.length === 0) {
    return;
  }
  const search: string = yield select(selectSearchItem);
  yield delay(1000);
  const response: any = yield call(GetTrasactionItem, action.payload.itemId, search);
  console.log(response , "response");
  yield put(setTransactionist(response));
  if (action.payload.callback) {
    action.payload.callback();
  }
}
export default function* ItemSaga(): Generator {
  yield takeLatest(addItem, addItemRequest);
  yield takeLatest(getItemList, getItemListRequest);
  yield takeLatest(deleteItemById, deleteItemByIdRequest);
  yield takeLatest(getItemById, getItemByIdRequest);
  yield takeLatest(getTransactionByItemId, getTransactionByItemIdRequest);
  
}
