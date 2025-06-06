import { FaExternalLinkAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

import CommonHading from "./CommonHading";
import CommonButton from "./CommonButton";
import { Link } from "react-router-dom";
import Loader from "@/Component/Utils/Loader";
import { Button } from "@/components/ui/button";
import { useGetAllBlogsQuery } from "@/redux/features/auth/Admin/blogs";
import { TBlog } from "@/types/blog";

const HomeBlog = () => {
  const { data: blogResponse, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs = blogResponse?.data || [];

  if (isLoading) {
    return <Loader />;
  }

  const totalBlogs = blogs.length || 0;

  return (
    <div className="px-4 max-w-6xl mx-auto py-5 md:py-14 md:pt-16 md:px-8">
      <div className="text-center mb-12">
        <CommonHading color="black" text="Latest Blog Posts" />
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our latest articles and insights
        </p>
      </div>

      <div className="grid grid-cols-1 mt-5 md:mt-10 lg:mt-16 mt5 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogs.slice(0, 8).map((blog: TBlog) => (
          <div
            style={{ boxShadow: "1px 1px 5px #000" }}
            key={blog._id}
            className="bg-black  text-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                <span className="mr-3">{blog.id.firstName}</span>
                <FaCalendarAlt className="mr-1" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <h3 className="text-[18px] font-bold mb-2 hover:text-cyan-700 transition-colors">
                {blog?.title?.slice(0, 15)}
              </h3>

              <p className="text-gray-200 mb-4 line-clamp-2">
                {blog?.excerpt.slice(0, 20)}
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

      {/* Conditional View All Button */}
      {totalBlogs >= 8 && (
        <div className="mt-12 text-center">
          <Link to="/all-blog">
            <div className=" md:max-w-[210px] mx-auto">
              <CommonButton
                btnIcon={<FaExternalLinkAlt />}
                text="View All Blog Posts"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeBlog;
