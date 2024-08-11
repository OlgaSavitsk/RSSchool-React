import { QueryParams, StarWarsPeople } from "@typing/item.types";
import { AppAction, AppState, AppTypes } from "../types";

export const initialState: AppState = {
  items: [],
  item: null,
  params: null,
  isLoading: false,
  theme: "dark",
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
    case AppTypes.SET_LOADING: {
      return { ...state, isLoading: payload as boolean };
    }

    default:
      return state;
  }
};
