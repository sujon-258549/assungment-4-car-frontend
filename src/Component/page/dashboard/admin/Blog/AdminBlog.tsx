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
    { name: "limit", value: pagination.limit.toString() },
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
            <Button className="bg-cyan-900 text-white" icon={<FaEdit />}>
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
    <div className="max-w-6xl mx-auto px-4 py-14 md:pt-24 md:px-8">
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
              className="w-64"
              allowClear
            />
          </div>
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </form>

        {/* Category Select */}
        <div className="relative group rounded-lg w-64 bg-cyan-900 overflow-hidden before:absolute before:w-12 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on category change
            }}
            className="appearance-none text-white bg-cyan-900 ring-0 outline-none border border-neutral-500 text-sm font-bold rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 pr-10"
            value={category}
          >
            <option value="">All Categories</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
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
