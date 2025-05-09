import Loader from "@/Component/Utils/Loader";
import { useVarefyPaymentQuery } from "@/redux/features/auth/Admin/product";
import { Link, useSearchParams } from "react-router-dom";

const VarefyPreempt = () => {
  const [searchParam] = useSearchParams();
  console.log(searchParam.get("order_id"));
  const { data, isLoading } = useVarefyPaymentQuery(
    searchParam.get("order_id")
  );

  if (isLoading) {
    return <Loader />;
  }

  const paymentData = data?.data[0];

  return (
    <div className="p-4 sm:p-8">
      <div
        style={{ boxShadow: "5px 5px 10px" }}
        className="max-w-3xl mx-auto my-12 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
      >
        <div className="px-6 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Payment Details
          </h2>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-gray-600">{paymentData?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{paymentData?.email}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-gray-600">{paymentData?.phone_no}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="text-gray-600">{paymentData?.address}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">City:</span>
              <span className="text-gray-600">{paymentData?.city}</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-6 space-y-4 border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Amount:</span>
              <span className="text-gray-600">
                {paymentData?.amount} {paymentData?.currency}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">
                Transaction Status:
              </span>
              <span className="text-gray-600">{paymentData?.bank_status}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Transaction ID:</span>
              <span className="text-gray-600">{paymentData?.bank_trx_id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Invoice No:</span>
              <span className="text-gray-600">{paymentData?.invoice_no}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Order ID:</span>
              <span className="text-gray-600">{paymentData?.order_id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Payment Method:</span>
              <span className="text-gray-600">{paymentData?.method}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">
                Received Amount:
              </span>
              <span className="text-gray-600">
                {paymentData?.received_amount}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 text-center">
            <Link
              to={"/dashboard/my-order"}
              className="bg-[#424242] hover:bg-[#424242da] text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out"
            >
              View Your Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarefyPreempt;
