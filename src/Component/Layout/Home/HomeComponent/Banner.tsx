import { MdPermContactCalendar } from "react-icons/md";
import "./banner.css";
import CommonButtonborder from "./CommonButtonborder";
import CommonHading from "./CommonHading";

const Banner = () => {
  return (
    <section className="car-banner min-h-screen md:min-h-[510px] flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:gap-16 px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
          <div className="mr-auto md:mr-10  place-self-center lg:col-span-7">
            <CommonHading color="text-white" text="Welcome to Car Shop" />
            <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-white">
              🚗 **Your trusted destination for premium cars!** Explore our wide
              range of high-quality vehicles, from sleek sports cars to reliable
              family SUVs. Whether you’re looking for style, performance, or
              affordability, we have the perfect ride for you.
            </p>
            <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-white">
              🌟 **Best deals, easy financing & top-notch customer service.**
              Drive away in your dream car today!
            </p>
            <div className="max-w-[180px]">
              <CommonButtonborder
                border="white"
                btnIcon={<MdPermContactCalendar />}
                text="Get in Touch"
              />
            </div>
          </div>
          <div className="hidden  lg:mt-0 lg:col-span-5 lg:flex">
            <img
              className="w-full object-contain h-full"
              src="https://cdn.pixabay.com/photo/2013/07/12/15/36/passenger-car-150155_1280.png"
              alt="Luxury Car"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
