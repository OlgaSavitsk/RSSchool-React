import { apiSlice } from ".";
import { QueryParams, StarWarsPeople, StarWarsPeopleResponse } from "../../types/item.types";
import { setItems, setLoader } from "../modules/app";

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
  }),
  overrideExisting: false,
});

export const { useGetItemsQuery } = itemsApiSlice;
