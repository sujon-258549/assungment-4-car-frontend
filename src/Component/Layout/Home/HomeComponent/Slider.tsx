// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// add auto play cod
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
          delay: 24000,
          disableOnInteraction: false,
        }}
        loop={true}
        // modules={[Pagination]}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
                    <header className='max-h-[600px]'>
                        <div className="w-full bg-center z-10 bg-current bg-no-repeat md:lg:h-[600px] md:h-[400px h-48 h-48 hero-overlay" style={{ backgroundImage: "url('https://1.bp.blogspot.com/-Ir8eienXMt0/XSRTmKiRhfI/AAAAAAAAIi0/L4VQYFWw31ADz2mfos9qA7hRjE_AgMDhgCLcBGAs/s1600/blog%2Bpost%2Bcopy.png')" }}> 
                        <div>
                            <img className='w-full relative' src="https://1.bp.blogspot.com/-Ir8eienXMt0/XSRTmKiRhfI/AAAAAAAAIi0/L4VQYFWw31ADz2mfos9qA7hRjE_AgMDhgCLcBGAs/s1600/blog%2Bpost%2Bcopy.png" alt="" />
                            <div className="flex items-center justify-center w-full h-full bg-gray-900/40 absolute top-[0%] left-[0]">
                                <div className="text-center">
                                    <h1 className="text-3xl font-semibold text-red-700 lg:text-4xl">No use Lux Use Sandelina<span className="text-white ml-2">Use Sandelina</span> </h1>
                                    <button className="w-fullinline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">Show All Details</button>
                                </div>
                            </div>
                        </div>
                    </header>
                </SwiperSlide> */}
        <SwiperSlide>
          <div
            className="w-full bg-center z-0 bg-cover md:lg:h-[600px] md:h-[400px]  h-48"
            style={{
              backgroundImage:
                "url('https://1.bp.blogspot.com/-Ir8eienXMt0/XSRTmKiRhfI/AAAAAAAAIi0/L4VQYFWw31ADz2mfos9qA7hRjE_AgMDhgCLcBGAs/s1600/blog%2Bpost%2Bcopy.png')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No use Lux Use{" "}
                  <span className="text-yellow-500 ">Use Sandelina</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-0 bg-cover md:lg:h-[600px] md:h-[400px] h-48"
            style={{
              backgroundImage:
                "url('https://scontent.fspd3-1.fna.fbcdn.net/v/t39.30808-6/408908295_755257543298923_7549811742622662495_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=O1Et5WEmI6IQ7kNvgEekenU&_nc_ht=scontent.fspd3-1.fna&cb_e2o_trans=q&oh=00_AYASaJb3udz4jfEvb_J-U15iYDZ0MsT_JqHMTph-k6TUAg&oe=6644C204')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No drink Cocacola{" "}
                  <span className="text-yellow-500">drink Mojo</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-0 bg-cover md:lg:h-[600px] md:h-[400px] h-48"
            style={{
              backgroundImage:
                "url('https://waltonbd.com/image/catalog/home-page/slider/worldwide-web-view.jpg')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No use other Brand{" "}
                  <span className="text-yellow-500 ">Use walton brand</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-0 bg-cover md:lg:h-[600px] md:h-[400px] h-48"
            style={{
              backgroundImage:
                "url('https://waltonbd.com/image/catalog/category-banner/television/hotel-mode.jpg')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No use other Brand{" "}
                  <span className="text-yellow-500 ">Use walton brand</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-0 bg-cover md:lg:h-[600px] md:h-[400px] h-48 "
            style={{
              backgroundImage:
                "url('https://waltonbd.com/image/catalog/home-page/full-block/tamarind-desktop.jpg')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No use other Brand{" "}
                  <span className="text-yellow-500 ">Use walton brand</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-0 bg-cover md:lg:h-[600px] md:h-[400px] h-48"
            style={{
              backgroundImage:
                "url('https://www.bashundharafood.com/assets/upload/wallpaper_1597834039.jpg')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  {" "}
                  <span className="text-yellow-500 ">Use Bosundatra oil</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-10 bg-cover md:lg:h-[600px] md:h-[400px] h-48 "
            style={{
              backgroundImage:
                "url('https://scontent.fspd3-1.fna.fbcdn.net/v/t39.30808-6/308720333_478147037659339_2772688781300100999_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_h-47Vw7ikYQ7kNvgF0Z97h&_nc_ht=scontent.fspd3-1.fna&cb_e2o_trans=q&oh=00_AYCtKKbVWJ-7n7Jf5cd0XC0AgpdvSc1-c6xKKMluuaNEHA&oe=6644CD28')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  {" "}
                  <span className="text-yellow-500 ">Use bosundara lotion</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-10 bg-cover md:lg:h-[600px] md:h-[400px] h-48 "
            style={{
              backgroundImage:
                "url('https://www.shahcement.com/storage/backend.pages/yWE255hcV7rMRaXRIhtJQKmtpLfQeJcOlHnTUfDw.jpg')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No use other sement brand{" "}
                  <span className="text-yellow-500 ">Use Shaha sement</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full bg-center z-10 bg-cover md:lg:h-[600px] md:h-[400px] h-48 "
            style={{
              backgroundImage:
                "url('https://www.shahcement.com/storage/backend.pages/jyYfaW1lCGa8ERT63LVh9vmImMgt06ESkzoUgRoy.jpg')",
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  No use other sement brand{" "}
                  <span className="text-yellow-500 ">Use Shaha sement</span>
                </h1>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] mt-5">
                  Show All Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
