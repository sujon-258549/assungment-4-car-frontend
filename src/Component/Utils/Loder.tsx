import "./loder.css";
const Loder = () => {
  return (
    <section style={{ zIndex: "999" }} className="absolute top-0 left-0 w-full">
      <div className="min-h-screen flex justify-center items-center bg-cyan-950">
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

export default Loder;
