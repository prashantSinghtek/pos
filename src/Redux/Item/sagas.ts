import {
  takeEvery,
  call,
  put,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  addCategory,
  addItem,
  changeAddCategoryModelState,
  chnageAddItemModelState,
  deleteCategoryById,
  deleteItemById,
  getCategoryById,
  getCategoryist,
  getCategoryTransactionById,
  getItemById,
  getItemList,
  getTransactionByItemId,
  setCategoryFormData,
  setCategoryist,
  setCategoryTransactionist,
  setItemList,
  setProductFormData,
  setSearch,
  setTransactionist,
} from "./reducer";
import {
  selectCategoryForm,
  selectProductForm,
  selectSearch,
  selectSearchCategory,
  selectSearchCategoryTrasaction,
  selectSearchItem,
} from "./selectors";
import { categoryFormInterface, ProductFormInterface } from "./types";
import {
  addCategoryAPI,
  addItem as addItemAPI,
  DeleteItem,
  getCategoryByFirmId,
  GetItem,
  getProducts,
  GetTrasactionItem,
} from "@/controller/posauth";
import toast from "react-hot-toast";
import { selectFirmId } from "../Parties/selectors";

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

  try {
    const response: any = yield call(addItemAPI, formData);
    debugger;
    if (!response || response == undefined || response.status != 200) {
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
  if (action.payload.firmId.length === 0) {
    return;
  }
  const search: string = yield select(selectSearch);

  yield delay(1000);
  const response: any = yield call(getProducts, action.payload.firmId, search);
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
  yield put(setProductFormData(response.data.itemData));
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
  const response: any = yield call(
    GetTrasactionItem,
    action.payload.itemId,
    search
  );
  yield put(setTransactionist(response));
  if (action.payload.callback) {
    action.payload.callback();
  }
}

// Category

export function* addCategoryRequest(action: {
  payload: { callback: any };
}): Generator<any, void, any> {
  const form: categoryFormInterface = yield select(selectCategoryForm);
  const firmId: string = yield select(selectFirmId);
  try {
    const response: any = yield call(addCategoryAPI, form, firmId);
    console.log(response, "response");
    
    debugger;
    if (!response || response == undefined || response.status != 200) {
      toast.error(response?.categoryName || "Something went wrong");
      return;
    }
    yield put(changeAddCategoryModelState(false));
    toast.success(response?.message);
    action.payload.callback();
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

//
export function* getCategoryistRequest(action: {
  payload: { firmId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.firmId.length === 0) {
    return;
  }
  const search: string = yield select(selectSearchCategory);

  yield delay(1000);
  const response: any = yield call(getCategoryByFirmId, action.payload.firmId, search);
  yield put(setCategoryist(response.data));
  if (action.payload.callback) {
    action.payload.callback();
  }
}
export function* deleteCategoryByIdequest(action: {
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

export function* getCategoryByIdRequest(action: {
  payload: { itemId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.itemId.length === 0) {
    return;
  }
  yield delay(1000);
  const response: any = yield call(GetItem, action.payload.itemId);
  yield put(setCategoryFormData(response.data.itemData));
  if (action.payload.callback) {
    action.payload.callback();
  }
}

export function* getCategoryTransactionByIdRequest(action: {
  payload: { itemId: string; callback: any };
}): Generator<any, void, any> {
  if (action.payload.itemId.length === 0) {
    return;
  }
  const search: string = yield select(selectSearchCategoryTrasaction);
  yield delay(1000);
  const response: any = yield call(
    GetTrasactionItem,
    action.payload.itemId,
    search
  );
  yield put(setCategoryTransactionist(response));
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

  // Category
  yield takeLatest(addCategory, addCategoryRequest);
  yield takeLatest(getCategoryist, getCategoryistRequest);
  yield takeLatest(deleteCategoryById, deleteCategoryByIdequest);
  yield takeLatest(getCategoryById, getCategoryByIdRequest);
  yield takeLatest(
    getCategoryTransactionById,
    getCategoryTransactionByIdRequest
  );
}
