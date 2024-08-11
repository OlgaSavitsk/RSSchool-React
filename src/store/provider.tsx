"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";

import { appActions } from ".";
import { AppContext } from "./context";
import { appReducer, initialState } from "./reducers";
import { getPeople, getPeoples } from "@services/people.api";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { params } = state;

  const fetchData = useCallback(async () => {
    dispatch(appActions.setLoading(true));
    try {
      const { results } = await getPeoples(params);

      dispatch(appActions.setPeoples(results));
    } catch (error) {
      dispatch(appActions.setLoading(false));
      throw error;
    }
  }, [params]);

  const fetchDetails = useCallback(async (slug: string) => {
    appProviderValue.dispatch(appActions.setLoading(true));
    try {
      const data = await getPeople(slug);

      appProviderValue.dispatch(appActions.setPeople(data));
    } catch (error) {
      dispatch(appActions.setLoading(false));
      throw error;
    }
  }, []);

  const appProviderValue = useMemo(
    () => ({
      state,
      dispatch,
      fetchDetails,
    }),
    [state, dispatch, fetchDetails],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <AppContext.Provider value={appProviderValue}>{children}</AppContext.Provider>;
};
