import { takeEvery, call, put, takeLatest, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { addItem } from "./reducer";
import { selectProductForm } from "./selectors";
import { ProductFormInterface } from "./types";
import { addItem as addItemAPI } from "@/controller/posauth";
import { log } from "console";

export function* addItemRequest(action: {
  payload: { callback: any };
}): Generator<any, void, any> {
  const form: ProductFormInterface = yield select(selectProductForm);
  const formData = new FormData();

  // Append each field to formData
  Object.keys(form).forEach((key) => {
    if (key === "path") {
      const fileList = form[key as keyof ProductFormInterface];
      if (fileList instanceof FileList) {
        // Convert FileList to an array and append each file to formData
        Array.from(fileList).forEach((file: File, index: number) => {
          formData.append(`path`, file);
        });
      } else if (fileList instanceof File) {
        // In case it's a single file
        formData.append("path", fileList);
      }
    } else {
      formData.append(key, String(form[key as keyof ProductFormInterface]));
    }
  });

  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  // API call
  try {
    const response: any = yield call(addItemAPI, formData);
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


export default function* ItemSaga(): Generator {
  yield takeLatest(addItem, addItemRequest);
}
