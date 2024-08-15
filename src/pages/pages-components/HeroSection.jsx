import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/img/Hero2.png";
import HeroMobile from "../../assets/img/hero-mobile.png";
import HeroDrown from "../../assets/img/hero-drown.png";
import HeroGif from "../../assets/img/herogif.gif";
import { useSpring, animated } from 'react-spring';
import { useSelector } from "react-redux";

const HeroSection = () => {
  const userData = useSelector((store) => store.buz.buzProfileData);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);


  
  // Set loaded to true after a short delay to trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Animation for revealing the image slowly on first load
  const imageAnimation = useSpring({
    opacity: loaded ? 1 : 0,
    from: { opacity: 0 },
  });

  // Set loaded to true after a short delay to trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative z-40 bg-[#F6F8F9] pt-16 pb-5 md:pb-24 lg:pb-0 md:pt-28 lg:pt-20 xl:pt-14 h-auto overflow-hidden">
      <div className="hidden lg:block lg:absolute z-30 lg:right-[28%] lg:top-32">
        <img src={HeroGif} className="w-40" alt="..." />
      </div>
      <div className="custom-bg w-full flex items-center justify-center flex-col lg:flex-row lg:justify-between">
        <div className="w-full xl:pl-20 sm:pt-0">
          <h2 className="tracking-tight md:tracking-wide lg:tracking-widest px-4 sm:px-0 pt-10 sm:pt-0 lg:pl-16 xl:pl-8 xl:pr-10 text-center lg:text-left text-[#46148B] font-bold text-[1.6rem] leading-[2rem] sm:text-3xl md:text-6xl lg:text-4xl xl:text-5xl ">
            Stock <span className="text-[#86E372]">Tracking</span> Software
          </h2>
          <p className="leading-normal md:leading-relaxed lg:leading-loose px-4 md:px-6 text-lg lg:pl-16 xl:pl-8 lg:pr-0 xl:pr-14 text-center lg:text-left mt-4 md:text-lg tracking-tight md:tracking-wide lg:tracking-widest text-blueGray-500">
            Our inventory management system makes it easy to track your stock level, track sales, and make informed business decisions.
          </p>
          <div className="lg:pl-16 xl:pl-8 mt-3 md:mt-6 lg:mt-2 lg:pb-3 xl:p-3 text-center lg:text-left">
            <button disabled={userData.length !== 0} onClick={() => { navigate('/signinsignup') }} className="tracking-tight md:tracking-wide lg:tracking-widest get-started text-white font-semibold py-[0.6rem] px-5 sm:px-6 sm:py-3 rounded-full outline-transparent focus:outline-none bg-[#46148B] active:bg-lightBlue-600 uppercase text-xs sm:text-sm ease-linear transition-all duration-150">
              Get started
            </button>
          </div>
        </div>
        <div className="h-full lg:hidden flex justify-between items-center">
          <img
            className='lg:hidden md:w-[40rem] md:mt-10 mt-5'
            src={HeroMobile} alt="..." />
        </div>
        <animated.img
          className="hidden lg:block xl:w-[70%] xl:pt-10 absolute -right-4 sm:-right-10 lg:-bottom-10 sm:bottom-0 lg:static rotate-12 lg:rotate-0"
          src={Hero}
          style={imageAnimation}
          onLoad={() => setLoaded(true)}
          alt="..."
        />
      </div>
      <div className="hidden lg:block lg:absolute z-30 lg:right-[42%] xl:right-[36%] lg:-bottom-6">
        <img src={HeroDrown} alt="..." />
      </div>
    </section>
  );
};

export default HeroSection;
