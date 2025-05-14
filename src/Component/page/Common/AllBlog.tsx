/* eslint-disable @typescript-eslint/no-explicit-any */
import Loder from "@/Component/Utils/Loader";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Button, Input, Pagination } from "antd";
import { useGetAllBlogsQuery } from "@/redux/features/auth/Admin/blogs";
import { TBlog } from "@/types/blog";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

interface QueryParam {
  name: string;
  value: string;
}

const AllBlog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const queryParams: QueryParam[] = [
    { name: "searchTerm", value: search },
    { name: "page", value: pagination.page.toString() },
    { name: "limit", value: pagination.limit.toString() },
  ];

  if (category) {
    queryParams.push({ name: "category", value: category });
  }

  const { data: blogResponse, isLoading } = useGetAllBlogsQuery(queryParams);
  const blogs = blogResponse?.data || [];
  const meta = blogResponse?.meta;

  useEffect(() => {
    if (meta) {
      setPagination((prev) => ({
        ...prev,
        limit: meta.limit || 10,
      }));
    }
  }, [meta]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearch(formData.get("search") as string);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  if (isLoading) {
    return <Loder />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:px-8">
      <div className="text-center mb-5 md:mb-10">
        <CommonHading color="black" text="All Blogs" />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-5 mb-10 justify-center flex-wrap">
        <form onSubmit={handleSearch} className="flex items-end gap-2">
          <div className="relative">
            <Input
              name="search"
              placeholder="Search blogs..."
              className="w-64 py-2"
              allowClear
            />
          </div>
          <Button
            htmlType="submit"
            className="bg-[#424242] hover:bg-[#424242da] py-[18px]"
            type="primary"
          >
            Search
          </Button>
        </form>

        {/* Category Select */}
        <div className="min-w-[200px]">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-white bg-[#424242] hover:bg-[#424242da] border border-neutral-500 text-sm font-bold rounded-lg p-2.5 focus:ring-cyan-900 focus:border-cyan-900"
            value={category}
          >
            <option value="">All Categories</option>
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
      <div className="grid grid-cols-1 mt-5 md:mt-10 lg:mt-16 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogs.map((blog: TBlog) => (
          <div
            style={{ boxShadow: "1px 1px 5px #000" }}
            key={blog._id}
            className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Blog Image */}
            <div className="h-48 overflow-hidden bg-black">
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
                <span className="mr-3">{blog.id?.firstName}</span>
                <FaCalendarAlt className="mr-1" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <h3 className="text-[18px] font-bold mb-2 hover:text-cyan-700 transition-colors">
                {blog?.title?.slice(0, 15)}
              </h3>

              <p className="text-gray-200 mb-4 line-clamp-2">
                {blog?.excerpt?.slice(0, 20)}
              </p>

              <div className="flex justify-between items-center">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {blog?.category}
                </span>
                <Link to={`/details-blog/${blog._id}`}>
                  <Button className="bg-[#424242] text-white hover:bg-[#424242da]">
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
          current={pagination.page}
          total={meta?.total}
          pageSize={pagination.limit}
          onChange={(page, pageSize) => {
            setPagination({
              page,
              limit: pageSize || pagination.limit,
            });
          }}
          showSizeChanger={true}
        />
      </div>
    </div>
  );
};

export default AllBlog;
