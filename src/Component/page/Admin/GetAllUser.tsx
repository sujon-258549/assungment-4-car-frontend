/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCar, FaExternalLinkAlt } from "react-icons/fa";
import Loder from "@/Component/Utils/Loder";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { useGetAllUserQuery } from "@/redux/features/auth/authApi";

const GetAllUser = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<any>();
  const [limit, setLimit] = useState<any>();

  const queryParams = [{ name: "searchTerm", value: search }];
  if (page) queryParams.push({ name: "page", value: page });
  if (limit) queryParams.push({ name: "limit", value: limit });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const showModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const { data: userData, isLoading } = useGetAllUserQuery(queryParams);

  useEffect(() => {
    setLimit(userData?.meta?.limit);
  }, [userData, setLimit]);

  const meta = userData?.meta;

  useEffect(() => {
    if (meta?.limit) {
      setLimit(meta.limit);
    }
  }, [meta]);

  if (isLoading) return <Loder />;

  const handelSearch = (e: any) => {
    e.preventDefault();
    setSearch(e.target.search.value);
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => showModal(record)}
            icon={<FaExternalLinkAlt />}
            type="dashed"
          >
            Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        footer={null}
        title="User Details"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {selectedUser ? (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </Modal>

      <div className="max-w-6xl mx-auto px-4 py-14 md:pt-16 md:px-8">
        <div className="text-center mb-5 md:mb-10">
          <CommonHading color="black" text="Admin Dashboard" />
        </div>

        <div className="flex gap-5 justify-center mb-10 md:justify-end flex-wrap ">
          <form onSubmit={handelSearch} className="flex items-end">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaCar />
              </div>
              <input
                placeholder="Search..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-cyan-900 focus:border-blue-500 block w-full ps-10 p-2.5"
                type="text"
                name="search"
              />
            </div>
            <button
              className="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-cyan-900 rounded-r-lg border border-blue-700"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <Table
          columns={columns}
          dataSource={userData?.data?.data}
          rowKey="_id"
          pagination={{
            current: page,
            total: meta?.total,
            pageSize: limit,
            onChange: (pageValue) => setPage(pageValue),
          }}
        />
      </div>
    </>
  );
};

export default GetAllUser;
