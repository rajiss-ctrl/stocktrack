// import React from 'react'
import { FaStore, FaOpencart, FaTimes, FaBars } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/stock.jpg";
import { useSelector } from "react-redux";
import { useToggle } from "../custom-hooks/useToggle";

const NavBar = () => {
  const user = useSelector((store) => store.user.user);
  const [isVisible, toggle] = useToggle();
  //style={({isActive})=> isActive ? {borderBottom:'2px solid red'} : {borderBottom:'none'} }
  return (
    <nav
      className="static z-[20px] overflow-hidden top-0 
    bg-transparent px-[20px] less_sm:px-10"
    >
      <div
        className={`${
          isVisible ? "h-[200px]" : "h-[auto]"
        } relative md:static  flex md:items-center  font-[400]
        justify-between py-[5px] sm:py-[0] rounded-full shadow-lg`}
      >
        <NavLink to="/">
          <div className="pt-[12.6px] less_sm:pt-[0]">
            <img className="w-[50px] less_sm:w-[70px]" src={Logo} alt="logo" />
          </div>
        </NavLink>

        <ul
          className={`${isVisible ? "block" : "hidden"} ' w-[100%] md:w-[auto] 
          absolute md:static left-[0px] top-[50px] 
           md:flex md:justify-center items-center  
            sm:gap-[0] md:gap-[20px]  text-[#FFFFFF] `}
        >
          <li
            className="list-[none]  less_sm:text-[18px]
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
          md:hover:border-b-4 
          md:hover:border-[#b0f328] md:hover:text-[#fff] 
          py-[6px] md:py-[24px]"
          >
            <NavLink to="/" className="font-[400] less_sm:text-[18px]">
              Home
            </NavLink>
          </li>
          <li
            className="list-[none]  less_sm:text-[18px]
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
          md:hover:border-b-4 
          md:hover:border-[#b0f328] md:hover:text-[#fff] 
          py-[6px] md:py-[24px]"
          >
            {user.id ? (
              <Link to="/updatestock">Update Store</Link>
            ) : (
              <a href="#login" className="less_sm:text-[18px]">
                Sign Up
              </a>
            )}
          </li>
          <li
            className="list-[none]  less_sm:text-[18px]
          w-[100%] md:w-[auto] md:border-b-4 md:border-[transparent] 
           md:hover:border-b-4 
          md:hover:border-[#b0f328] md:hover:text-[#fff] 
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
          <div className="cursor-[pointer] text-[20px] less_sm:text-[21px] text-[#FFFFFF]">
            <NavLink to="/dashboard">
              <RiDashboardFill />
            </NavLink>
          </div>
          <div
            className="cursor-[pointer] text-[20px] 
          less_sm:text-[21px] text-[#FFFFFF]"
          >
            <FaOpencart />
          </div>
        </div>
        <div
          className="  h-[35px] w-[35px] 
         text-[#999999] md:hidden 
        md:h-[auto] flex items-center justify-center"
        >
          <div
            onClick={toggle}
            className={`${
              isVisible ? "block" : "hidden"
            } font-[400] text-[17px] less_sm:text-[24px] cursor-pointer`}
          >
            <FaTimes />
          </div>
          <div
            onClick={toggle}
            className={`${
              isVisible ? "hidden" : "block"
            } font-[400] text-[17px] less_sm:text-[24px] cursor-pointer`}
          >
            <FaBars />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
