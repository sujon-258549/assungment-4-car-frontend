import Loader from "@/Component/Utils/Loader";
import { useGetSingleCarQuery } from "@/redux/features/auth/Admin/product";
import { useParams } from "react-router-dom";
import {
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaDoorOpen,
  FaShieldAlt,
  FaStar,
  FaBatteryFull,
  FaPlug,
} from "react-icons/fa";

const DetailsCarPage = () => {
  const { _id } = useParams();
  const { data: car, isLoading } = useGetSingleCarQuery(_id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (!car) {
    return <div className="text-center py-10">Car not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with basic info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {car.year} {car.brand} {car.model} {car.trim}
        </h1>
        <div className="flex items-center mt-2 text-lg text-gray-600">
          <span className="flex items-center mr-4">
            <FaStar className="text-yellow-500 mr-1" />
            {car.rating} ({car.reviewCount} reviews)
          </span>
          <span className="flex items-center">
            <FaShieldAlt className="text-blue-500 mr-1" />
            {car.condition}
          </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {car.image?.map((img: string, index: string) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={img}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Specifications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Vehicle Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem icon={<FaCar />} label="Brand" value={car.brand} />
              <DetailItem icon={<FaCar />} label="Model" value={car.model} />
              <DetailItem icon={<FaCar />} label="Trim" value={car.trim} />
              <DetailItem
                icon={<FaCalendarAlt />}
                label="Year"
                value={car.year}
              />
              <DetailItem
                icon={<FaTachometerAlt />}
                label="Mileage"
                value={`${car.mileage?.toLocaleString()} miles`}
              />
              <DetailItem
                icon={<FaGasPump />}
                label="Fuel Type"
                value={car.fuelType}
              />
              <DetailItem
                icon={<FaUsers />}
                label="Seats"
                value={car.seatingCapacity}
              />
              <DetailItem
                icon={<FaDoorOpen />}
                label="Doors"
                value={car.doors}
              />
              <DetailItem
                icon={<FaShieldAlt />}
                label="Drivetrain"
                value={car.drivetrain}
              />
              <DetailItem
                icon={<FaCar />}
                label="Transmission"
                value={car.transmission}
              />
              <DetailItem
                icon={<FaCar />}
                label="Body Type"
                value={car.bodyType}
              />
              <DetailItem
                icon={<FaCar />}
                label="Generation"
                value={car.generation}
              />
            </div>
          </div>

          {/* Engine/Performance */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              {car.fuelType === "Electric" ? "Electric Motor" : "Engine"} &
              Performance
            </h2>
            {car.fuelType === "Electric" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={<FaBatteryFull />}
                  label="Battery Capacity"
                  value={`${car.batteryCapacity} kWh`}
                />
                <DetailItem
                  icon={<FaPlug />}
                  label="Range"
                  value={`${car.range} miles`}
                />
                <DetailItem
                  icon={<FaCar />}
                  label="Horsepower"
                  value={`${car.engine?.horsepower} hp`}
                />
                <DetailItem
                  icon={<FaCar />}
                  label="Torque"
                  value={`${car.engine?.torque} lb-ft`}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={<FaCar />}
                  label="Engine Size"
                  value={car.engine?.size}
                />
                <DetailItem
                  icon={<FaCar />}
                  label="Cylinders"
                  value={car.engine?.cylinders}
                />
                <DetailItem
                  icon={<FaCar />}
                  label="Horsepower"
                  value={`${car.engine?.horsepower} hp`}
                />
                <DetailItem
                  icon={<FaCar />}
                  label="Torque"
                  value={`${car.engine?.torque} lb-ft`}
                />
                {car.engine?.fuelEconomy && (
                  <>
                    <DetailItem
                      icon={<FaGasPump />}
                      label="City MPG"
                      value={car.engine.fuelEconomy.city}
                    />
                    <DetailItem
                      icon={<FaGasPump />}
                      label="Highway MPG"
                      value={car.engine.fuelEconomy.highway}
                    />
                    <DetailItem
                      icon={<FaGasPump />}
                      label="Combined MPG"
                      value={car.engine.fuelEconomy.combined}
                    />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCategory
                title="Exterior"
                features={car.features?.exterior}
              />
              <FeatureCategory
                title="Interior"
                features={car.features?.interior}
              />
              <FeatureCategory title="Safety" features={car.features?.safety} />
              <FeatureCategory
                title="Infotainment"
                features={car.features?.infotainment}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Description
            </h2>
            <p className="text-gray-700">{car.description}</p>
          </div>
        </div>

        {/* Right Column - Pricing & Info */}
        <div>
          {/* Pricing Box */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-gray-900">
                {car.currency === "USD" ? "$" : car.currency}{" "}
                {car.price?.toLocaleString()}
              </span>
              {car.originalPrice && car.originalPrice > car.price && (
                <span className="text-lg text-gray-500 line-through">
                  {car.currency === "USD" ? "$" : car.currency}{" "}
                  {car.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>

            {car.leaseOptions && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Lease Options
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span>${car.leaseOptions.monthlyPayment}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Term:</span>
                    <span>{car.leaseOptions.term} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span>${car.leaseOptions.downPayment}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Availability</h3>
              <div className="flex justify-between">
                <span>In Stock:</span>
                <span
                  className={car.inStock ? "text-green-600" : "text-red-600"}
                >
                  {car.inStock ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{car.quantity}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Vehicle Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Stock #:</span>
                  <span>{car.stockNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>VIN:</span>
                  <span>{car.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span>Colors:</span>
                  <span>{car.color?.join(", ")}</span>
                </div>
              </div>
            </div>

            {car.warranty && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Warranty</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>{car.warranty.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{car.warranty.months} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mileage:</span>
                    <span>{car.warranty.miles?.toLocaleString()} miles</span>
                  </div>
                </div>
              </div>
            )}

            <button className="w-full bg-[#424242] hover:bg-[#424242da] text-white font-bold py-3 px-4 rounded-lg transition duration-200">
              Contact Dealer
            </button>
          </div>

          {/* Special Offer */}
          {car.offerDateAndTime && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Special Offer
              </h3>
              <p className="text-yellow-700 mb-2">
                This offer expires on{" "}
                {new Date(car.offerDateAndTime).toLocaleDateString()}
              </p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                View Offer Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for detail items
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex items-start">
    <span className="text-gray-500 mr-3 mt-1">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "N/A"}</p>
    </div>
  </div>
);

// Helper component for feature categories
const FeatureCategory = ({
  title,
  features,
}: {
  title: string;
  features?: string[];
}) => (
  <div>
    <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
    <ul className="space-y-1">
      {features?.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default DetailsCarPage;
