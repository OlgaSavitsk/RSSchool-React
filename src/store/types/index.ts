import { QueryParams, StarWarsPeople } from "@typing/item.types";

export enum AppTypes {
  SET_PEOPLE = "SET_PEOPLE",
  SET_PARAMS = "SET_PARAMS",
  SET_DETAILS = "SET_DETAILS",
  SET_LOADING = "SET_LOADING",
  SET_FAV = "SET_FAV",
  REMOVE_FAV = "REMOVE_FAV",
  SET_ERROR = "SET_ERROR",
}

export type AppState = {
  items: StarWarsPeople[];
  item: StarWarsPeople | null;
  isLoading: boolean;
  params: QueryParams | null;
  theme: "dark" | "light";
  favourites: StarWarsPeople[];
};

export type AppAction<Payload> = {
  type: AppTypes;
  payload?: Payload;
};

export type AppReducer = (state: AppState, actions: AppAction<AppState>) => AppState;

export type ContextProps = {
  state: AppState;
  dispatch: React.Dispatch<AppAction<unknown>>;
  fetchDetails: (id: string) => void;
};
