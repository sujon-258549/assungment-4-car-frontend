// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// @ts-expect-error css
import "swiper/css";
// @ts-expect-error css
import "swiper/css/pagination";

// add auto play cod
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import AddToCart from "./AddToCart";
import { FaExternalLinkAlt } from "react-icons/fa";
const carBrands = [
  {
    name: "BMW",
    description:
      "BMW blends cutting-edge technology, luxury, and performance. Known for precision engineering, it offers an exhilarating driving experience with advanced features, sporty aesthetics, and innovative safety systems. Whether it’s the high-performance M series or the luxurious 7 series, BMW continues to set benchmarks in the automotive industry.",
    image:
      "https://images.unsplash.com/photo-1704340142770-b52988e5b6eb?q=80&w=3800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mercedes-Benz",
    description:
      "Mercedes-Benz is synonymous with elegance, innovation, and performance. Offering world-class luxury, top-tier safety, and cutting-edge technology, its vehicles provide an unparalleled driving experience. From sporty AMG models to the prestigious S-Class, Mercedes-Benz continuously redefines sophistication in the automotive industry with its superior craftsmanship and engineering excellence.",
    image:
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Audi",
    description:
      "Audi combines performance, luxury, and technology to create a seamless driving experience. With its signature Quattro all-wheel-drive, advanced infotainment systems, and sleek design, Audi stands out. From high-performance RS models to luxurious A-series sedans, Audi consistently delivers innovation, comfort, and power, making it a top-tier automotive brand.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Lamborghini",
    description:
      "Lamborghini is an icon of speed, power, and bold aesthetics. Designed for those who crave adrenaline, its aerodynamic styling and roaring engines deliver unparalleled performance. With aggressive designs and high-performance engineering, Lamborghini cars symbolize exclusivity, passion, and the thrill of pushing boundaries in automotive excellence.",
    image:
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Ferrari",
    description:
      "Ferrari embodies Italian craftsmanship, performance, and prestige. Built for speed enthusiasts, its powerful engines, aerodynamic elegance, and racing heritage make every drive exhilarating. A Ferrari is more than a car—it’s a symbol of passion, exclusivity, and the pursuit of automotive perfection, setting the benchmark for luxury sports cars.",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNhcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Porsche",
    description:
      "Porsche seamlessly combines performance, precision, and luxury. Known for its sporty design and remarkable handling, Porsche vehicles deliver an unmatched driving experience. With iconic models like the 911, Porsche remains a symbol of excellence, blending high-performance engineering with refined luxury, making it a top choice for driving enthusiasts.",
    image:
      "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Tesla",
    description:
      "Tesla represents the future of electric mobility. Combining sustainability with high-performance driving, Tesla cars deliver unmatched efficiency, speed, and innovative features. With autonomous driving technology, minimalistic interiors, and zero-emission vehicles, Tesla continues to revolutionize the automotive industry, making electric cars the future of transportation.",
    image:
      "https://images.pexels.com/photos/11094823/pexels-photo-11094823.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Rolls-Royce",
    description:
      "Rolls-Royce defines ultimate luxury and craftsmanship, delivering an unparalleled driving experience. Every Rolls-Royce car is a masterpiece of engineering, designed for those who demand the finest in luxury, comfort, and performance. The meticulous attention to detail, iconic design, and unrivaled performance make Rolls-Royce the epitome of automotive prestige.",
    image:
      "https://images.pexels.com/photos/1233419/pexels-photo-1233419.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

// import required modules
// import { Pagination } from 'swiper/modules';

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        // add auto aplay cod
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        // modules={[Pagination]}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {carBrands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-screen w-full flex items-center justify-center text-white text-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${brand.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white lg:text-5xl">
                    {brand.name}
                  </h1>
                  <p className="text-white p-5 md:px-20 lg:px-32 text-[16px]">
                    {brand.description}
                  </p>
                  <div className="w-[150px] mx-auto">
                    <AddToCart
                      text="View All"
                      btnIcon={<FaExternalLinkAlt />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
