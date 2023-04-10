import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="flex flex-col less_sm:flex-row less_sm:justify-between mt-[50px] p-[20px] sm:p-[20px_60px] text-[#FFFFFF] w-[100%] min-h-[250px] bg-[black]">
      <Link to="/">
        <img
          className="w-[150px] h-[30px] sm:w-[200px] sm:h-[50px]"
          src={Logo}
          alt="logo"
        />
      </Link>

      <div className="flex gap-[10px] mt-[15px] less_sm:mt-[0] text-[12px] sm:text-[16px] font-['Kumbh Sans']">
        <a
          href="www.twitter.com/rajisanjo"
          className="cursor-pointer text-[16px] text-[#00a6ffe7] less_sm:text-[18px]"
        >
          <FaTwitter />
        </a>
        <a className="cursor-pointer text-[16px] text-[#FFFFFF] less_sm:text-[18px]">
          <FaGithub />
        </a>
        <a className="cursor-pointer text-[16px] w-[12px] h-[16px] text-[#325bf2e7] bg-[white] less_sm:text-[20px] w-[16px] h-[16px]">
          <FaLinkedin />
        </a>
        <a className="cursor-pointer text-[16px] w-[12px] h-[12px] rounded-[50%] bg-[white] text-[#00a6ffe7] less_sm:text-[20px] w-[20px] h-[20px]">
          <FaFacebook />
        </a>
      </div>

      <div className="w-[100%] mt-[15px] less_sm:mt-[0] text-[12px] sm:text-[16px] less_sm:w-[22%]">
        <p> Copyrighta 2023 rajiss-ctrl</p>
        <h1>Front-End Developer</h1>
        <ul className="w-[100%] font-['Kumbh Sans']">
          <li className="text-[#FFFFFF]">HTML</li>
          <li className="text-[#FFFFFF]">CSS</li>
          <li className="text-[#FFFFFF]">JavaScript</li>
          <li className="text-[#FFFFFF]">ReactJs</li>
        </ul>
      </div>

      <div className="font-['Kumbh Sans'] text-[12px] sm:text-[16px] mt-[15px] less_sm:mt-[0]">
        <h1>contacts</h1>
        <p>+234 703 8699 659</p>
      </div>
    </div>
  );
};

export default Footer;