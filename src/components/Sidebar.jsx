import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaStore,
  FaEdit,
  FaSignOutAlt,
  FaArrowCircleLeft,
  FaAddressCard,
  FaAddressBook,
  FaRegAddressBook,
  FaRegAddressCard,
  FaSearchLocation,
  FaHome,
  FaShopware,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../db/firebase";

const Sidebar = ({ item, toggle, isVisible, handleBuzProfileEdit }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-[100%] mt-[20px]">
      <div
        onClick={toggle}
        className={`${
          isVisible ? "hidden" : "block"
        } text-[#ffffff] fixed top-[5px] 
        left-[98px] less_sm:left-[158px] 
        text-[18px] z-[8] block md:hidden shadow `}
      >
        <FaArrowCircleLeft />
      </div>
      <div className="text-center font-[800] tracking-wide text-[18px] less_sm:text-[28px] text-[#ffffff] px-[8px]">
        {item?.businessName}
      </div>
      <div className="w-[100%]  text-center justify-center items-center flex flex-col">
        <div className="w-[70px] md:w-[150px] h-[70px] md:h-[150px] md:shadow justify-center items-center flex rounded-[50%]">
          <img
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] drop-shadow-[7px_5px_3px_#FFFFFF] rounded-[50%]"
            src={item?.logo}
            alt=""
          />
        </div>

        <h1 className="text-white font-[400] tracking-wide text-center mt-2 w-[100%] less_sm:px-[6px]  less_sm:text-[18px]">
          {item?.businessAddress}
        </h1>
      </div>
      <ul className="w-[100%] less_sm:text-[18px] px-[8px] md:px-[25px] mt-[50px] justify-center flex flex-col">
        <li
          onClick={handleBuzProfileEdit}
          className="z-[10] mt-[15px] text-[#ffffff] 
                      less_sm:text-[18px]
                      hover:text-[#e0d7d7]"
        >
          <button className="flex font-[400] tracking-wide gap-[5px] justify-center less_sm:text-[18px] items-center">
            <span className="hidden text-green-300 md:block">
              <FaEdit />
            </span>
            <span>Edit Profile</span>
          </button>
        </li>
        <li
          className="z-[10] mt-[15px] text-[#ffffff] 
                    hover:text-[#e0d7d7]
                    less_sm:text-[18px]
                    "
        >
          <div
            className="flex gap-[5px] items-center 
                          font-[400]
                          less_sm:text-[18px]
                          tracking-wide
                          "
          >
            <span className="hidden text-green-300 less_sm:block">
              <FaStore />
            </span>
            <NavLink to="/stock">Stock</NavLink>
          </div>
        </li>
        <li
          className="z-[10] mt-[15px] text-[#ffffff] 
                    hover:text-[#e0d7d7]
                    less_sm:text-[18px]
                    "
        >
          <div
            className="flex gap-[5px] items-center 
                          font-[400]
                          less_sm:text-[18px]
                          tracking-wide
                          "
          >
            <span className="hidden text-green-300 less_sm:block">
              <FaHome />
            </span>
            <NavLink to="/">Home</NavLink>
          </div>
        </li>
        <li
          className="z-[10] mt-[15px] text-[#ffffff] 
                    hover:text-[#e0d7d7]
                    less_sm:text-[18px]
                    "
        >
          <div
            className="flex gap-[5px] items-center 
                          font-[400]
                          less_sm:text-[18px]
                          tracking-wide
                          "
          >
            <span className="hidden text-green-300 less_sm:block">
              <FaShopware />
            </span>
            <NavLink to="/">Update Stock</NavLink>
          </div>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="less_sm:text-[18px] px-[8px] md:px-[25px] m-[80px_0_15px_0] lg:m-[150px_0_20px_0] z-[10] text-[#ffffff] hover:text-[#e0d7d7]"
      >
        <div className="flex font-[400] tracking-wide gap-[5px] items-center">
          <span className="hidden text-[red] less_sm:block">
            <FaSignOutAlt />
          </span>
          <NavLink to="/stock">log Out</NavLink>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
