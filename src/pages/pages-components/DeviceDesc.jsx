import React from "react";
import Drownfan from "../../assets/img/drownfan.png";
import StockTrack from "../../assets/img/stocktrack-ill.png";

const DeviceDesc = () => {
  return (
    <section className="relative flex flex-col md:flex-row md:h-[700px] justify-center md:justify-between items-center bg-gradient-to-r from-gray-500 via-indigo-500 to-purple-400 py-14 px-6 md:py-20 md:px-8 lg:px-16">
      {/* Rotating Decorative Image */}
      <div className="hidden lg:block absolute z-30 lg:right-[40%] xl:right-[35%] lg:top-12">
        <img
          src={Drownfan}
          className="rotate-animation-drownfan"
          alt="Rotating decoration"
        />
      </div>

      {/* Image Section */}
      <div className="w-full md:w-[45%] mb-10 md:mb-0">
        <img
          src={StockTrack}
          className="w-full max-w-[90%] mx-auto"
          alt="Laptop and mobile devices displaying StockTrack"
        />
      </div>

      {/* Description Section */}
      <div className="w-full md:w-[50%] text-center md:text-left">
        {/* Heading */}
        <h3 className="tracking-tight md:tracking-wide lg:tracking-widest text-lg md:text-xl lg:text-2xl font-bold text-white">
          StockTrack: Empowering Your Inventory Management Effortlessly
        </h3>

        {/* Paragraph */}
        <p className="tracking-tight md:tracking-wide lg:tracking-widest text-sm md:text-base text-white mt-4">
          Revolutionize your inventory control with our state-of-the-art
          Dashboard. Seamlessly manage stock, track movements, and make
          informed decisions. A user-friendly interface designed with the best
          industrial practices for unparalleled efficiency and success.
        </p>
      </div>
    </section>
  );
};

export default DeviceDesc;
