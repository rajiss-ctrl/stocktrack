import React from "react";
import {
  FaEdit,
  FaHome,
  FaShopware,
  FaSignOutAlt,
  FaStore,
} from "react-icons/fa";
import {
  RiEditBoxFill,
  RiHome2Fill,
  RiLogoutBoxFill,
  RiLogoutCircleFill,
  RiLogoutCircleRFill,
  RiRefreshFill,
  RiStockFill,
  RiStockLine,
} from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const SidebarMenu = ({ item, open, handleBuzProfileEdit, handleLogout }) => {
  return (
    <div className="text-[1.3rem] less_sm:text-[1rem] mt-8 ">
      <div className="inline-flex">
        <img
          className={`${
            open && "rotate-[360deg]"
          } duration-500 block float-left mr-2 w-[2em] h-[2em] rounded-full`}
          src={item?.logo}
          alt=""
        />

        <p
          className={`${
            open && "scale-0"
          } duration-300 text-white text-lg sm:text-2xl font-[400]`}
        >
          {item?.businessName}
        </p>
      </div>
      <ul className="w-full  mt-[50px] justify-center flex flex-col">
        <li
          onClick={handleBuzProfileEdit}
          className="z-[10] mt-[15px] text-gray-300 text-sm cursor-pointer
                      hover:bg-light-white hover:rounded-md p-2"
        >
          <button
            className={`flex font-[400] tracking-wide gap-[5px]
            justify-center items-center`}
          >
            <span className="text-center text-white ">
              <RiEditBoxFill className="text-2xl" />
            </span>
            <span className={`${open && "hidden"}`}>Edit Profile</span>
          </button>
        </li>

        <li className="z-[10] mt-[15px] text-gray-300 cursor-pointer hover:bg-light-white hover:rounded-md p-2 text-sm">
          <Link to="/">
            <div className="flex gap-[5px] items-center font-[400] tracking-wide">
              <span className="text-white less_sm:block">
                <RiHome2Fill className="text-2xl" />
              </span>
              <span className={`${open && "hidden"}`}>Home</span>
            </div>
          </Link>
        </li>

        <li
          className="z-[10] mt-[15px] text-gray-300 text-sm cursor-pointer
                    hover:bg-light-white hover:rounded-md p-2
                    "
        >
          <NavLink to="/stock">
            <div className="flex gap-[5px] items-center font-[400]">
              <span className=" text-white less_sm:block">
                <RiStockLine className="text-2xl" />
              </span>
              <span className={`${open && "hidden"}`}>Stock</span>
            </div>
          </NavLink>
        </li>

        <li
          className="z-[10] mt-[15px] text-gray-300 text-sm cursor-pointer 
                    hover:bg-light-white hover:rounded-md p-2
                    "
        >
          <div
            className="flex gap-[5px] items-center cursor-pointer
                          font-[400]
                          tracking-wide
                          "
          >
            <span className=" text-white less_sm:block">
              <RiRefreshFill className="text-2xl" />
            </span>
            <span className={`${open && "hidden"}`}>
              <NavLink to="/updatestock">Update Stock</NavLink>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
