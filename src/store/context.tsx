"use client";

import { createContext } from "react";

import { initialState } from "./reducers";
import { ContextProps } from "./types";

const contextConfig: ContextProps = {
  state: initialState,
  dispatch: (): void => undefined,
  fetchDetails: (): void => undefined,
};

export const AppContext = createContext<ContextProps>(contextConfig);
