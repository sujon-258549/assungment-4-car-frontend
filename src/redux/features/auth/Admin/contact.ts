/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (blogInfo) => ({
        url: "/contact/create-contact",
        method: "POST",
        body: blogInfo,
      }),
    }),

    getAllContact: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/contact",
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

    getSingleContact: builder.query({
      query: (id: string) => ({
        url: `/contact/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactQuery,
  useGetSingleContactQuery,
} = blogApi;
