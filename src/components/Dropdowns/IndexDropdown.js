import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import '@fortawesome/fontawesome-free/css/all.css';

const IndexDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  // const btnDropdownRef = React.createRef();
  // const popoverDropdownRef = React.createRef();
  const handlePop = () => {
    // createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
    //   placement: "bottom-start",
    // });
    setDropdownPopoverShow(pre=>!pre);
  };
  // const closeDropdownPopover = () => {
  //   setDropdownPopoverShow(false);
  // };
  return (
    <>
      <button
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase outline-none border-0 font-bold"
        // href="#pablo"
        // ref={btnDropdownRef}
        onClick={handlePop}
      >
        <i
          className={
            "fas fa-caret-down mr-2 text-sm " 
          }
        ></i>
      </button>
      <div
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 absolute top-4 py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Admin Layout
        </span>
        <Link
          to="/dashboardtest"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Dashboardtest
        </Link>
        <Link
          to="/admin/settings"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Settings
        </Link>
        <Link
          to="/admin/tables"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Tables
        </Link>
        <Link
          to="/admin/maps"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Maps
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Auth Layout
        </span>
        <Link
          to="/auth/login"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Register
        </Link>
        <Link
          to="/auth/register"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Log out
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          No Layout
        </span>
        <Link
          to="/landing"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Landing
        </Link>
        <Link
          to="/profile"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Profile
        </Link>
      </div>
    </>
  );
};

export default IndexDropdown;
