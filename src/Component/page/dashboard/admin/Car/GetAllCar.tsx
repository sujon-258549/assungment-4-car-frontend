/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteCarMutation,
  useGetAllCarQuery,
} from "@/redux/features/auth/Admin/product";
import { FaCar } from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import Loader from "@/Component/Utils/Loader";
import Swal from "sweetalert2";

const GetAllCar = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<any>();
  const [limit, setLimit] = useState<any>();
  const [deleteMutation] = useDeleteCarMutation();

  const queryParams = [{ name: "searchTerm", value: search }];
  if (category) {
    queryParams.push({ name: "drivetrain", value: category });
  }
  if (page) {
    queryParams.push({ name: "page", value: page });
  }

  if (limit) {
    queryParams.push({ name: "limit", value: limit });
  }

  const { data: carData, isLoading } = useGetAllCarQuery(queryParams);
  console.log(carData);
  useEffect(() => {
    setLimit(carData?.meta?.limit);
  }, [carData, setLimit]);
  const meta = carData?.meta;

  useEffect(() => {
    if (meta?.limit) {
      setLimit(meta.limit);
    }
  }, [meta]);

  if (isLoading) {
    return <Loader />;
  }

  const handelSearch = (e: any) => {
    e.preventDefault(); // Corrected typo here
    const data = e.target.search.value;
    setSearch(data);
  };
  const handelDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteMutation(id);
        if (result.data.success) {
          Swal.fire({
            title: result.data.message,
            text: "Car Deleted successfully",
            icon: "success",
          });
        }
      }
    });
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image[0]} alt="Car" className="w-20 h-14 rounded-md" />
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) => (
        <span
          className={`px-2 py-1 rounded ${
            inStock ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Link to={`/detail-car/${record._id}`}>
            <Button type="dashed">Details</Button>
          </Link>

          <Link to={`/dashboard/update-page/${record._id}`}>
            <Button className="bg-cyan-900 text-white">Update</Button>
          </Link>

          <Button
            onClick={() => handelDelete(record._id)}
            className="bg-red-700 text-white"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 md:px-8">
      <div className="text-center mb-5 md:mb-10">
        <CommonHading color="black" text="All Cars" />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-5 mb-10 justify-center flex-wrap ">
        <form onSubmit={handelSearch} className="flex items-end">
          <label className="sr-only" htmlFor="voice-search">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaCar />
            </div>
            <input
              placeholder="Search..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-cyan-900 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="voice-search"
              type="text"
              name="search"
            />
          </div>
          <button
            className="inline-flex items-center py-2.5 px-3  text-sm font-medium text-white bg-cyan-900 rounded-r-lg border border-blue-700"
            type="submit"
          >
            Search
          </button>
        </form>

        {/* /*select */}
        <div className="relative group rounded-lg w-64 bg-cyan-900 overflow-hidden before:absolute before:w-12 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
          <svg
            y={0}
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            width={100}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            height={100}
            className="w-8 z-50 h-8 absolute right-0 -rotate-45 stroke-white top-1.5 group-hover:rotate-0 duration-300"
          >
            <path
              strokeWidth={4}
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
              className="svg-stroke-primary"
            />
          </svg>
          <select
            onChange={(e) => setCategory(e.target?.value)}
            className="appearance-none text-white bg-cyan-900 ring-0 outline-none border border-neutral-500 text-sm font-bold rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 pr-10"
          >
            <option value="4WD">4WD</option>
            <option value="AWD">AWD</option>
            <option value="TrRWDuck">RWD</option>
            <option value="FWD">FWD</option>
          </select>
        </div>
      </div>

      {/* Table Display */}
      <Table
        columns={columns}
        dataSource={carData?.data?.data}
        rowKey="_id"
        pagination={{
          current: page,
          total: meta?.total,
          pageSize: limit,
          onChange: (pageValue) => setPage(pageValue),
        }}
      />
    </div>
  );
};

export default GetAllCar;
