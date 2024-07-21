import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState, appSlice } from "./modules/app";
import favouriteReducer, { FavouritesState } from "./modules/favourites";
import { apiSlice } from "./services";
import { favouriteSlice } from "./modules/favourites";

export type ApplicationState = Readonly<{
  [appSlice.name]: AppState;
  [favouriteSlice.name]: FavouritesState;
}>;

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
  [favouriteSlice.name]: favouriteReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
