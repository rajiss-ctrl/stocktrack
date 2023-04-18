// import React from 'react'
import { FaStore, FaOpencart, FaTimes, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useSelector } from "react-redux";
import { useToggle } from "../custom-hooks/useToggle";

const NavBar = () => {
  const user = useSelector((store) => store.user.user);
  const [isVisible, toggle] = useToggle();
  //style={({isActive})=> isActive ? {borderBottom:'2px solid red'} : {borderBottom:'none'} }
  return (
    <nav
      className="static z-[20px] overflow-hidden 
    mx-[0] less_sm:mx-[50px] lg:mx-[128px] 
    bg-[#FFFFFF] border-b-[2px] border-[#e5e7eb] "
    >
      <div
        className={`${
          isVisible ? "h-[200px]" : "h-[auto]"
        } relative md:static  flex md:items-center  font-[400]
        justify-between px-[16px] py-[5px] sm:py-[0]`}
      >
        <NavLink to="/">
          <div className="pt-[12.6px] less_sm:pt-[0]">
            <img
              className="w-[100px] less_sm:w-[150px]"
              src={Logo}
              alt="logo"
            />
          </div>
        </NavLink>

        <ul
          className={`${
            isVisible ? "block" : "hidden"
          } ' w-[100%] md:w-[auto] px-[15px] md:px-[0] 
          absolute md:static left-[0px] top-[50px] 
           md:flex md:justify-center items-center  
            sm:gap-[0] md:gap-[20px]  text-[#919491] `}
        >
          <li
            className="list-[none] less_sm:text-[18px] 
           w-[100%] md:w-[auto] border-b-4 border-[transparent]
            hover:border-b-[1.5px] md:hover:border-b-4 
            hover:border-[rgb(255,_101,_132)] hover:text-[#0e0f0e] 
            py-[6px] md:py-[24px]"
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            className="list-[none] less_sm:text-[18px] 
          w-[100%] md:w-[auto] border-b-4 border-[transparent] 
          hover:border-b-[1.5px] md:hover:border-b-4 
          hover:border-[rgb(255,_101,_132)] hover:text-[#0e0f0e] 
          py-[6px] md:py-[24px]"
          >
            {user.id ? (
              <NavLink to="/updatestock">Update Store</NavLink>
            ) : (
              <a href="#login" className="less_sm:text-[18px]">
                Sign Up
              </a>
            )}
          </li>
          <li
            className="list-[none]  less_sm:text-[18px]
          w-[100%] md:w-[auto] border-b-4 border-[transparent] 
          hover:border-b-[1.5px] md:hover:border-b-4 
          hover:border-[rgb(255,_101,_132)] hover:text-[#0e0f0e] 
          py-[6px] md:py-[24px]"
          >
            {user.id ? (
              <NavLink to="/dashboard">Dashboard</NavLink>
            ) : (
              <a href="#login" className="less_sm:text-[18px]">
                SignIn
              </a>
            )}
          </li>
        </ul>
        <div className="flex h-[40px] md:h-[auto] items-center gap-[18px]">
          <div className="cursor-[pointer] text-[20px] less_sm:text-[30px] text-[rgb(255,_101,_132)]">
            <NavLink to="/dashboard">
              <FaStore />
            </NavLink>
          </div>
          <div
            className="cursor-[pointer] text-[20px] 
          less_sm:text-[30px] text-[#b0f328]"
          >
            <FaOpencart />
          </div>
        </div>
        <div
          className="border-[1px]  h-[35px] w-[35px] 
        rounded-[50%] text-[#999999] md:hidden 
        md:h-[auto] flex items-center justify-center"
        >
          <div
            onClick={toggle}
            className={`${
              isVisible ? "block" : "hidden"
            } font-[400] text-[17px]`}
          >
            <FaTimes />
          </div>
          <div
            onClick={toggle}
            className={`${
              isVisible ? "hidden" : "block"
            } font-[400] text-[17px]`}
          >
            <FaBars />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
