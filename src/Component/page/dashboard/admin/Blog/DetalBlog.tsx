import Loader from "@/Component/Utils/Loader";
import { useGetSingleBlogsQuery } from "@/redux/features/auth/Admin/blogs";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";

const DetailsBlog = () => {
  const { id } = useParams();

  const {
    data: blogResponse,
    isLoading,
    isError,
  } = useGetSingleBlogsQuery(id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {"Failed to load blog"}
      </div>
    );
  }

  if (!blogResponse) {
    return <div className="text-center py-10">No blog found</div>;
  }

  // Format dates for display
  const formattedCreatedAt = format(
    new Date(blogResponse.createdAt),
    "MMMM d, yyyy"
  );
  const formattedDate = format(new Date(blogResponse.date), "MMMM d, yyyy");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {blogResponse.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-500" />
            <span>
              {blogResponse.authorId.firstName} {blogResponse.authorId.lastName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTags className="text-blue-500" />
            <span className="capitalize">{blogResponse.category}</span>
          </div>
        </div>

        {/* Featured Image */}
        {blogResponse.imageUrl && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={blogResponse.imageUrl}
              alt={blogResponse.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {blogResponse.excerpt && (
          <p className="text-xl text-gray-700 italic mb-6">
            {blogResponse.excerpt}
          </p>
        )}
      </div>

      {/* Blog Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blogResponse.content }}
      />

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Published on: {formattedCreatedAt}
        </p>
      </div>
    </div>
  );
};

export default DetailsBlog;
