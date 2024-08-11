import { QueryParams, StarWarsPeople } from "@typing/item.types";
import { AppAction, AppTypes } from "../types";

export const setPeoples = (payload: StarWarsPeople[]): AppAction<StarWarsPeople[]> => ({
  type: AppTypes.SET_PEOPLE,
  payload,
});

export const setParams = (payload?: Partial<QueryParams>) => ({
  type: AppTypes.SET_PARAMS,
  payload,
});

export const setPeople = (payload: StarWarsPeople): AppAction<StarWarsPeople> => ({
  type: AppTypes.SET_DETAILS,
  payload,
});

export const setLoading = (payload: boolean) => ({
  type: AppTypes.SET_LOADING,
  payload,
});
