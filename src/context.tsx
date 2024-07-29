import { createContext } from "react";

export type AppState = {
  theme: "dark" | "light";
};

export type ContextProps = {
  state: AppState;
};

export const initialState: AppState = {
  theme: "dark",
};

export const AppContext = createContext<AppState>(initialState);
