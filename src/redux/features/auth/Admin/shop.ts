/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";
import { TShop } from "@/types/shop";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (shopInfo) => ({
        url: "/shop/create-shop",
        method: "POST",
        body: shopInfo,
      }),
    }),
    updateShop: builder.mutation({
      query: (data) => ({
        url: `/shop/update-shop`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["shop"],
    }),

    getMyShop: builder.query<TShop, string>({
      query: () => ({
        url: `/shop/my-shop`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
      providesTags: ["shop"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetMyShopQuery,
  useUpdateShopMutation,
} = blogApi;
