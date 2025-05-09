import { useGetSingleOrderQuery } from "@/redux/features/auth/Admin/product";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { _id } = useParams();

  const { data: orderData, isLoading } = useGetSingleOrderQuery(_id as string);
  console.log(orderData, _id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Order not found
      </div>
    );
  }

  const {
    transaction,
    customerId,
    productId,
    deliveryStatus,
    paymentStatus,
    totalPrice,
    createdAt,
    updatedAt,
  } = orderData;

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-medium">Order ID:</span> {_id}
            </p>
            <p>
              <span className="font-medium">Order Date:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Delivery Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  deliveryStatus === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : deliveryStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {deliveryStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  paymentStatus === "Paid"
                    ? "bg-green-100 text-green-800"
                    : paymentStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {paymentStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">Total Price:</span> ${totalPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {transaction.id}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {transaction.method}
            </p>
            <p>
              <span className="font-medium">Bank Status:</span>{" "}
              {transaction.bank_status}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Transaction Date:</span>{" "}
              {transaction.date_time}
            </p>
            <p>
              <span className="font-medium">Amount:</span> ${totalPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-medium">Name:</span> {customerId.firstName}{" "}
              {customerId.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {customerId.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {customerId.phoneNumber}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Address:</span>
            </p>
            <p>
              {customerId.address.street}, {customerId.address.street2}
            </p>
            <p>
              {customerId.address.city}, {customerId.address.state}
            </p>
            <p>
              {customerId.address.district}, {customerId.address.postalCode}
            </p>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Product Information</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={productId.image[0]}
              alt={productId.model}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold">
              {productId.brand} {productId.model} ({productId.year})
            </h3>
            <p className="text-gray-600 mb-4">{productId.trim}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p>
                  <span className="font-medium">Condition:</span>{" "}
                  {productId.condition}
                </p>
                <p>
                  <span className="font-medium">Price:</span> $
                  {productId.originalPrice}
                </p>
                <p>
                  <span className="font-medium">Color:</span>{" "}
                  {productId.color.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Mileage:</span>{" "}
                  {productId.mileage} miles
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Fuel Type:</span>{" "}
                  {productId.fuelType}
                </p>
                <p>
                  <span className="font-medium">Transmission:</span>{" "}
                  {productId.transmission}
                </p>
                <p>
                  <span className="font-medium">Drivetrain:</span>{" "}
                  {productId.drivetrain}
                </p>
                <p>
                  <span className="font-medium">Stock #:</span>{" "}
                  {productId.stockNumber}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <h5 className="text-sm font-medium">Exterior</h5>
                  <ul className="text-sm">
                    {productId.features.exterior.map(
                      (feature: string, index: number) => (
                        <li key={index}>• {feature}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Interior</h5>
                  <ul className="text-sm">
                    {productId.features.interior.map(
                      (feature: string, index: number) => (
                        <li key={index}>• {feature}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Safety</h5>
                  <ul className="text-sm">
                    {productId.features.safety.map(
                      (feature: string, index: number) => (
                        <li key={index}>• {feature}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Engine Specifications */}
            <div>
              <h4 className="font-medium mb-2">Engine Specifications:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="font-medium">Horsepower:</span>{" "}
                  {productId.engine.horsepower} hp
                </p>
                <p>
                  <span className="font-medium">Torque:</span>{" "}
                  {productId.engine.torque} lb-ft
                </p>
                <p>
                  <span className="font-medium">Fuel Economy (city):</span>{" "}
                  {productId.engine.fuelEconomy.city} mpg
                </p>
                <p>
                  <span className="font-medium">Fuel Economy (highway):</span>{" "}
                  {productId.engine.fuelEconomy.highway} mpg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
