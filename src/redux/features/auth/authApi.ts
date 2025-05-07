/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/user",
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
    registration: builder.mutation({
      query: (userInfo) => ({
        url: "/user/registered",
        method: "POST",
        body: userInfo,
      }),
    }),
    getSingleUser: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: `/user/me`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
      // providesTags: ["me"],
      providesTags: ["cars"],
    }),
    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetSingleUserQuery,
  useGetAllUserQuery,
  useGetMeQuery,
  useUpdateUserMutation,
} = authApi;
