import Dashboard from "../../assets/video/dashboard-illustration.mp4";
import Lottie from 'lottie-react';
// import animationData from '../assets/Animation-box.json'
import animationData from '../../assets/Animation-note.json'

const DashboardDescription = () => {
  return (
    <section className="w-full text-sm sm:text-xl text-[#7b7b7b]  md:py-40 py-20 flex flex-col justify-center items-center bg-white relative z-10">
    <h2 className="font-extrabold tracking-tight md:tracking-wide lg:tracking-widest text-center text-lg sm:2xl pb-5 px-6 md:px-44">Elevate Efficiency: Redefine <span className="text-[#86E372] font-bold">Inventory Management</span> Now!</h2>
    <div className="relative flex flex-col justify-center items-center">
      {/* <img className="absolute z-10 left-6 md:left-16 -bottom-5 md:-bottom-16 w-[25%]" src={Parcels} alt="..." /> */}
      <Lottie className="absolute z-10 left-6 md:left-16 -bottom-5 md:-bottom-16 w-[25%]" animationData={animationData}/>
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
  )
}

export default DashboardDescription
