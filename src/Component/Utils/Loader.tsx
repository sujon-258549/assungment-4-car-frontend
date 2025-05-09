import "./loder.css";
const Loader = () => {
  return (
    <section style={{ zIndex: "999" }} className="absolute top-0 left-0 w-full">
      <div className="min-h-screen flex justify-center items-center bg-[#424242] hover:bg-[#424242da]">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
