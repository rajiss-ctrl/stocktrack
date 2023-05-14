import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center min-[100vh]">
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
