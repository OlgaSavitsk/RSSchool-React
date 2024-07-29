import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApplicationState } from "../store";
import { StarWarsPeople } from "../../types/item.types";

export type FavouritesState = {
  favourites: StarWarsPeople[];
};

export const initialState: FavouritesState = {
  favourites: [],
};

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourites(state, { payload: item }: PayloadAction<StarWarsPeople>) {
      const index = state.favourites.findIndex((favourite) => favourite.name === item.name);
      if (index !== -1) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(item);
      }
    },

    removeFavourites(state) {
      state.favourites = [];
    },
  },
});

export const { addFavourites, removeFavourites } = favouriteSlice.actions;

export const favouritesSelector = (state: ApplicationState) => state.favourites;

export default favouriteSlice.reducer;
