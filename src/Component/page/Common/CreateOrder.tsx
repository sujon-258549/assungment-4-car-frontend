import Loader from "@/Component/Utils/Loader";
import {
  useCreateOrdersMutation,
  useGetSingleCarQuery,
} from "@/redux/features/auth/Admin/product";
import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateOrder = () => {
  const [createOrders, { data: orderData, isSuccess }] =
    useCreateOrdersMutation();
  const [inputQuantity, setInputQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const { _id } = useParams();
  const { data, isLoading, error } = useGetSingleCarQuery(_id as string);

  useEffect(() => {
    if (data?.color?.length > 0) {
      setSelectedColor(data.color[0]);
    }
  }, [data]);

  const handleIncrement = () => {
    if (inputQuantity < (data?.quantity || 1)) {
      setInputQuantity(inputQuantity + 1);
    } else {
      toast.warning(`Maximum available quantity is ${data?.quantity}`);
    }
  };

  const handleDecrement = () => {
    if (inputQuantity > 1) {
      setInputQuantity(inputQuantity - 1);
    }
  };

  const handleOrder = async (id: string) => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const toastId = toast.loading("Creating order...", { duration: 2000 });
    const order = {
      car: id,
      quantity: inputQuantity,
      colors: selectedColor,
    };
    console.log(order);
    const res = await createOrders(order);
    if ("error" in res) {
      toast.error("Order failed!", { id: toastId });
    } else {
      toast.success("Order successful!", { id: toastId });
    }
  };

  useEffect(() => {
    if (isSuccess && orderData?.data) {
      toast.success(orderData.message, { duration: 2000 });
      setTimeout(() => {
        window.location.href = orderData.data;
      }, 1000);
    }
  }, [isSuccess, orderData]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center py-10 px-6 bg-white rounded-xl shadow-sm max-w-md w-full border border-gray-100">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600">Failed to load car details.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center py-10 px-6 bg-white rounded-xl shadow-sm max-w-md w-full border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data</h2>
          <p className="text-gray-600">No car details available.</p>
        </div>
      </div>
    );
  }

  const { brand, model, price, description, image, color, year } = data;

  const getColorValue = (colorName: string) => {
    const lowerColor = colorName.toLowerCase();
    if (lowerColor.includes("black")) return "#000000";
    if (lowerColor.includes("white")) return "#FFFFFF";
    if (lowerColor.includes("red")) return "#FF0000";
    if (lowerColor.includes("blue")) return "#2563EB";
    if (lowerColor.includes("green")) return "#16A34A";
    if (lowerColor.includes("silver")) return "#E5E7EB";
    if (lowerColor.includes("gray") || lowerColor.includes("grey"))
      return "#6B7280";
    return colorName;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Car Image Gallery */}
          <div className="p-6 lg:p-8 bg-gray-50">
            <div className="relative h-80 md:h-[500px] rounded-xl bg-white flex items-center justify-center shadow-inner">
              <img
                src={image[activeImageIndex]}
                alt={`${brand} ${model}`}
                className="max-h-full max-w-full object-contain p-4"
              />

              {image.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) => (prev - 1 + image.length) % image.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-md border border-gray-200"
                  >
                    <FaChevronLeft className="text-gray-800" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev + 1) % image.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-md border border-gray-200"
                  >
                    <FaChevronRight className="text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 mt-6 overflow-x-auto py-2 px-1">
              {image.map((item: string, index: number) => (
                <button
                  key={`thumbnail-${index}`}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg cursor-pointer border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-[#424242]"
                      : "border-transparent"
                  }`}
                >
                  <div className="w-full h-full bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Car Details Section */}
          <div className="p-6 lg:p-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {year}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {brand} {model}
                </h1>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-500">
                  Stock #
                </span>
                <p className="text-lg font-bold text-gray-900">
                  {data.stockNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={`star-${i}`}
                    className={`w-5 h-5 ${i >= 4 ? "text-gray-300" : ""}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Total Price
                  </span>
                  <p className="text-3xl font-bold text-gray-900">
                    ${(Number(price) * Number(inputQuantity)).toLocaleString()}
                  </p>
                  {inputQuantity > 1 && (
                    <p className="text-sm text-gray-500">
                      ${Number(price).toLocaleString()} each
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-500">
                    Available
                  </span>
                  <p className="text-lg font-bold text-gray-900">
                    {data.quantity}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Color Selection */}
            {color?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Available Colors
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {color.map((colorOption: string, index: number) => (
                    <button
                      key={`color-${index}`}
                      onClick={() => setSelectedColor(colorOption)}
                      className={`relative w-12 h-12 rounded-full transition-all flex items-center justify-center ${
                        selectedColor === colorOption
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : ""
                      }`}
                      style={{
                        backgroundColor: getColorValue(colorOption),
                      }}
                      title={colorOption}
                    >
                      {selectedColor === colorOption && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-gray-600 mt-3">
                    Selected:{" "}
                    <span className="font-medium">{selectedColor}</span>
                  </p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center bg-white text-gray-900 font-medium">
                    {inputQuantity}
                  </div>
                  <button
                    onClick={handleIncrement}
                    className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {data.quantity} units available
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => _id && handleOrder(_id)}
                className="flex-1 bg-[#424242] hover:bg-[#424242da] text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg"
                disabled={!selectedColor}
              >
                <FaShoppingCart className="text-lg" />
                <span>Buy Now</span>
              </button>
              <button
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
                disabled={!selectedColor}
              >
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    All transactions are encrypted and secure
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Free delivery on orders over $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
