import React, { useEffect,useState,  } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/IndexNavbar";
import Hero from "../assets/img/Hero2.png";
import HeroMobile from "../assets/img/hero-mobile.png";
import HeroDrown from "../assets/img/hero-drown.png";
import Drownfan from "../assets/img/drownfan.png";
import Parcels from "../assets/img/parcels.png";
import StockTrack from "../assets/img/stocktrack-ill.png";
import Dashboard from "../assets/video/dashboard-illustration.mp4";
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-react';
// import animationData from '../assets/Animation-box.json'
import animationData from '../assets/Animation-note.json'

 function Home() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    document.title = "StocTrack Home page"; // Set your desired page title here
  }, []); // This effect runs only once after the component mounts
  


  return (
    <>
      <Navbar fixed />
    
      <section className=" relative z-40 bg-[#F6F8F9] pt-16 pb-5 md:pb-24 lg:pb-0 md:pt-28 lg:pt-20 xl:pt-14 h-auto overflow-hidden">

      {/* <div className="hidden lg:block lg:absolute z-30 lg:right-[38%] xl:right-[36%] lg:top-36">
        <img src={HeroDrown} className="rotate-animation" alt="...."/>
      </div> */}
      <div className="hidden lg:block w-40 absolute lg:right-[25%]  lg:top-36 z-50">
        <Lottie animationData={animationData}/>
      </div>
        <div className="custom-bg w-full flex items-center justify-center flex-col lg:flex-row lg:justify-between">
            <div className="w-full xl:pl-20 sm:pt-0">
              <h2 className="tracking-tight md:tracking-wide lg:tracking-widest px-4 sm:px-0 pt-10 sm:pt-0 lg:pl-16 xl:pl-8  xl:pr-10 text-center lg:text-left text-[#46148B] font-bold text-[1.6rem] leading-[2rem]  sm:text-3xl md:text-6xl lg:text-4xl xl:text-5xl ">
              Stock <span className="text-[#86E372]">Tracking</span> Software
              </h2>
              <p className="leading-normal md:leading-relaxed lg:leading-loose  px-4 md:px-6 text-lg lg:pl-16 xl:pl-8 lg:pr-0 xl:pr-14 text-center lg:text-left mt-4 md:text-lg tracking-tight md:tracking-wide lg:tracking-widest text-blueGray-500">
                Our inventory management system makes it easy to track your stock level, track sales, and make informed business decisions.
              </p>
                <div className="lg:pl-16 xl:pl-8 mt-3 md:mt-6 lg:mt-2 lg:pb-3 xl:p-3 text-center lg:text-left">
                  <button onClick={()=>{navigate('/signinsignout')}} className="tracking-tight md:tracking-wide lg:tracking-widest get-started text-white font-semibold py-[0.6rem] px-5  sm:px-6  sm:py-3 rounded-full outline-none focus:outline-none bg-[#46148B] active:bg-lightBlue-600 uppercase text-xs sm:text-sm  ease-linear transition-all duration-150">
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
            <img src={HeroDrown} alt="...."/>
          </div>
      </section>
      
      <section className="w-full text-sm sm:text-xl text-[#7b7b7b]  md:py-24 py-14 flex flex-col justify-center items-center bg-white relative z-10">
          <h2 className="font-bold tracking-tight md:tracking-wide lg:tracking-widest text-center text-lg sm:2xl pb-5 px-6 md:px-44">Elevate Efficiency: Redefine <span className="text-[#86E372] font-bold">Inventory Management</span> Now!</h2>
          <div className="relative flex flex-col justify-center items-center">
            <img className="absolute z-10 left-6 md:left-16 -bottom-5 md:-bottom-16 w-[25%]" src={Parcels} alt="..." />
          {/* Video */}
          <video
            className="w-[75%] sm:w-[65%] shadow-lg mt-5 h-auto"
            autoPlay
            loop
            muted
            playsInline
            src={Dashboard}
          ></video>
          <div className="absolute -z-0 -bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FEBC1F] h-1 sm:h-3 w-[75%] sm:w-[65%]"></div>
          <div className="absolute -z-0 -bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#DEDFFB] h-1 sm:h-3 w-[75%] sm:w-[65%]"></div>
        </div>
      </section>
      <section className="relative  flex flex-col md:h-[700px] md:flex-row justify-center md:justify-between items-center  bg-[#fafafa] py-14 px-4 md:p-4 lg:p-5 xl:p-10">
      <div className="hidden lg:block lg:absolute z-30 lg:right-[42%] xl:right-[36%] lg:top-14">
        <img src={Drownfan} className="rotate-animation-drownfan" alt="...."/>
      </div>
        <div className="w-full md:w-[50%] ">
          <img src={StockTrack} className="w-full" alt="laptop and mobile" />
        </div>
        <div className="w-full md:w-[50%] ">
         <h3 className="tracking-tight md:tracking-wide lg:tracking-widest text-lg pt-7 sm:pt-0 lg:text-xl  font-bold  text-[#252525]">StockTrack: Empowering Your Inventory Management Effortlessly</h3>
          <p className="tracking-tight md:tracking-wide lg:tracking-widest text-sm pt-2  md:text-base">Revolutionize your inventory control with our state-of-the-art Dashboard. Seamlessly manage stock, track movements, and make informed decisions. A user-friendly interface following the best industrial practices for unparalleled efficiency and success.</p>
        </div>
      </section>



      <Footer />
    </>
  );
}
export default Home