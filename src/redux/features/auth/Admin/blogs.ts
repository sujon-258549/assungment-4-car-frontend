/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogInfo) => ({
        url: "/blog/create-blog",
        method: "POST",
        body: blogInfo,
      }),
    }),
    updateBlog: builder.mutation({
      query: (args) => ({
        url: `/blog/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["cars"],
    }),
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/blog",
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

    getSingleBlogs: builder.query({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
    }),
    deleteBlogs: builder.mutation({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => {
        return response.data; // Assuming the response contains the car data
      },
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogsMutation,
} = blogApi;
