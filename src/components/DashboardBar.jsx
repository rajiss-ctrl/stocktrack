import React from "react";
import { BsSearch } from "react-icons/bs";
import { FaBoxOpen, FaMoon, FaSearch } from "react-icons/fa";

function DashboardBar() {
  return (
    <div className="w-full bg-white rounded-[1.5rem] flex justify-between py-2 px-4 mt-6 shadow">
      <div className=" flex border-[red] border-[1px_solid] bg-[#f6f6f6] px-4 w-[40%]  md:w-[28%] h-[2.5rem] items-center rounded-[.8rem] gap-2">
        <input
          className="h-[100%]  w-[90%] bg-transparent outline-none border-none"
          type="text"
        />
        <div className="flex w-[10%] bg-transparent items-center justify-center">
          <span>
            <BsSearch />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <span>
          <FaMoon />
        </span>
        <span className="hidden md:block">
          <FaBoxOpen />
        </span>
      </div>
    </div>
  );
}

export default DashboardBar;
