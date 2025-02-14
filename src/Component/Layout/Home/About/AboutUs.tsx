import Footer from "../../Footer";
import CommonButtonborder from "../HomeComponent/CommonButtonborder";
import CommonHading from "../HomeComponent/CommonHading";
import { FaCarSide } from "react-icons/fa";
import "../../Home/HomeComponent/banner.css";
const AboutUs = () => {
  return (
    <>
      <div className="car-banner h-[5=310px] md:h-[510px] flex justify-center items-center">
        <div className="max-w-3xl px-4 py-14">
          <div className="flex justify-center">
            <CommonHading color="text-white" text="About Our Car Shop" />
          </div>
          <p className="text-[16px] text-center text-white leading-relaxed mb-6">
            Welcome to <strong>CAS Shop</strong>, your trusted destination for
            high-quality cars. We take pride in offering a wide selection of
            vehicles, from sleek sedans to powerful SUVs. Whether you're a
            first-time buyer or a seasoned car enthusiast, we are here to help
            you find the perfect vehicle to fit your lifestyle and budget.
          </p>
          <div className="w-[164px] mx-auto">
            <CommonButtonborder
              border="white"
              btnIcon={<FaCarSide />}
              text="Our All Car"
            />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-24">
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Our Mission
        </h2>
        <p className="text-[16px] text-gray-700 leading-relaxed mb-6">
          Our mission is to provide our customers with exceptional cars,
          outstanding service, and a seamless shopping experience. We are
          committed to transparency, affordability, and ensuring customer
          satisfaction with every purchase.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-[16px] text-gray-700 leading-relaxed mb-6">
          <li>Wide range of cars from top brands</li>
          <li>Competitive pricing with flexible financing options</li>
          <li>Expert team providing personalized recommendations</li>
          <li>Transparent and hassle-free buying process</li>
          <li>Excellent customer support before and after your purchase</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Our Collection
        </h2>
        <p className="text-[16px] text-gray-700 leading-relaxed mb-6">
          At CAS Shop, we offer a diverse collection of cars, including:
        </p>
        <ul className="list-disc list-inside text-[16px] text-gray-700 leading-relaxed mb-6">
          <li>Luxury Sedans</li>
          <li>Spacious SUVs</li>
          <li>Reliable Trucks</li>
          <li>Sporty Coupes</li>
          <li>Convertible Cars for a thrilling drive</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Visit Us
        </h2>
        <p className="text-[16px] text-gray-700 leading-relaxed mb-6">
          We invite you to visit our showroom and explore our latest arrivals.
          Our team is ready to assist you in making an informed decision and
          driving away with your dream car.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Contact Us
        </h2>
        <p className="text-[16px] text-gray-700 leading-relaxed mb-6">
          Have questions? Feel free to reach out to us anytime. We are here to
          make your car-buying experience smooth and enjoyable!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
