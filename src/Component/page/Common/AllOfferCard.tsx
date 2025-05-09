/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetOfferCarQuery } from "@/redux/features/auth/Admin/product";
import {
  FaCar,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGasPump,
  FaShoppingCart,
  FaTachometerAlt,
  FaTimesCircle,
} from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import Footer from "@/Component/Layout/Footer";
import Loader from "@/Component/Utils/Loader";
import { Button } from "@/components/ui/button";
import { TCar } from "@/types/car";
const AllOfferCard = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<any>();
  const [limit, setLimit] = useState<any>();
  console.log(page);

  console.log(category);
  const queryParams = [{ name: "searchTerm", value: search }];
  if (category) {
    queryParams.push({ name: "category", value: category });
  }
  if (page) {
    queryParams.push({ name: "page", value: page });
  }

  if (limit) {
    queryParams.push({ name: "limit", value: limit });
  }
  const { data: carData, isLoading } = useGetOfferCarQuery(queryParams);

  const meta = carData?.meta;
  useEffect(() => {
    setLimit(carData?.meta?.limit);
  }, [carData, setLimit]);
  if (isLoading) {
    return <Loader />;
  }
  const handelSearch = (e: any) => {
    e.preventDefault(); // Corrected typo here
    const data = e.target.search.value;
    setSearch(data);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10 md:pt-16 md:px-8">
        <div className="text-center mb-5 md:mb-10">
          <CommonHading color="black" text="All Cars" />
        </div>
        {/* search short and filter use */}
        <div className="flex gap-5 justify-center flex-wrap mb-5 ">
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
              className="inline-flex items-center py-2.5 px-3  text-sm font-medium text-white bg-[#424242] hover:bg-[#424242da] rounded-r-lg border border-blue-700"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* /*select */}
          <div className="relative group rounded-lg w-64 bg-[#424242] hover:bg-[#424242da] overflow-hidden before:absolute before:w-12 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
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
              className="appearance-none text-white bg-[#424242] hover:bg-[#424242da] ring-0 outline-none border border-neutral-500 text-sm font-bold rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 pr-10"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 md:mt-10 lg:mt-16 lg:grid-cols-4 gap-6">
          {carData?.data?.data?.map((car: TCar) => {
            return (
              <div
                key={car._id}
                className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-[#000] group`}
              >
                <div
                  style={{ zIndex: "222" }}
                  className={`absolute top-3 right-3  px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-md ${
                    car.inStock !== false // Changed to explicitly check for false
                      ? "bg-[#424242] hover:bg-[#424242da] "
                      : "bg-red-600 hover:bg-red-700"
                  } transition-colors`}
                >
                  {car.inStock !== false ? ( // Changed to explicitly check for false
                    <>
                      <FaCheckCircle size={10} /> In Stock
                    </>
                  ) : (
                    <>
                      <FaTimesCircle size={10} /> Sold Out
                    </>
                  )}
                </div>

                {/* Image Container */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={car.image[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 group-hover:bg-opacity-20" />
                </div>

                {/* Content */}
                <div className="p-5 text-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{car.brand}</h3>
                      <p className="text-cyan-100 text-sm">{car.model}</p>
                    </div>
                    <span className="text-lg font-bold bg-white bg-opacity-20 px-2 py-1 rounded">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-2 my-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <FaCar className="text-cyan-200" size={14} />
                      <span>{car.bodyType || "Sedan"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaGasPump className="text-cyan-200" size={14} />
                      <span>{car.fuelType || "Petrol"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTachometerAlt className="text-cyan-200" size={14} />
                      <span>{car.mileage || "18 kmpl"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-cyan-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <span>{car.transmission || "Automatic"}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-5 space-x-2">
                    <Link to={`/detail-page/${car._id}`} className="">
                      <Button className="bg-[#424242] hover:bg-[#424242da]">
                        <FaExternalLinkAlt size={12} />
                      </Button>
                    </Link>

                    <Link to={`/create-order/${car._id}`}>
                      <button
                        disabled={!car.inStock}
                        className={`flex-1 flex items-center justify-center space-x-2 ${
                          car.inStock
                            ? "bg-[#424242] hover:bg-[#424242da] text-white"
                            : "bg-gray-500 cursor-not-allowed"
                        } transition-all py-2 px-3 rounded-md text-sm font-medium`}
                      >
                        <FaShoppingCart size={12} />
                        <span>Order Now</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white group-hover:border-opacity-30 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center py-10">
          <Pagination
            onChange={(pageValue) => setPage(pageValue)}
            defaultCurrent={1}
            total={meta?.total}
            pageSize={meta?.limit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllOfferCard;
