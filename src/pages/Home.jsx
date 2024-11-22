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
    <>
      <Navbar fixed />
      <HeroSection/>
      <DashboardDescription/> 
      <DeviceDesc/>  
      <Footer />
    </>
  );
}
export default Home