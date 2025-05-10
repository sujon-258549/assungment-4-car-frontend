/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import Footer from "@/Component/Layout/Footer";
import Loader from "@/Component/Utils/Loader";
import { Button } from "@/components/ui/button";
import { useGetAllBlogsQuery } from "@/redux/features/auth/Admin/blogs";
import { TBlog } from "@/types/blog";

const AllBlog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<any>();
  const [limit, setLimit] = useState<any>();

  const queryParams = [{ name: "searchTerm", value: search }];
  if (category) {
    queryParams.push({ name: "category", value: category });
  }
  if (page) {
    queryParams.push({ name: "page", value: page });
  }
  if (limit) {
    queryParams.push({ name: "limit", value: limit });
  }

  const { data: blogResponse, isLoading } = useGetAllBlogsQuery(queryParams);
  const blogs = blogResponse?.data || [];
  const meta = blogResponse?.meta;

  useEffect(() => {
    setLimit(meta?.limit);
  }, [meta, setLimit]);

  if (isLoading) {
    return <Loader />;
  }

  const handelSearch = (e: any) => {
    e.preventDefault();
    const data = e.target.search.value;
    setSearch(data);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10 md:pt-16 md:px-8">
        <div className="text-center mb-5 md:mb-10">
          <CommonHading color="black" text="Our Blog Posts" />
        </div>

        {/* Search and Filter */}
        <div className="flex gap-5  justify-center flex-wrap mb-5">
          <form onSubmit={handelSearch} className="flex items-end">
            <label className="sr-only" htmlFor="voice-search">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                placeholder="Search blogs..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-cyan-900 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="voice-search"
                type="text"
                name="search"
              />
            </div>
            <button
              className="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-[#424242] hover:bg-[#424242da] rounded-r-lg border border-blue-700"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Category Select */}
          <div className="min-w-[200px]">
            <select
              onChange={(e) => {
                setCategory(e.target.value); // আপনার Trim state ফাংশন
              }}
              className="w-full text-white bg-[#424242] hover:bg-[#424242da] border border-neutral-500 text-sm font-bold rounded-lg p-2.5 focus:ring-cyan-900 focus:border-cyan-900"
            >
              <option value="">All Trim</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Performance">Performance</option>
              <option value="Classic">Classic</option>
              <option value="Electric">Electric</option>
              <option value="Off-Road">Off-Road</option>
              <option value="Luxury">Luxury</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 mt-5 md:mt-10 lg:mt-16 mt5 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {blogs.map((blog: TBlog) => (
            <div
              key={blog._id}
              className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-300 mb-2">
                  <FaUser className="mr-1" />
                  <span className="mr-3">{blog.id.firstName}</span>
                  <FaCalendarAlt className="mr-1" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-[18px] font-bold mb-2 hover:text-cyan-700 transition-colors">
                  {blog?.title.slice(0, 15)}
                </h3>

                <p className="text-gray-200 mb-4 line-clamp-2">
                  {blog?.excerpt.slice(0, 30)}
                </p>

                <div className="flex justify-between items-center">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {blog?.category}
                  </span>
                  <Link to={`/details-blog/${blog._id}`}>
                    <Button className="bg-[#424242] hover:bg-[#424242da]">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-10">
          <Pagination
            onChange={(pageValue) => setPage(pageValue)}
            defaultCurrent={1}
            total={meta?.total}
            pageSize={meta?.limit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBlog;
