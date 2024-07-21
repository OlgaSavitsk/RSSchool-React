import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StarWarsPeople } from "../../types/item.types";
import { ApplicationState } from "../store";

export type AppState = {
  items: StarWarsPeople[];
  favourites: number[];
  isLoading: boolean;
  isError: boolean
};

export const initialState: AppState = {
  items: [],
  favourites: [],
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
  },
});

export const appSelector = (state: ApplicationState) => state.app;

export const { setItems, setLoader, setError } = appSlice.actions;

export default appSlice.reducer;
