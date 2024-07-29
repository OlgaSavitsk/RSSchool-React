import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StarWarsPeople } from "../../types/item.types";
import { ApplicationState } from "../store";

export type AppState = {
  items: StarWarsPeople[];
  item: StarWarsPeople | null;
  isLoading: boolean;
  isError: boolean;
};

export const initialState: AppState = {
  items: [],
  item: null,
  isLoading: false,
  isError: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
      state.isLoading = isLoading;
    },
    setError(state, { payload: isError }: PayloadAction<boolean>) {
      state.isError = isError;
    },
    setItems(state, { payload: items }: PayloadAction<StarWarsPeople[]>) {
      state.items = items;
    },
    setItem(state, { payload: item }: PayloadAction<StarWarsPeople>) {
      state.item = item;
    },
  },
});

export const appSelector = (state: ApplicationState) => state.app;

export const { setItems, setItem, setLoader, setError } = appSlice.actions;

export default appSlice.reducer;
