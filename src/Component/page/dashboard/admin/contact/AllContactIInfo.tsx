/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaExternalLinkAlt } from "react-icons/fa";
import Loder from "@/Component/Utils/Loader";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetAllContactQuery } from "@/redux/features/auth/Admin/contact";
import { IContact } from "@/types/contack";

interface QueryParam {
  name: string;
  value: string;
}

const AllContactIInfo = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const queryParams: QueryParam[] = [
    { name: "searchTerm", value: search },
    { name: "page", value: pagination.page.toString() },
    { name: "limit", value: "5" },
  ].filter((param) => param.value);

  const { data: blogResponse, isLoading } = useGetAllContactQuery(queryParams);
  const blogs = blogResponse?.data || [];
  const meta = blogResponse?.meta;

  useEffect(() => {
    if (meta?.limit) {
      setPagination((prev) => ({ ...prev, limit: meta.limit }));
    }
  }, [meta]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearch(formData.get("search") as string);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
      render: (record: IContact) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/details-contact/${record._id}`}>
            <Button icon={<FaExternalLinkAlt />}>Details</Button>
          </Link>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loder />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 ">
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

export default AllContactIInfo;
