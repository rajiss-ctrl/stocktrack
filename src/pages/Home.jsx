import React, { useEffect,useState,  } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/IndexNavbar";
import Hero from "../assets/img/Hero2.png";
import HeroMobile from "../assets/img/hero-mobile.png";
import HeroDrown from "../assets/img/hero-drown.png";
import HeroGif from "../assets/img/herogif.gif";
import Drownfan from "../assets/img/drownfan.png";
import StockTrack from "../assets/img/stocktrack-ill.png";
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-react';
// import animationData from '../assets/Animation-box.json'
import animationData from '../assets/Animation-note.json'
import { useSelector } from "react-redux";
import HeroSection from "./pages-components/HeroSection";
import DashboardDescription from "./pages-components/DashboardDescription";
import DeviceDesc from "./pages-components/DeviceDesc";

 function Home() {
  const userData = useSelector((store) => store.buz.buzProfileData);
  const navigate = useNavigate()
  
  useEffect(() => {
    document.title = "StocTrack Home page"; // Set your desired page title here
  }, []); // This effect runs only once after the component mounts
  


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