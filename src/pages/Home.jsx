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
    <div className="bg-dark-purple  overflow-hidden">
      <NavBar />
      <div className=" w-full relative">
        <div className=" w-full  flex  items-center flex-col min-h-[400px]">
          <div className="container mx-auto px-4 pt-[3rem] less_sm:pt-14  md:pt-16 lg:pt-32">
            <h1 className="text-2xl less_sm:text-[2.5rem]  md:text-5xl font-bold text-center text-[rgb(247,_193,_0)] mb-6">
              Inventory Management System
            </h1>
            <p className="less_sm:text-[1.2rem] text-center px-4 md:px-[20%] text-[#FFFFFF] font-[400]">
              Our inventory management system makes it easy to track your stock
              level, track sales, and make informed business decisions.
            </p>
          </div>
        </div>

        <div className="w-[90%] less_sm:w-[80%] absolute  top-[38%] less_sm:top-[35%]  sm:top-[37%] less_md:top-[33%]  md:top-[36%] lg:top-[38%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[30] bg-[#FFFFFF] rounded-xl shadow-xl h-auto md:min-h-[400px]">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-[50%] flex items-center justify-center mb-8 lg:mb-0">
                <img src={Parcels} alt="Inventory" className="w-[65%] h-auto" />
              </div>
              <div className="lg:w-1/2">
                <ul className="list-none list-inside font-[500] text-[rgb(17,_29,_51)] text-[1rem] mb-4 ">
                  <li className="flex space-x-2  ">
                    <FaLevelUpAlt className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Track inventory levels in real-time</span>
                  </li>
                  <li className="flex space-x-2">
                    <FaBell className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Set low-stock alerts</span>
                  </li>
                  <li className="flex space-x-2">
                    <FaProductHunt className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Manage purchase orders</span>
                  </li>
                  <li className="flex space-x-2">
                    <FaRecordVinyl className="text-[rgb(158,_169,_201)]" />{" "}
                    <span>Track sales and revenue</span>
                  </li>
                  <li className="flex space-x-2">
                    <FaRecordVinyl className="text-[rgb(158,_169,_201)]" />
                    <span>Generate reports and analytics</span>
                  </li>
                </ul>
                <a href="#signup">
                  <button className="m-auto bg-dark-purple hover:bg-dark-purp-hover text-white text-lg py-2 px-8 rounded-lg">
                    Get Started
                  </button>
                </a>

                {/* <a
                  href="#signup"
                  className=" font- py-2 px-4 rounded
                              bg-dark-purp-hover text-white
                              hover:bg-[#6d80be]
                              duration-300
                              "
                >
                  Get Started
                </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <div className=" flex flex-col items-center justify-center less_md:flex-col tab:flex-col laptop:flex-row h-[100%] less_md:pt-[30rem] pt-[26rem] less_sm:p-[34rem_0_6rem_0] md:p-[36rem_0_6rem_0] lg:p-[24rem_0_8rem_0] less_md:w-full  w-full bg-[#FFFFFF]">
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
              className="outline-none border-0 my-[15px]"
            >
              {isVisible ? (
                <p className="pl-[20px] less_sm:pl-[48px] font-[400]">
                  Already registered?{" "}
                  <span className="text-[blue]">Log In!</span>{" "}
                </p>
              ) : (
                <p className="pl-[20px] less_sm:pl-[48px]">
                  Don't have account?
                  <span className="text-[blue]">Sign Up!</span>
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
