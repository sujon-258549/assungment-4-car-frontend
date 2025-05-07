/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCarQuery } from "@/redux/features/auth/Admin/product";
import { FaCar, FaExternalLinkAlt } from "react-icons/fa";
import CommonHading from "@/Component/Layout/Home/HomeComponent/CommonHading";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./style.css";
import { Link } from "react-router-dom";
import Footer from "@/Component/Layout/Footer";
import Loader from "@/Component/Utils/Loader";
const AllCorCard = () => {
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
  const { data: carData, isLoading } = useGetAllCarQuery(queryParams);
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
      <div className="max-w-6xl mx-auto px-4 py-14 md:pt-24 md:px-8">
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
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {carData?.data?.data.map(
            ({
              model,
              image,
              brand,
              _id,
              price,
              inStock,
            }: {
              image: string;
              _id: string;
              price: number;
              brand: string;
              model: string;
              inStock: boolean;
            }) => (
              <div
                style={{ boxShadow: "5px 1px 10px" }}
                key={_id} // Assuming each car object has a unique `id`
                className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4"
              >
                <div className="relative">
                  <img
                    src={image} // Using `car.image` instead of treating `car` as an image URL
                    alt={brand} // Adding an alt tag for accessibility
                    className="w-full h-60 rounded-r-xl "
                    style={{ borderRadius: "5px  5px 0 0 " }}
                  />
                  <span className="absolute top-0 border -left-[3px] w-[115px] translate-y-4 -translate-x-6 -rotate-45 py-1 bg-black text-center text-sm text-white">
                    <span className="py-2">
                      {" "}
                      {inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-800 font-extrabold">
                    {brand}
                  </h3>

                  <div className="mt-4">
                    <h3 className="text-xl text-gray-800 font-medium flex-1">
                      Model : {model}
                    </h3>
                    <h3 className="text-xl text-gray-800 font-medium flex-1">
                      Prices : ${price}
                    </h3>
                  </div>
                  <div className="flex mt-5 justify-between">
                    <Link to={`/detail-page/${_id}`} className="w-full">
                      <div className="flex justify-center w-full">
                        <div className="px-5 py-2  rounded-md text-white bg-cyan-900 transition-all hover:bg-cyan-800 text-center w-full justify-center flex items-center gap-2">
                          <FaExternalLinkAlt />
                          Details
                        </div>
                      </div>
                    </Link>
                    <div></div>
                  </div>
                </div>
              </div>
            )
          )}
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
