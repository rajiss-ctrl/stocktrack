import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShopware, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import Logo from "../assets/images/default-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../db/firebase";
import { useSelector } from "react-redux";
import SidebarMenu from "./SidebarMenu";

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
    <div className={`${!open && "duration-300"}  relative  bg-dark-purple`}>
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
                className="relative mt-8 flex justify-center items-center"
              >
                <img
                  className="drop-shadow-[7px_5px_3px_#111] w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-[50%]"
                  src={Logo}
                  alt="profile"
                />

                <p
                  className={`${
                    !info ? "block" : "hidden"
                  } text-center text-[11px] border-[10px] font-200 border-l-[yellow] p-[6px] rounded-tl-[20px] rounded-br-[40px] bg-[#002c12] absolute top-[50px] z-[10] left-[10px] text-[#ffffff] `}
                >
                  Click to update buz Profile
                </p>
              </div>
            </Link>

            <ul className="mt-[70px]">
              <li className="flex gap-[5px] text-white items-center">
                <span className="hidden text-green-300 less_sm:block">
                  <FaShopware />
                </span>
                <Link to="/updatestock">Update Stock</Link>
              </li>
              <li className="flex gap-[5px] text-white items-center">
                <span className="hidden text-green-300 less_sm:block">
                  <FaHome />
                </span>
                <Link to="/">Home</Link>
              </li>

              <li className="lg:m-[150px_0_20px_0]">
                <button
                  onClick={handleLogout}
                  className="less_sm:text-[18px] px-[8px] m-[80px_0_15px_0]  z-[10] text-[#ffffff] hover:text-[#e0d7d7]"
                >
                  <div className="flex font-[400] tracking-wide gap-[5px] items-center">
                    <span className="hidden text-[red] less_sm:block">
                      <FaSignOutAlt />
                    </span>
                    <Link to="/stock">log Out</Link>
                  </div>
                </button>
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
    </div>
  );
};

export default Sidebar;
