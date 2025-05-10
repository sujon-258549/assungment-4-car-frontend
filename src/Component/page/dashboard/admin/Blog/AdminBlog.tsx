/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEdit, FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";
import Loder from "@/Component/Utils/Loader";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import {
  useDeleteBlogsMutation,
  useGetAllBlogsQuery,
} from "@/redux/features/auth/Admin/blogs";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Blog {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  createdAt: string;
}

interface QueryParam {
  name: string;
  value: string;
}

const AdminBlog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const queryParams: QueryParam[] = [
    { name: "searchTerm", value: search },
    { name: "category", value: category },
    { name: "page", value: pagination.page.toString() },
    { name: "limit", value: "5" },
  ].filter((param) => param.value);

  const { data: blogResponse, isLoading } = useGetAllBlogsQuery(queryParams);
  const blogs = blogResponse?.data || [];
  const meta = blogResponse?.meta;

  useEffect(() => {
    if (meta?.limit) {
      setPagination((prev) => ({ ...prev, limit: meta.limit }));
    }
  }, [meta]);

  const [deleteBlogMutation] = useDeleteBlogsMutation();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearch(formData.get("search") as string);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  const handleDeleteBlog = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteBlogMutation(id).unwrap();
        toast.success(response?.message || "Blog deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete blog");
        console.error("Delete error:", error);
      }
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="Blog" className="w-20 h-14 rounded-md" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Blog) => (
        <div className="flex gap-2">
          <Link to={`/details-blog/${record._id}`}>
            <Button icon={<FaExternalLinkAlt />} type="dashed">
              Details
            </Button>
          </Link>

          <Button
            onClick={() => handleDeleteBlog(record._id)}
            danger
            icon={<FaTrashAlt />}
          >
            Delete
          </Button>

          <Link to={`/dashboard/update-blog/${record._id}`}>
            <Button
              className="bg-[#424242] hover:bg-[#424242da] text-white"
              icon={<FaEdit />}
            >
              Update
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loder />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:px-8">
      <div className="text-center mb-5 md:mb-10">
        <CommonHading color="black" text="All Blogs" />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-5 mb-10  justify-center flex-wrap">
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

      {/* Table Display */}
      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="_id"
        pagination={{
          current: pagination.page,
          total: meta?.total,
          pageSize: pagination.limit,
          onChange: (page, pageSize) => {
            setPagination({ page, limit: pageSize || 10 });
          },
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default AdminBlog;
