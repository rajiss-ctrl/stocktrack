import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Google from '../../assets/img/google.svg'
import Logo from '../../assets/img/stocktrack-logo.png'
import IndexDropdown from "../Dropdowns/IndexDropdown";
import { Line } from 'react-chartjs-2';
import db, { auth, useAuth } from "../../db/firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function Navbar(props) {
  const [serverErr, setServerErr] = useState("");
  const guestEmail = "stocktrack.guest@gmail.com";
  const guestPass = "stocktrack02!";
  const currentUser = useAuth();
  console.log(currentUser?.email)
  const location = useLocation();
  const currentRoutePath = location.pathname;
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userG = res.user;

      const q = query(collection(db, "users"), where("uid", "==", userG.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: userG.uid,
          name: userG.displayName,
          authProvider: "google",
          email: userG.email,
        });
      }
      navigate("/dashboardtest");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGuestLogin = () => {
    signInWithEmailAndPassword(auth, guestEmail, guestPass)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error) {
          let error = "Internet issues or wrong credentials!";
          setServerErr(error);
        }
      });
  };

  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="tracking-tight md:tracking-wide lg:tracking-widest top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" className="">
              <img src={Logo} className="w-12" alt="stock track"/>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              " lg:flex flex-grow lg:pl-24 xl:pl-40 items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row md:gap-4 list-none mr-auto">
              <li className="hover:text-slate-400">
                { currentUser?.email === undefined ?
                  <Link to='/index'>Login</Link> :
                  <button>Log-out</button>}
              </li>
              <li className="hover:text-slate-400">
                { currentUser?.email === undefined ?
                  <Link to='/index'>Sign-up</Link> :
                  <></>}
              </li>
              <li className="hover:text-slate-400">
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            </ul>

            <div className="mt-5 lg:mt-0 bg-lightBlue-500 flex items-center">
              <button
                onSubmit={signInWithEmailAndPassword}
                className=" active:bg-lightBlue-600 lead-[0.8rem] text-[0.65rem] tracking-tight md:tracking-wide lg:tracking-widest font-semibold uppercase bg-gray-100 md:bg-white px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0  mb-3 ease-linear transition-all duration-150"
                type="button"
                onClick={handleGuestLogin} // Trigger the function when the button is clicked
              >
                Guest
              </button>
              <button
                className="border-0 flex items-center active:bg-lightBlue-600 text-[0.65rem] leading-[0.8rem] tracking-tight md:tracking-wide lg:tracking-widest font-semibold uppercase bg-gray-100 md:bg-white px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                type="button"
                onClick={signInWithGoogle}
              >
                <span className="hidden md:block">google sign-in</span>
                <img className="w-[30px] text-center pr-2 md:pl-1" src={Google} alt="..."/> 
                <span className="md:hidden">sign-in</span>  
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
