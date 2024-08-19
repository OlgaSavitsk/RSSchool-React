import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState, appSlice } from "./modules/app";

export type ApplicationState = Readonly<{
  [appSlice.name]: AppState;
}>;

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
