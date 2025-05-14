/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRegularCarQuery } from "@/redux/features/auth/Admin/product";
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
import { Slider } from "@/components/ui/slider";
const AllCorCard = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<any>();
  const [limit, setLimit] = useState<any>();
  const [rating, setRating] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | undefined>();
  const [doors, setDoors] = useState<number | null>(null);
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const queryParams = [{ name: "searchTerm", value: search }];

  if (rating) {
    // @ts-expect-error value is number
    queryParams.push({ name: "rating", value: rating });
  }
  if (priceRange[0]) {
    // @ts-expect-error value
    queryParams.push({ name: "originalPrice", value: priceRange[1] });
  }
  if (currency) {
    console.log("queryParams", currency, queryParams);
    queryParams.push({ name: "currency", value: currency });
  }

  if (doors) {
    // @ts-expect-error value is number
    queryParams.push({ name: "doors", value: doors });
  }
  if (brand) {
    queryParams.push({ name: "brand", value: brand });
  }
  if (page) {
    queryParams.push({ name: "page", value: page });
  }

  if (limit) {
    queryParams.push({ name: "limit", value: limit });
  }
  const { data: carData, isLoading } = useGetAllRegularCarQuery(queryParams);

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
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 ">
          <form
            onSubmit={handelSearch}
            className="flex w-full h-[42px] max-w-sm mx-auto"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaCar className="text-gray-500" />
              </div>
              <input
                placeholder="Search by brand, model..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-cyan-900 focus:border-blue-500 block w-full pl-10 p-2.5"
                id="car-search"
                type="text"
                name="search"
                defaultValue={search}
              />
            </div>
            <button
              className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-white bg-[#424242] hover:bg-[#424242da] rounded-r-lg border border-blue-700 transition-colors"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="w-full p-4 bg-[#424242] rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-white">Price Range</span>
              <span className="text-white">
                ${priceRange[0].toLocaleString()} - $
                {priceRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              min={0}
              max={100000}
              step={10}
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              className="w-full"
            />
          </div>
        </div>
        {/* search short and filter use */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search Form */}

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3 justify-center">
            {/* Brand Filter */}
            <div className="min-w-[200px]">
              <select
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                className="w-full text-white bg-[#424242] hover:bg-[#424242da] border border-neutral-500 text-sm font-bold rounded-lg p-2.5 focus:ring-cyan-900 focus:border-cyan-900"
              >
                <option value="">All Brand</option>
                <option value="Tesla">Tesla</option>
                <option value="Audi">Audi</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
                <option value="BMW">BMW</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="min-w-[200px]">
              <select
                onChange={(e) => {
                  setRating(e.target.value ? Number(e.target.value) : null);
                  setPage(1);
                }}
                className="w-full text-white bg-[#424242] hover:bg-[#424242da] border border-neutral-500 text-sm font-bold rounded-lg p-2.5 focus:ring-cyan-900 focus:border-cyan-900"
              >
                <option value="">All Ratings</option>
                <option value="1">1+ Star</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            {/* Currency Filter */}
            <div className="min-w-[120px]">
              <select
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full text-white bg-[#424242] hover:bg-[#424242da] border border-neutral-500 text-sm font-bold rounded-lg p-2.5 focus:ring-cyan-900 focus:border-cyan-900"
              >
                <option value="">All $</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            {/* Doors Filter */}
            <div className="min-w-[150px]">
              <select
                value={doors || ""}
                onChange={(e) => {
                  setDoors(e.target.value ? Number(e.target.value) : null);
                }}
                className="w-full text-white bg-[#424242] hover:bg-[#424242da] border border-neutral-500 text-sm font-bold rounded-lg p-2.5 focus:ring-cyan-900 focus:border-cyan-900"
              >
                <option value="">All Doors</option>
                <option value="2">2 Doors</option>
                <option value="4">4 Doors</option>
                <option value="5">5 Doors</option>
                <option value="6">6 Doors</option>
              </select>
            </div>
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
                      ${car.originalPrice.toLocaleString()}
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
                    <Link to={`/detail-car/${car._id}`} className="">
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

export default AllCorCard;
