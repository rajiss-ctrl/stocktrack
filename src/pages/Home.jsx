import React, { useEffect } from "react";

import NavBar from "../components/NavBar";

import { useToggle } from "../custom-hooks/useToggle";
import HeroSection from "./pages-components/HeroSection";
import HomeForms from "./pages-components/HomeForms";
function Home() {
  return (
    <div className=" bg-gradient-to-r from-dark-purple to-green-800 bg-clip  overflow-hidden">
      <NavBar />
      <div className=" w-full relative">
        <HeroSection />
        {/* form */}
        <HomeForms />
      </div>
    </div>
  );
}

export default Home;
