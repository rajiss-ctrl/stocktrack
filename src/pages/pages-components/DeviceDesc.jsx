import React from 'react';
import Drownfan from "../../assets/img/drownfan.png";
import StockTrack from "../../assets/img/stocktrack-ill.png";

const DeviceDesc = () => {
  return (
    <section className="relative  flex flex-col md:h-[700px] md:flex-row justify-center md:justify-between items-center  bg-[#fafafa] py-14 px-4 md:p-4 lg:p-5 xl:p-10">
    <div className="hidden lg:block lg:absolute z-30 lg:right-[42%] xl:right-[36%] lg:top-14">
      <img src={Drownfan} className="rotate-animation-drownfan" alt="...."/>
    </div>
      <div className="w-full md:w-[50%] ">
        <img src={StockTrack} className="w-full" alt="laptop and mobile" />
      </div>
      <div className="w-full md:w-[50%] ">
       <h3 className="tracking-tight md:tracking-wide lg:tracking-widest text-lg pt-9 md:pt-0 lg:text-xl  font-bold  text-[#252525]">StockTrack: Empowering Your Inventory Management Effortlessly</h3>
        <p className="tracking-tight md:tracking-wide lg:tracking-widest text-sm pt-2  md:text-base">Revolutionize your inventory control with our state-of-the-art Dashboard. Seamlessly manage stock, track movements, and make informed decisions. A user-friendly interface following the best industrial practices for unparalleled efficiency and success.</p>
      </div>
    </section>

  )
}

export default DeviceDesc
