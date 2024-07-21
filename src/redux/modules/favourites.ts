import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./app";

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourites(state, { payload: id }: PayloadAction<number>) {
      // const isFavourites = state.favourites.some((favourite) => favourite === id);
      const index = state.favourites.findIndex((favourite) => favourite === id);
      if (index !== -1) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(id);
      }
    },
  },
});

export const { addFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
