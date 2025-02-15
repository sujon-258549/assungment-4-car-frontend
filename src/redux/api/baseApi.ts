import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
/* eslint-disable @typescript-eslint/no-explicit-any */

const baseQuery = fetchBaseQuery({
  //   baseUrl: "http://localhost:5000/api",
  baseUrl: "https://assignment2-eta-topaz.vercel.app/api",
  //   credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["cars"],
  endpoints: () => ({}),
});

export default baseApi;
