/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (userInfo) => ({
        url: "/cars",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["cars"],
    }),
    getAllCar: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/cars",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["cars"],
    }),
    getAllRegularCar: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/cars/regular",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["cars"],
    }),
    getOfferCar: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/cars/offer",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["cars"],
    }),

    getSingleCar: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
    }),
    getSingleOrder: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
    }),
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
      invalidatesTags: ["cars"],
    }),
    updateCarData: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/cars/${data.id}`,
          method: "PUT",
          body: data?.carData,
        };
      },
      invalidatesTags: ["cars"], // You can use this if you have a caching system that needs to be invalidated after the update
    }),
    changePassword: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/user/change-password",
          method: "POST",
          body: data,
        };
      },
      //   invalidatesTags: ["cars"], // You can use this if you have a caching system that needs to be invalidated after the update
    }),
    createOrders: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      //   providesTags: ["cars"],
    }),
    getMyOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/orders/get-myorder",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      //   providesTags: ["cars"],
    }),
    varefyPayment: builder.query({
      query: (order_id) => {
        return {
          url: "/orders/verify",
          method: "GET",
          params: { order_id },
        };
      },
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetAllCarQuery,
  useGetSingleCarQuery,
  useUpdateCarDataMutation,
  useChangePasswordMutation,
  useCreateOrdersMutation,
  useGetAllOrderQuery,
  useGetMyOrderQuery,
  useVarefyPaymentQuery,
  useDeleteCarMutation,
  useGetOfferCarQuery,
  useGetAllRegularCarQuery,
  useGetSingleOrderQuery,
} = adminApi;
