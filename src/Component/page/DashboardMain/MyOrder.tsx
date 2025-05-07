/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyOrderQuery } from "@/redux/features/auth/Admin/product";
import { FaExternalLinkAlt } from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import Loader from "@/Component/Utils/Loader";

// Define types for API response
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

const MyOrder = () => {
  const [page, setPage] = useState<any>(1);
  const [limit, setLimit] = useState<any>(10);
  const [selectedOrder, setSelectedOrder] = useState<CarData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = [{ name: "searchTerm", value: "" }];
  if (page) queryParams.push({ name: "page", value: page });
  if (limit) queryParams.push({ name: "limit", value: limit });

  const { data: carData, isLoading } = useGetMyOrderQuery(queryParams);
  console.log(carData?.data?.data);

  useEffect(() => {
    if (carData?.meta) {
      setLimit(carData.meta.limit);
    }
  }, [carData]);

  if (isLoading) {
    return <Loader />;
  }

  // Open modal and set selected order
  const openModal = (order: CarData) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
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
        let statusText = "";

        switch (status) {
          case "Paid":
            statusClass = "bg-green-500 text-white";
            statusText = "Paid";
            break;
          case "Shipped":
            statusClass = "bg-blue-500 text-white";
            statusText = "Shipped";
            break;
          case "Completed":
            statusClass = "bg-gray-500 text-white";
            statusText = "Completed";
            break;
          case "Cancelled":
            statusClass = "bg-red-500 text-white";
            statusText = "Cancelled";
            break;
          default:
            statusClass = "bg-yellow-500 text-white";
            statusText = "Pending";
        }

        return (
          <span className={`px-2 py-1 rounded ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CarData) => (
        <div className="flex gap-2">
          <Button
            onClick={() => openModal(record)}
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
    <div className="max-w-6xl mx-auto px-4 pt-0 md:pb-14  md:pt-10 md:px-8">
      <div className="text-center  md:mb-10">
        <CommonHading color="black" text="My Orders" />
      </div>

      {/* Table Display */}
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

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <img
              src={selectedOrder.products[0].car.image}
              alt="Car"
              className="w-full h-40 object-cover rounded-md"
            />
            <p>
              <strong>Brand:</strong> {selectedOrder.products[0].car.brand}
            </p>
            <p>
              <strong>Model:</strong> {selectedOrder.products[0].car.model}
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

export default MyOrder;
