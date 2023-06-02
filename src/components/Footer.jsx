import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="w-[100%] mt-[0] font-[200] bg-[#292828] text-sm">
      <div
        className="flex flex-col less_sm:flex-row 
                less_sm:justify-between mt-[50px]
                p-[15px] sm:p-[20px_45px] text-[#FFFFFF]"
      >
        <Link to="/">
          <div className="pt-[12.6px] less_sm:pt-[0]">
            <div className="text-white text-2xl shadow-lg  font-[400] sm:font-[600]">
              <h2>
                <span className="text-[rgb(247,_193,_0)]">S</span>tock
                <span className="text-[rgb(247,_193,_0)]">T</span>rack
              </h2>
            </div>
          </div>
        </Link>

        <div className="flex gap-[10px] mt-[15px] less_sm:mt-[0] text-[14px] sm:text-[16px] font-['Kumbh Sans']">
          <a
            href="https://www.twitter.com/rajisanjo"
            className="cursor-pointer text-sm text-[#00a6ffe7] less_sm:text-[18px]"
          >
            <FaTwitter />
          </a>
          <a className="cursor-pointer text-[20px] text-[#FFFFFF] less_sm:text-[18px]">
            <FaGithub />
          </a>
          <a className="cursor-pointer   text-[#325bf2e7] bg-[white] less_sm:text-[20px] w-[16px] h-[16px]">
            <FaLinkedin />
          </a>
          <a className="cursor-pointer  rounded-[50%] bg-[white] text-[#00a6ffe7] less_sm:text-[20px] w-[20px] h-[20px]">
            <FaFacebook />
          </a>
        </div>

        <div className="w-[100%] mt-[15px] less_sm:mt-[0] text-sm less_sm:w-[22%]">
          <p> Copyright 2023 rajiss-ctrl</p>
          <h1 className="text-sm sm:text-lg underline mt-2">
            Front-End Developer
          </h1>
          <ul className="w-[100%] text-white font-['Kumbh Sans']">
            <li>
              <p>HTML</p>
            </li>
            <li>
              <p>CSS</p>
            </li>
            <li>
              <p>JavaScript</p>
            </li>
            <li>
              <p>ReactJs</p>
            </li>
          </ul>
        </div>

        <div className="font-['Kumbh Sans'] text-xs sm:text-sm mt-[15px] less_sm:mt-[0]">
          <h1>Contacts</h1>
          <p>+234 703 8699 659</p>
        </div>
      </div>
      <p className=" p-[20px] underline   text-center text-[#cbcbcb]">
        StockTrack is an inventory management web App that can be used by
        companies and stores/shops alike.
      </p>
    </div>
  );
};

export default Footer;
