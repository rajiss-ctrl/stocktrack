import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShopware, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import Logo from "../assets/images/default-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../db/firebase";
import { useSelector } from "react-redux";
import SidebarMenu from "./SidebarMenu";
import { RiHome2Fill, RiLogoutCircleFill } from "react-icons/ri";

const Sidebar = ({ handleBuzProfileEdit, handleOpen, open, setOpen }) => {
  const buzData = useSelector((store) => store.buz.buzProfileData);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [info, setInfo] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`${!open && "duration-300 "}  px-4 relative  bg-dark-purple`}
    >
      <div
        onClick={handleOpen}
        className={` cursor-pointer 
           z-[90] -right-[1.2rem] md:-right-3 absolute top-8 shadow `}
      >
        <BsArrowLeftShort
          className={`bg-white ${
            open && "rotate-180"
          } text-3xl rounded-full border border-dark-purple text-dark-purple`}
        />
      </div>
      <div
        className={`${
          !open ? "w-full" : "hidden md:block"
        }   bg-dark-purple h-[100%]`}
      >
        {buzData.length === 0 ? (
          <div className="w-[100%] flex flex-col items-center ">
            <Link to="businessprofile">
              <div
                onMouseEnter={() => {
                  setInfo(!info);
                }}
                className="relative mt-6  flex justify-center items-center"
              >
                <img
                  className={` ${
                    !open
                      ? "md:w-[100px] md:h-[100px]"
                      : "md:w-[50px]  md:h-[50px]"
                  } drop-shadow-[7px_5px_3px_#111] w-[60px] h-[60px]  rounded-[50%]`}
                  src={Logo}
                  alt="profile"
                />

                <p
                  className={`${!info ? "block" : "hidden"} ${
                    open ? "hidden" : "block"
                  } text-center text-[11px] border-4 border-l-[yellow] p-[6px] rounded-tl-[20px] rounded-br-[40px] bg-[#002c12] absolute top-[50px] z-[10] left-[10px] text-[#ffffff] `}
                >
                  Click to update buz Profile
                </p>
              </div>
            </Link>

            <ul className="w-full mt-[70px]">
              <li className="  z-[10]  text-gray-300 cursor-pointer hover:bg-light-white hover:rounded-md p-2 text-sm">
                <Link to="/">
                  <div className=" flex gap-[5px] text-white items-center font-[400] tracking-wide">
                    <span className=" less_sm:block">
                      <RiHome2Fill className="text-2xl" />
                    </span>
                    <span className={`${open && "hidden"}`}>Home</span>
                  </div>
                </Link>
              </li>
              <li className=" z-[10]  text-gray-300 cursor-pointer hover:bg-light-white hover:rounded-md p-2 text-sm">
                <Link to="/updatestock">
                  <div className=" flex gap-[5px] text-white items-center font-[400] tracking-wide">
                    <span className=" less_sm:block">
                      <FaShopware className="text-2xl" />
                    </span>
                    <span className={`${open && "hidden"}`}>Update Stock</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          buzData.map((item) => {
            return (
              <div key={item.id} className="w-full flex flex-col">
                <SidebarMenu
                  item={item}
                  open={open}
                  user={user}
                  handleBuzProfileEdit={handleBuzProfileEdit}
                  handleLogout={handleLogout}
                />
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={handleLogout}
        className=" m-[80px_0_15px_0] lg:m-[150px_0_20px_0] z-[10] hover:bg-light-white hover:rounded-md p-2 text-gray-300 hover:text-[#e0d7d7] w-full text-sm"
      >
        <div className="flex gap-[5px] items-center">
          <RiLogoutCircleFill className="text-2xl text-[#fd3e3e] bg-transparent" />
          <span className={`${open && "hidden"}`}>
            <NavLink to="/stock">Log Out</NavLink>
          </span>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
