import React, { useEffect } from "react";
import Parcels from "../assets/images/parcels.png";
import LadyStocker from "../assets/images/store-lady.png";

import NavBar from "../components/NavBar";
import SignUp from "./pages-components/SignUp";
import LogIn from "./pages-components/LogIn";
import {
  FaBell,
  FaLevelUpAlt,
  FaProductHunt,
  FaRecordVinyl,
} from "react-icons/fa";
import { useToggle } from "../custom-hooks/useToggle";
// import InventoryImage from './inventory.jpg';

function Home() {
  const [isVisible, toggle] = useToggle();
  useEffect(() => {}, [isVisible, toggle]);
  return (
    <div className=" bg-gradient-to-r from-dark-purple to-green-800 bg-clip  overflow-hidden">
      <NavBar />
      <div className=" w-full relative">
        <div className=" w-full  flex  items-center flex-col min-h-[480px]">
          <div className="container mx-auto px-4 pt-12 less_sm:pt-14  md:pt-16 lg:pt-32">
            <h1 className="bg-gradient-to-r from-amber-600 via-[rgb(247,_193,_0)] to-yellow-300 bg-clip-text text-transparent        text-2xl sm:text-4xl font-bold text-center mb-6">
              INVENTORY MANAGEMENT SYSTEM
            </h1>
            <p className=" text-center px-4  md:px-[20%]  text-[#FFFFFF] text-xl font-[200]">
              Our inventory management system makes it easy to track your stock
              level, track sales, and make informed business decisions.
            </p>
          </div>
        </div>

        <div className="w-[90%] less_sm:w-[80%] absolute  top-[40%] less_sm:top-[35%]  sm:top-[37%] less_md:top-[33%]  md:top-[36%] lg:top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[30] bg-[#FFFFFF] rounded-xl shadow-xl h-auto md:min-h-[400px]">
          <div className="container mx-auto px-4 ">
            <div className=" lg:pt-8 pb-10 lg:pb-0 flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-[50%] flex items-center justify-center mb-8 lg:mb-0">
                <img src={Parcels} alt="Inventory" className="w-[65%] h-auto" />
              </div>
              <div className="lg:w-1/2">
                <ul className="list-none list-inside font-[500] leading-6 sm:text-[1rem] text-black  mb-4 ">
                  <li className="flex items-center space-x-2  ">
                    <FaLevelUpAlt className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Track inventory levels in real-time</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaBell className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Set low-stock alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaProductHunt className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Manage purchase orders</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaRecordVinyl className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Track sales and revenue</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaRecordVinyl className="text-[rgb(158,_169,_201)]" />
                    <span>Generate reports and analytics</span>
                  </li>
                </ul>
                <a href="#signup">
                  <button className="m-auto bg-dark-purple hover:bg-dark-purp-hover text-white text-md py-2 px-4 rounded-lg">
                    Get Started
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="bg-[#FFFFFF] flex flex-col pt-[26rem] less_sm:p-[34rem_0_6rem_0] md:p-[36rem_0_6rem_0] lg:p-[24rem_0_8rem_0]">
          <h1 className="p-6 text-xl font-extrabold text-center bg-gradient-to-r from-black via-orange-400 to-green-900 bg-clip-text text-transparent">
            YOU A STEP FROM BEEN IN FULL CONTROL OF YOUR STOCK
          </h1>
          <div className=" flex flex-col items-center justify-center less_md:flex-col tab:flex-col laptop:flex-row   less_md:w-full  w-full ">
            <div className="w-full less_md:w-[100%] bg sm:w-[40%] md:w-[70%] lg:w-[40%] flex justify-center items-center relative">
              <div className="bg-[rgb(247,_193,_0)] bg  flex flex-col items-center justify-center  rounded-b-3xl w-[90%] less_sm:w-[70%] less_md:w-[90%] tab:h-[90%] md:w-[90%]">
                <img className="w-" src={LadyStocker} alt="" />
              </div>
            </div>
            <div
              id="signup"
              className="w-full sm:w-[40%] less_md:w-[90%] md:w-[90%] lg:w-[40%] bg-[#FFFFFF] font-[400]"
            >
              {!isVisible ? <LogIn /> : <SignUp />}
              <button
                onClick={toggle}
                className="outline-none  less_sm:px-[28px] border-0"
              >
                {isVisible ? (
                  <p className="pl-[20px] less_sm:pl-[48px] text-sm font-medium mb-12 lg:mb-0">
                    Already registered?{" "}
                    <span className=" text-[#0000ff]"> Log In!</span>{" "}
                  </p>
                ) : (
                  <p className="pl-[20px] less_sm:pl-[48px] text-sm font-medium mb-12 lg:mb-0">
                    Don't have account?
                    <span className="text-[blue]"> Sign Up!</span>
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
