import Loader from "@/Component/Utils/Loader";
import { useGetSingleCarQuery } from "@/redux/features/auth/Admin/product";
import { useParams } from "react-router-dom";
import {
  FaShieldAlt,
  FaStar,
  FaPlug,
  FaHeart,
  FaShare,
  FaChevronRight,
} from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { GiCarDoor, GiGearStick } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";

const DetailsCarPage = () => {
  const { _id } = useParams();
  const { data: car, isLoading } = useGetSingleCarQuery(_id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (!car) {
    return <div className="text-center py-10 text-gray-700">Car not found</div>;
  }

  return (
    <div className=" min-h-screen max-w-6xl mx-auto px-4">
      <div className=" py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm  mb-6">
          <span className=" cursor-pointer transition-colors">Home</span>
          <FaChevronRight className="mx-2 text-xs" />
          <span className=" cursor-pointer transition-colors">Inventory</span>
          <FaChevronRight className="mx-2 text-xs" />
          <span className="text-gray-700 font-medium">
            {car.brand} {car.model}
          </span>
        </div>

        {/* Header with basic info */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-600">
                {car.year} {car.brand} {car.model} {car.trim}
              </h1>
              <div className="flex items-center mt-2 text-lg text-gray-600">
                <span className="flex items-center mr-4">
                  <FaStar className="text-yellow-400 mr-1" />
                  {car.rating} ({car.reviewCount} reviews)
                </span>
                <span className="flex items-center">
                  <FaShieldAlt className="text-blue-400 mr-1" />
                  {car.condition}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 rounded-full bg-[#525252] hover:bg-[#616161] transition-colors">
                <FaHeart className="text-gray-300 hover:text-red-500 transition-colors" />
              </button>
              <button className="p-2 rounded-full bg-[#525252] hover:bg-[#616161] transition-colors">
                <FaShare className="text-gray-300 hover:text-blue-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg relative group">
            <img
              src={car.image?.[0]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium">Main Image</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {car.image?.slice(0, 5).map((img: string, index: number) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-md h-44 relative group"
              >
                <img
                  src={img}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors">
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Specifications Bar */}
        <div className="bg-[#525252] rounded-xl shadow-sm p-4 mb-8 border border-[#616161]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SpecItem
              icon={<IoMdSpeedometer className="text-2xl text-blue-400" />}
              label="Mileage"
              value={`${car.mileage?.toLocaleString()} mi`}
            />
            <SpecItem
              icon={
                car.fuelType === "Electric" ? (
                  <FaPlug className="text-2xl text-blue-400" />
                ) : (
                  <BsFillFuelPumpFill className="text-2xl text-blue-400" />
                )
              }
              label="Fuel Type"
              value={car.fuelType}
            />
            <SpecItem
              icon={<GiCarDoor className="text-2xl text-blue-400" />}
              label="Doors"
              value={car.doors}
            />
            <SpecItem
              icon={<GiGearStick className="text-2xl text-blue-400" />}
              label="Transmission"
              value={car.transmission}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Specifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="bg-[#525252] rounded-xl shadow-sm p-6 border border-[#616161]">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Vehicle Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </div>

            {/* Specifications Card */}
            <div className="bg-[#525252] rounded-xl shadow-sm p-6 border border-[#616161]">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Specifications
              </h2>
              <div className="space-y-4">
                <SpecSection title="General">
                  <SpecRow label="Brand" value={car.brand} />
                  <SpecRow label="Model" value={car.model} />
                  <SpecRow label="Trim" value={car.trim} />
                  <SpecRow label="Year" value={car.year} />
                  <SpecRow label="Body Type" value={car.bodyType} />
                  <SpecRow label="Generation" value={car.generation} />
                </SpecSection>

                <SpecSection
                  title={
                    car.fuelType === "Electric" ? "Electric Motor" : "Engine"
                  }
                >
                  {car.fuelType === "Electric" ? (
                    <>
                      <SpecRow
                        label="Battery Capacity"
                        value={`${car.batteryCapacity} kWh`}
                      />
                      <SpecRow label="Range" value={`${car.range} miles`} />
                    </>
                  ) : (
                    <>
                      <SpecRow label="Engine Size" value={car.engine?.size} />
                      <SpecRow
                        label="Cylinders"
                        value={car.engine?.cylinders}
                      />
                    </>
                  )}
                  <SpecRow
                    label="Horsepower"
                    value={`${car.engine?.horsepower} hp`}
                  />
                  <SpecRow
                    label="Torque"
                    value={`${car.engine?.torque} lb-ft`}
                  />
                  {car.engine?.fuelEconomy && (
                    <>
                      <SpecRow
                        label="City MPG"
                        value={car.engine.fuelEconomy.city}
                      />
                      <SpecRow
                        label="Highway MPG"
                        value={car.engine.fuelEconomy.highway}
                      />
                      <SpecRow
                        label="Combined MPG"
                        value={car.engine.fuelEconomy.combined}
                      />
                    </>
                  )}
                </SpecSection>

                <SpecSection title="Dimensions">
                  <SpecRow
                    label="Seating Capacity"
                    value={car.seatingCapacity}
                  />
                  <SpecRow label="Doors" value={car.doors} />
                  <SpecRow label="Drivetrain" value={car.drivetrain} />
                  <SpecRow label="Transmission" value={car.transmission} />
                </SpecSection>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-[#525252] rounded-xl shadow-sm p-6 border border-[#616161]">
              <h2 className="text-xl font-semibold mb-4 text-white">
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
                <FeatureCategory
                  title="Safety"
                  features={car.features?.safety}
                />
                <FeatureCategory
                  title="Infotainment"
                  features={car.features?.infotainment}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Info */}
          <div>
            {/* Pricing Card */}
            <div className="bg-[#525252] rounded-xl shadow-md p-6 border border-[#616161] sticky top-4">
              <div className="mb-4">
                {car.originalPrice && car.originalPrice > car.price && (
                  <div className="flex items-center mb-1">
                    <span className="text-sm text-gray-400 line-through mr-2">
                      {car.currency === "USD" ? "$" : car.currency}{" "}
                      {car.originalPrice?.toLocaleString()}
                    </span>
                    <span className="bg-red-900/30 text-red-400 text-xs font-medium px-2 py-0.5 rounded">
                      Save{" "}
                      {Math.round((1 - car.price / car.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-white">
                    {car.currency === "USD" ? "$" : car.currency}{" "}
                    {car.price?.toLocaleString()}
                  </span>
                  {car.leaseOptions && (
                    <span className="text-sm text-gray-400 ml-2">
                      or ${car.leaseOptions.monthlyPayment}/mo
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
                  Schedule Test Drive
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
                  Contact Dealer
                </button>
                <button className="w-full bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                  Calculate Financing
                </button>
              </div>

              {/* Quick Facts */}
              <div className="border-t border-[#616161] pt-4">
                <h3 className="font-semibold text-white mb-3">Quick Facts</h3>
                <div className="space-y-3">
                  <QuickFact label="Stock #" value={car.stockNumber} />
                  <QuickFact label="VIN" value={car.vin} />
                  <QuickFact
                    label="Availability"
                    value={car.inStock ? "In Stock" : "Out of Stock"}
                    highlight={car.inStock}
                  />
                  <QuickFact
                    label="Quantity"
                    value={car.quantity}
                    highlight={car.quantity > 0}
                  />
                  <QuickFact
                    label="Colors"
                    value={car.color?.join(", ")}
                    colors={car.color}
                  />
                </div>
              </div>

              {car.warranty && (
                <div className="border-t border-[#616161] pt-4 mt-4">
                  <h3 className="font-semibold text-white mb-3">Warranty</h3>
                  <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800/30">
                    <div className="flex items-center mb-1">
                      <FaShieldAlt className="text-blue-400 mr-2" />
                      <span className="font-medium text-blue-300">
                        {car.warranty.type}
                      </span>
                    </div>
                    <div className="text-sm text-blue-200">
                      {car.warranty.months} months or{" "}
                      {car.warranty.miles?.toLocaleString()} miles
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Special Offer */}
            {car.offerDateAndTime && (
              <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-800/30 rounded-xl p-4 mt-6">
                <div className="flex items-start">
                  <div className="bg-yellow-800/30 p-2 rounded-lg mr-3">
                    <FaStar className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-300 mb-1">
                      Special Offer
                    </h3>
                    <p className="text-yellow-200 text-sm mb-2">
                      Limited time offer! Expires{" "}
                      {new Date(car.offerDateAndTime).toLocaleDateString()}
                    </p>
                    <button className="text-yellow-300 hover:text-yellow-200 text-sm font-medium flex items-center">
                      View details <FaChevronRight className="ml-1 text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Dealer Info */}
            <div className="bg-[#525252] rounded-xl shadow-sm p-6 border border-[#616161] mt-6">
              <h3 className="font-semibold text-white mb-3">
                Dealer Information
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <span className="text-lg font-medium">DL</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Premium Motors</h4>
                  <div className="flex items-center text-sm text-gray-400">
                    <FaStar className="text-yellow-400 mr-1" />
                    4.8 (124 reviews)
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>123 Auto Mall Drive</p>
                <p>San Francisco, CA 94103</p>
                <p className="flex items-center">
                  <span className="w-24">Phone:</span>
                  <span className="font-medium">(415) 555-7890</span>
                </p>
                <p className="flex items-center">
                  <span className="w-24">Hours:</span>
                  <span>Mon-Fri: 9AM-7PM</span>
                </p>
              </div>
              <button className="w-full mt-4 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10 font-medium py-2 px-4 rounded-lg transition duration-200">
                View Dealer Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for specification items
const SpecItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex items-center">
    <div className="mr-3">{icon}</div>
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-medium text-white">{value || "N/A"}</div>
    </div>
  </div>
);

// Helper component for specification sections
const SpecSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="font-medium text-gray-300 mb-3 border-b border-[#616161] pb-1">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

// Helper component for specification rows
const SpecRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex justify-between">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-white">{value || "N/A"}</span>
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
    <h3 className="font-medium text-gray-300 mb-2">{title}</h3>
    <ul className="space-y-2">
      {features?.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-400 mr-2 mt-0.5">•</span>
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Helper component for quick facts
const QuickFact = ({
  label,
  value,
  highlight = false,
  colors,
}: {
  label: string;
  value: string | number | undefined;
  highlight?: boolean;
  colors?: string[];
}) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    {colors ? (
      <div className="flex space-x-1">
        {colors.map((color, i) => (
          <span
            key={i}
            className="w-4 h-4 rounded-full border border-[#616161]"
            style={{ backgroundColor: color.toLowerCase() }}
            title={color}
          />
        ))}
      </div>
    ) : (
      <span
        className={`font-medium ${highlight ? "text-green-400" : "text-white"}`}
      >
        {value || "N/A"}
      </span>
    )}
  </div>
);

export default DetailsCarPage;
