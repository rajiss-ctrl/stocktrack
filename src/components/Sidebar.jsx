import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarMenu from "./SidebarMenu";
import { RiLogoutCircleFill } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth, logOut, useAuth } from "../db/firebase";

const Sidebar = ({ handleBuzProfileEdit, handleOpen, open, setOpen }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [info, setInfo] = useState(false);
  console.log(user);
  const currentUser = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={`${!open && "duration-300"}  px-4 relative h-full `}>
      <SidebarMenu
        info={info}
        setInfo={setInfo}
        open={open}
        user={user}
        handleBuzProfileEdit={handleBuzProfileEdit}
      />

      <button
        onClick={handleLogout}
        className={` ${
          open ? "hidden lg:block lg:w-[50%]" : "lg:w-[80%]"
        } absolute bottom-16  z-[10] hover:bg-light-white hover:rounded-md p-2 hover:text-[#e0d7d7]  h-40px bg-gradient-to-r from-gray to-[red] bg-clip  text-md`}
      >
        <div className="flex gap-4 items-center ">
          <RiLogoutCircleFill className="text-2xl text-[#fd3e3e] bg-transparent" />
          <span className={`${open && "hidden"} text-[red] font-[800]`}>
            <span>Log Out</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
