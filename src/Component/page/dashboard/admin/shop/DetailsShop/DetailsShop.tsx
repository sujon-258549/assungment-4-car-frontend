import Loader from "@/Component/Utils/Loader";
import { Button } from "@/components/ui/button";
import { useGetMyShopQuery } from "@/redux/features/auth/Admin/shop";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaShieldAlt,
  FaCreditCard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdSystemUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

const DetailsShop = () => {
  const { data: shop, isLoading } = useGetMyShopQuery("shop");

  if (isLoading) {
    return <Loader />;
  }

  if (!shop) {
    return <div className="text-center py-10">No shop data available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Shop Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3   lg:w-1/4">
          <div className="flex flex-col justify-center items-center mx-auto">
            <div className="relative  aspect-square rounded-lg overflow-hidden shadow-lg">
              <img
                src={shop.shopLogo}
                alt={shop.shopName}
                className="object-cover "
              />
            </div>
            <Button className="w-full py-5 bg-cyan-600 mt-2 text-[16px]">
              <Link
                to={"/dashboard/update-shop"}
                className="flex gap-2 items-center"
              >
                Update Shop <MdSystemUpdate />
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {shop.shopName}
            </h1>
            <p className="text-gray-600 mb-4">{shop.description}</p>

            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{shop.shopAddress}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <FaPhone className="text-cyan-500" />
              <span>{shop.customerServiceContact}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              {shop.socialMediaLinks && (
                <>
                  <a
                    href={shop.socialMediaLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href={shop.socialMediaLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href={shop.socialMediaLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href={shop.socialMediaLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </>
              )}
            </div>

            <a
              href={shop.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>

      {/* Shop Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            About Us
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaCalendarAlt className="text-green-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-700">Established</h3>
                <p className="text-gray-600">{shop.establishedYear}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-green-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-700">Warranty</h3>
                <p className="text-gray-600">
                  {shop.warrantyOffered
                    ? "Offers warranty"
                    : "No warranty offered"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCreditCard className="text-green-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-700">Payment Methods</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {shop.paymentMethods.map((method, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Operating Hours
          </h2>
          {shop.operatingHours && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaClock className="text-green-500" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    {shop.operatingHours.open} - {shop.operatingHours.close}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">Days Open</h3>
                <div className="flex flex-wrap gap-2">
                  {shop.operatingHours.daysOpen.map((day, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Services & Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Services Offered */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Services Offered
          </h2>
          <div className="space-y-2">
            {shop.servicesOffered.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Car Brands */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Car Brands
          </h2>
          <div className="space-y-2">
            {shop.carBrands.map((brand, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Features */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Shop Features
          </h2>
          <div className="space-y-2">
            {shop.shopFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Owner Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Owner Information
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <img
              src={shop.authorShopId?.profileImage}
              alt={shop.ownerName}
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              {shop.ownerName}
            </h3>
            <p className="text-gray-600">{shop.authorShopId?.role}</p>
            <p className="text-gray-600">{shop.authorShopId?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsShop;
