import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShopware, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";

import { signOut } from "firebase/auth";
import { auth } from "../db/firebase";
import { useSelector } from "react-redux";
import SidebarMenu from "./SidebarMenu";
import { RiLogoutCircleFill } from "react-icons/ri";

const Sidebar = ({ handleBuzProfileEdit, handleOpen, open, setOpen }) => {
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
    <div className={`${!open && "duration-300"}  px-4 relative `}>
      <SidebarMenu
        info={info}
        setInfo={setInfo}
        open={open}
        user={user}
        handleBuzProfileEdit={handleBuzProfileEdit}
        handleLogout={handleLogout}
      />

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
