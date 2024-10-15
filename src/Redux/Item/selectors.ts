import { RootState } from "@/types";

export const selectServiceForm = (state: RootState) => state.item.serviceForm
export const selectProductForm = (state: RootState) => state.item.itemProductForm