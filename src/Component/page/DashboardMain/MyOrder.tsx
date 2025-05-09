/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyOrderQuery } from "@/redux/features/auth/Admin/product";
import { FaExternalLinkAlt } from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Loader from "@/Component/Utils/Loader";
import { Link } from "react-router-dom";

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

  const columns = [
    {
      title: "Product Image",
      dataIndex: ["productId", "image"],
      key: "image",
      render: (images: string[]) => (
        <img
          src={images?.[0]}
          alt="Product"
          className="w-20 h-14 rounded-md object-cover"
        />
      ),
    },
    {
      title: "Product Brand",
      dataIndex: ["productId", "brand"],
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
      dataIndex: ["productId", "model"],
      key: "model",
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
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
          <Link to={`/details-orders/${record._id}`}>
            <Button icon={<FaExternalLinkAlt />} type="dashed">
              Details
            </Button>
          </Link>
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
    </div>
  );
};

export default MyOrder;
