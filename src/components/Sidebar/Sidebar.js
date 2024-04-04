/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/img/stocktrack-logo.png'
import '@fortawesome/fontawesome-free/css/all.css';


import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import { logOut } from "../../db/firebase";
// import UserDropdown from "../Dropdowns/UserDropdown";
// import { useLocation } from 'react-router-dom';
// import { useSelector } from "react-redux";

export default function Sidebar({handleRestock, restock}) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  
  
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <nav className="tracking-tight md:tracking-wide lg:tracking-widest w-full top-0 left-0 md:w-auto md:left-0 md:h-[calc(100vh-80px)] md:block  md:top-0 md:bottom-0 md:overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between fixed  z-10 py-4 px-8"
      style={{
        WebkitScrollbar: 'width: 12px',
        WebkitScrollbarThumb: 'background-color: #3b82f6; border-radius: 6px',
        WebkitScrollbarTrack: 'background-color: #eff6ff; border-radius: 6px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#3b82f6 #eff6ff',
      }}
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="flex items-center gap-5 cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
            <Link
            className="md:hidden text-left md:pb-2 text-blueGray-600 mr-0  whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <img src={Logo} className="w-[80px]" alt='stocktrack'/>
          </Link>
            
          </button>
          {/* Brand */}
          <Link
            className="hidden md:block text-left md:pb-2 text-blueGray-600 mr-0  whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <img src={Logo} className="w-[80px]" alt='stocktrack'/>
          </Link>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full  md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap  justify-between ">
                {/* <div className="w-6/12">
                </div> */}
                 
                 <Link
                    className=" md:hidden text-left md:pb-2 text-blueGray-600 mr-0  whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    <img src={Logo} className="w-[80px]" alt='stocktrack'/>
                  </Link>
                
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                

              </div>
              

            </div>

            {/* Divider */}
            <hr className="hidden md:block my-4 md:min-w-full" />
            <ul className="md:flex-col text-slate-500 md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-semibold block hover:text-slate-400" 
                  }
                  to="/"
                >
                  <i
                    className={
                      "fas fa-home mr-2 text-sm " 
                    }
                  ></i>{" "}
                  Home
                </Link>
              </li>

              <li onClick={handleRestock} className="items-center text-xs uppercase py-3  cursor-pointer font-semibold block hover:text-slate-400">
                  <i
                    className={
                      "fas fa-cogs mr-2 text-sm " 
                    }
                  ></i>{" "}
                  New Item
              </li>
              

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-semibold block hover:text-slate-400"
                  }
                  to="/inventorytable"
                >
                  <i
                    className={
                      "fas fa-table mr-2 text-sm " 
                    }
                  ></i>{" "}
                  Tables
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="hidden md:block my-4 md:min-w-full" />
           
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center text-slate-500 hover:text-slate-400">
                <Link
                  className=" hover:text-blueGray-500 text-xs uppercase py-2 font-semibold block"
                  to="/businessprofile"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Profile
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className=" md:min-w-full" />

                <button onClick={handleLogout} className="text-[#FF0000] tracking-tight md:tracking-wide lg:tracking-widest flex mt-10 mb-6 md:mt-20 md:mb-4 md:min-w-full cursor-pointer text-xs items-center hover:text-slate-400" >
                  <i className="fas fa-fingerprint text-red-500 mr-2 text-xs "></i>{" "}
                  <span className=" text-xs uppercase hover:text-slate-400">Logout</span>
                </button>
             

            </div>
        </div>
      </nav>
    </>
  );
}
