import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="h-[100%]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
