import Dashboard from "../../assets/video/dashboard-illustration.mp4";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation-note.json";

const DashboardDescription = () => {
  return (
    <section className="w-full text-white text-sm sm:text-base md:text-lg lg:text-xl py-16 md:py-24 flex flex-col items-center  relative z-10">
      <div
          className="-top-10 left-0 right-0 w-full absolute pointer-events-none overflow-hidden  h-20 z-50"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      <h2 className="font-extrabold tracking-tight text-center px-6 md:px-20 lg:px-32 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug">
        Elevate Efficiency: Redefine{" "}
        <span className="text-[#1a630a] font-bold">Inventory Management</span>{" "}
        Now!
      </h2>

      {/* Content Section */}
      <div className="relative flex flex-col items-center mt-8 md:mt-12 w-full">
        {/* Lottie Animation */}
        <Lottie
          className="absolute left-4 md:left-10 lg:left-16 -bottom-8 md:-bottom-12 w-[20%] sm:w-[15%] md:w-[10%]"
          animationData={animationData}
        />

        {/* Video Section */}
        <video
          className="relative z-10 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] shadow-lg rounded-lg"
          autoPlay
          loop
          muted
          playsInline
          src={Dashboard}
        ></video>

        {/* Decorative Layers */}
        <div className="absolute -z-0 -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FEBC1F] h-1 sm:h-2 lg:h-3 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%]"></div>
        <div className="absolute -z-10 -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#DEDFFB] h-1 sm:h-2 lg:h-3 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%]"></div>
      </div>
      <div
          className="-bottom-10 left-0 right-0 w-full absolute pointer-events-none overflow-hidden  h-20 z-50"
          style={{ transform: "translateZ(360)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
    </section>
  );
};

export default DashboardDescription;
