import { useGetOfferCarQuery } from "@/redux/features/auth/Admin/product";
import {
  FaExternalLinkAlt,
  FaShoppingCart,
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaTag, // Added for offer badge
} from "react-icons/fa";
import CommonHading from "./CommonHading";
import CommonButton from "./CommonButton";
import { Link } from "react-router-dom";
import Loader from "@/Component/Utils/Loader";
import { Button } from "@/components/ui/button";
import { TCar } from "@/types/car";

const OfferSection = () => {
  const { data: carData, isLoading } = useGetOfferCarQuery(undefined);
  console.log(carData);
  if (isLoading) {
    return <Loader />;
  }

  const totalCars = carData?.data?.data?.length || 0;

  return (
    <div className="px-4 max-w-6xl mx-auto py-14 md:pt-24 md:px-8">
      <div className="text-center mb-12">
        <CommonHading color="black" text="Special Offer Vehicles" />
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Limited-time deals on our premium selection
        </p>
      </div>

      {totalCars === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No special offers available at this time
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carData?.data?.data.slice(0, 8).map((car: TCar) => {
              return (
                <div
                  key={car._id}
                  className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-[#000] group`}
                >
                  {/* Offer Badge */}
                  {car.isOffer && (
                    <div
                      style={{ zIndex: "222" }}
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1 shadow-md transition-colors"
                    >
                      <FaTag size={10} /> Special Offer
                    </div>
                  )}

                  {/* Stock Status Badge */}
                  <div
                    style={{ zIndex: "222" }}
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-md ${
                      car.inStock !== false
                        ? "bg-[#424242] hover:bg-[#424242da]"
                        : "bg-red-600 hover:bg-red-700"
                    } transition-colors`}
                  >
                    {car.inStock !== false ? (
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
                      <div className="flex flex-col items-end">
                        {car.originalPrice && (
                          <span className="text-sm line-through text-gray-400">
                            ${car.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-lg font-bold bg-white bg-opacity-20 px-2 py-1 rounded">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>
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

          {/* Conditional View All Button */}
          {totalCars >= 8 && (
            <div className="mt-12 text-center">
              <Link to="/all-offer-cars">
                <CommonButton
                  btnIcon={<FaExternalLinkAlt />}
                  text="View All Offers"
                />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OfferSection;
