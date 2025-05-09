import Footer from "../Footer";
// import Banner from "./HomeComponent/Banner";
import HomeBlog from "./HomeComponent/HomeBlog";
import OfferSection from "./HomeComponent/OfferdSectin";
import ServicesSection from "./HomeComponent/ServicesSection";
import SixCars from "./HomeComponent/SixCars";
import Slider from "./HomeComponent/Slider";
import TeamSection from "./HomeComponent/TeamSection";

const Home = () => {
  return (
    <div className=" mx-auto">
      <>
        {/* <Banner></Banner> */}
        <Slider></Slider>
        <SixCars />
        <HomeBlog />
        <ServicesSection />
        <OfferSection />
        <TeamSection />
      </>
      <Footer />
    </div>
  );
};

export default Home;
