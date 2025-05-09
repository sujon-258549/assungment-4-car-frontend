/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrderQuery } from "@/redux/features/auth/Admin/product";
import { FaExternalLinkAlt } from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Loader from "@/Component/Utils/Loader";
import { Link } from "react-router-dom";

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

  const queryParams = [{ name: "searchTerm", value: "" }];
  if (page) queryParams.push({ name: "page", value: page });
  if (limit) queryParams.push({ name: "limit", value: limit });

  const { data: carData, isLoading } = useGetAllOrderQuery(queryParams);
  console.log(carData?.data.data);
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
      title: "Image",
      dataIndex: ["productId", "image"],
      key: "image",
      render: (image: string) => (
        <img src={image[0]} alt="Car" className="w-20 h-14 rounded-md" />
      ),
    },
    {
      title: "Email",
      dataIndex: ["customerId", "email"], // Corrected to access the user.email
      key: "email", // Unique key for this column
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
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "model",
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
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
    <div className="max-w-6xl mx-auto px-4 py-14 md:pt-10 md:px-8">
      <div className="text-center mb-5 md:mb-10">
        <CommonHading color="black" text="All Orders" />
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
    </div>
  );
};

export default GetAllOrder;
