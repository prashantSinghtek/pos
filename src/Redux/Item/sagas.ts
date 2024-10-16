import { takeEvery, call, put, takeLatest, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { addItem, chnageAddItemModelState } from "./reducer";
import { selectProductForm } from "./selectors";
import { ProductFormInterface } from "./types";
import { addItem as addItemAPI } from "@/controller/posauth";
import { log } from "console";
import toast from "react-hot-toast";

export function* addItemRequest(action: { payload: { callback: any } }): Generator<any, void, any> {
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
    else if (typeof fieldValue === "object" && fieldValue !== null && "value" in fieldValue && "label" in fieldValue) {
      formData.append(key, String(fieldValue.value)); // Append only the 'value'
    } 
    // Handle other fields
    else {
      formData.append(key, String(fieldValue));
    }
  });

  // Debugging: Log the FormData contents to verify
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  try {
    const response: any = yield call(addItemAPI, formData);
    debugger
    if (response && !response.status) {   
       toast.success(response?.message);
      return;
    }  

     yield put(chnageAddItemModelState(false));  
       toast.success(response?.message);   
      action.payload.callback();

  
  } catch (error) {
    console.error("Error updating item:", error);
  }
}


export default function* ItemSaga(): Generator {
  yield takeLatest(addItem, addItemRequest);
}
