import React from "react";

import {
  RiEditBoxFill,
  RiHome2Fill,
  RiRefreshFill,
  RiStore2Line,
} from "react-icons/ri";

import Logo from "../assets/images/default-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../db/firebase";

const SidebarMenu = ({ open, info, setInfo, handleBuzProfileEdit }) => {
  const buzData = useSelector((store) => store.buz.buzProfileData);
  console.log(buzData);

  return (
    <div
      className={`${
        open && "hidden lg:block"
      } text-[1.3rem] less_sm:text-[1rem] mt-8 duration-300`}
    >
      {buzData.length === 0 ? (
        <div className="min-h-[200px] ">
          <Link to="businessprofile">
            <div
              onMouseEnter={() => {
                setInfo(!info);
              }}
              className="relative mt-6  flex justify-center items-center "
            >
              <img
                className={` ${
                  !open
                    ? "md:w-[100px]  md:h-[100px]"
                    : "md:w-[50px]  md:h-[50px] mt-6"
                }   drop-shadow-[7px_5px_3px_#111] w-[60px] h-[60px]  rounded-[50%]`}
                src={Logo}
                alt="profile"
              />

              <p
                className={`${!info ? "block" : "hidden"} ${
                  open ? "hidden" : "block"
                } text-center text-xs border-4 border-l-[yellow] p-[6px_12px_6px_6px] rounded-tl-[20px] rounded-br-[40px] bg-[#002c12] absolute top-[50px] z-[10] left-[10px] text-[#ffffff] `}
              >
                Click to update biz Profile
              </p>
            </div>
          </Link>

          <ul className="w-full  mt-[50px] justify-center flex flex-col">
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
      ) : (
        buzData.map((item) => {
          return (
            <div className="">
              <div className="inline-flex items-center">
                <img
                  className={`${
                    open && "hidden sm:block rotate-[360deg]"
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
                        <RiStore2Line className="text-2xl" />
                      </span>
                      <span className={`${open && "hidden"}`}>Store</span>
                    </div>
                  </NavLink>
                </li>

                <li
                  className="z-[10] mt-[15px] text-gray-300 text-sm cursor-pointer
                    hover:bg-light-white hover:rounded-md p-2
                    "
                >
                  <NavLink to="/updatestock">
                    <div className="flex gap-[5px] items-center font-[400]">
                      <span className=" text-white less_sm:block">
                        <RiRefreshFill className="text-2xl" />
                      </span>
                      <span className={`${open && "hidden"}`}>
                        Update Stock
                      </span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SidebarMenu;
