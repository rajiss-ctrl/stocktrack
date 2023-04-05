import React from "react";
import login from "../assets/images/login.svg";
import SignUp from "./pages-components/SignUp";
import LogIn from "./pages-components/LogIn";
import { useToggle } from "../custom-hooks/useToggle";

const Home = () => {
  const [isVisible, toggle] = useToggle();

  return (
    <div className="w-[100%] mt-[50px] px-[0] md:px-[128px] flex flex-col justify-center items-center">
      <div className=" lg:px-[120px] w-[100%] ">
        <h1 className="text-center px-[15px] md:px-[0] text-[20px] md:text-[30px] mb-[0] md:mb-[25px]">
          Take Control of Your Inventory with Ease - Streamline Your Business
          with Our Stock Control App
        </h1>

        <div className="flex flex-col md:flex-row md:justify-between w-[100%] mt-[50px] md:mt-[100px]">
          <div className="w-[100%] md:w-[55%] flex items-center">
            <div className=" ">
              <h2 className="text-[rgb(255,_101,_132)] text-[18px] px-[15px] md:px-[0] md:text-[24px] font-[Kumbh Sans, sans-serif]">
                {" "}
                Are you tired of constantly struggling with inventory tracking,
                stock levels, and supply chain management?
              </h2>
              <p className="text-[#343534] mt-[20px] text-[15px] md:text-[17px] px-[15px] md:p-[0_20%_0_0]  font-[Kumbh Sans, sans-serif]">
                Are you constantly worried about stockouts, overstocking, or
                slow-moving items affecting your business performance? Our{" "}
                <span className="text-[rgb(255,_101,_132)]">
                  stock control app
                </span>{" "}
                is the solution you've been searching for!
              </p>
            </div>
          </div>
          <div className=" w-[100%] md:w-[40%] p-[15px] md:p-[0] grid content-center mt-[20px] md:mt-[0]">
            <img className="w-[100%]" src={login} alt="" />
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center">
          {!isVisible ? <LogIn /> : <SignUp />}
          <button onClick={toggle} className="mt-[15px]">
            {isVisible ? (
              <p>
                Already registered? <span className="text-[blue]">Log In!</span>{" "}
              </p>
            ) : (
              <p>
                Don't have account?{" "}
                <span className="text-[blue]">Sign Up!</span>
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
