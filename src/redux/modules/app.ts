import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ControlledForm, Countries, UncontrolledForm } from "../../types/item.types";
import { ApplicationState } from "../store";
import { countries } from "../../constants/countries.data";

export type AppState = {
  controlledForm: ControlledForm | null;
  uncontrolledForm: UncontrolledForm | null;
  countries: Countries[];
};

export const initialState: AppState = {
  controlledForm: null,
  uncontrolledForm: null,
  countries: countries,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setControlled(state, { payload: form }: PayloadAction<ControlledForm>) {
      state.controlledForm = form;
    },
    setUncontrolled(state, { payload: form }: PayloadAction<UncontrolledForm>) {
      state.uncontrolledForm = form;
    },
  },
});

export const appSelector = (state: ApplicationState) => state.app;

export const { setControlled, setUncontrolled } = appSlice.actions;

export default appSlice.reducer;
