import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/stocktrack-logo.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { logOut } from "../../db/firebase";

export default function Sidebar({ handleRestock }) {
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
      <nav className="fixed top-0 left-0 w-full md:w-1/5 md:h-[87%] bg-gradient-to-b from-[#440C88] via-[#8e68bd] to-purple-500 text-white shadow-xl flex flex-col items-start px-6 py-2 md:py-4 overflow-y-auto z-20">
  <div className="flex justify-between items-center w-full md:mb-6">
    <Link to="/" className="hidden md:block">
      <img src={Logo} alt="stocktrack" className="w-20" />
    </Link>
    <button
  className="md:hidden text-white  py-1"
  type="button"
  onClick={() =>
    setCollapseShow(collapseShow === "hidden" ? "block" : "hidden")
  }
>
  <i className="fas fa-bars"></i>
</button>

  </div>
  <div className={`md:block ${collapseShow} w-full`}>
    <ul className="flex flex-col space-y-4">
      <li>
        <Link
          to="/"
          className="text-sm font-semibold flex items-center gap-2 hover:text-yellow-300"
        >
          <i className="fas fa-home"></i> Home
        </Link>
      </li>
      <li
        onClick={handleRestock}
        className="text-sm font-semibold flex items-center gap-2 cursor-pointer hover:text-yellow-300"
      >
        <i className="fas fa-cogs"></i> New Item
      </li>
      <li>
        <Link
          to="/inventorytable"
          className="text-sm font-semibold flex items-center gap-2 hover:text-yellow-300"
        >
          <i className="fas fa-table"></i> Tables
        </Link>
      </li>
    </ul>
    <hr className="my-6 border-gray-300 opacity-40" />
    <ul className="flex flex-col space-y-4">
      <li>
        <Link
          to="/businessprofile"
          className="text-sm font-semibold flex items-center gap-2 hover:text-yellow-300"
        >
          <i className="fas fa-user-circle"></i> Profile
        </Link>
      </li>
    </ul>
    <hr className="my-6 border-gray-300 opacity-40" />
    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="text-yellow-400 text-sm font-semibold flex items-center gap-2 hover:text-yellow-300 pb-6 md:pb-0"
    >
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  </div>
</nav>

    </>
  );
}
