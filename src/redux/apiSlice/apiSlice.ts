import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Pair } from "models/dto/pairsService";

const api = createApi({
  reducerPath: "echangeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.exnovinmarket.com/v2" }),
  endpoints: builder => ({
    getPairs: builder.query<Pair[], void>({
      query: () => ({ url: "/pairs" }),
    }),
  }),
});

export default api;

export const { useGetPairsQuery } = api;
