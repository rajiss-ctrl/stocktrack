import React, { useEffect } from "react";
import LadyStocker from "../../assets/images/store-lady.png";
import SignUp from "../pages-components/SignUp";
import LogIn from "../pages-components/LogIn";
import { useToggle } from "../../custom-hooks/useToggle";
import { Link } from "react-router-dom";
const HomeForms = () => {
  const [isVisible, toggle] = useToggle();
  useEffect(() => {}, [isVisible, toggle]);
  return (
    <div className="bg-[#FFFFFF] flex flex-col pt-[26rem] less_sm:p-[34rem_0_6rem_0] md:p-[36rem_0_6rem_0] lg:p-[24rem_0_8rem_0]">
      <h1 className="p-6 text-xl font-extrabold text-center bg-gradient-to-r from-black via-orange-400 to-green-900 bg-clip-text text-transparent">
        YOU ARE A STEP FROM BEEN IN FULL CONTROL OF YOUR STOCK
      </h1>
      <div className=" flex flex-col items-center justify-center less_md:flex-col tab:flex-col laptop:flex-row   less_md:w-full  w-full ">
        <div className="w-full less_md:w-[100%] bg sm:w-[40%] md:w-[70%] lg:w-[35%] flex justify-center items-center relative">
          <div className="bg-[rgb(247,_193,_0)] bg  flex flex-col items-center justify-center  rounded-b-3xl w-[90%] less_sm:w-[70%] less_md:w-[90%] tab:h-[90%] md:w-[90%]">
            <img className="w-" src={LadyStocker} alt="" />
          </div>
        </div>
        <div
          id="signup"
          className="w-full  sm:w-[40%] less_md:w-[90%] md:w-[90%] lg:w-[45%] bg-[#FFFFFF] font-[400]"
        >
          {!isVisible ? <LogIn /> : <SignUp />}
          <button
            onClick={toggle}
            className="outline-none mt-12  less_sm:px-[28px] border-0"
          >
            {isVisible ? (
              <p className="pl-[20px] less_sm:pl-[48px] text-[1rem] font-[300] mb-12 lg:mb-0">
                Already registered?{" "}
                <span className=" text-[#0000ff]"> Log In!</span>{" "}
              </p>
            ) : (
              <div className=" flex flex-col sm:flex-row items-center sm:justify-between">
                <p className="pl-[20px] text-[1rem] font-[300]  mb-6 sm:mb-12 xl:mb-0">
                  Don't have account?
                  <span className="text-[blue]"> Sign Up!</span>
                </p>
                <p className="mb-12 text-[1rem] font-[300] xl:mb-0">
                  <Link className="-pl-10 sm:pl-5" to="/reset">
                    Forget Password?
                  </Link>
                </p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeForms;
