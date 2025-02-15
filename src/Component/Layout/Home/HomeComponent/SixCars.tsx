import { useGetAllCarQuery } from "@/redux/features/auth/Admin/product";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./style.css";
import Loder from "@/Component/Utils/Loder";
import CommonHading from "./CommonHading";
import CommonButton from "./CommonButton";
import { Link } from "react-router-dom";
const SixCars = () => {
  const { data: carData, isLoading } = useGetAllCarQuery(undefined);
  if (isLoading) {
    return <Loder />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 md:pt-24 md:px-8">
      <div className="text-center">
        <CommonHading color="black" text="Car Section" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {carData?.data?.data
          ?.slice(0, 6)
          .map(
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
                    className="w-full h-60 rounded-r-xl"
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
                    <div>
                      {/* <AddToCart
                        border="bg-cyan-900"
                        btnIcon={<FaExternalLinkAlt />}
                        text="Details"
                      /> */}
                      {/* <Link to={`/detail-page/${_id}`}>
                        <div className="bg-cyan-900  rounded-md px-1 py-1">
                          <div
                            className="flex items-center justify-center p-1.5 cursor-pointer rounded-md text-neutral-500 hover:text-neutral-100  font-medium relative z-[1] group"
                            data-tooltip="HTML"
                          >
                            <FaExternalLinkAlt className="text-[17px] text-white" />
                            <div className="absolute px-3 text-white hidden group-hover:block text-sm bg-cyan-900 rounded-md p-2 shadow-md bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                              Details
                            </div>
                          </div>
                        </div>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      <div className="mt-10 flex justify-center">
        <Link to={"/all-cars"}>
          <div style={{ boxShadow: "5px 5px 10px", borderRadius: "12px" }}>
            <CommonButton
              btnIcon={<FaExternalLinkAlt />}
              text="View All Cars"
            ></CommonButton>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SixCars;
