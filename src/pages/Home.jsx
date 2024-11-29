import React, { useEffect  } from "react";

import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/IndexNavbar";
import HeroSection from "./pages-components/HeroSection";
import DashboardDescription from "./pages-components/DashboardDescription";
import DeviceDesc from "./pages-components/DeviceDesc";

 function Home() {
  
  useEffect(() => {
    document.title = "StocTrack Home page";
  }, []);  


  return (
    <main className="bg-gradient-to-r from-[#6b39a8] via-indigo-500 to-purple-400">
      <Navbar fixed />
      <HeroSection/>
      <DashboardDescription/> 
      <DeviceDesc/>  
      <Footer />
    </main>
  );
}
export default Home