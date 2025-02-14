import CommonButton from "@/Component/Layout/Home/HomeComponent/CommonButton";
import Loder from "@/Component/Utils/Loder";
import {
  useCreateOrdersMutation,
  useGetSingleCarQuery,
} from "@/redux/features/auth/Admin/product";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const DetailsCar = () => {
  const [createOrders, { data: orderData, isSuccess }] =
    useCreateOrdersMutation();
  const [inputQuantity, setInputQuantity] = useState<number>(1);

  const { _id } = useParams();
  const { data, isLoading, error } = useGetSingleCarQuery(_id as string);

  // Handle increment and decrement for quantity
  const handleIncrement = () => {
    if (inputQuantity < (data?.quantity || 1)) {
      setInputQuantity(inputQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (inputQuantity > 1) {
      setInputQuantity(inputQuantity - 1);
    }
  };

  // Handle order submission
  const handleOrder = async (id: string) => {
    const toastId = toast.loading("Creating order...");
    const order = {
      products: [{ car: id, quantity: inputQuantity }],
    };

    const res = await createOrders(order);
    if ("error" in res) {
      // @ts-expect-errors data
      toast.error(res.error?.data?.message || "Order failed!", { id: toastId });
    } else {
      toast.success("Order successful!", { id: toastId });
    }
  };

  // Redirect on successful order
  useEffect(() => {
    if (isSuccess && orderData?.data) {
      toast.success(orderData.message, { duration: 2000 });
      setTimeout(() => {
        window.location.href = orderData.data;
      }, 1000);
    }
  }, [isSuccess, orderData]);

  // Loading and error states
  if (isLoading) {
    return <Loder />;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load car details.
      </p>
    );
  }

  if (!data) {
    return <p className="text-center py-10">No car details available.</p>;
  }

  const { brand, model, price, description, image } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 md:pt-24 md:px-8">
      <div className="font-sans tracking-wide max-md:mx-auto">
        <div className="car-banner md:min-h-[350px] grid items-center grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
          {/* Car Image Section */}
          <div className="lg:col-span-3 h-full p-6">
            <div className="relative h-full flex items-center justify-center lg:min-h-[580px]">
              <img
                src={image}
                alt={brand}
                className="lg:w-3/5 w-3/4 aspect-[511/580] object-contain max-lg:p-8"
              />
              <div className="flex space-x-4 items-end absolute right-0 max-md:right-4 bottom-0">
                <div className="bg-white w-9 h-9 grid items-center justify-center rounded-full rotate-90 shrink-0 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 fill-[#333] inline"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <div className="bg-[#333] w-9 h-9 grid items-center justify-center rounded-full -rotate-90 shrink-0 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 fill-[#fff] inline"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Car Details Section */}
          <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{brand}</h2>
              <div className="flex space-x-1 mt-2">
                {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 fill-gray-800"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
                <svg
                  className="w-4 h-4 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Price</h3>
              <p className="text-gray-800 text-3xl font-bold mt-2">
                ${Number(price) * Number(inputQuantity)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">
                Model: <span className="text-[16px] font-medium">{model}</span>
              </h3>
            </div>

            <div className="mt-1">
              <h3 className="text-lg font-bold text-gray-800">
                Description:{" "}
                <span className="text-[16px] font-medium">{description}</span>
              </h3>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
              <div className="flex divide-x border w-max mt-2 rounded overflow-hidden">
                <button
                  onClick={handleDecrement}
                  type="button"
                  className="bg-cyan-800 w-10 h-9 font-semibold flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 fill-current inline"
                    viewBox="0 0 124 124"
                  >
                    <path
                      className="text-white"
                      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                      data-original="#fffff"
                    />
                  </svg>
                </button>
                <div className="w-10 h-9 font-semibold flex items-center justify-center text-gray-800 text-lg">
                  {inputQuantity}
                </div>
                <button
                  onClick={handleIncrement}
                  type="button"
                  className="bg-cyan-800 text-white w-10 h-9 font-semibold flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 fill-current inline"
                    viewBox="0 0 42 42"
                  >
                    <path
                      d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                      data-original="#000000"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-6 w-[250px]">
              <button onClick={() => handleOrder(_id!)}>
                <CommonButton btnIcon={<FaShoppingCart />} text="Buy now" />
              </button>
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path
                  d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                  data-original="#000000"
                />
                <path
                  d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                  data-original="#000000"
                />
              </svg>
              Free delivery on orders over $100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCar;
