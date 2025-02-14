/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrderQuery } from "@/redux/features/auth/Admin/product";
import { FaExternalLinkAlt } from "react-icons/fa";
import Loder from "@/Component/Utils/Loder";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";

interface CarData {
  _id: string;
  totalPrice: number;
  model: string;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  price: number;
  inStock: boolean;
  products: Array<{
    car: {
      brand: string;
      model: string;
      image: string;
    };
  }>;
}

// interface Meta {
//   limit: number;
//   total: number;
// }

const GetAllOrder = () => {
  const [page, setPage] = useState<any>(1);
  const [limit, setLimit] = useState<any>(10);
  const [selectedOrder, setSelectedOrder] = useState<CarData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = [{ name: "searchTerm", value: "" }];
  if (page) queryParams.push({ name: "page", value: page });
  if (limit) queryParams.push({ name: "limit", value: limit });

  const { data: carData, isLoading } = useGetAllOrderQuery(queryParams);

  useEffect(() => {
    if (carData?.meta) {
      setLimit(carData.meta.limit);
    }
  }, [carData]);

  if (isLoading) {
    return <Loder />;
  }

  const showModal = (order: CarData) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: ["products", 0, "car", "image"],
      key: "image",
      render: (image: string) => (
        <img src={image} alt="Car" className="w-20 h-14 rounded-md" />
      ),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"], // Corrected to access the user.email
      key: "email", // Unique key for this column
    },
    {
      title: "Product Brand",
      dataIndex: ["products", 0, "car", "brand"],
      key: "brand",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Model",
      dataIndex: ["products", 0, "car", "model"],
      key: "model",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (
        status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled"
      ) => {
        let statusClass = "";

        switch (status) {
          case "Paid":
            statusClass = "bg-green-500 text-white";
            break;
          case "Shipped":
            statusClass = "bg-blue-500 text-white";
            break;
          case "Completed":
            statusClass = "bg-gray-500 text-white";
            break;
          case "Cancelled":
            statusClass = "bg-red-500 text-white";
            break;
          default:
            statusClass = "bg-yellow-500 text-white";
        }

        return (
          <span className={`px-2 py-1 rounded ${statusClass}`}>{status}</span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CarData) => (
        <div className="flex gap-2">
          <Button
            icon={<FaExternalLinkAlt />}
            type="dashed"
            onClick={() => showModal(record)}
          >
            Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 md:pt-10 md:px-8">
      <div className="text-center mb-5 md:mb-10">
        <CommonHading color="black" text="My Orders" />
      </div>

      <Table
        columns={columns}
        dataSource={carData?.data?.data}
        rowKey="_id"
        pagination={{
          current: page,
          total: carData?.meta?.total,
          pageSize: limit,
          onChange: (pageValue) => setPage(pageValue),
        }}
      />

      <Modal
        title="Order Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <img
              className="h-60 object-cover w-full"
              src={selectedOrder.products[0]?.car.image}
              alt=""
            />
            <p>
              <strong>Brand:</strong> {selectedOrder.products[0]?.car.brand}
            </p>
            <p>
              <strong>Model:</strong> {selectedOrder.products[0]?.car.model}
            </p>
            <p>
              <strong>Total Price:</strong> ${selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GetAllOrder;
