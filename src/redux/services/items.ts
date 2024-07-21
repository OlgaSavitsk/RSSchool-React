import { apiSlice } from ".";
import { QueryParams, StarWarsPeople, StarWarsPeopleResponse } from "../../types/item.types";
import { setItem, setItems, setLoader } from "../modules/app";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<StarWarsPeople[], QueryParams>({
      query: ({ searchValue, page }: QueryParams) => ({
        url: `?search=${searchValue}&page=${page}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoader(true));
          const { data } = await queryFulfilled;
          dispatch(setLoader(false));
          dispatch(setItems(data));
        } catch {
          dispatch(setLoader(false));
        }
      },
      transformResponse: (response: StarWarsPeopleResponse) => response.results,

      providesTags: ["Items"],
    }),
    getItem: builder.query<StarWarsPeople, string>({
      query: (id: string) => ({
        url: `${id}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoader(true));
          const { data } = await queryFulfilled;
          dispatch(setLoader(false));
          dispatch(setItem(data));
        } catch {
          dispatch(setLoader(false));
        }
      },
      providesTags: ["Item"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetItemsQuery, useGetItemQuery } = itemsApiSlice;
