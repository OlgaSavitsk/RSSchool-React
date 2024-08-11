import { QueryParams, StarWarsPeople } from "@typing/item.types";
import { AppAction, AppState, AppTypes } from "../types";

export const initialState: AppState = {
  items: [],
  item: null,
  params: null,
  isLoading: false,
  theme: "dark",
  favourites: [],
};

export const appReducer = <T>(state = initialState, { type, payload }: AppAction<T>) => {
  switch (type) {
    case AppTypes.SET_PEOPLE: {
      return {
        ...state,
        items: payload as StarWarsPeople[],
        isLoading: false,
      };
    }
    case AppTypes.SET_PARAMS: {
      return {
        ...state,
        params: { ...state.params, ...payload } as QueryParams,
        error: null,
      };
    }
    case AppTypes.SET_DETAILS: {
      return {
        ...state,
        item: payload as StarWarsPeople,
        isLoading: false,
      };
    }
    case AppTypes.SET_FAV: {
      let favouritesState: StarWarsPeople[] = state.favourites;
      const index = state.favourites.findIndex(
        (favourite) => favourite.name === (payload as StarWarsPeople).name,
      );
      if (index !== -1) {
        favouritesState = state.favourites.splice(index, 1);
      } else {
        favouritesState.push(payload as StarWarsPeople);
      }
      return {
        ...state,
        favourites: favouritesState,
      };
    }
    case AppTypes.REMOVE_FAV: {
      return { ...state, favourites: [] };
    }
    case AppTypes.SET_LOADING: {
      return { ...state, isLoading: payload as boolean };
    }

    default:
      return state;
  }
};
